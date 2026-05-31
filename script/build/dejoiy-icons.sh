#!/usr/bin/env bash
# Generate favicon.ico and apple-touch-icon.png from public/favicon.svg
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SVG="${ROOT}/public/favicon.svg"
ICO="${ROOT}/public/favicon.ico"
PNG="${ROOT}/public/apple-touch-icon.png"

if [[ ! -f "$SVG" ]]; then
  echo "Missing $SVG" >&2
  exit 1
fi

if ! command -v convert >/dev/null 2>&1; then
  echo "ImageMagick (convert) required to build favicon.ico" >&2
  exit 1
fi

echo "Building DEJOIY favicon.ico and apple-touch-icon.png..."
convert -background none "$SVG" -define icon:auto-resize=64,48,32,16 "$ICO"
convert -background none "$SVG" -resize 180x180 "$PNG"
echo "Wrote $ICO and $PNG"
