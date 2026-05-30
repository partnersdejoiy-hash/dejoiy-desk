<?php
/**
 * Support portal routing and shortcode.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_Portal {

	private static string $mode = 'customer';

	public static function init(): void {
		add_action( 'init', [ self::class, 'register_rewrite_rules' ] );
		add_shortcode( 'dejoiy_support_portal', [ self::class, 'render_shortcode' ] );
		add_filter( 'template_include', [ self::class, 'template_loader' ] );
	}

	public static function register_rewrite_rules(): void {
		$slug = self::get_slug();
		add_rewrite_rule( "^{$slug}/?$", 'index.php?dejoiy_support_portal=1', 'top' );
		add_rewrite_rule( "^{$slug}/(.+)/?", 'index.php?dejoiy_support_portal=1&dejoiy_support_view=$matches[1]', 'top' );
		add_rewrite_tag( '%dejoiy_support_portal%', '1' );
		add_rewrite_tag( '%dejoiy_support_view%', '([^&]+)' );
	}

	public static function get_slug(): string {
		return sanitize_title( (string) get_option( 'dejoiy_sc_portal_slug', 'support' ) );
	}

	public static function get_portal_base_url(): string {
		$custom = (string) get_option( 'dejoiy_sc_portal_url', '' );
		if ( $custom ) {
			return trailingslashit( $custom );
		}
		return home_url( '/' . self::get_slug() . '/' );
	}

	public static function is_portal_request(): bool {
		if ( get_query_var( 'dejoiy_support_portal' ) ) {
			return true;
		}
		global $post;
		if ( $post instanceof WP_Post && has_shortcode( $post->post_content, 'dejoiy_support_portal' ) ) {
			return true;
		}
		return false;
	}

	public static function get_current_mode(): string {
		return self::$mode;
	}

	/**
	 * @param array<string,string>|string $atts
	 */
	public static function render_shortcode( $atts = [] ): string {
		$atts = shortcode_atts( [ 'mode' => 'customer' ], (array) $atts, 'dejoiy_support_portal' );
		self::$mode = sanitize_key( $atts['mode'] );

		if ( ! is_user_logged_in() ) {
			return '<div class="dejoiy-sc-login-prompt">' .
				esc_html__( 'Please log in to access the DEJOIY Support Center.', 'dejoiy-support-center' ) .
				' <a href="' . esc_url( wp_login_url( self::get_portal_base_url() ) ) . '">' .
				esc_html__( 'Log in', 'dejoiy-support-center' ) .
				'</a></div>';
		}

		ob_start();
		include DEJOIY_SC_PLUGIN_DIR . 'templates/portal.php';
		return (string) ob_get_clean();
	}

	public static function template_loader( string $template ): string {
		if ( ! get_query_var( 'dejoiy_support_portal' ) ) {
			return $template;
		}

		Dejoiy_SC_Auth::require_login();

		$portal_template = DEJOIY_SC_PLUGIN_DIR . 'templates/page-support.php';
		return is_readable( $portal_template ) ? $portal_template : $template;
	}
}
