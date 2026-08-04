'use strict';

/**
 * generators/endpointffuf.js  — endpoints -> wordlist -> live validation (§API)
 *
 * Extraction (linkfinder/jsanalyze) yields relative routes like
 * `/api/v1/user/delete` — often undocumented or deprecated dev endpoints. This
 * generator closes the loop: it (1) distils every extracted path into a clean
 * wordlist and (2) replays it through ffuf against the live host to see which
 * routes actually answer, and with what status (200 vs 401 vs 403).
 *
 * The wordlist is built from the files the earlier phases wrote into the project
 * folder (jsanalyze_endpoints_*, linkfinder_*), so run this AFTER extraction.
 *
 * Flags used (ffuf):
 *   -w <wordlist>     the distilled endpoint list
 *   -u https://host/FUZZ   FUZZ replaced by each path
 *   -mc all -fc 404   show every status except 404 (spot 200/401/403)
 *   -rate <n>         requests/second (throttle)
 *   -o <file> -of json  output into the project folder
 *
 * The ffuf step sends live traffic — the operator runs it, this only prints it.
 */

const u = require('../util');

function generate(ctx) {
  const t = u.normalizeThrottle(ctx.throttle);
  const host = u.sanitize(ctx.host);
  const run = ctx.runId || 'run';
  const dir = u.outDirQ(ctx);
  const wordlist = u.outFile(ctx, 'endpoints_wordlist');

  // Merge every extraction artifact, keep leading-slash paths, strip quotes/host, dedup.
  const build =
    `cat ${dir}/jsanalyze_endpoints_${host}_${run}.txt ${dir}/linkfinder_${host}_${run}.log 2>/dev/null ` +
    `| grep -oE '/[a-zA-Z0-9_./?=-]+' ` +
    `| sed -E 's#^/+##; s/[?].*$//' ` +
    `| sort -u > ${wordlist}`;

  const ffuf =
    `ffuf -w ${wordlist} -u ${u.q(ctx.scheme + '://' + ctx.host + '/FUZZ')} ` +
    `-mc all -fc 404 -rate ${t.rps} -o ${u.outFile(ctx, 'endpointffuf', 'json')} -of json`;

  return {
    tool: 'endpoint-ffuf',
    commands: [
      {
        comment: `Distil extracted endpoints into a wordlist (paths only, deduped)`,
        command: build.replace(/\s+/g, ' ').trim(),
      },
      {
        comment: `Replay that wordlist through ffuf to find which routes are live (watch for 200/401/403)`,
        command: ffuf.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
