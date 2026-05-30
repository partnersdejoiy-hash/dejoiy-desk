=== DEJOIY Support Center ===
Contributors: dejoiy
Tags: support, zammad, woocommerce, wcfm, helpdesk
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 8.1
Stable tag: 1.0.0
License: GPLv2 or later

Premium DEJOIY customer & seller support portal powered by Zammad REST API.

== Description ==

* Full ticket lifecycle via Zammad API (not embedded forms)
* WooCommerce order/product/seller context on tickets
* WCFM seller support area
* JOI assistant with Help Center search before ticket creation
* Real-time notification polling
* Admin search by Order ID, Seller ID, Customer ID

== Installation ==

1. Upload `dejoiy-support-center` to `/wp-content/plugins/`
2. Activate the plugin
3. Settings → DEJOIY Support — enter Desk URL and API token
4. Settings → Permalinks → Save (enables /support URL)
5. Optional: point support.dejoiy.com to a page with `[dejoiy_support_portal]`

== Configuration ==

Create an API token in DEJOIY Internal Tools (admin Profile → Token Access).
Use a group name that exists in your desk (default: Users).

== Shortcodes ==

* `[dejoiy_support_portal]` — Customer support center
* `[dejoiy_support_portal mode="seller"]` — WCFM vendor support
