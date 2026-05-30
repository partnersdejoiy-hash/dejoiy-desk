<?php
/**
 * Ticket lifecycle via Zammad API with DEJOIY marketplace metadata.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_Ticket_Service {

	/**
	 * @param array<string,mixed> $input
	 * @return array<string,mixed>|WP_Error
	 */
	public static function create_ticket( int $wp_user_id, array $input ) {
		$user = get_user_by( 'id', $wp_user_id );
		if ( ! $user ) {
			return new WP_Error( 'dejoiy_sc_invalid_user', __( 'Invalid user.', 'dejoiy-support-center' ) );
		}

		$zammad_user_id = Dejoiy_SC_User_Sync::ensure_zammad_customer( $user );
		if ( is_wp_error( $zammad_user_id ) ) {
			return $zammad_user_id;
		}

		$context = Dejoiy_SC_Order_Context::build_from_input( $wp_user_id, $input );
		$body    = self::format_ticket_body( $input, $context );

		$group = (string) get_option( 'dejoiy_sc_ticket_group', 'Users' );
		if ( ! empty( $input['seller_ticket'] ) ) {
			$group = (string) get_option( 'dejoiy_sc_seller_ticket_group', $group );
		}

		$priority = sanitize_text_field( (string) ( $input['priority'] ?? '2 normal' ) );
		$tags     = self::build_tags( $input, $context );

		$payload = [
			'title'       => sanitize_text_field( (string) ( $input['subject'] ?? __( 'Support request', 'dejoiy-support-center' ) ) ),
			'group'       => $group,
			'customer_id' => $zammad_user_id,
			'priority'    => $priority,
			'tags'        => implode( ',', $tags ),
			'article'     => [
				'body'         => $body,
				'type'         => 'web',
				'content_type' => 'text/html',
				'sender'       => 'Customer',
				'internal'     => false,
			],
		];

		$payload = self::apply_custom_attributes( $payload, $input, $context );

		if ( ! empty( $input['attachments'] ) && is_array( $input['attachments'] ) ) {
			$payload['article']['attachments'] = self::encode_attachments( $input['attachments'] );
		}

		$api     = new Dejoiy_SC_Zammad_Api();
		$created = $api->post( 'tickets', $payload );

		if ( is_wp_error( $created ) ) {
			return $created;
		}

		self::store_ticket_reference( $wp_user_id, $created, $context );

		Dejoiy_SC_Notifications::queue(
			$wp_user_id,
			'ticket_created',
			[
				'ticket_id' => $created['id'] ?? null,
				'number'    => $created['number'] ?? null,
				'title'     => $created['title'] ?? '',
			]
		);

		return $created;
	}

	/**
	 * List tickets for customer (scoped).
	 *
	 * @return array<int,array<string,mixed>>|WP_Error
	 */
	public static function list_tickets_for_user( int $wp_user_id, array $args = [] ) {
		$zammad_user_id = Dejoiy_SC_User_Sync::get_zammad_user_id( $wp_user_id );
		if ( ! $zammad_user_id ) {
			$user = get_user_by( 'id', $wp_user_id );
			if ( ! $user ) {
				return [];
			}
			$zammad_user_id = Dejoiy_SC_User_Sync::ensure_zammad_customer( $user );
			if ( is_wp_error( $zammad_user_id ) ) {
				return $zammad_user_id;
			}
		}

		$query = sprintf( 'customer.id:%d', $zammad_user_id );

		if ( ! empty( $args['seller_id'] ) ) {
			$query .= ' tags:seller-' . (int) $args['seller_id'];
		}

		if ( ! empty( $args['order_id'] ) ) {
			$query .= ' tags:order-' . (int) $args['order_id'];
		}

		$api    = new Dejoiy_SC_Zammad_Api();
		$result = $api->post(
			'tickets/search',
			[
				'query'       => $query,
				'limit'       => (int) ( $args['limit'] ?? 50 ),
				'sort_by'     => 'updated_at',
				'order_by'    => 'desc',
				'full'        => true,
				'with_total'  => true,
			]
		);

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		$tickets = $result['tickets'] ?? $result;
		if ( ! is_array( $tickets ) ) {
			return [];
		}

		return array_map( [ self::class, 'normalize_ticket_summary' ], $tickets );
	}

	/**
	 * @return array<string,mixed>|WP_Error
	 */
	public static function get_ticket( int $wp_user_id, int $ticket_id, bool $is_admin = false ) {
		$api    = new Dejoiy_SC_Zammad_Api();
		$ticket = $api->get( 'tickets/' . $ticket_id, [ 'expand' => true ] );

		if ( is_wp_error( $ticket ) ) {
			return $ticket;
		}

		if ( ! $is_admin && ! self::user_owns_ticket( $wp_user_id, $ticket ) ) {
			return new WP_Error( 'dejoiy_sc_forbidden', __( 'You cannot access this ticket.', 'dejoiy-support-center' ), [ 'status' => 403 ] );
		}

		$articles = $api->get( 'ticket_articles/by_ticket/' . $ticket_id );
		if ( is_wp_error( $articles ) ) {
			$articles = [];
		}

		$ticket['articles'] = is_array( $articles ) ? $articles : [];
		return self::normalize_ticket_detail( $ticket );
	}

	/**
	 * @param array<string,mixed> $input
	 * @return array<string,mixed>|WP_Error
	 */
	public static function add_reply( int $wp_user_id, int $ticket_id, array $input, bool $is_admin = false ) {
		$ticket = self::get_ticket( $wp_user_id, $ticket_id, $is_admin );
		if ( is_wp_error( $ticket ) ) {
			return $ticket;
		}

		$payload = [
			'ticket_id'    => $ticket_id,
			'body'         => wp_kses_post( (string) ( $input['body'] ?? '' ) ),
			'content_type' => 'text/html',
			'type'         => 'web',
			'sender'       => $is_admin ? 'Agent' : 'Customer',
			'internal'     => false,
		];

		if ( ! empty( $input['attachments'] ) && is_array( $input['attachments'] ) ) {
			$payload['attachments'] = self::encode_attachments( $input['attachments'] );
		}

		$api     = new Dejoiy_SC_Zammad_Api();
		$article = $api->post( 'ticket_articles', $payload );

		if ( is_wp_error( $article ) ) {
			return $article;
		}

		Dejoiy_SC_Notifications::queue(
			$wp_user_id,
			'ticket_updated',
			[
				'ticket_id' => $ticket_id,
				'number'    => $ticket['number'] ?? null,
			]
		);

		return $article;
	}

	/**
	 * Admin search across marketplace identifiers.
	 *
	 * @return array<int,array<string,mixed>>|WP_Error
	 */
	public static function admin_search( array $args ) {
		if ( ! current_user_can( 'manage_woocommerce' ) && ! current_user_can( 'manage_options' ) ) {
			return new WP_Error( 'dejoiy_sc_forbidden', __( 'Forbidden.', 'dejoiy-support-center' ), [ 'status' => 403 ] );
		}

		$parts = [];
		if ( ! empty( $args['q'] ) ) {
			$parts[] = (string) $args['q'];
		}
		if ( ! empty( $args['customer_id'] ) ) {
			$parts[] = 'tags:customer-wp-' . (int) $args['customer_id'];
		}
		if ( ! empty( $args['seller_id'] ) ) {
			$parts[] = 'tags:seller-' . (int) $args['seller_id'];
		}
		if ( ! empty( $args['order_id'] ) ) {
			$parts[] = 'tags:order-' . (int) $args['order_id'];
		}
		if ( ! empty( $args['product_id'] ) ) {
			$parts[] = 'tags:product-' . (int) $args['product_id'];
		}

		$query = $parts ? implode( ' AND ', $parts ) : '*';

		$api    = new Dejoiy_SC_Zammad_Api();
		$result = $api->post(
			'tickets/search',
			[
				'query'    => $query,
				'limit'    => (int) ( $args['limit'] ?? 100 ),
				'sort_by'  => 'updated_at',
				'order_by' => 'desc',
				'full'     => true,
			]
		);

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		$tickets = $result['tickets'] ?? $result;
		return is_array( $tickets ) ? array_map( [ self::class, 'normalize_ticket_summary' ], $tickets ) : [];
	}

	/**
	 * @param array<string,mixed> $ticket
	 */
	private static function user_owns_ticket( int $wp_user_id, array $ticket ): bool {
		$zammad_user_id = Dejoiy_SC_User_Sync::get_zammad_user_id( $wp_user_id );
		if ( ! $zammad_user_id ) {
			return false;
		}

		$customer_id = (int) ( $ticket['customer_id'] ?? 0 );
		if ( $customer_id === $zammad_user_id ) {
			return true;
		}

		// Sellers may access tickets tagged with their seller id.
		if ( Dejoiy_SC_WCFM::is_vendor( $wp_user_id ) ) {
			$seller_id = Dejoiy_SC_WCFM::get_vendor_id( $wp_user_id );
			$tags      = strtolower( (string) ( $ticket['tags'] ?? '' ) );
			return str_contains( $tags, 'seller-' . $seller_id );
		}

		return false;
	}

	/**
	 * @param array<string,mixed> $input
	 * @param array<string,mixed> $context
	 */
	private static function format_ticket_body( array $input, array $context ): string {
		$lines   = [];
		$lines[] = '<p>' . nl2br( esc_html( (string) ( $input['description'] ?? '' ) ) ) . '</p>';
		$lines[] = '<hr><p><strong>DEJOIY Marketplace Context</strong></p><ul>';

		foreach ( $context as $label => $value ) {
			if ( '' === (string) $value ) {
				continue;
			}
			$lines[] = '<li><strong>' . esc_html( (string) $label ) . ':</strong> ' . esc_html( (string) $value ) . '</li>';
		}

		$lines[] = '</ul>';
		return implode( "\n", $lines );
	}

	/**
	 * @param array<string,mixed> $input
	 * @param array<string,mixed> $context
	 * @return array<int,string>
	 */
	private static function build_tags( array $input, array $context ): array {
		$tags = [ 'dejoiy', 'support-portal' ];

		if ( ! empty( $input['category'] ) ) {
			$tags[] = 'category-' . sanitize_title( (string) $input['category'] );
		}

		if ( ! empty( $context['Customer ID'] ) ) {
			$tags[] = 'customer-wp-' . (int) $context['Customer ID'];
		}
		if ( ! empty( $context['Order ID'] ) ) {
			$tags[] = 'order-' . (int) $context['Order ID'];
		}
		if ( ! empty( $context['Product ID'] ) ) {
			$tags[] = 'product-' . (int) $context['Product ID'];
		}
		if ( ! empty( $context['Seller ID'] ) ) {
			$tags[] = 'seller-' . (int) $context['Seller ID'];
		}

		if ( ! empty( $input['seller_ticket'] ) ) {
			$tags[] = 'seller-support';
		}

		return array_unique( $tags );
	}

	/**
	 * Optional Object Manager attribute mapping from plugin settings.
	 *
	 * @param array<string,mixed> $payload
	 * @param array<string,mixed> $input
	 * @param array<string,mixed> $context
	 * @return array<string,mixed>
	 */
	private static function apply_custom_attributes( array $payload, array $input, array $context ): array {
		$map = get_option( 'dejoiy_sc_attribute_map', [] );
		if ( ! is_array( $map ) ) {
			return $payload;
		}

		$values = [
			'order_id'    => $context['Order ID'] ?? '',
			'product_id'  => $context['Product ID'] ?? '',
			'seller_id'   => $context['Seller ID'] ?? '',
			'customer_id' => $context['Customer ID'] ?? '',
			'category'    => $input['category'] ?? '',
		];

		foreach ( $map as $zammad_field => $source_key ) {
			if ( isset( $values[ $source_key ] ) && '' !== (string) $values[ $source_key ] ) {
				$payload[ $zammad_field ] = $values[ $source_key ];
			}
		}

		return $payload;
	}

	/**
	 * @param array<int,array<string,mixed>> $files Uploaded via REST (base64).
	 * @return array<int,array<string,string>>
	 */
	private static function encode_attachments( array $files ): array {
		$encoded = [];
		foreach ( $files as $file ) {
			if ( empty( $file['filename'] ) || empty( $file['data'] ) ) {
				continue;
			}
			$encoded[] = [
				'filename'  => sanitize_file_name( (string) $file['filename'] ),
				'data'      => (string) $file['data'],
				'mime-type' => sanitize_text_field( (string) ( $file['mime_type'] ?? 'application/octet-stream' ) ),
			];
		}
		return $encoded;
	}

	/**
	 * @param array<string,mixed> $ticket
	 * @param array<string,mixed> $context
	 */
	private static function store_ticket_reference( int $wp_user_id, array $ticket, array $context ): void {
		global $wpdb;
		$table = Dejoiy_SC_Notifications::tickets_table();

		$wpdb->insert(
			$table,
			[
				'wp_user_id'      => $wp_user_id,
				'zammad_ticket_id' => (int) ( $ticket['id'] ?? 0 ),
				'ticket_number'   => (string) ( $ticket['number'] ?? '' ),
				'subject'         => (string) ( $ticket['title'] ?? '' ),
				'order_id'        => (int) ( $context['Order ID'] ?? 0 ),
				'product_id'      => (int) ( $context['Product ID'] ?? 0 ),
				'seller_id'       => (int) ( $context['Seller ID'] ?? 0 ),
				'created_at'      => current_time( 'mysql', true ),
			],
			[ '%d', '%d', '%s', '%s', '%d', '%d', '%d', '%s' ]
		);
	}

	/**
	 * @param array<string,mixed> $ticket
	 * @return array<string,mixed>
	 */
	public static function normalize_ticket_summary( array $ticket ): array {
		$state    = $ticket['state'] ?? '';
		$priority = $ticket['priority'] ?? '';
		$owner    = $ticket['owner'] ?? null;

		if ( is_array( $state ) ) {
			$state = $state['name'] ?? '';
		}
		if ( is_array( $priority ) ) {
			$priority = $priority['name'] ?? '';
		}

		$assigned = '';
		if ( is_array( $owner ) ) {
			$assigned = trim( ( $owner['firstname'] ?? '' ) . ' ' . ( $owner['lastname'] ?? '' ) );
		}

		return [
			'id'          => (int) ( $ticket['id'] ?? 0 ),
			'number'      => (string) ( $ticket['number'] ?? '' ),
			'subject'     => (string) ( $ticket['title'] ?? '' ),
			'state'       => (string) $state,
			'state_type'  => self::state_bucket( (string) $state ),
			'priority'    => (string) $priority,
			'updated_at'  => (string) ( $ticket['updated_at'] ?? '' ),
			'assigned_to' => $assigned,
			'tags'        => (string) ( $ticket['tags'] ?? '' ),
		];
	}

	/**
	 * @param array<string,mixed> $ticket
	 * @return array<string,mixed>
	 */
	private static function normalize_ticket_detail( array $ticket ): array {
		$summary = self::normalize_ticket_summary( $ticket );
		$summary['articles'] = array_map(
			static function ( $article ) {
				if ( ! is_array( $article ) ) {
					return [];
				}
				return [
					'id'         => (int) ( $article['id'] ?? 0 ),
					'from'       => (string) ( $article['from'] ?? '' ),
					'body'       => (string) ( $article['body'] ?? '' ),
					'created_at' => (string) ( $article['created_at'] ?? '' ),
					'sender'     => (string) ( $article['sender'] ?? '' ),
				];
			},
			$ticket['articles'] ?? []
		);
		return $summary;
	}

	private static function state_bucket( string $state ): string {
		$lower = strtolower( $state );
		if ( str_contains( $lower, 'closed' ) ) {
			return 'closed';
		}
		if ( str_contains( $lower, 'resolved' ) ) {
			return 'resolved';
		}
		if ( str_contains( $lower, 'pending' ) || str_contains( $lower, 'wait' ) ) {
			return 'pending';
		}
		return 'open';
	}
}
