'use strict';

/**
 * generators/jsdiff.js  — diff JS versions over time (change monitoring)
 *
 * Hunters watch a target's JS bundles for redeploys: a diff of yesterday's
 * bundle against today's surfaces brand-new endpoints, new features, and — most
 * usefully — security patches that point straight at what the bug was.
 *
 * This generator emits commands to (1) pull a FRESH copy of the JS (beautified
 * so the diff is line-meaningful, not one minified megaline) and (2) diff it
 * against the most recent previously-saved copy in the project folder. Because
 * every run is timestamped (js_<host>_<runId>.js), old copies pile up here
 * naturally — this just compares the newest two.
 *
 * The fresh GET is live traffic — the operator runs the printed command.
 *
 * TODO: needs js-beautify + diff (both standard); for a scheduled watch, wrap
 *       the fetch+diff in cron and alert on non-empty output.
 */

const u = require('../util');

function generate(ctx) {
  const host = u.sanitize(ctx.host);
  const run = ctx.runId || 'run';
  const dir = u.outDirQ(ctx);
  const src = ctx.jsUrl || `${ctx.scheme}://${ctx.host}/path/app.js`;
  const fresh = u.outFile(ctx, 'jsdiff_fresh', 'js');
  const commands = [
    {
      comment: `Pull + beautify a FRESH copy of ${src} for a meaningful line diff`,
      command: `curl -s ${u.q(src)} | js-beautify - > ${fresh}`,
    },
    {
      comment: `Diff the fresh copy against the previous saved bundle for this host (added endpoints/patches)`,
      command:
        `prev=$(ls -1t ${dir}/js_${host}_*.js 2>/dev/null | grep -v jsdiff_fresh | head -n1); ` +
        `[ -n "$prev" ] && diff <(js-beautify "$prev") ${fresh} | tee ${u.outFile(ctx, 'jsdiff', 'diff')} || ` +
        `echo 'No previous copy saved yet — this run becomes the baseline for run ${run}.'`,
    },
  ];
  return { tool: 'jsdiff', commands };
}

module.exports = { generate };
