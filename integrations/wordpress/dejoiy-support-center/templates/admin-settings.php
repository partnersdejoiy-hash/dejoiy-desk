<?php
/**
 * Admin settings template.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="wrap">
	<h1><?php esc_html_e( 'DEJOIY Support Center', 'dejoiy-support-center' ); ?></h1>
	<p><?php esc_html_e( 'Connect your WooCommerce marketplace to DEJOIY Internal Tools (Zammad REST API).', 'dejoiy-support-center' ); ?></p>
	<form method="post" action="options.php">
		<?php settings_fields( 'dejoiy_sc_settings' ); ?>
		<table class="form-table" role="presentation">
			<tr>
				<th scope="row"><label for="dejoiy_sc_zammad_url"><?php esc_html_e( 'Desk URL', 'dejoiy-support-center' ); ?></label></th>
				<td><input name="dejoiy_sc_zammad_url" id="dejoiy_sc_zammad_url" type="url" class="regular-text" value="<?php echo esc_attr( get_option( 'dejoiy_sc_zammad_url', '' ) ); ?>" placeholder="https://desk.dejoiy.internal" /></td>
			</tr>
			<tr>
				<th scope="row"><label for="dejoiy_sc_zammad_token"><?php esc_html_e( 'API Token', 'dejoiy-support-center' ); ?></label></th>
				<td><input name="dejoiy_sc_zammad_token" id="dejoiy_sc_zammad_token" type="password" class="regular-text" value="<?php echo esc_attr( get_option( 'dejoiy_sc_zammad_token', '' ) ); ?>" autocomplete="off" />
				<p class="description"><?php esc_html_e( 'Create a token under Profile → Token Access (agent with ticket permissions).', 'dejoiy-support-center' ); ?></p></td>
			</tr>
			<tr>
				<th scope="row"><label for="dejoiy_sc_ticket_group"><?php esc_html_e( 'Customer ticket group', 'dejoiy-support-center' ); ?></label></th>
				<td><input name="dejoiy_sc_ticket_group" id="dejoiy_sc_ticket_group" type="text" class="regular-text" value="<?php echo esc_attr( get_option( 'dejoiy_sc_ticket_group', 'Users' ) ); ?>" /></td>
			</tr>
			<tr>
				<th scope="row"><label for="dejoiy_sc_seller_ticket_group"><?php esc_html_e( 'Seller ticket group', 'dejoiy-support-center' ); ?></label></th>
				<td><input name="dejoiy_sc_seller_ticket_group" id="dejoiy_sc_seller_ticket_group" type="text" class="regular-text" value="<?php echo esc_attr( get_option( 'dejoiy_sc_seller_ticket_group', 'Users' ) ); ?>" /></td>
			</tr>
			<tr>
				<th scope="row"><label for="dejoiy_sc_portal_slug"><?php esc_html_e( 'Portal slug', 'dejoiy-support-center' ); ?></label></th>
				<td><input name="dejoiy_sc_portal_slug" id="dejoiy_sc_portal_slug" type="text" class="regular-text" value="<?php echo esc_attr( get_option( 'dejoiy_sc_portal_slug', 'support' ) ); ?>" />
				<p class="description"><?php esc_html_e( 'URL: yoursite.com/support — re-save permalinks after change.', 'dejoiy-support-center' ); ?></p></td>
			</tr>
			<tr>
				<th scope="row"><label for="dejoiy_sc_portal_url"><?php esc_html_e( 'Custom portal URL (optional)', 'dejoiy-support-center' ); ?></label></th>
				<td><input name="dejoiy_sc_portal_url" id="dejoiy_sc_portal_url" type="url" class="regular-text" value="<?php echo esc_attr( get_option( 'dejoiy_sc_portal_url', '' ) ); ?>" placeholder="https://support.dejoiy.com" /></td>
			</tr>
			<tr>
				<th scope="row"><label for="dejoiy_sc_kb_id"><?php esc_html_e( 'Knowledge Base ID', 'dejoiy-support-center' ); ?></label></th>
				<td><input name="dejoiy_sc_kb_id" id="dejoiy_sc_kb_id" type="number" class="small-text" value="<?php echo esc_attr( get_option( 'dejoiy_sc_kb_id', '' ) ); ?>" />
				<p class="description"><?php esc_html_e( 'Optional Zammad KB ID for JOI search sync.', 'dejoiy-support-center' ); ?></p></td>
			</tr>
			<tr>
				<th scope="row"><label for="dejoiy_sc_kb_locale"><?php esc_html_e( 'KB locale', 'dejoiy-support-center' ); ?></label></th>
				<td><input name="dejoiy_sc_kb_locale" id="dejoiy_sc_kb_locale" type="text" class="regular-text" value="<?php echo esc_attr( get_option( 'dejoiy_sc_kb_locale', 'en-us' ) ); ?>" /></td>
			</tr>
		</table>
		<?php submit_button(); ?>
	</form>
	<hr>
	<h2><?php esc_html_e( 'Usage', 'dejoiy-support-center' ); ?></h2>
	<ul>
		<li><?php esc_html_e( 'Shortcode: [dejoiy_support_portal]', 'dejoiy-support-center' ); ?></li>
		<li><?php esc_html_e( 'Seller mode: [dejoiy_support_portal mode="seller"]', 'dejoiy-support-center' ); ?></li>
		<li><?php esc_html_e( 'WooCommerce My Account → Support Center (automatic)', 'dejoiy-support-center' ); ?></li>
	</ul>
</div>
