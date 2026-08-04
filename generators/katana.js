'use strict';

/**
 * generators/katana.js  — live crawl for JS + endpoints
 *
 * Flags used:
 *   -u <url>          crawl seed (site root)
 *   -jc               JavaScript crawling: parse .js files for endpoints
 *   -d <n>            crawl depth
 *   -kf all           parse known files (robots.txt, sitemap)
 *   -rl <n>           rate limit, requests/second (throttle)
 *   -o <file>         output into the project folder
 *
 * Katana is a live crawler — it sends traffic to the target, so the throttle is
 * translated to -rl.
 *
 * TODO: verify against installed `katana -h` (`-jc`, `-kf`, `-rl` are current
 *       ProjectDiscovery flags; tune -d for scope).
 */

const u = require('../util');

function generate(ctx) {
  const t = u.normalizeThrottle(ctx.throttle);
  const cmd =
    `katana -u ${u.q(ctx.siteRoot)} -jc -d 3 -kf all -rl ${t.rps} ` +
    `-o ${u.outFile(ctx, 'katana')}`;
  return {
    tool: 'katana',
    commands: [
      {
        comment: `katana: crawl ${ctx.siteRoot} (-jc parses JS for endpoints), depth 3, ${t.rps} req/s`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
