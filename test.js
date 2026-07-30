'use strict';
// Smoke test for the pure generation pipeline (no prompts, no execution).
const fs = require('fs');
const path = require('path');
const { parseRequest } = require('./parser');
const { labelAll } = require('./labels');
const config = require('./config');
const { buildAll, groupByTool, renderOutput } = require('./cli');

const raw = fs.readFileSync(path.join(__dirname, 'request.log'), 'utf8');
const parsed = parseRequest(raw);
const labelled = labelAll(parsed.queryParams, parsed.bodyParams);

console.log('Param labels:');
labelled.forEach((p) => console.log(`  ${p.name} (${p.location}) -> ${p.label}`));

const base = {
  method: parsed.method,
  scheme: parsed.scheme,
  host: parsed.host,
  path: parsed.path,
  url: parsed.url,
  headers: parsed.headers,
  queryParams: parsed.queryParams,
  bodyParams: parsed.bodyParams,
  bodyType: parsed.bodyType,
  body: parsed.body,
  wordlist: config.wordlistFor('sqli'),
  throttle: { mode: 'rps', value: 5 },
  oob: 'https://abc123.oast.fun',
};

// pick id (query) and query (body) as targets
const selected = [
  { name: 'id', location: 'query' },
  { name: 'query', location: 'body' },
];

for (const type of ['sqli', 'redirect-ssrf', 'param-discovery', 'broad']) {
  const wl = config.wordlistFor(type);
  const blocks = buildAll({ ...base, wordlist: wl }, type, selected);
  const groups = groupByTool(blocks);
  const meta = {
    url: parsed.url,
    host: parsed.host,
    scopeConfirmed: true,
    assessmentType: type,
    paramsSummary: selected.map((p) => `${p.name} (${p.location})`).join(', '),
    wordlist: wl,
    throttleSummary: '5 req/s',
    oob: base.oob,
    generatedAt: '2026-07-30T00:00:00.000Z',
  };
  console.log('\n\n########## ' + type + ' ##########');
  console.log(renderOutput(groups, meta));
}
