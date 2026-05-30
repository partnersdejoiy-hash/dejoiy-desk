<?php
/**
 * Maps WordPress users to Zammad customers.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_User_Sync {

	public const META_ZAMMAD_USER_ID = 'dejoiy_zammad_user_id';

	public static function get_zammad_user_id( int $wp_user_id ): ?int {
		$stored = get_user_meta( $wp_user_id, self::META_ZAMMAD_USER_ID, true );
		return $stored ? (int) $stored : null;
	}

	public static function set_zammad_user_id( int $wp_user_id, int $zammad_user_id ): void {
		update_user_meta( $wp_user_id, self::META_ZAMMAD_USER_ID, $zammad_user_id );
	}

	/**
	 * Ensure WP user exists as Zammad customer; create if missing.
	 *
	 * @return int|WP_Error Zammad user id
	 */
	public static function ensure_zammad_customer( WP_User $user ) {
		$existing = self::get_zammad_user_id( $user->ID );
		if ( $existing ) {
			return $existing;
		}

		$api = new Dejoiy_SC_Zammad_Api();

		$found = $api->find_user_by_email( $user->user_email );
		if ( ! is_wp_error( $found ) && isset( $found['id'] ) ) {
			self::set_zammad_user_id( $user->ID, (int) $found['id'] );
			return (int) $found['id'];
		}

		$role_ids = self::customer_role_ids( $api );
		if ( is_wp_error( $role_ids ) ) {
			return $role_ids;
		}

		$created = $api->create_user(
			[
				'firstname' => $user->first_name ?: $user->display_name,
				'lastname'  => $user->last_name ?: 'Customer',
				'email'     => $user->user_email,
				'login'     => $user->user_email,
				'role_ids'  => $role_ids,
				'active'    => true,
			]
		);

		if ( is_wp_error( $created ) ) {
			return $created;
		}

		if ( empty( $created['id'] ) ) {
			return new WP_Error( 'dejoiy_sc_user_create_failed', __( 'Could not create support desk user.', 'dejoiy-support-center' ) );
		}

		self::set_zammad_user_id( $user->ID, (int) $created['id'] );
		return (int) $created['id'];
	}

	/**
	 * @return array<int>|WP_Error
	 */
	private static function customer_role_ids( Dejoiy_SC_Zammad_Api $api ) {
		$cached = get_transient( 'dejoiy_sc_customer_role_ids' );
		if ( is_array( $cached ) && $cached ) {
			return $cached;
		}

		$roles = $api->get( 'roles' );
		if ( is_wp_error( $roles ) || ! is_array( $roles ) ) {
			return new WP_Error( 'dejoiy_sc_roles', __( 'Could not load customer role from support desk.', 'dejoiy-support-center' ) );
		}

		$ids = [];
		foreach ( $roles as $role ) {
			if ( ! is_array( $role ) ) {
				continue;
			}
			$name = strtolower( (string) ( $role['name'] ?? '' ) );
			if ( in_array( $name, [ 'customer', 'customer/end-user' ], true ) ) {
				$ids[] = (int) $role['id'];
			}
		}

		if ( ! $ids ) {
			return new WP_Error( 'dejoiy_sc_no_customer_role', __( 'Customer role not found in support desk.', 'dejoiy-support-center' ) );
		}

		set_transient( 'dejoiy_sc_customer_role_ids', $ids, HOUR_IN_SECONDS );
		return $ids;
	}
}
