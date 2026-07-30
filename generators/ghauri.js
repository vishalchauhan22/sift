'use strict';

/**
 * generators/ghauri.js
 *
 * Flags used:
 *   -u <url>          target URL
 *   --data <body>     POST body
 *   -p <param>        parameter to test
 *   --method <m>      HTTP method
 *   --cookie <c>      session cookie
 *   --batch           non-interactive
 *   --delay <sec>     seconds between requests (throttle)
 *
 * ghauri is an alternative SQLi engine — handy as a second opinion to sqlmap.
 *
 * TODO: verify against installed `ghauri --help` (flag set closely mirrors
 *       sqlmap but not identical).
 */

const u = require('../util');

function delayFlag(ctx) {
  const t = u.normalizeThrottle(ctx.throttle);
  return `--delay ${t.delaySec}`;
}

function cookieFlag(ctx) {
  const c = ctx.headers.find((h) => h.name.toLowerCase() === 'cookie');
  return c ? `--cookie ${u.q(c.value)}` : '';
}

function generate(ctx) {
  const p = ctx.targetParam;
  const target = u.targetInBody(ctx)
    ? `-u ${u.q(u.plainUrl(ctx))} --data ${u.q(u.plainBody(ctx))}`
    : `-u ${u.q(u.plainUrl(ctx))}`;
  const method = ctx.method !== 'GET' ? `--method ${ctx.method}` : '';
  const cmd = `ghauri ${target} -p ${u.q(p)} ${method} ${cookieFlag(ctx)} --batch ${delayFlag(ctx)}`;
  return {
    tool: 'ghauri',
    commands: [
      {
        comment: `ghauri: second-opinion SQLi engine on "${p}" (cross-check sqlmap findings)`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
