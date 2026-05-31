# Email delivery (password reset & verification links)

Password reset, signup verification, and notification emails are sent through an **Email::Notification** channel — not through WordPress or the support portal plugin.

In Docker, the default **Local MTA (sendmail)** adapter usually **does not deliver mail to real inboxes**. You must configure **SMTP**.

## Quick checklist

| Check | Where |
|--------|--------|
| **SMTP notification channel** active | Admin → Channels → Email → **Notification** |
| Adapter = **SMTP** (not Local MTA / sendmail) | Same screen |
| **FQDN** matches the URL users open | Admin → Settings → System → **FQDN** (e.g. `178.104.228.157:8081` or `desk.dejoiy.com`) |
| **HTTP type** matches (http vs https) | Same area, or `deploy/.env` → `ZAMMAD_HTTP_TYPE` |
| **Lost password** enabled | Admin → Settings → Security → **Lost Password** |
| **New user accounts** (if using signup verify) | Admin → Settings → Security → **New User Accounts** |
| **Import mode** off | Admin → Settings → System → Import → **Import mode** = no |
| User has a valid **email** on their profile | Admin → Users |
| Check spam / junk folder | Mailbox |

## Configure SMTP (recommended)

1. Sign in as **admin**.
2. Go to **Channels** → **Email** (or complete **Guided Setup** → Email notification step).
3. For **Notification** outbound:
   - Adapter: **SMTP**
   - Host: your provider (e.g. `smtp.hostinger.com`, `smtp.sendgrid.net`, `smtp.gmail.com`)
   - Port: `587` (STARTTLS) or `465` (SSL)
   - User / password: SMTP credentials
   - SSL/TLS: as required by provider
4. Use **Test configuration** / verify if the UI offers it.
5. Set **Notification sender** (e.g. `Service Desk for DEJOIY <noreply@yourdomain.com>`).

### Hostinger example

Use the SMTP details from **hPanel → Emails → your mailbox → Configuration**. Typical:

- Host: `smtp.hostinger.com`
- Port: `587`
- Authentication: plain or login
- From address must be allowed by Hostinger (same domain mailbox).

## Diagnose on the server

From `deploy/` on the server:

```bash
chmod +x scripts/diagnose-email.sh
./scripts/diagnose-email.sh
```

Optional test message to your inbox:

```bash
./scripts/diagnose-email.sh --send test@yourdomain.com
```

Inside the Rails container manually:

```bash
docker compose exec dejoiy-railsserver bundle exec rake dejoiy:email:diagnose
docker compose exec dejoiy-railsserver bundle exec rake dejoiy:email:test SEND_TO=you@example.com
```

## Common failures

### “Can't find an active Email::Notification channel”

No outbound notification channel is enabled. Configure SMTP as above.

### Sendmail active but no mail arrives

Docker images rarely have a working MTA. Switch notification channel to **SMTP**.

### Links in email point to wrong host

Update **FQDN** and **http_type** to match how users access the desk (including port, e.g. `178.104.228.157:8081`). Restart is not always required; new emails use updated settings.

### Password reset “works” but no email

The API always returns success (to avoid account enumeration). Check:

- `docker compose logs dejoiy-railsserver | grep -i notification`
- Admin → **Monitoring** (failed email / channel errors)

### Signup verification

Requires **user_create_account** enabled and SMTP configured. Admins can verify users manually: Admin → Users → set **Verified**.

## Developer mode (internal labs only)

**Settings → Developer mode** allows password reset without email — **not for production**.
