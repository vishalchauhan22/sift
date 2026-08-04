'use strict';

/**
 * generators/gau.js  — archived URLs (getallurls)
 *
 * Flags used:
 *   <domain>          positional target domain
 *   --subs            include subdomains
 *   --threads <n>     concurrency (throttle mapped to thread count)
 *   | grep .js        keep only JavaScript URLs
 *   | tee <file>      saved into the project folder
 *
 * gau pulls historical URLs from the Wayback Machine, Common Crawl, and
 * AlienVault OTX (archives, not the live target).
 *
 * TODO: verify against installed `gau --help` (v2 uses `--threads`, `--subs`;
 *       older `gau` differs. `--o <file>` also works instead of tee).
 */

const u = require('../util');

function generate(ctx) {
  const t = u.normalizeThrottle(ctx.throttle);
  const threads = Math.max(1, Math.min(t.rps, 10));
  const cmd =
    `gau ${u.q(ctx.domain)} --subs --threads ${threads} ` +
    `| grep -Ei '\\.js($|\\?)' ${u.teeTo(ctx, 'gau_js')}`;
  return {
    tool: 'gau',
    commands: [
      {
        comment: `gau: archived URLs for ${ctx.domain} (Wayback/CommonCrawl/OTX), filtered to .js`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
