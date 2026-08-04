'use strict';

/**
 * generators/x8.js
 *
 * Flags used:
 *   -u <url>          target endpoint
 *   -X <method>       HTTP method
 *   -w <wordlist>     parameter-name wordlist
 *   -b <body>         body template (for POST)
 *   --delay <ms>      milliseconds between requests (throttle)
 *   -o <file>         write results into the project folder
 *
 * Endpoint-level hidden-parameter discovery (fast, Rust). Complements arjun.
 *
 * TODO: verify against installed `x8 --help` (delay unit/flag varies; some
 *       builds use `-d`).
 */

const u = require('../util');

function delayFlag(ctx) {
  const t = u.normalizeThrottle(ctx.throttle);
  return `--delay ${t.delayMs}`;
}

function generate(ctx) {
  const method = ctx.method === 'GET' ? 'GET' : ctx.method;
  const bodyFlag =
    method !== 'GET' && ctx.bodyType === 'form' ? `-b ${u.q(u.plainBody(ctx))}` : '';
  const cmd =
    `x8 -u ${u.q(u.plainUrl(ctx))} -X ${method} -w ${u.q(ctx.wordlist)} ` +
    `${bodyFlag} ${delayFlag(ctx)} -o ${u.outFile(ctx, 'x8')}`;
  return {
    tool: 'x8',
    commands: [
      {
        comment: `x8: fast hidden-parameter discovery (cross-check arjun's results)`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
