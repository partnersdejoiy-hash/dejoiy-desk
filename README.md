# DEJOIY Internal Tools

DEJOIY Internal Tools is your team’s unified workspace for support, operations, and customer communication. It brings tickets, channels (email, chat, phone, messaging), knowledge base, and automation into one branded experience built for DEJOIY—not a third-party SaaS shell.

## What you get

- **Omnichannel inbox** — Email, chat, telephone, WhatsApp, and social integrations in one queue
- **Collaboration** — Shared tickets, mentions, checklists, and real-time updates
- **Knowledge base** — Internal and customer-facing articles
- **Automation** — Triggers, macros, SLAs, and core workflows
- **Modern UI** — Vue 3 desktop and mobile apps with DEJOIY visual identity (violet gradient brand, dark sidebar, polished public pages)

## Architecture

```text
Legacy CoffeeScript UI ──→ REST ──→ Rails ──→ PostgreSQL
                                         ↑
Vue 3 (desktop / mobile) ──→ GraphQL ───┘
```

Redis powers ActionCable / GraphQL subscriptions. New work targets the Vue 3 + GraphQL stack.

## Privacy & vendor isolation

By default, **no data is sent to upstream vendor infrastructure** (geo lookup, image CDN, hosted AI). External legacy services only run when explicitly enabled:

```bash
export DEJOIY_ENABLE_VENDOR_SERVICES=true   # geo/image vendor APIs (off by default)
export DEJOIY_AI_API_URL=https://your-ai-gateway
export DEJOIY_AI_TOKEN=your-token
```

## Development

### Backend

```bash
RAILS_ENV=test VITE_TEST_MODE=1 bundle exec rspec spec/path/to/file_spec.rb
bundle exec rubocop --autocorrect app/path/to/file.rb
```

### Frontend

Use **pnpm** for all frontend commands:

```bash
pnpm test app/frontend/path/to/file.spec.ts
pnpm lint
pnpm generate-graphql-api
pnpm generate-setting-types
pnpm dev
```

See `.dev/ai-agent-instructions.md` (via `AGENTS.md`) for patterns and agent reference docs.

## Branding

Product name, logo, and colors are configured under **Settings → Branding**. Defaults use **DEJOIY Internal Tools** and the DEJOIY gradient identity.

## License

This codebase is derived from open-source helpdesk software (AGPLv3). See `LICENSE` for terms. DEJOIY-specific branding and configuration are for internal use by DEJOIY and partners.
