#!/usr/bin/env bash
#
# sift-analyze-js.sh — run every content analyzer over a folder of .js files.
#
# Precondition: run ./sift-merge-fetch.sh first so PROJECT_DIR/js_files/ holds
# the downloaded bodies and PROJECT_DIR/js_urls.txt holds their URLs.
#
# It runs, in order:
#   1. linkfinder    -> endpoints_all.txt      (hidden routes/paths)
#   2. secretfinder  -> secrets_all.txt        (API keys / tokens)
#   3. sourcemapper  -> sourcemap_restored/    (rebuild ORIGINAL source from .map)
#   4. domxss grep   -> domxss_sinks/sources   (client-side source->sink candidates)
#   5. trufflehog    -> trufflehog.json        (verified secret scan)  [if installed]
#
# Usage:
#   ./sift-analyze-js.sh [PROJECT_DIR]
#     PROJECT_DIR   folder containing js_files/ and js_urls.txt (default: current dir)
#
# Static/local except: sourcemapper probes .map URLs, and trufflehog --results=verified
# sends auth probes to third-party APIs. Authorized targets only.
set -uo pipefail   # not -e: one analyzer failing shouldn't abort the rest

PROJECT_DIR="${1:-.}"
cd "$PROJECT_DIR"

JS_DIR="js_files"
URLS="js_urls.txt"

if [ ! -d "$JS_DIR" ] || ! ls "$JS_DIR"/*.js >/dev/null 2>&1; then
  echo "[!] No $JS_DIR/*.js in $(pwd). Run ./sift-merge-fetch.sh first."
  exit 1
fi
NFILES=$(ls "$JS_DIR"/*.js | wc -l | tr -d ' ')
echo "[*] Analyzing $NFILES JS file(s) in $(pwd)/$JS_DIR"
echo

# 1) LinkFinder — endpoints. NOTE: quote the glob so LinkFinder expands it,
#    not the shell (unquoted js_files/* would pass only the first file).
echo "[1/5] linkfinder -> endpoints_all.txt"
if command -v linkfinder >/dev/null; then
  linkfinder -i "$JS_DIR/*.js" -o cli 2>/dev/null | sort -u > endpoints_all.txt || true
  echo "      $(wc -l < endpoints_all.txt | tr -d ' ') endpoints"
else
  echo "      SKIP (linkfinder not on PATH)"
fi
echo

# 2) SecretFinder — API keys / tokens. It takes one input at a time, so loop.
echo "[2/5] secretfinder -> secrets_all.txt"
if command -v secretfinder >/dev/null; then
  : > secrets_all.txt
  for f in "$JS_DIR"/*.js; do
    secretfinder -i "$f" -o cli 2>/dev/null >> secrets_all.txt || true
  done
  echo "      $(grep -c . secrets_all.txt 2>/dev/null || echo 0) lines (review — noisy)"
else
  echo "      SKIP (secretfinder not on PATH)"
fi
echo

# 3) sourcemapper — rebuild original source from any exposed .js.map sibling.
echo "[3/5] sourcemapper -> sourcemap_restored/"
if command -v sourcemapper >/dev/null && [ -f "$URLS" ]; then
  mkdir -p sourcemap_restored
  hits=0
  while IFS= read -r url; do
    [ -z "$url" ] && continue
    map="${url%%[?#]*}.map"        # app.js?v=2 -> app.js.map
    if curl -fsSIL --max-time 15 "$map" 2>/dev/null | grep -qiE '^HTTP/.* 200'; then
      hits=$((hits+1))
      dst="sourcemap_restored/$(printf '%s' "$map" | md5sum | cut -c1-8)"
      echo "      MAP 200: $map"
      sourcemapper -url "$map" -output "$dst" >/dev/null 2>&1 || true
    fi
  done < "$URLS"
  echo "      $hits source map(s) reconstructed into sourcemap_restored/"
  # also flag any inline sourceMappingURL comments for manual follow-up
  grep -rEoh '//# sourceMappingURL=[^ ]+' "$JS_DIR" 2>/dev/null | sort -u > sourcemap_inline_refs.txt || true
  [ -s sourcemap_inline_refs.txt ] && echo "      + $(wc -l < sourcemap_inline_refs.txt | tr -d ' ') inline sourceMappingURL ref(s) -> sourcemap_inline_refs.txt"
else
  echo "      SKIP (sourcemapper not on PATH, or js_urls.txt missing)"
fi
echo

# 4) DOM-XSS static sweep — dangerous sinks + user-controllable sources.
echo "[4/5] domxss grep -> domxss_sinks.txt / domxss_sources.txt"
SINKS='eval\(|new Function\(|set(Timeout|Interval)\([`'"'"'"]|document\.write|\.innerHTML|\.outerHTML|insertAdjacentHTML|dangerouslySetInnerHTML|v-html|\.src\s*='
SOURCES='location\.(search|hash|href)|document\.(referrer|URL|documentURI)|window\.name|URLSearchParams'
grep -rEn "$SINKS"   "$JS_DIR" --include='*.js' 2>/dev/null > domxss_sinks.txt   || true
grep -rEn "$SOURCES" "$JS_DIR" --include='*.js' 2>/dev/null > domxss_sources.txt || true
# files with BOTH a source and a sink = likeliest taint flow
comm -12 \
  <(cut -d: -f1 domxss_sinks.txt   | sort -u) \
  <(cut -d: -f1 domxss_sources.txt | sort -u) > domxss_both.txt || true
echo "      sinks:$(wc -l < domxss_sinks.txt|tr -d ' ')  sources:$(wc -l < domxss_sources.txt|tr -d ' ')  files-with-both:$(wc -l < domxss_both.txt|tr -d ' ') -> domxss_both.txt"
echo

# 5) trufflehog — deep, verified secret scan of the folder.
echo "[5/5] trufflehog -> trufflehog.json"
if command -v trufflehog >/dev/null; then
  trufflehog filesystem "$JS_DIR" --results=verified,unknown --json > trufflehog.json 2>/dev/null || true
  echo "      $(wc -l < trufflehog.json | tr -d ' ') finding line(s) (verified=real)"
else
  echo "      SKIP (trufflehog not installed — go install github.com/trufflesecurity/trufflehog/v3@latest)"
fi
echo

echo "[*] Analysis complete. Artifacts in $(pwd):"
echo "    endpoints_all.txt  secrets_all.txt  trufflehog.json"
echo "    domxss_both.txt (start here for DOM-XSS)  sourcemap_restored/"
echo "    Next: feed endpoints_all.txt to ffuf to see which routes are live:"
echo "      ffuf -w endpoints_all.txt -u 'https://HOST/FUZZ' -mc all -fc 404"
