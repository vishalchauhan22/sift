'use strict';

/**
 * generators/tplmap.js
 *
 * Flags used:
 *   -u <url>          target URL
 *   -d <body>         POST body (data)
 *   --method <m>      HTTP method
 *   --cookie <c>      session cookie
 *   (tplmap detects the injectable parameter from the marked value in the URL)
 *
 * Confirms/exploits Server-Side Template Injection after ffuf's 49 canary hit.
 *
 * TODO: verify against installed `tplmap.py --help` (param targeting differs by
 *       fork; classic tplmap infers from the URL, plusvic/tplmap uses `-u`+`-d`).
 */

const u = require('../util');

function generate(ctx) {
  const cookie = ctx.headers.find((h) => h.name.toLowerCase() === 'cookie');
  const cookieFlag = cookie ? `--cookie ${u.q(cookie.value)}` : '';
  const method = ctx.method !== 'GET' ? `--method ${ctx.method}` : '';
  let target;
  if (u.targetInBody(ctx)) {
    // mark the injectable body param with an asterisk value for tplmap
    target = `-u ${u.q(u.plainUrl(ctx))} -d ${u.q(u.buildBodyValue(ctx, '*'))}`;
  } else {
    target = `-u ${u.q(u.urlWithParamValue(ctx, '*'))}`;
  }
  const cmd = `tplmap ${target} ${method} ${cookieFlag}`;
  return {
    tool: 'tplmap',
    commands: [
      {
        comment: `tplmap: confirm/exploit SSTI on "${ctx.targetParam}" (marked with * for detection) after ffuf's 49 hit`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
