#!/usr/bin/env bash
#
# sift-diff-sourcemaps.sh — snapshot the reconstructed source tree and diff it
# against the previous run, to surface NEW/CHANGED code (= new attack surface).
#
# Each time you run it, it archives the current sourcemap_restored/ as a
# timestamped snapshot, then diffs the two most recent snapshots and reports
# which files are new or changed. Meant to be run after each sourcemapper pass
# (e.g. daily) so you catch redeploys.
#
# Usage:
#   ./sift-diff-sourcemaps.sh [PROJECT_DIR] [RESTORED_DIR]
#     PROJECT_DIR    project folder (default: current dir)
#     RESTORED_DIR   the reconstructed tree to snapshot (default: sourcemap_restored)
#
# Purely local — reads/diffs files already on disk. Sends no traffic.
set -uo pipefail

PROJECT_DIR="${1:-.}"
RESTORED="${2:-sourcemap_restored}"
cd "$PROJECT_DIR"

if [ ! -d "$RESTORED" ] || [ -z "$(ls -A "$RESTORED" 2>/dev/null)" ]; then
  echo "[!] $(pwd)/$RESTORED is missing or empty. Run the sourcemapper step first."
  exit 1
fi

SNAPDIR="sourcemap_snapshots"
mkdir -p "$SNAPDIR"
STAMP="$(date +%Y%m%d-%H%M%S)"
NEW="$SNAPDIR/snap_$STAMP"
cp -a "$RESTORED" "$NEW"
echo "[*] Snapshot saved: $NEW"

# find the previous snapshot (second-newest)
PREV="$(ls -1dt "$SNAPDIR"/snap_* 2>/dev/null | sed -n '2p')"
if [ -z "$PREV" ]; then
  echo "[*] No previous snapshot — this run is the BASELINE. Re-run after the next"
  echo "    sourcemapper pass to see what changed."
  exit 0
fi
echo "[*] Diffing against previous: $PREV"
echo

REPORT="sourcemap_diff_$STAMP.txt"
{
  echo "# Source-map diff  (prev: $PREV  ->  new: $NEW)"
  echo

  echo "## NEW files (only in this run — new features/endpoints):"
  diff -rq "$PREV" "$NEW" 2>/dev/null | grep "^Only in $NEW" | sed "s#^Only in $NEW/#  + #; s#: #/#" || true
  echo

  echo "## REMOVED files (only in previous run):"
  diff -rq "$PREV" "$NEW" 2>/dev/null | grep "^Only in $PREV" | sed "s#^Only in $PREV/#  - #; s#: #/#" || true
  echo

  echo "## CHANGED files (present in both, content differs):"
  diff -rq "$PREV" "$NEW" 2>/dev/null | grep "^Files " | sed -E "s#^Files .*/($(basename "$NEW"))?##; s#^Files ##; s# and # -> #; s# differ##" | sed 's/^/  ~ /' || true
} | tee "$REPORT"

# quick wins: any brand-new endpoints/secrets introduced by changed+new files
echo
echo "## New endpoint-ish strings in changed/new files:"
{
  diff -rq "$PREV" "$NEW" 2>/dev/null | grep -E "^Only in $NEW|^Files " \
    | grep -oE "$NEW[^ :]*" ;
} | while read -r p; do
  [ -f "$p" ] && grep -aoE "/[a-zA-Z0-9_./-]{3,}" "$p"
done 2>/dev/null | sort -u | grep -Ei 'api|graphql|admin|internal|v[0-9]|token|user|account' | head -40 | sed 's/^/  /'

echo
echo "[*] Full report: $(pwd)/$REPORT"
echo "    Read a specific change with:  diff -u '$PREV/PATH' '$NEW/PATH'"
