#!/usr/bin/env bash
# Run after docker compose up when HTTPS terminates on host Caddy/nginx and proxies to :8081.
# Fixes "CSRF token verification failed" by preserving X-Forwarded-Proto=https to Rails.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$DEPLOY_DIR"

NGINX_CFG=/etc/nginx/sites-enabled/default

docker compose exec -T dejoiy-nginx sed -i \
  's/proxy_set_header X-Forwarded-Proto $scheme;/proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;/g' \
  "$NGINX_CFG"

# Re-resolve Docker service names after container restarts (avoids 502 stale upstream IP).
docker compose exec -T dejoiy-nginx grep -q '127.0.0.11' "$NGINX_CFG" || \
  docker compose exec -T dejoiy-nginx sed -i \
    '/server_name _;/a\  resolver 127.0.0.11 valid=10s ipv6=off;' \
    "$NGINX_CFG"

docker compose exec -T dejoiy-nginx nginx -s reload
echo "Patched nginx for HTTPS reverse proxy and Docker DNS."
