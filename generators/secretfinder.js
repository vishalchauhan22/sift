'use strict';

/**
 * generators/secretfinder.js  — secret/API-key extraction
 *
 * Flags used:
 *   -i <target>       input: a .js URL or scheme://host/* wildcard
 *   -o cli            print results to stdout (vs an HTML report)
 *   | tee <file>      saved into the project folder
 *
 * SecretFinder is LinkFinder-based but tuned to flag high-risk data: API keys,
 * tokens, AWS/GCP creds, JWTs, etc. It fetches the JS itself.
 *
 * TODO: verify against installed `SecretFinder.py -h` (invocation may be
 *       `python3 SecretFinder.py`; supports `-e` to extract + `-o cli`).
 */

const u = require('../util');

function generate(ctx) {
  const cmd =
    `secretfinder -i ${u.q(ctx.extractTarget)} -o cli ` +
    `${u.teeTo(ctx, 'secretfinder')}`;
  return {
    tool: 'secretfinder',
    commands: [
      {
        comment: `SecretFinder: hunt API keys/tokens/secrets in ${ctx.extractTarget}`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
