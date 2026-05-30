<?php
/**
 * WordPress admin settings.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_Admin {

	public static function init(): void {
		add_action( 'admin_menu', [ self::class, 'menu' ] );
		add_action( 'admin_init', [ self::class, 'register_settings' ] );
	}

	public static function menu(): void {
		add_options_page(
			__( 'DEJOIY Support Center', 'dejoiy-support-center' ),
			__( 'DEJOIY Support', 'dejoiy-support-center' ),
			'manage_options',
			'dejoiy-support-center',
			[ self::class, 'render_page' ]
		);
	}

	public static function register_settings(): void {
		$fields = [
			'dejoiy_sc_zammad_url',
			'dejoiy_sc_zammad_token',
			'dejoiy_sc_ticket_group',
			'dejoiy_sc_seller_ticket_group',
			'dejoiy_sc_portal_slug',
			'dejoiy_sc_portal_url',
			'dejoiy_sc_kb_id',
			'dejoiy_sc_kb_locale',
			'dejoiy_sc_brand_name',
			'dejoiy_sc_brand_tagline',
			'dejoiy_sc_logo_url',
		];

		foreach ( $fields as $field ) {
			register_setting( 'dejoiy_sc_settings', $field, [ 'sanitize_callback' => 'sanitize_text_field' ] );
		}
	}

	public static function render_page(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		include DEJOIY_SC_PLUGIN_DIR . 'templates/admin-settings.php';
	}
}
