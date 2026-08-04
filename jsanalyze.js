'use strict';

/**
 * jsanalyze.js — the ONLY part of this project that touches the network.
 *
 * It performs a single passive GET of a JavaScript URL the operator pasted,
 * saves the raw file, and runs LinkFinder/SecretFinder-style regex extraction
 * LOCALLY (no execution of external tools, no crawling, no writes to the
 * target). This is the deliberate, scoped exception to the tool's otherwise
 * strict "never sends traffic" rule — and it only runs after the scope gate and
 * an explicit operator confirmation.
 *
 * Everything else in the app remains a pure generator.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { sanitize } = require('./util');

/** GET a URL as text, following a few redirects, with a size + time cap. */
function fetchText(target, opts = {}) {
  const maxBytes = opts.maxBytes || 8 * 1024 * 1024;
  const timeout = opts.timeout || 15000;
  let redirectsLeft = opts.redirects == null ? 4 : opts.redirects;

  return new Promise((resolve, reject) => {
    const go = (urlStr) => {
      let u;
      try {
        u = new URL(urlStr);
      } catch (e) {
        return reject(new Error(`invalid URL: ${urlStr}`));
      }
      const lib = u.protocol === 'http:' ? http : https;
      const req = lib.get(
        u,
        {
          timeout,
          headers: {
            'User-Agent': 'sift-jsanalyze/1.0 (passive; single GET)',
            Accept: '*/*',
          },
        },
        (res) => {
          const { statusCode, headers } = res;
          if ([301, 302, 303, 307, 308].includes(statusCode) && headers.location) {
            res.resume();
            if (redirectsLeft-- <= 0) return reject(new Error('too many redirects'));
            return go(new URL(headers.location, u).toString());
          }
          if (statusCode !== 200) {
            res.resume();
            return reject(new Error(`HTTP ${statusCode}`));
          }
          let size = 0;
          const chunks = [];
          res.on('data', (c) => {
            size += c.length;
            if (size > maxBytes) {
              req.destroy();
              return reject(new Error(`response exceeds ${maxBytes} bytes`));
            }
            chunks.push(c);
          });
          res.on('end', () =>
            resolve({ body: Buffer.concat(chunks).toString('utf8'), finalUrl: u.toString() })
          );
        }
      );
      req.on('timeout', () => {
        req.destroy();
        reject(new Error(`timeout after ${timeout}ms`));
      });
      req.on('error', reject);
    };
    go(target);
  });
}

// LinkFinder-style endpoint regex (trimmed): quoted paths, URLs, and file refs.
const ENDPOINT_RE = new RegExp(
  '(?:"|\'|`)(' +
    '(?:[a-zA-Z]{1,10}://|//)[^"\'`/]{1,}\\.[a-zA-Z]{2,}[^"\'`]{0,}|' + // absolute URLs
    '(?:/|\\.\\./|\\./)[a-zA-Z0-9_\\-/]{1,}[^"\'`><,;| *()%$^\\[\\]]{0,}|' + // rooted/relative paths
    '[a-zA-Z0-9_\\-/]{1,}/[a-zA-Z0-9_\\-/]{1,}\\.(?:[a-zA-Z]{1,4}|action)(?:[?/][^"\'`]{0,}|)|' + // dir/file.ext
    '[a-zA-Z0-9_\\-]{1,}\\.(?:php|asp|aspx|jsp|json|action|html|js|txt|xml)(?:\\?[^"\'`]{0,}|)' + // file.ext
    ')(?:"|\'|`)',
  'g'
);

// High-signal secret patterns (SecretFinder-style, curated). `structured: true`
// marks patterns whose shape alone is high-confidence (an AWS key looks like
// nothing else), so we don't gate them behind an entropy check.
const SECRET_PATTERNS = [
  { name: 'AWS Access Key ID', re: /\bAKIA[0-9A-Z]{16}\b/g, structured: true },
  { name: 'Google API Key', re: /\bAIza[0-9A-Za-z_\-]{35}\b/g, structured: true },
  { name: 'Google OAuth ID', re: /\b[0-9]+-[0-9A-Za-z_]{32}\.apps\.googleusercontent\.com\b/g, structured: true },
  { name: 'Firebase URL', re: /\bhttps:\/\/[a-z0-9.\-]+\.firebaseio\.com\b/gi, structured: true },
  { name: 'Slack Token', re: /\bxox[baprs]-[0-9A-Za-z-]{10,}\b/g, structured: true },
  { name: 'Slack Webhook', re: /\bhttps:\/\/hooks\.slack\.com\/services\/[A-Za-z0-9_\/]+/g, structured: true },
  { name: 'Stripe Key', re: /\b(?:sk|pk|rk)_(?:live|test)_[0-9A-Za-z]{16,}\b/g, structured: true },
  { name: 'GitHub Token', re: /\bgh[pousr]_[0-9A-Za-z]{36,}\b/g, structured: true },
  { name: 'JWT', re: /\beyJ[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\b/g, structured: true },
  { name: 'Private Key Header', re: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/g, structured: true },
  // Lower-confidence assignments — the captured value is entropy-checked below.
  { name: 'Generic api_key assignment', re: /(?:api[_-]?key|apikey|secret|token|access[_-]?token)["'`\s:=]{1,4}([0-9A-Za-z_\-]{12,})/gi, valueGroup: 1 },
  { name: 'Authorization Bearer', re: /[Bb]earer\s+([0-9A-Za-z_\-\.=]{16,})/g, valueGroup: 1 },
];

// DOM-XSS taint model: user-controllable Sources feeding dangerous Sinks.
const DOM_SOURCES = [
  { name: 'location.search', re: /location\s*\.\s*search/g },
  { name: 'location.hash', re: /location\s*\.\s*hash/g },
  { name: 'location.href', re: /location\s*\.\s*href/g },
  { name: 'location (bare)', re: /\bdocument\s*\.\s*(?:URL|documentURI|baseURI)\b/g },
  { name: 'document.referrer', re: /document\s*\.\s*referrer/g },
  { name: 'window.name', re: /window\s*\.\s*name/g },
  { name: 'postMessage data', re: /\.\s*data\b(?=[^=]{0,40}(?:message|event))/g },
  { name: 'URLSearchParams', re: /new\s+URLSearchParams/g },
];
const DOM_SINKS = [
  { name: 'eval()', re: /\beval\s*\(/g },
  { name: 'Function()', re: /\bnew\s+Function\s*\(/g },
  { name: 'setTimeout(string)', re: /\bset(?:Timeout|Interval)\s*\(\s*['"`]/g },
  { name: 'document.write()', re: /document\s*\.\s*write(?:ln)?\s*\(/g },
  { name: '.innerHTML', re: /\.\s*innerHTML\s*=/g },
  { name: '.outerHTML', re: /\.\s*outerHTML\s*=/g },
  { name: 'insertAdjacentHTML', re: /\.\s*insertAdjacentHTML\s*\(/g },
  { name: 'jQuery .html()', re: /\)\s*\.\s*html\s*\(/g },
  { name: 'dangerouslySetInnerHTML (React)', re: /dangerouslySetInnerHTML/g },
  { name: 'v-html (Vue)', re: /v-html/g },
  { name: '.src assignment', re: /\.\s*src\s*=/g },
];

/** Shannon entropy (bits/char) — high for random keys, low for words/paths. */
function shannonEntropy(str) {
  if (!str) return 0;
  const freq = Object.create(null);
  for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;
  let bits = 0;
  const len = str.length;
  for (const ch in freq) {
    const p = freq[ch] / len;
    bits -= p * Math.log2(p);
  }
  return bits;
}

/** Map an entropy score (bits/char) to a coarse severity for triage. */
function severityFor(entropy) {
  if (entropy >= 4.5) return 'high';
  if (entropy >= 3.8) return 'medium';
  return 'low';
}

function extractEndpoints(body) {
  const out = new Set();
  let m;
  ENDPOINT_RE.lastIndex = 0;
  while ((m = ENDPOINT_RE.exec(body)) !== null) {
    const val = m[1].trim();
    if (val && val.length <= 400) out.add(val);
  }
  return [...out].sort();
}

function extractSecrets(body) {
  const hits = [];
  for (const p of SECRET_PATTERNS) {
    p.re.lastIndex = 0;
    let m;
    while ((m = p.re.exec(body)) !== null) {
      // the "value" is the captured group for loose patterns, else the whole match
      const value = p.valueGroup != null ? m[p.valueGroup] : m[0];
      const entropy = Number(shannonEntropy(value).toFixed(2));
      // Loose (unstructured) patterns must clear an entropy floor to reduce the
      // "token=changeme" style false positives; structured shapes always pass.
      if (!p.structured && entropy < 3.2) continue;
      hits.push({
        type: p.name,
        match: m[0].slice(0, 200),
        entropy,
        severity: p.structured ? 'high' : severityFor(entropy),
      });
      if (p.re.lastIndex === m.index) p.re.lastIndex++; // guard zero-width
    }
  }
  // Standalone high-entropy string literals not already caught above.
  for (const h of extractHighEntropy(body)) hits.push(h);

  // de-dup on type+match, keep the highest-severity sighting
  const rank = { high: 3, medium: 2, low: 1 };
  const byKey = new Map();
  for (const h of hits) {
    const k = h.type + '|' + h.match;
    const prev = byKey.get(k);
    if (!prev || rank[h.severity] > rank[prev.severity]) byKey.set(k, h);
  }
  return [...byKey.values()].sort((a, b) => rank[b.severity] - rank[a.severity]);
}

// Quoted string literals that look like random blobs (base64/hex keys).
const STRING_LITERAL_RE = /(?:"|'|`)([0-9A-Za-z_\-+/=.]{20,120})(?:"|'|`)/g;

/** Flag long, high-entropy string literals that no named pattern matched. */
function extractHighEntropy(body) {
  const out = [];
  STRING_LITERAL_RE.lastIndex = 0;
  let m;
  while ((m = STRING_LITERAL_RE.exec(body)) !== null) {
    const val = m[1];
    // skip obvious non-secrets: paths, dotted identifiers, plain words
    if (val.includes('/') || /^[a-z]+(\.[a-z]+)+$/i.test(val)) continue;
    const entropy = shannonEntropy(val);
    if (entropy < 4.0) continue; // words/URLs sit well below this
    out.push({
      type: 'High-entropy string',
      match: val.slice(0, 200),
      entropy: Number(entropy.toFixed(2)),
      severity: severityFor(entropy),
    });
  }
  return out;
}

/**
 * DOM-XSS static pass: locate Sources and Sinks with line numbers. A line (or
 * its immediate neighbours) carrying BOTH is flagged as a candidate taint flow.
 */
function extractDomXss(body) {
  const lines = body.split(/\r?\n/);
  const sources = [];
  const sinks = [];
  const scan = (patterns, kind, bucket) => {
    for (const p of patterns) {
      lines.forEach((line, i) => {
        p.re.lastIndex = 0;
        if (p.re.test(line)) {
          bucket.push({ kind, name: p.name, line: i + 1, snippet: line.trim().slice(0, 160) });
        }
      });
    }
  };
  scan(DOM_SOURCES, 'source', sources);
  scan(DOM_SINKS, 'sink', sinks);

  // Candidate flows: a sink within 2 lines of a source.
  const flows = [];
  for (const sink of sinks) {
    const near = sources.find((s) => Math.abs(s.line - sink.line) <= 2);
    if (near) flows.push({ sourceName: near.name, sink: sink.name, line: sink.line, snippet: sink.snippet });
  }
  return { sources, sinks, flows };
}

/**
 * Source-map discovery: honour any `//# sourceMappingURL=` comment and always
 * offer the conventional `<file>.map` sibling as a probe candidate. Returns
 * absolute URLs (relative comment targets resolved against the JS URL).
 */
function extractSourceMaps(body, jsUrl) {
  const out = new Set();
  const re = /\/\/[#@]\s*sourceMappingURL=(\S+)/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    const ref = m[1].trim();
    if (ref.startsWith('data:')) {
      out.add('(inline data: source map — decode base64 from the JS itself)');
      continue;
    }
    try {
      out.add(jsUrl ? new URL(ref, jsUrl).toString() : ref);
    } catch (_) {
      out.add(ref);
    }
  }
  if (jsUrl && /\.js(\?|$)/i.test(jsUrl)) {
    out.add(jsUrl.replace(/(\.js)(\?.*)?$/i, '$1.map'));
  }
  return [...out];
}

/**
 * Fetch a JS URL and passively extract endpoints + secrets into the project
 * folder. Returns a summary object.
 */
async function analyze(jsUrl, outDir, runId, host) {
  const { body, finalUrl } = await fetchText(jsUrl);
  const base = `${sanitize(host)}_${runId}`;

  const rawPath = path.join(outDir, `js_${base}.js`);
  const endpointsPath = path.join(outDir, `jsanalyze_endpoints_${base}.txt`);
  const secretsPath = path.join(outDir, `jsanalyze_secrets_${base}.txt`);
  const domxssPath = path.join(outDir, `jsanalyze_domxss_${base}.txt`);
  const sourcemapsPath = path.join(outDir, `jsanalyze_sourcemaps_${base}.txt`);

  fs.writeFileSync(rawPath, body, 'utf8');

  const endpoints = extractEndpoints(body);
  const secrets = extractSecrets(body);
  const domxss = extractDomXss(body);
  const sourceMaps = extractSourceMaps(body, finalUrl);

  fs.writeFileSync(
    endpointsPath,
    `# passive endpoint extraction from ${finalUrl}\n# run ${runId} — ${endpoints.length} unique\n\n` +
      endpoints.join('\n') +
      '\n',
    'utf8'
  );
  fs.writeFileSync(
    secretsPath,
    `# passive secret candidates from ${finalUrl}\n# run ${runId} — ${secrets.length} hits (VERIFY — regex has false positives)\n` +
      `# columns: [severity] [type] (entropy=bits/char) match\n\n` +
      secrets
        .map((s) => `[${s.severity}] [${s.type}] (entropy=${s.entropy != null ? s.entropy : 'n/a'}) ${s.match}`)
        .join('\n') +
      '\n',
    'utf8'
  );
  fs.writeFileSync(
    domxssPath,
    `# passive DOM-XSS static pass from ${finalUrl}\n# run ${runId} — ` +
      `${domxss.sources.length} sources, ${domxss.sinks.length} sinks, ${domxss.flows.length} candidate flows\n` +
      `# CANDIDATE FLOWS (sink within 2 lines of a source) — highest priority:\n\n` +
      (domxss.flows.length
        ? domxss.flows.map((f) => `L${f.line}  ${f.sourceName} -> ${f.sink}\n    ${f.snippet}`).join('\n')
        : '(none)') +
      `\n\n# ALL SINKS:\n` +
      (domxss.sinks.map((s) => `L${s.line}  [${s.name}]  ${s.snippet}`).join('\n') || '(none)') +
      `\n\n# ALL SOURCES:\n` +
      (domxss.sources.map((s) => `L${s.line}  [${s.name}]  ${s.snippet}`).join('\n') || '(none)') +
      '\n',
    'utf8'
  );
  fs.writeFileSync(
    sourcemapsPath,
    `# source-map candidates for ${finalUrl}\n# run ${runId} — ${sourceMaps.length} candidate(s)\n` +
      `# a live .map exposes original, commented source — reconstruct with the sourcemapper command\n\n` +
      (sourceMaps.join('\n') || '(none)') +
      '\n',
    'utf8'
  );

  return {
    finalUrl,
    bytes: Buffer.byteLength(body, 'utf8'),
    endpoints,
    secrets,
    domxss,
    sourceMaps,
    rawPath,
    endpointsPath,
    secretsPath,
    domxssPath,
    sourcemapsPath,
  };
}

module.exports = {
  analyze,
  fetchText,
  extractEndpoints,
  extractSecrets,
  extractHighEntropy,
  extractDomXss,
  extractSourceMaps,
  shannonEntropy,
};
