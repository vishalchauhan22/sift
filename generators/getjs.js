'use strict';

/**
 * generators/getjs.js  — JS file discovery
 *
 * Flags used:
 *   --url <url>       single site root to pull scripts from
 *   --complete        resolve relative .js paths to absolute URLs
 *   --output <file>   write the discovered .js list into the project folder
 *
 * getJS scrapes a page for every <script src> / referenced .js URL. Use
 * --input <domains.txt> instead of --url for a bulk list.
 *
 * TODO: verify against installed `getJS --help` (some builds use `-o` and add
 *       `--resolve`; no reliable rate flag, so throttle is not translated).
 */

const u = require('../util');

function generate(ctx) {
  const cmd = `getJS --url ${u.q(ctx.siteRoot)} --complete --output ${u.outFile(ctx, 'getjs')}`;
  return {
    tool: 'getJS',
    commands: [
      {
        comment: `getJS: pull every <script>/.js URL referenced from ${ctx.siteRoot} (discovery)`,
        command: cmd.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
