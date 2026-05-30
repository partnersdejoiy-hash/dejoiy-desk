<?php
/**
 * WordPress REST API for the support portal SPA.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_REST_Controller {

	public static function register_routes(): void {
		$ns = 'dejoiy-support/v1';

		register_rest_route(
			$ns,
			'/tickets',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ self::class, 'list_tickets' ],
					'permission_callback' => [ self::class, 'logged_in' ],
				],
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ self::class, 'create_ticket' ],
					'permission_callback' => [ self::class, 'logged_in' ],
				],
			]
		);

		register_rest_route(
			$ns,
			'/tickets/(?P<id>\d+)',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ self::class, 'get_ticket' ],
					'permission_callback' => [ self::class, 'logged_in' ],
				],
			]
		);

		register_rest_route(
			$ns,
			'/tickets/(?P<id>\d+)/reply',
			[
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ self::class, 'reply_ticket' ],
					'permission_callback' => [ self::class, 'logged_in' ],
				],
			]
		);

		register_rest_route(
			$ns,
			'/orders',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ self::class, 'list_orders' ],
					'permission_callback' => [ self::class, 'logged_in' ],
				],
			]
		);

		register_rest_route(
			$ns,
			'/kb',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ self::class, 'kb_index' ],
					'permission_callback' => '__return_true',
				],
			]
		);

		register_rest_route(
			$ns,
			'/kb/search',
			[
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ self::class, 'kb_search' ],
					'permission_callback' => '__return_true',
				],
			]
		);

		register_rest_route(
			$ns,
			'/joi/chat',
			[
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ self::class, 'joi_chat' ],
					'permission_callback' => [ self::class, 'logged_in' ],
				],
			]
		);

		register_rest_route(
			$ns,
			'/notifications',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ self::class, 'notifications' ],
					'permission_callback' => [ self::class, 'logged_in' ],
				],
			]
		);

		register_rest_route(
			$ns,
			'/notifications/(?P<id>\d+)/read',
			[
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ self::class, 'mark_notification_read' ],
					'permission_callback' => [ self::class, 'logged_in' ],
				],
			]
		);

		register_rest_route(
			$ns,
			'/admin/search',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ self::class, 'admin_search' ],
					'permission_callback' => [ self::class, 'admin_only' ],
				],
			]
		);

		register_rest_route(
			$ns,
			'/meta',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ self::class, 'meta' ],
					'permission_callback' => [ self::class, 'logged_in' ],
				],
			]
		);
	}

	public static function logged_in(): bool {
		return is_user_logged_in();
	}

	public static function admin_only(): bool {
		return Dejoiy_SC_Auth::is_admin_user();
	}

	public static function list_tickets( WP_REST_Request $request ): WP_REST_Response {
		$user_id = get_current_user_id();
		$args    = [
			'limit' => (int) $request->get_param( 'limit' ),
		];

		if ( $request->get_param( 'seller_mode' ) && Dejoiy_SC_Auth::can_access_seller_mode() ) {
			$args['seller_id'] = Dejoiy_SC_WCFM::get_vendor_id( $user_id );
		}

		$tickets = Dejoiy_SC_Ticket_Service::list_tickets_for_user( $user_id, $args );
		if ( is_wp_error( $tickets ) ) {
			return self::error( $tickets );
		}

		return new WP_REST_Response( [ 'tickets' => $tickets ], 200 );
	}

	public static function create_ticket( WP_REST_Request $request ): WP_REST_Response {
		$params = $request->get_json_params();
		if ( ! is_array( $params ) || [] === $params ) {
			$params = $request->get_body_params();
		}
		if ( ! is_array( $params ) ) {
			$params = [];
		}

		if ( ! empty( $params['seller_ticket'] ) ) {
			$params['seller_ticket'] = true;
			$params['category']      = $params['category'] ?? 'marketplace';
		}

		$params['attachments'] = self::parse_uploaded_files( $request );

		$result = Dejoiy_SC_Ticket_Service::create_ticket( get_current_user_id(), $params );
		if ( is_wp_error( $result ) ) {
			return self::error( $result );
		}

		return new WP_REST_Response(
			[
				'ticket' => Dejoiy_SC_Ticket_Service::normalize_ticket_summary( $result ),
			],
			201
		);
	}

	public static function get_ticket( WP_REST_Request $request ): WP_REST_Response {
		$id      = (int) $request['id'];
		$is_admin = Dejoiy_SC_Auth::is_admin_user();
		$ticket  = Dejoiy_SC_Ticket_Service::get_ticket( get_current_user_id(), $id, $is_admin );

		if ( is_wp_error( $ticket ) ) {
			return self::error( $ticket );
		}

		return new WP_REST_Response( [ 'ticket' => $ticket ], 200 );
	}

	public static function reply_ticket( WP_REST_Request $request ): WP_REST_Response {
		$id     = (int) $request['id'];
		$params = $request->get_json_params();
		if ( ! is_array( $params ) || [] === $params ) {
			$params = $request->get_body_params();
		}
		if ( ! is_array( $params ) ) {
			$params = [];
		}
		$params['attachments'] = self::parse_uploaded_files( $request );

		$result = Dejoiy_SC_Ticket_Service::add_reply(
			get_current_user_id(),
			$id,
			$params,
			Dejoiy_SC_Auth::is_admin_user()
		);

		if ( is_wp_error( $result ) ) {
			return self::error( $result );
		}

		return new WP_REST_Response( [ 'article' => $result ], 201 );
	}

	public static function list_orders(): WP_REST_Response {
		$orders = Dejoiy_SC_Order_Context::get_customer_orders( get_current_user_id() );
		return new WP_REST_Response( [ 'orders' => $orders ], 200 );
	}

	public static function kb_index(): WP_REST_Response {
		return new WP_REST_Response( [ 'categories' => Dejoiy_SC_Knowledge_Base::get_categories() ], 200 );
	}

	public static function kb_search( WP_REST_Request $request ): WP_REST_Response {
		$params = $request->get_json_params();
		$query  = is_array( $params ) ? (string) ( $params['query'] ?? '' ) : '';
		$hits   = Dejoiy_SC_Knowledge_Base::search( $query, 8 );
		return new WP_REST_Response( [ 'results' => $hits ], 200 );
	}

	public static function joi_chat( WP_REST_Request $request ): WP_REST_Response {
		$params  = $request->get_json_params();
		$message = is_array( $params ) ? (string) ( $params['message'] ?? '' ) : '';
		$context = is_array( $params ) ? (array) ( $params['context'] ?? [] ) : [];
		$result  = Dejoiy_SC_Joi_Assistant::chat( $message, $context );
		return new WP_REST_Response( $result, 200 );
	}

	public static function notifications( WP_REST_Request $request ): WP_REST_Response {
		$unread = (bool) $request->get_param( 'unread' );
		$list   = Dejoiy_SC_Notifications::list_for_user( get_current_user_id(), $unread );
		return new WP_REST_Response( [ 'notifications' => $list ], 200 );
	}

	public static function mark_notification_read( WP_REST_Request $request ): WP_REST_Response {
		$id = (int) $request['id'];
		Dejoiy_SC_Notifications::mark_read( get_current_user_id(), $id );
		return new WP_REST_Response( [ 'ok' => true ], 200 );
	}

	public static function admin_search( WP_REST_Request $request ): WP_REST_Response {
		$tickets = Dejoiy_SC_Ticket_Service::admin_search(
			[
				'q'           => $request->get_param( 'q' ),
				'customer_id' => $request->get_param( 'customer_id' ),
				'seller_id'   => $request->get_param( 'seller_id' ),
				'order_id'    => $request->get_param( 'order_id' ),
				'product_id'  => $request->get_param( 'product_id' ),
				'limit'       => $request->get_param( 'limit' ),
			]
		);

		if ( is_wp_error( $tickets ) ) {
			return self::error( $tickets );
		}

		return new WP_REST_Response( [ 'tickets' => $tickets ], 200 );
	}

	public static function meta(): WP_REST_Response {
		$mode = Dejoiy_SC_Portal::get_current_mode();

		return new WP_REST_Response(
			[
				'categories'        => 'seller' === $mode
					? Dejoiy_SC_WCFM::seller_categories()
					: Dejoiy_SC_WooCommerce::customer_categories(),
				'priorities'        => [
					'1 low'    => __( 'Low', 'dejoiy-support-center' ),
					'2 normal' => __( 'Normal', 'dejoiy-support-center' ),
					'3 high'   => __( 'High', 'dejoiy-support-center' ),
				],
				'mode'              => $mode,
				'seller_categories' => Dejoiy_SC_WCFM::seller_categories(),
			],
			200
		);
	}

	/**
	 * @return array<int,array<string,mixed>>
	 */
	private static function parse_uploaded_files( WP_REST_Request $request ): array {
		$files = $request->get_file_params();
		if ( empty( $files['attachments'] ) ) {
			return [];
		}

		$uploads = [];
		$batch   = $files['attachments'];
		$names   = $batch['name'] ?? [];
		$tmp     = $batch['tmp_name'] ?? [];
		$types   = $batch['type'] ?? [];

		if ( ! is_array( $names ) ) {
			$names = [ $names ];
			$tmp   = [ $tmp ];
			$types = [ $types ];
		}

		foreach ( $names as $i => $filename ) {
			if ( empty( $tmp[ $i ] ) || ! is_uploaded_file( $tmp[ $i ] ) ) {
				continue;
			}
			$content = file_get_contents( $tmp[ $i ] );
			if ( false === $content ) {
				continue;
			}
			$uploads[] = [
				'filename'  => $filename,
				'data'      => base64_encode( $content ),
				'mime_type' => $types[ $i ] ?? 'application/octet-stream',
			];
		}

		return $uploads;
	}

	private static function error( WP_Error $error ): WP_REST_Response {
		$status = $error->get_error_data()['status'] ?? 400;
		return new WP_REST_Response(
			[
				'code'    => $error->get_error_code(),
				'message' => $error->get_error_message(),
			],
			(int) $status
		);
	}
}
