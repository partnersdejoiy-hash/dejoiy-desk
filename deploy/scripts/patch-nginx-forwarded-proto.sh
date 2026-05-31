#!/usr/bin/env bash
# Run after docker compose up when HTTPS terminates on host Caddy/nginx and proxies to :8081.
# Fixes "CSRF token verification failed" by preserving X-Forwarded-Proto=https to Rails.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$DEPLOY_DIR"

docker compose exec -T dejoiy-nginx sed -i \
  's/proxy_set_header X-Forwarded-Proto $scheme;/proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;/g' \
  /etc/nginx/sites-enabled/default

docker compose exec -T dejoiy-nginx nginx -s reload
echo "Patched nginx X-Forwarded-Proto for HTTPS reverse proxy."
