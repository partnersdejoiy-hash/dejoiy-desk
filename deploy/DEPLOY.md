# Deploy DEJOIY as a private internal tool

You **do not need a new SaaS product**. This repository **is** your internal helpdesk / operations platform (tickets, email, chat, KB, automation), rebranded and hardened for DEJOIY. Run it **on your own server** so **no Zammad GmbH or other vendor** receives your data.

## What “private” means here

| Topic | DEJOIY private deploy |
|--------|------------------------|
| **Ticket & customer data** | Stored in **your** PostgreSQL + `dejoiy-storage` volume only |
| **Vendor geo / images** | **Off** by default (`DEJOIY_ENABLE_VENDOR_SERVICES=false`) |
| **Vendor AI cloud** | **Off** unless you set `DEJOIY_AI_API_URL` to **your** gateway |
| **Docker image** | Built **from this repo** — not `ghcr.io/zammad/zammad` |
| **Volumes** | `dejoiy-*` — separate from any old `zammad-*` volumes |

## 1. Remove old Zammad from your portal server

On the machine where the portal currently runs Zammad:

```bash
cd /path/to/dejoiy-desk   # this repository
chmod +x deploy/scripts/*.sh

# Interactive — backs up nothing automatically; read warnings
./deploy/scripts/uninstall-legacy-zammad.sh

# After you backed up old data and want volumes gone:
./deploy/scripts/uninstall-legacy-zammad.sh --yes --purge-volumes
```

Also update your **reverse proxy** (nginx/Caddy/Traefik) to stop pointing at the old upstream port until DEJOIY is ready.

### Migrating data from old Zammad (optional)

If you need old tickets:

1. `pg_dump` from the old `zammad_production` database  
2. Copy old `storage` volume files  
3. Restore into `dejoiy_production` / `dejoiy-storage` **only** if you understand Rails migrations — for many teams a **fresh DEJOIY install** is simpler.

## 2. Install DEJOIY

Requirements: Docker 24+, Compose v2, **≥ 4 GB RAM**, 20+ GB disk.

```bash
cp deploy/.env.example deploy/.env
nano deploy/.env   # set ZAMMAD_FQDN, POSTGRES_PASS, ZAMMAD_HTTP_TYPE

./deploy/scripts/install-dejoiy.sh
```

Open `http://SERVER_IP:8080` (or your proxy URL), complete setup wizard, create admin user.

## 3. Put it on your portal (HTTPS)

Example **nginx** snippet (replace domain and upstream):

```nginx
server {
  listen 443 ssl http2;
  server_name desk.dejoiy.com;

  # ssl_certificate ...

  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

Set in `deploy/.env`:

```bash
ZAMMAD_HTTP_TYPE=https
ZAMMAD_FQDN=desk.dejoiy.com
RAILS_TRUSTED_PROXIES=127.0.0.1,::1,10.0.0.0/8
```

## 4. Hardening checklist

- [ ] Strong `POSTGRES_PASS` in `.env`  
- [ ] `DEJOIY_ENABLE_VENDOR_SERVICES=false` (default)  
- [ ] Do not expose PostgreSQL/Redis/Elasticsearch ports publicly  
- [ ] Firewall: only 443 (proxy) from internet  
- [ ] Regular backups: `dejoiy-postgresql-data` + `dejoiy-storage` volumes  
- [ ] Admin → Branding: product name **DEJOIY Internal Tools**

## 5. Email (password reset & verification links)

Outbound mail uses an **Email::Notification** channel. Docker does **not** deliver real mail via sendmail/Local MTA.

1. Admin → **Channels** → **Email** → **Notification** → configure **SMTP** (Hostinger, etc.).
2. Set **FQDN** / **http_type** to match your public URL (include port if needed, e.g. `178.104.228.157:8081`).
3. Run `./deploy/scripts/diagnose-email.sh` on the server.

Full guide: [deploy/EMAIL.md](EMAIL.md).

## 6. Do you need a “similar SaaS”?

| Option | When to use |
|--------|-------------|
| **This repo, private deploy** ✅ | Internal DEJOIY team — **recommended** |
| Zammad / Zendesk cloud | You said no — data leaves your control |
| Build new SaaS from scratch | Only if you want to **sell** multi-tenant software to **external customers** — months of work; not required for internal tools |

## Operations

```bash
cd deploy
docker compose logs -f dejoiy-nginx
docker compose restart dejoiy-railsserver
docker compose pull   # only after you publish your own image registry
```

## Support

Internal runbooks: see `README.md` and `.dev/ai-agent-instructions.md`.
