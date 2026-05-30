# DEJOIY WordPress Integrations

## DEJOIY Support Center

Path: `integrations/wordpress/dejoiy-support-center/`

Premium marketplace support portal that talks to **DEJOIY Internal Tools** (Zammad REST API) — not an embedded form.

### Features

| Feature | Implementation |
|--------|----------------|
| Customer tickets | `POST /api/v1/tickets` via server-side proxy |
| Ticket list & replies | `POST /api/v1/tickets/search`, `POST /api/v1/ticket_articles` |
| WooCommerce orders | Order/product/seller metadata in ticket body + tags |
| WCFM sellers | `[dejoiy_support_portal mode="seller"]` + vendor endpoint |
| JOI assistant | Local + optional Zammad KB search, ticket prefill |
| Help Center | Built-in categories (Orders, Shipping, Returns, …) |
| Security | WP login required; tickets scoped to Zammad `customer_id` |
| Admin search | REST `/dejoiy-support/v1/admin/search` |
| Notifications | DB-backed queue + 30s polling |

### Install on Hostinger / WordPress

```bash
cd /path/to/wordpress/wp-content/plugins
cp -r /path/to/dejoiy-desk/integrations/wordpress/dejoiy-support-center .
```

1. **Activate** plugin in WP Admin  
2. **Settings → DEJOIY Support**  
   - Desk URL: `https://desk.dejoiy.internal` (or your server URL)  
   - API Token: agent/integration token with ticket permissions  
3. **Settings → Permalinks → Save**  
4. Visit `https://dejoiy.com/support/` or add shortcode to a page  

### Subdomain `support.dejoiy.com`

Create a WP page titled “Support”, add shortcode:

```
[dejoiy_support_portal]
```

Point DNS to the same WordPress install (or multisite). Optionally set **Custom portal URL** in plugin settings.

### Zammad setup checklist

1. Create group **Users** (or match plugin setting)  
2. Ensure **Customer** role exists for auto-provisioned users  
3. Optional: create Object Manager attributes (`dejoiy_order_id`, etc.) and map in code via `dejoiy_sc_attribute_map` filter  
4. Optional: Knowledge Base ID for JOI remote search  

### Tag convention (admin search)

| Tag | Meaning |
|-----|---------|
| `dejoiy` | Portal origin |
| `customer-wp-{id}` | WordPress user ID |
| `order-{id}` | WooCommerce order |
| `product-{id}` | Product |
| `seller-{id}` | WCFM vendor |
| `seller-support` | Seller-raised ticket |

### WooCommerce

Adds **Support Center** under My Account (after Orders).

### WCFM

Registers vendor menu item **DEJOIY Support** → seller portal mode.

### Development

REST namespace: `dejoiy-support/v1`  
All routes require logged-in WP user except public KB index.

Filters:

- `dejoiy_sc_ticket_context` — enrich ticket metadata  
- `dejoiy_sc_help_categories` — customize Help Center  
- `dejoiy_sc_customer_categories` / `dejoiy_sc_seller_categories`  
