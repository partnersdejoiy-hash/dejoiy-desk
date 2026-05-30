<?php
/**
 * Portal authentication helpers.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_Auth {

	public static function require_login(): void {
		if ( ! is_user_logged_in() ) {
			wp_safe_redirect( wp_login_url( Dejoiy_SC_Portal::get_portal_base_url() ) );
			exit;
		}
	}

	public static function current_user_id(): int {
		return get_current_user_id();
	}

	public static function is_admin_user(): bool {
		return current_user_can( 'manage_options' ) || current_user_can( 'manage_woocommerce' );
	}

	public static function can_access_seller_mode(): bool {
		return Dejoiy_SC_WCFM::is_vendor( get_current_user_id() );
	}

	/**
	 * @return array<string,mixed>
	 */
	public static function current_portal_user_payload(): array {
		if ( ! is_user_logged_in() ) {
			return [
				'id'    => 0,
				'name'  => '',
				'email' => '',
				'roles' => [],
			];
		}

		$user = wp_get_current_user();
		return [
			'id'           => $user->ID,
			'name'         => $user->display_name,
			'email'        => $user->user_email,
			'isAdmin'      => self::is_admin_user(),
			'isSeller'     => Dejoiy_SC_WCFM::is_vendor( $user->ID ),
			'sellerId'     => Dejoiy_SC_WCFM::get_vendor_id( $user->ID ),
			'zammadUserId' => Dejoiy_SC_User_Sync::get_zammad_user_id( $user->ID ),
		];
	}
}
