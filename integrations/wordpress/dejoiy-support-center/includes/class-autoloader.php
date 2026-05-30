<?php
/**
 * PSR-4 style autoloader for Dejoiy_* classes.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_Support_Center_Autoloader {

	public static function register( string $base_dir ): void {
		spl_autoload_register(
			static function ( string $class ) use ( $base_dir ): void {
				if ( ! str_starts_with( $class, 'Dejoiy_SC_' ) ) {
					return;
				}

				$relative = strtolower( str_replace( '_', '-', substr( $class, 10 ) ) );
				$file     = $base_dir . 'class-' . $relative . '.php';

				if ( is_readable( $file ) ) {
					require_once $file;
				}
			}
		);
	}
}
