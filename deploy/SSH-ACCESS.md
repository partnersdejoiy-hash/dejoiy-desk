# Let the Cloud Agent deploy on your portal server

This Cursor Cloud Agent runs in an isolated VM. It **cannot** SSH into your portal until you provide connection details as **secrets** (never paste passwords in chat).

## Option A — You run one command (fastest, recommended)

SSH into your portal yourself, then:

```bash
git clone https://github.com/partnersdejoiy-hash/dejoiy-desk.git
cd dejoiy-desk
git checkout cursor/dejoiy-complete-rebrand-35c2   # or main after merge

chmod +x deploy/scripts/*.sh
./deploy/scripts/full-deploy.sh \
  --fqdn YOUR.PORTAL.DOMAIN \
  --yes \
  --purge-old-zammad    # only if you backed up old Zammad and want volumes deleted
```

Then point your existing portal nginx/Caddy at `127.0.0.1:8080` (`deploy/nginx-portal.example.conf`).

## Option B — Agent SSH (Cursor secrets)

1. In **Cursor → Cloud Agent → Secrets** (or your team’s secret store), add:

   | Secret | Example |
   |--------|---------|
   | `DEJOIY_DEPLOY_HOST` | Server **public IP** (required) |
   | `DEJOIY_DEPLOY_USER` | `root` |
   | `DEJOIY_DEPLOY_FQDN` | `desk.dejoiy.internal` (required) |
   | `DEJOIY_DEPLOY_PASSWORD` | Root SSH password **OR** use key below |
   | `DEJOIY_DEPLOY_SSH_KEY` | Full private key (only if not using password) |

   Secret **names must match exactly** (not `host` or `password` — use the names above).

2. Optional: `DEJOIY_PURGE_OLD_ZAMMAD` = `true` to delete old Zammad volumes  
3. Re-run the agent task: *“Deploy DEJOIY using SSH secrets”*

The agent will use `deploy/scripts/agent-ssh-deploy.sh` (reads those env vars only).

**Security**

- Use a dedicated deploy user with `docker` group, not root.  
- Restrict SSH key to that host in `~/.ssh/authorized_keys`.  
- Rotate the key after deployment.

## Option C — Cursor Remote SSH workspace

Open the portal server as your **SSH Remote** workspace in Cursor Desktop, then start a Cloud Agent from that workspace. The agent’s shell is already on your server.

## What gets deployed

- **Removes** legacy Zammad containers (optional volume purge)  
- **Builds** DEJOIY from this repo (no vendor Docker image)  
- **Stores data** only in `dejoiy-*` volumes  
- **Blocks** vendor geo/image/AI phone-home by default  

## After deploy

1. Browse `https://YOUR.PORTAL.DOMAIN/`  
2. Complete setup wizard → admin user  
3. Admin → Branding → **DEJOIY Internal Tools**
