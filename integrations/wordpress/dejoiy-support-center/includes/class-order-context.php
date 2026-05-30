<?php
/**
 * WooCommerce order → ticket context.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_Order_Context {

	/**
	 * @param array<string,mixed> $input
	 * @return array<string,mixed>
	 */
	public static function build_from_input( int $wp_user_id, array $input ): array {
		$context = [
			'Customer ID' => (string) $wp_user_id,
			'Customer'    => '',
			'Order ID'    => '',
			'Product ID'  => '',
			'Product'     => '',
			'Seller ID'   => '',
			'Seller'      => '',
			'Store'       => '',
			'Category'    => sanitize_text_field( (string) ( $input['category'] ?? '' ) ),
		];

		$user = get_user_by( 'id', $wp_user_id );
		if ( $user ) {
			$context['Customer'] = $user->display_name;
		}

		$order_id   = (int) ( $input['order_id'] ?? 0 );
		$product_id = (int) ( $input['product_id'] ?? 0 );

		if ( $order_id && function_exists( 'wc_get_order' ) ) {
			$order = wc_get_order( $order_id );
			if ( $order && (int) $order->get_customer_id() === $wp_user_id ) {
				$context['Order ID'] = (string) $order_id;

				if ( ! $product_id ) {
					$product_id = (int) ( $input['line_item_product_id'] ?? 0 );
				}

				if ( $product_id ) {
					$context = array_merge( $context, self::product_and_seller_from_order( $order, $product_id ) );
				} else {
					$context = array_merge( $context, self::first_line_item_context( $order ) );
				}
			}
		}

		if ( $product_id && empty( $context['Product ID'] ) ) {
			$product = wc_get_product( $product_id );
			if ( $product ) {
				$context['Product ID'] = (string) $product_id;
				$context['Product']    = $product->get_name();
				$seller                  = Dejoiy_SC_WCFM::get_product_vendor( $product_id );
				if ( $seller ) {
					$context['Seller ID'] = (string) $seller['id'];
					$context['Seller']    = $seller['name'];
					$context['Store']     = $seller['store'];
				}
			}
		}

		if ( ! empty( $input['seller_id'] ) ) {
			$seller_id = (int) $input['seller_id'];
			$vendor    = Dejoiy_SC_WCFM::get_vendor_by_id( $seller_id );
			if ( $vendor ) {
				$context['Seller ID'] = (string) $seller_id;
				$context['Seller']    = $vendor['name'];
				$context['Store']     = $vendor['store'];
			}
		}

		return apply_filters( 'dejoiy_sc_ticket_context', $context, $wp_user_id, $input );
	}

	/**
	 * Orders for ticket form dropdown.
	 *
	 * @return array<int,array<string,mixed>>
	 */
	public static function get_customer_orders( int $wp_user_id, int $limit = 20 ): array {
		if ( ! function_exists( 'wc_get_orders' ) ) {
			return [];
		}

		$orders = wc_get_orders(
			[
				'customer_id' => $wp_user_id,
				'limit'       => $limit,
				'orderby'     => 'date',
				'order'       => 'DESC',
				'status'      => array_keys( wc_get_order_statuses() ),
			]
		);

		$list = [];
		foreach ( $orders as $order ) {
			$items = [];
			foreach ( $order->get_items() as $item ) {
				$product_id = (int) $item->get_product_id();
				$seller     = Dejoiy_SC_WCFM::get_product_vendor( $product_id );
				$items[]    = [
					'product_id'   => $product_id,
					'name'         => $item->get_name(),
					'seller_id'    => $seller['id'] ?? null,
					'seller_name'  => $seller['name'] ?? '',
					'store_name'   => $seller['store'] ?? '',
				];
			}

			$list[] = [
				'id'     => $order->get_id(),
				'number' => $order->get_order_number(),
				'date'   => $order->get_date_created() ? $order->get_date_created()->date( 'Y-m-d' ) : '',
				'total'  => $order->get_formatted_order_total(),
				'status' => wc_get_order_status_name( $order->get_status() ),
				'items'  => $items,
			];
		}

		return $list;
	}

	/**
	 * @param WC_Order $order
	 * @return array<string,mixed>
	 */
	private static function first_line_item_context( $order ): array {
		foreach ( $order->get_items() as $item ) {
			$product_id = (int) $item->get_product_id();
			if ( $product_id ) {
				return self::product_and_seller_from_order( $order, $product_id );
			}
		}
		return [];
	}

	/**
	 * @param WC_Order $order
	 * @return array<string,mixed>
	 */
	private static function product_and_seller_from_order( $order, int $product_id ): array {
		$product = wc_get_product( $product_id );
		$ctx     = [
			'Order ID'   => (string) $order->get_id(),
			'Product ID' => (string) $product_id,
			'Product'    => $product ? $product->get_name() : '',
		];

		$seller = Dejoiy_SC_WCFM::get_product_vendor( $product_id );
		if ( $seller ) {
			$ctx['Seller ID'] = (string) $seller['id'];
			$ctx['Seller']    = $seller['name'];
			$ctx['Store']     = $seller['store'];
		}

		return $ctx;
	}
}
