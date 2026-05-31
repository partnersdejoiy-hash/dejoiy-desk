#!/usr/bin/env bash
# Hot-sync DEJOIY favicons + legacy brand CSS into running containers (no full rebuild).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DEPLOY_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$DEPLOY_DIR"

if [[ -x "$REPO_ROOT/script/build/dejoiy-icons.sh" ]]; then
  "$REPO_ROOT/script/build/dejoiy-icons.sh" || true
fi

for rel in \
  public/favicon.svg \
  public/favicon.ico \
  public/apple-touch-icon.png \
  public/assets/styles/dejoiy-legacy-brand.css \
  public/assets/images/icons/logo.svg; do
  src="$REPO_ROOT/$rel"
  [[ -f "$src" ]] || continue
  for svc in dejoiy-nginx dejoiy-railsserver; do
    cid=$(docker compose ps -q "$svc" 2>/dev/null || true)
    [[ -n "$cid" ]] || continue
  dest="/opt/zammad/${rel}"
  dest_dir="$(dirname "$dest")"
  docker exec "$cid" mkdir -p "$dest_dir" 2>/dev/null || true
  docker cp "$src" "${cid}:${dest}"
  echo "Synced $rel -> $svc"
  done
done

docker compose exec -T dejoiy-railsserver bundle exec rake dejoiy:branding:sync 2>&1 | tail -5
echo "Done. Hard-refresh the browser (Ctrl+Shift+R)."
