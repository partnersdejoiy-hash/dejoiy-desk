<?php
/**
 * Support portal shell (loaded via shortcode).
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

$brand = Dejoiy_SC_Branding::get_config();
?>
<div id="dejoiy-support-app" class="dejoiy-sc-app" data-mode="<?php echo esc_attr( Dejoiy_SC_Portal::get_current_mode() ); ?>">
	<div class="dejoiy-sc-aurora" aria-hidden="true"></div>
	<header class="dejoiy-sc-header glass">
		<div class="dejoiy-sc-brand">
			<?php if ( ! empty( $brand['logoUrl'] ) ) : ?>
				<img src="<?php echo esc_url( $brand['logoUrl'] ); ?>" alt="<?php echo esc_attr( $brand['name'] ); ?>" class="dejoiy-sc-logo" />
			<?php else : ?>
				<span class="dejoiy-sc-logo-mark"></span>
			<?php endif; ?>
			<div>
				<h1 class="dejoiy-sc-title"><?php echo esc_html( $brand['name'] ); ?> <?php esc_html_e( 'Support Center', 'dejoiy-support-center' ); ?></h1>
				<p class="dejoiy-sc-tagline"><?php echo esc_html( $brand['tagline'] ); ?></p>
			</div>
		</div>
		<nav class="dejoiy-sc-nav" role="tablist">
			<button type="button" class="dejoiy-sc-nav-btn is-active" data-view="dashboard"><?php esc_html_e( 'Dashboard', 'dejoiy-support-center' ); ?></button>
			<button type="button" class="dejoiy-sc-nav-btn" data-view="joi"><?php esc_html_e( 'JOI Assistant', 'dejoiy-support-center' ); ?></button>
			<button type="button" class="dejoiy-sc-nav-btn" data-view="help"><?php esc_html_e( 'Help Center', 'dejoiy-support-center' ); ?></button>
			<button type="button" class="dejoiy-sc-nav-btn" data-view="create"><?php esc_html_e( 'Raise a Ticket', 'dejoiy-support-center' ); ?></button>
		</nav>
		<div class="dejoiy-sc-notifications" id="dejoiy-sc-notifications" aria-live="polite"></div>
	</header>
	<main class="dejoiy-sc-main">
		<section id="dejoiy-view-dashboard" class="dejoiy-sc-view is-active"></section>
		<section id="dejoiy-view-joi" class="dejoiy-sc-view"></section>
		<section id="dejoiy-view-help" class="dejoiy-sc-view"></section>
		<section id="dejoiy-view-create" class="dejoiy-sc-view"></section>
		<section id="dejoiy-view-ticket" class="dejoiy-sc-view"></section>
	</main>
</div>
