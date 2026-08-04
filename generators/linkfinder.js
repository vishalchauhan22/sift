'use strict';

/**
 * generators/linkfinder.js  — endpoint/route extraction
 *
 * Flags used:
 *   -i <target>       input: a single .js URL, or scheme://host/* to sweep all
 *                     JS on a domain, or a local file/folder
 *   -o cli            print results to stdout (vs an HTML report)
 *   | tee <file>      saved into the project folder
 *
 * LinkFinder fetches the JS itself and regex-extracts endpoints/paths. When you
 * gave a single JS URL, -i is that URL; for a domain we pass the /* wildcard.
 *
 * TODO: verify against installed `linkfinder -h` (invocation may be
 *       `python3 linkfinder.py`; `-o cli` vs `-o results.html`).
 */

const u = require('../util');

function generate(ctx) {
  const cmd =
    `linkfinder -i ${u.q(ctx.extractTarget)} -o cli ` +
    `${u.teeTo(ctx, 'linkfinder')}`;
  return {
    tool: 'linkfinder',
    commands: [
      {
        comment: `LinkFinder: extract hidden endpoints/routes from ${ctx.extractTarget}`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
