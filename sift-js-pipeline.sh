#!/usr/bin/env bash
#
# sift-js-pipeline.sh — one command that runs the whole JS-recon chain, synced
# through a single project folder.
#
#   discovery (gau/waybackurls/getJS/katana/hakrawler)
#     -> merge + fetch bodies      (sift-merge-fetch.sh)
#     -> analyze (linkfinder/secretfinder/sourcemapper/domxss/trufflehog)
#                                   (sift-analyze-js.sh)
#     -> graphql extraction        (sift-graphql.sh)
#     -> validate endpoints live   (ffuf)
#     -> diff source tree vs last run (sift-diff-sourcemaps.sh)
#
# Every step reads/writes ONE project folder, so the whole thing stays in sync.
#
# Usage:
#   ./sift-js-pipeline.sh <PROJECT_DIR> <HOST> [DELAY_SECONDS]
#     PROJECT_DIR    e.g. projects/first_test
#     HOST           e.g. www.loom.com
#     DELAY_SECONDS  download politeness delay (default 0.2)
#
# AUTHORIZED TARGETS ONLY. Discovery + ffuf + trufflehog send live traffic.
set -uo pipefail   # not -e: a missing tool or empty step must not kill the run

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

PROJECT="${1:-}"
HOST="${2:-}"
DELAY="${3:-0.2}"

if [ -z "$PROJECT" ] || [ -z "$HOST" ]; then
  echo "Usage: $0 <PROJECT_DIR> <HOST> [DELAY_SECONDS]"
  echo "  e.g. $0 projects/first_test www.loom.com"
  exit 1
fi
mkdir -p "$PROJECT"

echo "=================================================================="
echo " sift JS-recon pipeline"
echo "   project : $PROJECT"
echo "   host    : $HOST"
echo "=================================================================="

# --- scope gate (same speed-bump sift uses) -------------------------------
read -r -p "Type the host back to confirm you are AUTHORIZED: " typed
if [ "$typed" != "$HOST" ]; then
  echo "Host mismatch (\"$typed\" != \"$HOST\"). Aborting — scope not confirmed."
  exit 1
fi
echo "Scope confirmed."
echo

have() { command -v "$1" >/dev/null 2>&1; }
run()  { echo "  \$ $*"; "$@"; }

# --- Step 1: discovery -> URL lists in $PROJECT ---------------------------
echo "### Step 1/6  discovery -------------------------------------------"
if have gau;         then run bash -c "gau '$HOST' --subs --threads 5 | grep -Ei '\.js(\$|\?)' | tee '$PROJECT/gau_js_${HOST}.log'"; else echo "  skip gau (not installed)"; fi
if have waybackurls; then run bash -c "waybackurls '$HOST' | grep -Ei '\.js(\$|\?)' | tee '$PROJECT/waybackurls_js_${HOST}.log'"; else echo "  skip waybackurls"; fi
if have getJS;       then run bash -c "getJS --url 'https://$HOST/' --complete | tee '$PROJECT/getjs_${HOST}.txt'"; else echo "  skip getJS"; fi
if have katana;      then run katana -u "https://$HOST/" -jc -d 3 -kf all -rl 5 -o "$PROJECT/katana_${HOST}.txt"; else echo "  skip katana"; fi
if have hakrawler;   then run bash -c "hakrawler -url 'https://$HOST/' | tee '$PROJECT/hakrawler_${HOST}.log'"; else echo "  skip hakrawler"; fi
echo

# --- Step 2: merge + fetch bodies -----------------------------------------
echo "### Step 2/6  merge + fetch ---------------------------------------"
run "$HERE/sift-merge-fetch.sh" "$PROJECT" "$DELAY"
echo

# --- Step 3: analyze the folder -------------------------------------------
echo "### Step 3/6  analyze ---------------------------------------------"
run "$HERE/sift-analyze-js.sh" "$PROJECT"
echo

# --- Step 4: graphql -------------------------------------------------------
echo "### Step 4/6  graphql ---------------------------------------------"
run "$HERE/sift-graphql.sh" "$PROJECT"
echo

# --- Step 5: validate endpoints live --------------------------------------
echo "### Step 5/6  endpoint validation (ffuf) --------------------------"
if have ffuf && [ -s "$PROJECT/endpoints_all.txt" ]; then
  run ffuf -w "$PROJECT/endpoints_all.txt" -u "https://$HOST/FUZZ" \
       -mc all -fc 404 -rate 5 -o "$PROJECT/endpointffuf.json" -of json
else
  echo "  skip ffuf (not installed, or endpoints_all.txt empty)"
fi
echo

# --- Step 6: diff source tree vs previous run ------------------------------
echo "### Step 6/6  source-map diff -------------------------------------"
run "$HERE/sift-diff-sourcemaps.sh" "$PROJECT"
echo

echo "=================================================================="
echo " Pipeline complete. Key artifacts in $PROJECT/ :"
echo "   js_files/            downloaded JS bodies"
echo "   endpoints_all.txt    extracted routes    | endpointffuf.json  live routes"
echo "   secrets_all.txt      secret candidates   | trufflehog.json    verified secrets"
echo "   domxss_both.txt      DOM-XSS candidates  | sourcemap_restored/ original source"
echo "   gql_*.txt            GraphQL details     | sourcemap_diff_*.txt changes over time"
echo "=================================================================="
