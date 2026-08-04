'use strict';

/**
 * generators/sourcemapper.js  — source-map reconstruction (HIGH VALUE)
 *
 * If a target ships `.js.map` files in production, they rebuild the ORIGINAL,
 * uncompiled, commented source tree (Webpack/React/Vue) — real function names,
 * developer comments, and the full file layout. This generator emits commands
 * to (1) probe for the conventional `<file>.js.map` sibling and (2) reconstruct
 * the tree from any map that resolves.
 *
 * Flags used (denandz/sourcemapper):
 *   -url <map-url>    fetch a remote .js.map directly
 *   -output <dir>     write the reconstructed source tree here
 * Fallbacks:
 *   npx reverse-sourcemap <file.map> -o <dir>   (local .map already saved)
 *
 * These commands DO send requests (a HEAD/GET for the .map) — like every other
 * generated command, the operator runs them, not this tool.
 *
 * TODO: verify installed reconstructor (`sourcemapper` Go binary vs
 *       `npx reverse-sourcemap`); jsanalyze already lists candidate .map URLs
 *       in jsanalyze_sourcemaps_*.txt when the JS was passively fetched.
 */

const u = require('../util');

function generate(ctx) {
  const restoreDir = u.q((ctx.outDir || '.') + '/sourcemap_restored_' + u.sanitize(ctx.host));
  const mapListFile = u.outFile(ctx, 'jsanalyze_sourcemaps', 'txt'); // written by jsanalyze
  const commands = [];

  if (ctx.isScriptUrl && ctx.jsUrl) {
    const mapUrl = ctx.jsUrl.replace(/(\.js)(\?.*)?$/i, '$1.map');
    commands.push({
      comment: `Probe for the source map sibling of ${ctx.jsUrl} (200 = jackpot: original source is exposed)`,
      command: `curl -sSIL ${u.q(mapUrl)} | grep -Ei '^HTTP|content-type'`,
    });
    commands.push({
      comment: `Reconstruct the original commented source tree from ${mapUrl}`,
      command: `sourcemapper -url ${u.q(mapUrl)} -output ${restoreDir}`,
    });
  } else {
    commands.push({
      comment: `For every discovered .js (from the discovery phase), probe its .map sibling`,
      command: `while read -r j; do m="\${j%.js}.js.map"; curl -sSIL "$m" | grep -qi '200 OK' && echo "MAP: $m"; done < <(grep -Ei '\\.js($|\\?)' ${u.outDirQ(ctx)}/getjs_${u.sanitize(ctx.host)}_${ctx.runId || 'run'}.txt 2>/dev/null)`,
    });
    commands.push({
      comment: `Reconstruct from any map URL you confirmed above`,
      command: `sourcemapper -url 'https://${ctx.host}/path/app.js.map' -output ${restoreDir}`,
    });
  }

  commands.push({
    comment: `Alternative (map already saved locally): rebuild the tree with reverse-sourcemap`,
    command: `npx reverse-sourcemap -v ${mapListFile} -o ${restoreDir} # or point at a saved .map file`,
  });

  return { tool: 'sourcemapper', commands };
}

module.exports = { generate };
