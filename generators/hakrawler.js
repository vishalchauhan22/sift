'use strict';

/**
 * generators/hakrawler.js  — quick live crawl
 *
 * Flags used:
 *   (stdin)           hakrawler reads seed URLs from stdin
 *   -d <n>            crawl depth
 *   -u                unique results
 *   -subs             include subdomains
 *   | tee <file>      saved into the project folder (no native -o)
 *
 * hakrawler has no built-in rate flag, so we keep depth low rather than
 * translating the throttle. Prefer katana when you need rate control.
 *
 * TODO: verify against installed `hakrawler -h` (flag set is minimal and has
 *       changed across rewrites; `-subs`/`-u` may differ).
 */

const u = require('../util');

function generate(ctx) {
  const cmd =
    `echo ${u.q(ctx.siteRoot)} | hakrawler -d 2 -u -subs ` +
    `${u.teeTo(ctx, 'hakrawler')}`;
  return {
    tool: 'hakrawler',
    commands: [
      {
        comment: `hakrawler: fast crawl from ${ctx.siteRoot} (URL on stdin); grep the output for .js. No rate flag — depth kept at 2`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
