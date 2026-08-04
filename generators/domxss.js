'use strict';

/**
 * generators/domxss.js  — client-side DOM-XSS static sweep (Sources -> Sinks)
 *
 * jsanalyze runs this taint pass on the single passively-fetched file; this
 * generator emits grep commands so you can sweep EVERY JS file the discovery
 * phase harvested into the project folder (not just the one you pasted).
 *
 * The idea: find dangerous Sinks and user-controllable Sources in the same
 * file/region. A Sink fed by a Source is a candidate DOM-XSS.
 *   Sources: location.search/.hash/.href, document.referrer, window.name, ...
 *   Sinks:   eval, Function, setTimeout('...'), document.write, .innerHTML,
 *            insertAdjacentHTML, dangerouslySetInnerHTML (React), v-html (Vue)
 *
 * Pure static grep — no traffic. Confirm findings dynamically with dalfox
 * (needs a live URL/param) or Burp DOM Invader.
 *
 * TODO: ripgrep (`rg`) is faster if installed — swap `grep -rEn` for `rg -n`.
 */

const u = require('../util');

// kept in sync with jsanalyze.js DOM_SOURCES / DOM_SINKS (regex-escaped for grep -E)
const SINKS =
  'eval\\(|new Function\\(|set(Timeout|Interval)\\([\'"`]|document\\.write|' +
  '\\.innerHTML|\\.outerHTML|insertAdjacentHTML|dangerouslySetInnerHTML|v-html|\\.src\\s*=';
const SOURCES =
  'location\\.(search|hash|href)|document\\.(referrer|URL|documentURI)|' +
  'window\\.name|URLSearchParams';

function generate(ctx) {
  const dir = u.outDirQ(ctx);
  const sinkOut = u.outFile(ctx, 'domxss_sinks');
  const srcOut = u.outFile(ctx, 'domxss_sources');
  const commands = [
    {
      comment: `Grep every harvested JS in the project folder for dangerous SINKS (line-numbered)`,
      command: `grep -rEn ${u.q(SINKS)} ${dir} --include='*.js' ${u.teeTo(ctx, 'domxss_sinks')}`.replace(/\s+/g, ' ').trim(),
    },
    {
      comment: `Grep the same files for user-controllable SOURCES`,
      command: `grep -rEn ${u.q(SOURCES)} ${dir} --include='*.js' ${u.teeTo(ctx, 'domxss_sources')}`.replace(/\s+/g, ' ').trim(),
    },
    {
      comment: `Prioritise: files that contain BOTH a source and a sink (likely taint flow)`,
      command: `comm -12 <(cut -d: -f1 ${sinkOut} | sort -u) <(cut -d: -f1 ${srcOut} | sort -u)`,
    },
    {
      comment: `Confirm a candidate dynamically (needs a live reflecting URL/param): dalfox`,
      command: `# dalfox url 'https://${ctx.host}/page?param=FUZZ' --deep-domxss`,
    },
  ];
  return { tool: 'domxss', commands };
}

module.exports = { generate };
