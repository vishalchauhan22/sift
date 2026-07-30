'use strict';

/**
 * generators/dalfox.js
 *
 * Flags used:
 *   url <url>         target URL (dalfox "url" subcommand)
 *   --param <param>   restrict testing to the selected parameter
 *   -X <method>       HTTP method
 *   -d <data>         POST body
 *   -H <header>       extra header (cookie/auth)
 *   --delay <ms>      milliseconds between requests (throttle)
 *   -b <oob>          blind XSS callback URL (when OOB provided)
 *
 * TODO: verify against installed `dalfox --help` (subcommand is `url`; body
 *       flag may be `--data` in some builds).
 */

const u = require('../util');

function delayFlag(ctx) {
  const t = u.normalizeThrottle(ctx.throttle);
  return `--delay ${t.delayMs}`; // dalfox delay is in milliseconds
}

function generate(ctx) {
  const p = ctx.targetParam;
  const cookie = ctx.headers.find((h) => h.name.toLowerCase() === 'cookie');
  const cookieFlag = cookie ? `-H ${u.q('Cookie: ' + cookie.value)}` : '';
  const blind = ctx.oob ? `-b ${u.q(ctx.oob)}` : '';
  let target;
  if (u.targetInBody(ctx)) {
    target = `url ${u.q(u.plainUrl(ctx))} -X ${ctx.method} -d ${u.q(u.plainBody(ctx))}`;
  } else {
    target = `url ${u.q(u.plainUrl(ctx))}`;
  }
  const cmd = `dalfox ${target} --param ${u.q(p)} ${cookieFlag} ${blind} ${delayFlag(ctx)}`;
  return {
    tool: 'dalfox',
    commands: [
      {
        comment: `dalfox: dedicated XSS verification on "${p}"${ctx.oob ? ' with blind-XSS callback' : ''} (run after ffuf reflection triage)`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
