<?php
/**
 * WCFM Marketplace seller support.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_WCFM {

	public static function init(): void {
		add_filter( 'wcfm_query_vars', [ self::class, 'register_endpoint' ], 50 );
		add_filter( 'wcfm_endpoint_dejoiy-support_title', [ self::class, 'endpoint_title' ] );
		add_action( 'wcfm_load_views', [ self::class, 'load_vendor_view' ] );
		add_action( 'woocommerce_account_dejoiy-support_endpoint', [ self::class, 'render_myaccount_endpoint' ] );
	}

	public static function register_endpoint( array $query_vars ): array {
		$query_vars['dejoiy-support'] = 'dejoiy-support';
		return $query_vars;
	}

	public static function endpoint_title(): string {
		return __( 'DEJOIY Support', 'dejoiy-support-center' );
	}

	public static function load_vendor_view(): void {
		if ( ! self::is_vendor_area() ) {
			return;
		}
		add_action( 'wcfm_dejoiy-support', [ self::class, 'render_vendor_portal' ] );
	}

	public static function is_vendor_area(): bool {
		global $wp;
		return isset( $wp->query_vars['dejoiy-support'] );
	}

	public static function render_vendor_portal(): void {
		echo do_shortcode( '[dejoiy_support_portal mode="seller"]' );
	}

	public static function render_myaccount_endpoint(): void {
		echo do_shortcode( '[dejoiy_support_portal]' );
	}

	public static function is_vendor( int $user_id ): bool {
		if ( function_exists( 'wcfm_is_vendor' ) ) {
			return wcfm_is_vendor( $user_id );
		}
		return user_can( $user_id, 'wcfm_vendor' );
	}

	public static function get_vendor_id( int $user_id ): int {
		if ( function_exists( 'wcfm_get_vendor_id_by_user' ) ) {
			return (int) wcfm_get_vendor_id_by_user( $user_id );
		}
		return $user_id;
	}

	/**
	 * @return array{id:int,name:string,store:string}|null
	 */
	public static function get_product_vendor( int $product_id ): ?array {
		$vendor_id = 0;

		if ( function_exists( 'wcfm_get_vendor_id_by_post' ) ) {
			$vendor_id = (int) wcfm_get_vendor_id_by_post( $product_id );
		} elseif ( metadata_exists( 'post', $product_id, '_wcfm_product_author' ) ) {
			$vendor_id = (int) get_post_meta( $product_id, '_wcfm_product_author', true );
		}

		if ( ! $vendor_id ) {
			return null;
		}

		return self::get_vendor_by_id( $vendor_id );
	}

	/**
	 * @return array{id:int,name:string,store:string}|null
	 */
	public static function get_vendor_by_id( int $vendor_id ): ?array {
		$user = get_user_by( 'id', $vendor_id );
		if ( ! $user ) {
			return null;
		}

		$store = '';
		if ( function_exists( 'wcfmmp_get_store' ) ) {
			$store_obj = wcfmmp_get_store( $vendor_id );
			if ( $store_obj && method_exists( $store_obj, 'get_shop_name' ) ) {
				$store = (string) $store_obj->get_shop_name();
			}
		}

		return [
			'id'    => $vendor_id,
			'name'  => $user->display_name,
			'store' => $store ?: $user->display_name,
		];
	}

	/**
	 * Seller ticket categories.
	 *
	 * @return array<string,string>
	 */
	public static function seller_categories(): array {
		return apply_filters(
			'dejoiy_sc_seller_categories',
			[
				'payouts'      => __( 'Payouts', 'dejoiy-support-center' ),
				'store'        => __( 'Store issues', 'dejoiy-support-center' ),
				'products'     => __( 'Product approval', 'dejoiy-support-center' ),
				'verification' => __( 'Verification', 'dejoiy-support-center' ),
				'marketplace'  => __( 'Marketplace support', 'dejoiy-support-center' ),
			]
		);
	}
}
