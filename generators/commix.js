'use strict';

/**
 * generators/commix.js
 *
 * Flags used:
 *   -u <url>          target URL
 *   --data <body>     POST body
 *   -p <param>        parameter to test
 *   --cookie <c>      session cookie
 *   --batch           non-interactive
 *   --delay <sec>     seconds between requests (throttle)
 *
 * Confirms/exploits OS command injection after ffuf's canary triage.
 *
 * TODO: verify against installed `commix --help` (param selection is `-p` in
 *       recent builds; older docs show `--parameter`).
 */

const u = require('../util');

function delayFlag(ctx) {
  const t = u.normalizeThrottle(ctx.throttle);
  return `--delay ${t.delaySec}`;
}

function generate(ctx) {
  const p = ctx.targetParam;
  const cookie = ctx.headers.find((h) => h.name.toLowerCase() === 'cookie');
  const cookieFlag = cookie ? `--cookie ${u.q(cookie.value)}` : '';
  const target = u.targetInBody(ctx)
    ? `-u ${u.q(u.plainUrl(ctx))} --data ${u.q(u.plainBody(ctx))}`
    : `-u ${u.q(u.plainUrl(ctx))}`;
  const cmd = `commix ${target} -p ${u.q(p)} ${cookieFlag} --batch ${delayFlag(ctx)}`;
  return {
    tool: 'commix',
    commands: [
      {
        comment: `commix: confirm/exploit OS command injection on "${p}" (run on ffuf canary hits)`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
