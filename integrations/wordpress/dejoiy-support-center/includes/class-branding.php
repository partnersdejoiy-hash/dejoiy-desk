<?php
/**
 * DEJOIY brand tokens for the portal UI.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_Branding {

	/**
	 * @return array<string,mixed>
	 */
	public static function get_config(): array {
		return [
			'name'    => (string) get_option( 'dejoiy_sc_brand_name', 'DEJOIY' ),
			'tagline' => (string) get_option( 'dejoiy_sc_brand_tagline', 'YOU + JOY' ),
			'colors'  => [
				'navy'    => '#001F3F',
				'magenta' => '#E91E63',
				'cyan'    => '#00BCD4',
			],
			'logoUrl' => (string) get_option( 'dejoiy_sc_logo_url', '' ),
		];
	}
}
