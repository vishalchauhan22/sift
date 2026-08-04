#!/usr/bin/env bash
#
# sift-graphql.sh — pull GraphQL details out of downloaded JS bundles.
#
# GraphQL leaves fingerprints in client bundles: the endpoint URL, named
# operations (query/mutation/subscription), gql`...` tagged bodies, type names,
# and Apollo persisted-query hashes. This lists them all from js_files/.
#
# Usage:
#   ./sift-graphql.sh [PROJECT_DIR]
#     PROJECT_DIR   folder containing js_files/ (default: current dir)
#
# Purely static (greps local files). The one ACTIVE follow-up — an introspection
# query — is printed at the end for you to run manually against authorized hosts.
set -uo pipefail

PROJECT_DIR="${1:-.}"
cd "$PROJECT_DIR"
JS_DIR="js_files"

if [ ! -d "$JS_DIR" ] || ! ls "$JS_DIR"/*.js >/dev/null 2>&1; then
  echo "[!] No $JS_DIR/*.js in $(pwd). Run ./sift-merge-fetch.sh first."
  exit 1
fi
echo "[*] Scanning $(ls "$JS_DIR"/*.js | wc -l | tr -d ' ') JS file(s) for GraphQL artifacts"
echo

# 1) Endpoints — absolute + relative paths mentioning graphql/gql.
echo "[1/6] Endpoints -> gql_endpoints.txt"
{
  grep -rEohi "https?://[^ \"'\`<>]*(graphql|/gql)[^ \"'\`<>]*" "$JS_DIR"
  grep -rEohi "[\"'\`]/[^ \"'\`<>]*(graphql|/gql)[^ \"'\`<>]*" "$JS_DIR" | tr -d "\"'\`"
} 2>/dev/null | sort -u > gql_endpoints.txt || true
sed 's/^/      /' gql_endpoints.txt 2>/dev/null | head -20
echo "      ($(wc -l < gql_endpoints.txt | tr -d ' ') total)"
echo

# 2) Named operations — query/mutation/subscription <Name>.
echo "[2/6] Operations (query/mutation/subscription) -> gql_operations.txt"
grep -rEohi "(query|mutation|subscription)[[:space:]]+[A-Za-z][A-Za-z0-9_]*[[:space:]]*[({]" "$JS_DIR" 2>/dev/null \
  | sed -E 's/[[:space:]]*[({].*$//; s/[[:space:]]+/ /g' \
  | sort -u > gql_operations.txt || true
sed 's/^/      /' gql_operations.txt 2>/dev/null | head -30
echo "      ($(wc -l < gql_operations.txt | tr -d ' ') total)"
echo

# 3) operationName strings sent over the wire (Apollo/Relay network calls).
echo "[3/6] operationName values -> gql_operationNames.txt"
grep -rEohi "operationName[\"']?[[:space:]]*[:=][[:space:]]*[\"'][A-Za-z0-9_]+[\"']" "$JS_DIR" 2>/dev/null \
  | grep -oE "[\"'][A-Za-z0-9_]+[\"']$" | tr -d "\"'" | sort -u > gql_operationNames.txt || true
echo "      $(wc -l < gql_operationNames.txt | tr -d ' ') unique operation name(s)"
echo

# 4) gql`...` / graphql`...` tagged template literals (the actual query bodies).
#    Grep can't span the whole multiline body reliably; we list the files+lines
#    where they start so you can open and read the full literal.
echo "[4/6] gql-tagged literals (locations) -> gql_literals.txt"
grep -rEn "(gql|graphql)[[:space:]]*\`" "$JS_DIR" 2>/dev/null > gql_literals.txt || true
echo "      $(wc -l < gql_literals.txt | tr -d ' ') gql\`...\` starting point(s) — open these to read full queries"
echo

# 5) Type/field hints — __typename values and fragment definitions.
echo "[5/6] Type names & fragments -> gql_types.txt"
{
  grep -rEohi "__typename[\"']?[[:space:]]*[:=][[:space:]]*[\"'][A-Za-z0-9_]+[\"']" "$JS_DIR" \
    | grep -oE "[\"'][A-Za-z0-9_]+[\"']$" | tr -d "\"'" | sed 's/^/typename: /'
  grep -rEohi "fragment[[:space:]]+[A-Za-z0-9_]+[[:space:]]+on[[:space:]]+[A-Za-z0-9_]+" "$JS_DIR"
} 2>/dev/null | sort -u > gql_types.txt || true
echo "      $(wc -l < gql_types.txt | tr -d ' ') type/fragment hint(s)"
echo

# 6) Apollo Automatic Persisted Queries — sha256 hashes / documentId.
echo "[6/6] Persisted-query hashes -> gql_persisted.txt"
grep -rEohi "(sha256Hash|persistedQuery|documentId)[\"']?[[:space:]]*[:=][[:space:]]*[\"'][A-Za-z0-9]+[\"']" "$JS_DIR" 2>/dev/null \
  | sort -u > gql_persisted.txt || true
echo "      $(wc -l < gql_persisted.txt | tr -d ' ') persisted-query reference(s) (APQ in use if present)"
echo

echo "[*] Done. GraphQL artifacts written to $(pwd):"
echo "    gql_endpoints.txt  gql_operations.txt  gql_operationNames.txt"
echo "    gql_literals.txt   gql_types.txt       gql_persisted.txt"
echo
EP=$(head -1 gql_endpoints.txt 2>/dev/null)
echo "[*] ACTIVE follow-up (run only against authorized hosts):"
echo "    # 1. Fingerprint the engine (Apollo/Hasura/graphene...):"
echo "    graphw00f -d -t ${EP:-https://HOST/graphql}"
echo "    # 2. Try introspection (often the whole schema in one request):"
echo "    curl -sS ${EP:-https://HOST/graphql} -H 'Content-Type: application/json' \\"
echo "      --data '{\"query\":\"{__schema{types{name fields{name}}}}\"}' | jq ."
echo "    # 3. If introspection is disabled, reconstruct the schema by brute force:"
echo "    clairvoyance ${EP:-https://HOST/graphql} -o schema.json"
echo "    # 4. Burp users: load InQL to browse operations interactively."
