#!/usr/bin/env bash
#
# sift-merge-fetch.sh — the glue between DISCOVERY and ANALYSIS.
#
# The discovery tools (gau, waybackurls, getJS, katana, hakrawler) each write a
# LIST OF .js URLs into the project folder. The analysis tools (linkfinder,
# secretfinder, trufflehog, domxss) need the .js FILES on disk. This script
# bridges the two: it merges every discovered URL into one deduped list, then
# downloads each body into <project>/js_files/.
#
# Usage:
#   ./sift-merge-fetch.sh [PROJECT_DIR] [DELAY_SECONDS]
#     PROJECT_DIR    folder holding the discovery outputs (default: current dir)
#     DELAY_SECONDS  pause between downloads, be polite (default: 0.2)
#
# Outputs (into PROJECT_DIR):
#   js_urls.txt        deduped list of every discovered .js URL
#   js_files/          the downloaded .js bodies
#   js_files.map.tsv   url <TAB> local-file  (so you can trace a finding back)
#
# Passive-ish: merging touches nothing; downloading sends ONE GET per URL to the
# target/CDN. Only run against hosts you are authorized to test.
set -euo pipefail

PROJECT_DIR="${1:-.}"
DELAY="${2:-0.2}"

cd "$PROJECT_DIR"
mkdir -p js_files

URLS="js_urls.txt"
MAP="js_files.map.tsv"

echo "[*] Merging discovery outputs in $(pwd) ..."
# Grab .js URLs from every discovery artifact. We scan *all* .log/.txt so it
# works no matter which discovery tools you ran, then dedupe.
: > "$URLS"
shopt -s nullglob
found_any=0
for f in *.log *.txt; do
  # skip our own outputs
  case "$f" in js_urls.txt|"$MAP") continue;; esac
  found_any=1
  grep -Eio "https?://[^ \"'<>]+\.js([?#][^ \"'<>]*)?" "$f" 2>/dev/null || true
done | sort -u > "$URLS"
shopt -u nullglob

if [ "$found_any" -eq 0 ]; then
  echo "[!] No .log/.txt discovery files found in $(pwd)."
  echo "    Run the discovery phase first (gau/waybackurls/getJS/katana), or cd into the right project folder."
  exit 1
fi

COUNT=$(wc -l < "$URLS" | tr -d ' ')
echo "[*] $COUNT unique .js URL(s) -> $URLS"
if [ "$COUNT" -eq 0 ]; then
  echo "[!] Discovery files existed but held no .js URLs. Nothing to download."
  exit 0
fi

echo "[*] Downloading bodies into js_files/ (delay ${DELAY}s each) ..."
: > "$MAP"
i=0; ok=0; fail=0
while IFS= read -r url; do
  [ -z "$url" ] && continue
  i=$((i+1))
  # readable, collision-proof filename: sanitized host+path, truncated, + short hash
  base=$(printf '%s' "$url" | sed -E 's#^https?://##; s#[?#].*$##; s#[^A-Za-z0-9._-]#_#g' | cut -c1-90)
  hash=$(printf '%s' "$url" | md5sum | cut -c1-8)
  out="js_files/${base}_${hash}.js"
  if curl -fsSL --max-time 25 -A 'Mozilla/5.0 sift-recon' "$url" -o "$out" 2>/dev/null; then
    printf '%s\t%s\n' "$url" "$out" >> "$MAP"
    ok=$((ok+1))
    printf '\r    [%d/%d] ok:%d fail:%d' "$i" "$COUNT" "$ok" "$fail"
  else
    rm -f "$out"
    fail=$((fail+1))
    printf '\r    [%d/%d] ok:%d fail:%d' "$i" "$COUNT" "$ok" "$fail"
  fi
  sleep "$DELAY"
done < "$URLS"
echo

echo "[*] Done. $ok downloaded, $fail failed."
echo "    Files : $(pwd)/js_files/"
echo "    Map   : $(pwd)/$MAP"
echo "    Next  : ./sift-analyze-js.sh \"$(pwd)\""
