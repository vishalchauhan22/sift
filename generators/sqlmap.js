'use strict';

/**
 * generators/sqlmap.js
 *
 * Flags used:
 *   -u <url>          target URL
 *   --data <body>     POST body (when the param is in the body)
 *   -p <param>        parameter to test (from the operator's selection)
 *   --method <m>      HTTP method
 *   -H <header>       extra header (auth/cookie carried over)
 *   --batch           never prompt (non-interactive)
 *   --level / --risk  test depth (kept modest: 2 / 1)
 *   --delay <sec>     seconds between requests (throttle)
 *   --output-dir <d>  write session/output into the project folder
 *
 * TODO: verify against installed `sqlmap --help` (cookie is often better via
 *       --cookie; adjust --level/--risk to engagement rules).
 */

const u = require('../util');

function delayFlag(ctx) {
  const t = u.normalizeThrottle(ctx.throttle);
  return `--delay ${t.delaySec}`;
}

/** Carry Cookie / Authorization over so sqlmap tests an authenticated state. */
function authHeaders(ctx) {
  const flags = [];
  for (const h of ctx.headers) {
    const n = h.name.toLowerCase();
    if (n === 'cookie') flags.push(`--cookie ${u.q(h.value)}`);
    if (n === 'authorization') flags.push(`-H ${u.q('Authorization: ' + h.value)}`);
  }
  return flags.join(' ');
}

function generate(ctx) {
  const p = ctx.targetParam;
  let target;
  if (u.targetInBody(ctx)) {
    target = `-u ${u.q(u.plainUrl(ctx))} --data ${u.q(u.plainBody(ctx))}`;
  } else {
    target = `-u ${u.q(u.plainUrl(ctx))}`;
  }
  const method = ctx.method !== 'GET' ? `--method ${ctx.method}` : '';
  const cmd =
    `sqlmap ${target} -p ${u.q(p)} ${method} ${authHeaders(ctx)} ` +
    `--batch --level 2 --risk 1 ${delayFlag(ctx)} --output-dir ${u.outDirQ(ctx)}`;
  return {
    tool: 'sqlmap',
    commands: [
      {
        comment: `sqlmap: deep SQLi confirmation/exploitation on "${p}" (run after ffuf flags it)`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
