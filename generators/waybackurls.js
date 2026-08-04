'use strict';

/**
 * generators/waybackurls.js  — archived URLs (Wayback Machine)
 *
 * Flags used:
 *   <domain>          positional target domain
 *   | grep .js        keep only JavaScript URLs
 *   | tee <file>      saved into the project folder
 *
 * Passive: queries web.archive.org only, never the live target. No throttle
 * flag exists, so nothing is translated.
 *
 * TODO: verify against installed `waybackurls -h` (accepts a domain arg or
 *       stdin; `-dates`/`-no-subs` are optional extras).
 */

const u = require('../util');

function generate(ctx) {
  const cmd =
    `waybackurls ${u.q(ctx.domain)} ` +
    `| grep -Ei '\\.js($|\\?)' ${u.teeTo(ctx, 'waybackurls_js')}`;
  return {
    tool: 'waybackurls',
    commands: [
      {
        comment: `waybackurls: historical URLs for ${ctx.domain} from the Wayback Machine, filtered to .js`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
