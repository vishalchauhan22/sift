'use strict';

/**
 * generators/arjun.js
 *
 * Flags used:
 *   -u <url>          target endpoint
 *   -m <method>       method to probe (GET/POST/JSON)
 *   -w <wordlist>     parameter-name wordlist
 *   -oT <file>        text output (suggested)
 *   --stable          slower but reliable detection
 *   -d <sec>          delay between requests (throttle)
 *   -T <sec>          request timeout
 *
 * Endpoint-level tool: discovers hidden parameters — not tied to one param.
 *
 * TODO: verify against installed `arjun --help` (delay flag is `-d`; rate is
 *       controlled via `-T`/`--stable` in some versions).
 */

const u = require('../util');

function delayFlag(ctx) {
  const t = u.normalizeThrottle(ctx.throttle);
  return `-d ${t.delaySec}`;
}

function generate(ctx) {
  const method = ctx.method === 'GET' ? 'GET' : 'POST';
  const cmd =
    `arjun -u ${u.q(u.plainUrl(ctx))} -m ${method} -w ${u.q(ctx.wordlist)} ` +
    `--stable ${delayFlag(ctx)} -oT arjun_${ctx.host}.txt`;
  return {
    tool: 'arjun',
    commands: [
      {
        comment: `arjun: brute hidden parameter names on this endpoint (broad discovery pass)`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
