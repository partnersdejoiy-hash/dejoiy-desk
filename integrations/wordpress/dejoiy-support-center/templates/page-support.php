<?php
/**
 * Full-page support portal template.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

Dejoiy_SC_Auth::require_login();

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php esc_html_e( 'DEJOIY Support Center', 'dejoiy-support-center' ); ?></title>
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'dejoiy-sc-body' ); ?>>
<?php echo do_shortcode( '[dejoiy_support_portal]' ); ?>
<?php wp_footer(); ?>
</body>
</html>
