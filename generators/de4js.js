'use strict';

/**
 * generators/de4js.js  — deobfuscate / beautify packed JS
 *
 * De4js itself is an ONLINE tool (no CLI), so this generator emits:
 *   1. a manual step pointing at the de4js web app, and
 *   2. a runnable LOCAL alternative using js-beautify (or webcrack) to
 *      pretty-print the JS this app fetched, so it's readable before analysis.
 *
 * Flags used (js-beautify):
 *   <infile>          the JS file fetched into the project folder
 *   -o <outfile>      beautified output into the project folder
 *
 * TODO: verify installed beautifier (`js-beautify` from the jsbeautifier pkg,
 *       or `npx webcrack <file>` for heavier unpacking).
 */

const u = require('../util');

function generate(ctx) {
  const src = ctx.jsUrl || ctx.siteRoot + '<app>.js';
  const rawJs = u.outFile(ctx, 'js', 'js'); // the file jsanalyze saved (if fetched)
  const beautify = `js-beautify ${rawJs} -o ${u.outFile(ctx, 'beautified', 'js')}`;
  return {
    tool: 'de4js',
    commands: [
      {
        comment: `De4js is ONLINE (no CLI): open the URL, paste packed JS from ${src}, choose auto-decode`,
        command: '# manual: https://lelinhtinh.github.io/de4js/',
      },
      {
        comment: `Local alternative: beautify the fetched JS before reading it (needs js-beautify installed)`,
        command: beautify.replace(/\s+/g, ' ').trim(),
      },
    ],
  };
}

module.exports = { generate };
