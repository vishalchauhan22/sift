#!/usr/bin/env bash
#
# sift-cloud.sh — hunt cloud-storage & file-upload surface in JS bundles.
#
# Goes beyond "list URLs": it finds the FUNCTIONALITY worth attacking —
# S3/GCS/Azure buckets, presigned-URL generation, and upload endpoints — the
# stuff behind public-bucket, weak-presign, and upload-IDOR bugs.
#
# Usage:
#   ./sift-cloud.sh [PROJECT_DIR]
#     PROJECT_DIR   folder containing js_files/ (default: current dir)
#
# Static (greps local files). Active follow-ups (bucket tests) are printed, not run.
set -uo pipefail

PROJECT_DIR="${1:-.}"
cd "$PROJECT_DIR"
JS="js_files"
[ -d "$JS" ] && ls "$JS"/*.js >/dev/null 2>&1 || { echo "[!] No $JS/*.js in $(pwd). Run ./sift-merge-fetch.sh first."; exit 1; }
echo "[*] Hunting cloud/upload surface in $(ls "$JS"/*.js | wc -l | tr -d ' ') JS file(s)"; echo

scan () { grep -rEohi "$2" "$JS" 2>/dev/null | sort -u > "$3"; printf '  %-32s %4s -> %s\n' "$1" "$(wc -l < "$3" | tr -d ' ')" "$3"; }

echo "== AWS S3 =="
scan "S3 bucket hosts"        's3[.-][a-z0-9.-]*\.amazonaws\.com|[a-z0-9.-]+\.s3\.[a-z0-9.-]*amazonaws\.com|s3://[a-z0-9._-]+' cloud_s3_hosts.txt
scan "Presigned-URL params"   'X-Amz-(Signature|Credential|Algorithm|Date|Expires|SignedHeaders)|AWSAccessKeyId|[?&]Signature=' cloud_s3_presigned.txt
scan "S3 SDK calls"           'getSignedUrl|createPresignedPost|putObject|getObject|@aws-sdk/client-s3|aws-sdk|new S3\(|AWS\.S3' cloud_s3_sdk.txt
scan "CloudFront"             '[a-z0-9]+\.cloudfront\.net' cloud_cloudfront.txt
echo

echo "== Other providers =="
scan "Google Cloud Storage"   'storage\.googleapis\.com|[a-z0-9._-]+\.storage\.googleapis\.com|gs://[a-z0-9._-]+' cloud_gcs.txt
scan "Azure Blob (+SAS token)" '[a-z0-9]+\.blob\.core\.windows\.net[^ "'"'"'`]*(sig=)?' cloud_azure.txt
scan "Firebase Storage"       'firebasestorage\.googleapis\.com|[a-z0-9-]+\.firebaseio\.com|firebasestorage' cloud_firebase.txt
echo

echo "== Upload flow =="
scan "Upload endpoints"       '["'"'"'`/][a-z0-9._/-]*(upload|presign|signed-?url|get-?upload-?url|attachment|media|file)[a-z0-9._/-]*' cloud_upload_endpoints.txt
scan "Upload libs/SDKs"       'uppy|tus-js|resumable\.js|evaporate|fine-?uploader|dropzone|multipart/form-data|FormData\(' cloud_upload_libs.txt
echo

# Candidate bucket NAMES distilled for active testing.
{
  grep -oE '[a-z0-9.-]+\.s3[.-][a-z0-9.-]*amazonaws\.com' cloud_s3_hosts.txt 2>/dev/null | sed -E 's#\.s3[.-].*##'
  grep -oE 's3://[a-z0-9._-]+'                            cloud_s3_hosts.txt 2>/dev/null | sed 's#s3://##'
  grep -oE 's3[.-][a-z0-9.-]*amazonaws\.com/[a-z0-9._-]+' cloud_s3_hosts.txt 2>/dev/null | sed -E 's#.*amazonaws\.com/##'
} 2>/dev/null | grep -vE '^(www|api|cdn|static|assets)$' | sort -u > cloud_bucket_candidates.txt
echo "== Candidate buckets to test -> cloud_bucket_candidates.txt =="
sed 's/^/  /' cloud_bucket_candidates.txt 2>/dev/null | head -20
echo "  ($(wc -l < cloud_bucket_candidates.txt | tr -d ' ') candidate bucket name(s))"
echo

echo "[*] Done. Files: cloud_s3_*.txt  cloud_gcs.txt  cloud_azure.txt  cloud_firebase.txt"
echo "         cloud_upload_endpoints.txt  cloud_upload_libs.txt  cloud_bucket_candidates.txt"
echo
echo "[*] ACTIVE follow-ups (authorized targets only):"
echo "  # Is a bucket world-readable / listable?"
echo "  while read -r b; do echo \"== \$b ==\"; aws s3 ls \"s3://\$b\" --no-sign-request 2>&1 | head; done < cloud_bucket_candidates.txt"
echo "  # World-WRITABLE test (upload a probe object, then delete):"
echo "  aws s3 cp /tmp/poc.txt s3://BUCKET/poc.txt --no-sign-request      # 200 = writable!"
echo "  # Broader bucket recon / permissions:"
echo "  s3scanner scan -f cloud_bucket_candidates.txt"
echo "  # Presigned-URL abuse: request one from the app's upload endpoint, then try"
echo "  #   - changing the object key (path traversal / IDOR to another user's prefix)"
echo "  #   - changing Content-Type / removing content-length constraints"
echo "  #   - replaying after expiry, or reusing another user's signature"
echo "  # Nuclei exposure/takeover templates against the hosts:"
echo "  nuclei -tags s3,aws,exposure -u https://HOST"
