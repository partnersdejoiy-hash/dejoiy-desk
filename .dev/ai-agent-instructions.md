# AI Agent Instructions

This file provides guidance on how to work with code in the **Service Desk for DEJOIY** repository (fork of a Rails helpdesk platform).

## Project Overview

Service Desk for DEJOIY is DEJOIY’s internal support and operations platform. The backend is **Ruby on Rails**.
There are two frontend stacks: the **legacy frontend** is CoffeeScript (Rails asset pipeline), and the **current production frontend** is **Vue 3 + TypeScript** via **Vite** (pnpm). **PostgreSQL**, **Redis**, and **GraphQL** connect the Vue apps to the backend.

## Architecture

```text
CoffeeScript frontend ──→ REST controllers ──→ Rails backend ──→ PostgreSQL
                                                    ↑
Vue 3 frontend (desktop/mobile) ──→ GraphQL API ────┘
```

New features target the Vue 3 + GraphQL stack.

## Branding

- Product name: **Service Desk for DEJOIY** (brand: **DEJOIY**)
- User-facing URLs: `https://dejoiy.com` (not vendor domains)
- Design tokens: `app/frontend/apps/desktop/styles/dejoiy-brand.css`, `tokens.css`
- Shared constants: `app/frontend/shared/constants/branding.ts`
- Do **not** reintroduce vendor branding or phone-home URLs in user-facing or default config paths

## Key Directories

- `app/services/service/` — Service objects
- `app/graphql/gql/` — GraphQL schema
- `app/frontend/apps/desktop/` — Vue 3 desktop app
- `app/frontend/apps/mobile/` — Vue 3 mobile app
- `app/frontend/shared/` — Shared components, stores, GraphQL
- `lib/dejoiy/` — DEJOIY-specific utilities (e.g. external service policy)
- `app/assets/javascripts/` — Legacy CoffeeScript UI

## General Guidelines

- New files: use copyright `Copyright (C) 2024-2026 Dejoiy` where applicable
- Do not edit `i18n/*.po` directly — translations are managed externally
- Keep `DEJOIY_ENABLE_VENDOR_SERVICES` off unless explicitly required

## Essential Commands

### Backend

```bash
RAILS_ENV=test VITE_TEST_MODE=1 bundle exec rspec spec/path/to/file_spec.rb
bundle exec rubocop --autocorrect app/path/to/file.rb
```

### Frontend

```bash
pnpm test app/frontend/path/to/file.spec.ts
pnpm lint
pnpm generate-graphql-api
pnpm generate-setting-types
```

## Agent Reference Docs

Read when working in that area:

- `.dev/agent_docs/graphql_patterns.md`
- `.dev/agent_docs/frontend_patterns.md`
- `.dev/agent_docs/testing.md`
- `.dev/agent_docs/service_patterns.md`
- `.dev/agent_docs/database_migrations.md`
