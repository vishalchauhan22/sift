'use strict';

/**
 * generators/paramspider.js
 *
 * Flags used:
 *   -d <domain>       target domain (mines the Wayback/CommonCrawl archives)
 *   --subs            include subdomains (left off by default to keep scope tight)
 *   -o <file>         output file
 *
 * Passive parameter discovery — pulls historical URLs+params from public
 * archives. No throttle flag: it queries archive APIs, not the target.
 *
 * TODO: verify against installed `paramspider --help` (some forks use
 *       `--domain` and drop `--subs`).
 */

const u = require('../util');

function generate(ctx) {
  const cmd = `paramspider -d ${u.q(ctx.host)} -o paramspider_${ctx.host}.txt`;
  return {
    tool: 'paramspider',
    commands: [
      {
        comment: `paramspider: passively mine archived URLs/params for ${ctx.host} (no traffic to target)`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
