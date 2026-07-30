'use strict';

/**
 * generators/nuclei.js
 *
 * Flags used:
 *   -u <url>              target URL
 *   -rate-limit <n>       max requests/second (throttle)
 *   -H <header>           extra header (auth/cookie carried over)
 *   -severity <levels>    focus on actionable findings
 *   -o <file>             output file
 *
 * Broad first-pass template scanner — good for a wide sweep before targeted
 * fuzzing.
 *
 * TODO: verify against installed `nuclei -h` (rate flag is `-rate-limit` /
 *       `-rl`; consider `-t` to scope template sets to engagement rules).
 */

const u = require('../util');

function rateFlag(ctx) {
  const t = u.normalizeThrottle(ctx.throttle);
  return `-rate-limit ${t.rps}`;
}

function generate(ctx) {
  const headerFlags = ctx.headers
    .filter((h) => ['cookie', 'authorization'].includes(h.name.toLowerCase()))
    .map((h) => `-H ${u.q(h.name + ': ' + h.value)}`)
    .join(' ');
  const cmd =
    `nuclei -u ${u.q(u.plainUrl(ctx))} ${headerFlags} -severity low,medium,high,critical ` +
    `${rateFlag(ctx)} -o nuclei_${ctx.host}.txt`;
  return {
    tool: 'nuclei',
    commands: [
      {
        comment: `nuclei: broad template scan of the endpoint (widest net; triage findings first)`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
