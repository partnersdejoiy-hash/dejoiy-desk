<?php
/**
 * DEJOIY Help Center / Zammad Knowledge Base bridge.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_Knowledge_Base {

	/**
	 * Local help categories (also used for JOI routing).
	 *
	 * @return array<string,array{title:string,slug:string,articles:array<int,array{title:string,content:string,url?:string}>}>
	 */
	public static function get_categories(): array {
		$defaults = [
			'orders'    => [
				'title'    => __( 'Orders', 'dejoiy-support-center' ),
				'slug'     => 'orders',
				'articles' => [
					[
						'title'   => __( 'Track your order', 'dejoiy-support-center' ),
						'content' => __( 'View order status in My Account → Orders. Tracking links appear when the seller ships your package.', 'dejoiy-support-center' ),
					],
					[
						'title'   => __( 'Order arrived damaged', 'dejoiy-support-center' ),
						'content' => __( 'Open a support ticket with your order number and photos. We notify the seller and help coordinate a return or replacement.', 'dejoiy-support-center' ),
					],
				],
			],
			'shipping'  => [
				'title'    => __( 'Shipping', 'dejoiy-support-center' ),
				'slug'     => 'shipping',
				'articles' => [
					[
						'title'   => __( 'Delivery times', 'dejoiy-support-center' ),
						'content' => __( 'Delivery estimates are shown at checkout and on the order page. International orders may require customs processing.', 'dejoiy-support-center' ),
					],
				],
			],
			'returns'   => [
				'title'    => __( 'Returns', 'dejoiy-support-center' ),
				'slug'     => 'returns',
				'articles' => [
					[
						'title'   => __( 'Return policy', 'dejoiy-support-center' ),
						'content' => __( 'Most items can be returned within 14 days if unused and in original packaging. Start a ticket under Returns with your order number.', 'dejoiy-support-center' ),
					],
				],
			],
			'refunds'   => [
				'title'    => __( 'Refunds', 'dejoiy-support-center' ),
				'slug'     => 'refunds',
				'articles' => [
					[
						'title'   => __( 'Refund timeline', 'dejoiy-support-center' ),
						'content' => __( 'Approved refunds are processed to your original payment method within 5–10 business days after the return is received.', 'dejoiy-support-center' ),
					],
				],
			],
			'sellers'   => [
				'title'    => __( 'Sellers', 'dejoiy-support-center' ),
				'slug'     => 'sellers',
				'articles' => [
					[
						'title'   => __( 'Contacting a seller', 'dejoiy-support-center' ),
						'content' => __( 'For order-specific issues, raise a ticket and select the order — we attach the seller and product automatically.', 'dejoiy-support-center' ),
					],
				],
			],
			'accounts'  => [
				'title'    => __( 'Accounts', 'dejoiy-support-center' ),
				'slug'     => 'accounts',
				'articles' => [
					[
						'title'   => __( 'Login & security', 'dejoiy-support-center' ),
						'content' => __( 'Reset your password from the login page. Enable two-factor authentication when available in account settings.', 'dejoiy-support-center' ),
					],
				],
			],
			'payments'  => [
				'title'    => __( 'Payments', 'dejoiy-support-center' ),
				'slug'     => 'payments',
				'articles' => [
					[
						'title'   => __( 'Payment methods', 'dejoiy-support-center' ),
						'content' => __( 'We accept major cards and local payment options shown at checkout. Failed payments can usually be retried from the order page.', 'dejoiy-support-center' ),
					],
				],
			],
		];

		return apply_filters( 'dejoiy_sc_help_categories', $defaults );
	}

	/**
	 * Search local KB + optional Zammad KB API.
	 *
	 * @return array<int,array{title:string,content:string,category:string,score:float,source:string}>
	 */
	public static function search( string $query, int $limit = 5 ): array {
		$query = trim( strtolower( $query ) );
		if ( '' === $query ) {
			return [];
		}

		$results = [];

		foreach ( self::get_categories() as $key => $category ) {
			foreach ( $category['articles'] as $article ) {
				$haystack = strtolower( $article['title'] . ' ' . $article['content'] );
				$score    = 0;
				foreach ( preg_split( '/\s+/', $query ) as $word ) {
					if ( strlen( $word ) > 2 && str_contains( $haystack, $word ) ) {
						++$score;
					}
				}
				if ( $score > 0 ) {
					$results[] = [
						'title'    => $article['title'],
						'content'  => $article['content'],
						'category' => $category['title'],
						'score'    => (float) $score,
						'source'   => 'local',
					];
				}
			}
		}

		$remote = self::search_zammad_kb( $query, $limit );
		$results = array_merge( $results, $remote );

		usort(
			$results,
			static fn( $a, $b ) => $b['score'] <=> $a['score']
		);

		return array_slice( $results, 0, $limit );
	}

	/**
	 * @return array<int,array{title:string,content:string,category:string,score:float,source:string}>
	 */
	private static function search_zammad_kb( string $query, int $limit ): array {
		$kb_id = (int) get_option( 'dejoiy_sc_kb_id', 0 );
		$locale = (string) get_option( 'dejoiy_sc_kb_locale', 'en-us' );

		if ( ! $kb_id ) {
			return [];
		}

		$api = new Dejoiy_SC_Zammad_Api();
		$res = $api->post(
			'knowledge_bases/search',
			[
				'knowledge_base_id' => $kb_id,
				'locale'            => $locale,
				'query'             => $query,
				'limit'             => $limit,
				'flavor'            => 'public',
			]
		);

		if ( is_wp_error( $res ) || empty( $res['details'] ) || ! is_array( $res['details'] ) ) {
			return [];
		}

		$out = [];
		foreach ( $res['details'] as $item ) {
			if ( ! is_array( $item ) ) {
				continue;
			}
			$out[] = [
				'title'    => (string) ( $item['title'] ?? '' ),
				'content'  => wp_strip_all_tags( (string) ( $item['content'] ?? $item['excerpt'] ?? '' ) ),
				'category' => __( 'Help Center', 'dejoiy-support-center' ),
				'score'    => 2.5,
				'source'   => 'zammad',
				'url'      => (string) ( $item['url'] ?? '' ),
			];
		}
		return $out;
	}
}
