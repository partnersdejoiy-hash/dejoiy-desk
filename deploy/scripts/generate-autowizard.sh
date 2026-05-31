#!/usr/bin/env bash
# Build AUTOWIZARD_JSON (base64) for first-install automated setup.
# Reads DEJOIY_ADMIN_* from deploy/.env or the environment.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATE="${DEPLOY_DIR}/auto_wizard.dejoiy.json"
ENV_FILE="${DEPLOY_DIR}/.env"

if [[ -f "$ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  set -a
  source "$ENV_FILE"
  set +a
fi

LOGIN="${DEJOIY_ADMIN_LOGIN:-admin}"
EMAIL="${DEJOIY_ADMIN_EMAIL:-admin@dejoiy.internal}"
PASSWORD="${DEJOIY_ADMIN_PASSWORD:-}"
FIRSTNAME="${DEJOIY_ADMIN_FIRSTNAME:-DEJOIY}"
LASTNAME="${DEJOIY_ADMIN_LASTNAME:-Admin}"
ORG="${DEJOIY_ORGANIZATION:-DEJOIY}"
PRODUCT="${DEJOIY_PRODUCT_NAME:-Service Desk for DEJOIY}"

if [[ -z "$PASSWORD" ]]; then
  echo "Set DEJOIY_ADMIN_PASSWORD in deploy/.env (or export it), then re-run." >&2
  exit 1
fi

if [[ "$PASSWORD" == "CHANGE_ME_DEJOIY_ADMIN" ]] || [[ "$PASSWORD" == "CHANGE_ME_ON_FIRST_LOGIN" ]]; then
  echo "Replace the placeholder DEJOIY_ADMIN_PASSWORD in deploy/.env with a strong password." >&2
  exit 1
fi

if [[ ! -f "$TEMPLATE" ]]; then
  echo "Missing template: $TEMPLATE" >&2
  exit 1
fi

TMP_JSON="$(mktemp)"
trap 'rm -f "$TMP_JSON"' EXIT

export DEJOIY_JSON_LOGIN="$LOGIN"
export DEJOIY_JSON_EMAIL="$EMAIL"
export DEJOIY_JSON_PASSWORD="$PASSWORD"
export DEJOIY_JSON_FIRSTNAME="$FIRSTNAME"
export DEJOIY_JSON_LASTNAME="$LASTNAME"
export DEJOIY_JSON_ORG="$ORG"
export DEJOIY_JSON_PRODUCT="$PRODUCT"

python3 - "$TEMPLATE" "$TMP_JSON" <<'PY'
import json
import os
import sys

template_path, out_path = sys.argv[1], sys.argv[2]
with open(template_path, encoding="utf-8") as f:
    data = json.load(f)

user = data["Users"][0]
user["login"] = os.environ["DEJOIY_JSON_LOGIN"]
user["email"] = os.environ["DEJOIY_JSON_EMAIL"]
user["password"] = os.environ["DEJOIY_JSON_PASSWORD"]
user["firstname"] = os.environ["DEJOIY_JSON_FIRSTNAME"]
user["lastname"] = os.environ["DEJOIY_JSON_LASTNAME"]
user["organization"] = os.environ["DEJOIY_JSON_ORG"]

for org in data.get("Organizations", []):
    org["name"] = os.environ["DEJOIY_JSON_ORG"]

for setting in data.get("Settings", []):
    if setting.get("name") == "product_name":
        setting["value"] = os.environ["DEJOIY_JSON_PRODUCT"]

with open(out_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
    f.write("\n")
PY

B64="$(base64 -w0 < "$TMP_JSON" 2>/dev/null || base64 < "$TMP_JSON" | tr -d '\n')"

echo ""
echo "Generated auto-wizard payload for login: ${LOGIN} / ${EMAIL}"
echo "(AUTOWIZARD_JSON is not printed — it contains your password.)"
echo ""
echo "Add to deploy/.env:"
echo "AUTOWIZARD_RELATIVE_PATH=tmp/auto_wizard.json"
echo "AUTOWIZARD_JSON=<generated — written to .env when run from deploy/>"
echo ""
echo "Fresh install only: open the app URL → automated setup runs and signs you in."
echo "Existing database: use rake dejoiy:admin:ensure instead (see deploy/DEPLOY.md)."

if [[ -f "$ENV_FILE" ]] && command -v python3 >/dev/null; then
  python3 - "$ENV_FILE" "$B64" <<'PY'
import pathlib
import re
import sys

env_path, b64 = pathlib.Path(sys.argv[1]), sys.argv[2]
text = env_path.read_text(encoding="utf-8")
key = "AUTOWIZARD_JSON"
line = f'{key}={b64}'
if re.search(rf"^{re.escape(key)}=", text, flags=re.M):
    text = re.sub(rf"^{re.escape(key)}=.*$", line, text, flags=re.M)
else:
    text = text.rstrip() + "\n\n" + line + "\n"
env_path.write_text(text, encoding="utf-8")
print(f"Updated {env_path} with {key}.")
PY
fi
