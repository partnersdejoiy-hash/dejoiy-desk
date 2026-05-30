<?php
/**
 * Plugin Name:       DEJOIY Support Center
 * Plugin URI:        https://dejoiy.com
 * Description:       Premium customer & seller support portal powered by DEJOIY Internal Tools (Zammad REST API). WooCommerce + WCFM marketplace integration.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      8.1
 * Author:            DEJOIY
 * Author URI:        https://dejoiy.com
 * License:           GPL-2.0-or-later
 * Text Domain:       dejoiy-support-center
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

define( 'DEJOIY_SC_VERSION', '1.0.0' );
define( 'DEJOIY_SC_PLUGIN_FILE', __FILE__ );
define( 'DEJOIY_SC_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'DEJOIY_SC_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once DEJOIY_SC_PLUGIN_DIR . 'includes/class-autoloader.php';

Dejoiy_Support_Center_Autoloader::register( DEJOIY_SC_PLUGIN_DIR . 'includes/' );

/**
 * Main plugin singleton.
 */
final class Dejoiy_Support_Center {

	private static ?self $instance = null;

	public static function instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		register_activation_hook( DEJOIY_SC_PLUGIN_FILE, [ $this, 'activate' ] );
		register_deactivation_hook( DEJOIY_SC_PLUGIN_FILE, [ $this, 'deactivate' ] );

		add_action( 'init', [ $this, 'init' ] );
		add_action( 'rest_api_init', [ Dejoiy_SC_REST_Controller::class, 'register_routes' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_assets' ] );

		Dejoiy_SC_Admin::init();
		Dejoiy_SC_Portal::init();
		Dejoiy_SC_WooCommerce::init();
		Dejoiy_SC_WCFM::init();
		Dejoiy_SC_Notifications::init();
	}

	public function init(): void {
		load_plugin_textdomain( 'dejoiy-support-center', false, dirname( plugin_basename( DEJOIY_SC_PLUGIN_FILE ) ) . '/languages' );
	}

	public function activate(): void {
		Dejoiy_SC_Portal::register_rewrite_rules();
		flush_rewrite_rules();
		Dejoiy_SC_Notifications::create_tables();
	}

	public function deactivate(): void {
		flush_rewrite_rules();
	}

	public function enqueue_assets(): void {
		if ( ! Dejoiy_SC_Portal::is_portal_request() ) {
			return;
		}

		wp_enqueue_style(
			'dejoiy-support-portal',
			DEJOIY_SC_PLUGIN_URL . 'public/css/dejoiy-support-portal.css',
			[],
			DEJOIY_SC_VERSION
		);

		wp_enqueue_script(
			'dejoiy-support-portal',
			DEJOIY_SC_PLUGIN_URL . 'public/js/dejoiy-support-portal.js',
			[],
			DEJOIY_SC_VERSION,
			true
		);

		wp_enqueue_script(
			'dejoiy-joi-assistant',
			DEJOIY_SC_PLUGIN_URL . 'public/js/joi-assistant.js',
			[ 'dejoiy-support-portal' ],
			DEJOIY_SC_VERSION,
			true
		);

		wp_localize_script(
			'dejoiy-support-portal',
			'dejoiySupport',
			[
				'restUrl'   => esc_url_raw( rest_url( 'dejoiy-support/v1' ) ),
				'nonce'     => wp_create_nonce( 'wp_rest' ),
				'portalUrl' => esc_url_raw( Dejoiy_SC_Portal::get_portal_base_url() ),
				'user'      => Dejoiy_SC_Auth::current_portal_user_payload(),
				'branding'  => Dejoiy_SC_Branding::get_config(),
				'i18n'      => [
					'loading'       => __( 'Loading…', 'dejoiy-support-center' ),
					'error'         => __( 'Something went wrong. Please try again.', 'dejoiy-support-center' ),
					'ticketCreated' => __( 'Your support ticket has been created.', 'dejoiy-support-center' ),
				],
			]
		);
	}
}

Dejoiy_Support_Center::instance();
