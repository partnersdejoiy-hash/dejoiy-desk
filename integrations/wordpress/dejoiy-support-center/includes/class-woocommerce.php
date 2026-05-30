<?php
/**
 * WooCommerce My Account integration.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_WooCommerce {

	public static function init(): void {
		add_action( 'init', [ self::class, 'register_endpoint' ] );
		add_filter( 'woocommerce_account_menu_items', [ self::class, 'account_menu_item' ] );
		add_filter( 'query_vars', [ self::class, 'query_vars' ], 0 );
		add_action( 'woocommerce_account_dejoiy-support_endpoint', [ self::class, 'render_account_endpoint' ] );
	}

	public static function render_account_endpoint(): void {
		echo do_shortcode( '[dejoiy_support_portal]' );
	}

	public static function register_endpoint(): void {
		add_rewrite_endpoint( 'dejoiy-support', EP_ROOT | EP_PAGES );
	}

	/**
	 * @param array<string,string> $items
	 * @return array<string,string>
	 */
	public static function account_menu_item( array $items ): array {
		$new = [];
		foreach ( $items as $key => $label ) {
			$new[ $key ] = $label;
			if ( 'orders' === $key ) {
				$new['dejoiy-support'] = __( 'Support Center', 'dejoiy-support-center' );
			}
		}
		if ( ! isset( $new['dejoiy-support'] ) ) {
			$new['dejoiy-support'] = __( 'Support Center', 'dejoiy-support-center' );
		}
		return $new;
	}

	/**
	 * @param array<int,string> $vars
	 * @return array<int,string>
	 */
	public static function query_vars( array $vars ): array {
		$vars[] = 'dejoiy-support';
		return $vars;
	}

	/**
	 * @return array<string,string>
	 */
	public static function customer_categories(): array {
		return apply_filters(
			'dejoiy_sc_customer_categories',
			[
				'orders'    => __( 'Orders', 'dejoiy-support-center' ),
				'shipping'  => __( 'Shipping', 'dejoiy-support-center' ),
				'returns'   => __( 'Returns', 'dejoiy-support-center' ),
				'refunds'   => __( 'Refunds', 'dejoiy-support-center' ),
				'sellers'   => __( 'Sellers', 'dejoiy-support-center' ),
				'accounts'  => __( 'Accounts', 'dejoiy-support-center' ),
				'payments'  => __( 'Payments', 'dejoiy-support-center' ),
				'products'  => __( 'Products', 'dejoiy-support-center' ),
				'other'     => __( 'Other', 'dejoiy-support-center' ),
			]
		);
	}
}
