'use strict';

/**
 * generators/trufflehog.js  — verified secret scanning (entropy + detectors)
 *
 * jsanalyze already does a fast regex+entropy pass; trufflehog goes deeper: 700+
 * credential detectors and, crucially, LIVE VERIFICATION (it can test whether an
 * AWS/Stripe/GitHub key actually authenticates) to cut false positives.
 *
 * Run it over the project folder AFTER the discovery phase has pulled JS files
 * down (getJS/gau/katana output + the passively-fetched js_*.js all live there).
 *
 * Flags used:
 *   filesystem <dir>   scan files already saved into the project folder
 *   --results=verified,unknown   keep verified hits + those it couldn't test
 *   --json             machine-readable, one finding per line
 *   | tee <file>       saved into the project folder
 *
 * NOTE: `--results=verified` makes trufflehog send auth probes to third-party
 * APIs (AWS, GitHub, …) to confirm a key. That is outbound traffic to those
 * providers — drop `verified` (regex-only) if your rules forbid it.
 *
 * TODO: verify installed trufflehog v3 (`trufflehog filesystem`); older v2 used
 *       `trufflehog --regex --entropy=True <path>`.
 */

const u = require('../util');

function generate(ctx) {
  const scanDir = u.outDirQ(ctx);
  const fsScan =
    `trufflehog filesystem ${scanDir} --results=verified,unknown --json ` +
    `${u.teeTo(ctx, 'trufflehog')}`;
  const commands = [
    {
      comment: `trufflehog: deep, verified secret scan of every JS/artifact saved in the project folder`,
      command: fsScan.replace(/\s+/g, ' ').trim(),
    },
  ];
  if (ctx.isScriptUrl && ctx.jsUrl) {
    commands.push({
      comment: `Regex-only pass on the single fetched file (no third-party auth probes)`,
      command: `trufflehog filesystem ${u.outFile(ctx, 'js', 'js')} --no-verification --json ${u.teeTo(ctx, 'trufflehog_single')}`.replace(/\s+/g, ' ').trim(),
    });
  }
  return { tool: 'trufflehog', commands };
}

module.exports = { generate };
