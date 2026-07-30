'use strict';

/**
 * generators/crlfuzz.js
 *
 * Flags used:
 *   -u <url>          target URL
 *   -X <method>       HTTP method
 *   -d <body>         POST body
 *   -H <header>       extra header (cookie/auth)
 *   -c <n>            concurrency (used as a coarse throttle: capped low)
 *   -o <file>         output file
 *
 * Primary CRLF-injection scanner; ffuf is the secondary confirmation pass.
 *
 * TODO: verify against installed `crlfuzz -h` (no true rate flag; we translate
 *       throttle to a small `-c` concurrency. Add `-s` for silent if desired).
 */

const u = require('../util');

/** crlfuzz has no rps/delay flag; approximate by limiting concurrency. */
function concurrencyFlag(ctx) {
  const t = u.normalizeThrottle(ctx.throttle);
  const c = Math.max(1, Math.min(t.rps, 10)); // keep it gentle
  return `-c ${c}`;
}

function generate(ctx) {
  const method = ctx.method !== 'GET' ? `-X ${ctx.method}` : '';
  const bodyFlag =
    ctx.method !== 'GET' && ctx.bodyType === 'form' ? `-d ${u.q(u.plainBody(ctx))}` : '';
  const cookie = ctx.headers.find((h) => h.name.toLowerCase() === 'cookie');
  const cookieFlag = cookie ? `-H ${u.q('Cookie: ' + cookie.value)}` : '';
  const cmd =
    `crlfuzz -u ${u.q(u.plainUrl(ctx))} ${method} ${bodyFlag} ${cookieFlag} ` +
    `${concurrencyFlag(ctx)} -o crlfuzz_${ctx.host}.txt`;
  return {
    tool: 'crlfuzz',
    commands: [
      {
        comment: `crlfuzz: dedicated CRLF-injection scan (primary pass; throttle approximated via -c)`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
