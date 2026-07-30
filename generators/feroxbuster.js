'use strict';

/**
 * generators/feroxbuster.js
 *
 * Flags used:
 *   -u <url>            base URL (scheme://host/) for content discovery
 *   -w <wordlist>       directory/content wordlist
 *   --rate-limit <n>    max requests/second (throttle)
 *   -H <header>         extra header (cookie/auth)
 *   -o <file>           output file
 *
 * Broad recursive content discovery — part of the broad sweep.
 *
 * TODO: verify against installed `feroxbuster --help` (rate flag is
 *       `--rate-limit`; add `-x` extensions per target stack).
 */

const u = require('../util');

function rateFlag(ctx) {
  const t = u.normalizeThrottle(ctx.throttle);
  return `--rate-limit ${t.rps}`;
}

function generate(ctx) {
  const baseUrl = `${ctx.scheme}://${ctx.host}/`;
  const headerFlags = ctx.headers
    .filter((h) => ['cookie', 'authorization'].includes(h.name.toLowerCase()))
    .map((h) => `-H ${u.q(h.name + ': ' + h.value)}`)
    .join(' ');
  const cmd =
    `feroxbuster -u ${u.q(baseUrl)} -w ${u.q(ctx.wordlist)} ${headerFlags} ` +
    `${rateFlag(ctx)} -o ferox_${ctx.host}.txt`;
  return {
    tool: 'feroxbuster',
    commands: [
      {
        comment: `feroxbuster: recursive content/directory discovery from ${baseUrl} (map attack surface)`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
