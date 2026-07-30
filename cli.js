#!/usr/bin/env node
'use strict';

/**
 * cli.js — the command composer.
 *
 * SAFETY: This program is a GENERATOR. It parses a saved HTTP request and
 * PRINTS copy-pasteable tool commands. It NEVER spawns, execs, or otherwise
 * runs any security tool, and it never sends traffic to the target.
 *
 * Interaction uses @inquirer/prompts (lazy-required inside main() so the pure
 * generation functions below can be unit-tested without the dependency).
 */

const fs = require('fs');
const path = require('path');

const { parseRequest } = require('./parser');
const { labelAll } = require('./labels');
const config = require('./config');

// one generator module per tool
const ffuf = require('./generators/ffuf');
const sqlmap = require('./generators/sqlmap');
const ghauri = require('./generators/ghauri');
const dalfox = require('./generators/dalfox');
const arjun = require('./generators/arjun');
const x8 = require('./generators/x8');
const paramspider = require('./generators/paramspider');
const commix = require('./generators/commix');
const tplmap = require('./generators/tplmap');
const nuclei = require('./generators/nuclei');
const crlfuzz = require('./generators/crlfuzz');
const feroxbuster = require('./generators/feroxbuster');

const ASSESSMENT_TYPES = [
  'param-discovery',
  'sqli',
  'xss',
  'command-injection',
  'ssti',
  'path-traversal',
  'redirect-ssrf',
  'crlf',
  'broad',
];

// Ordered broad -> deep. scope 'endpoint' = run once; 'param' = run per target.
const PLANS = {
  'param-discovery': [
    { scope: 'endpoint', run: (c) => arjun.generate(c) },
    { scope: 'endpoint', run: (c) => x8.generate(c) },
    { scope: 'endpoint', run: (c) => paramspider.generate(c) },
  ],
  sqli: [
    { scope: 'param', run: (c) => ffuf.sqli(c) },
    { scope: 'param', run: (c) => sqlmap.generate(c) },
    { scope: 'param', run: (c) => ghauri.generate(c) },
  ],
  xss: [
    { scope: 'param', run: (c) => ffuf.xss(c) },
    { scope: 'param', run: (c) => dalfox.generate(c) },
  ],
  'command-injection': [
    { scope: 'param', run: (c) => ffuf.commandInjection(c) },
    { scope: 'param', run: (c) => commix.generate(c) },
  ],
  ssti: [
    { scope: 'param', run: (c) => ffuf.ssti(c) },
    { scope: 'param', run: (c) => tplmap.generate(c) },
  ],
  'path-traversal': [{ scope: 'param', run: (c) => ffuf.pathTraversal(c) }],
  'redirect-ssrf': [{ scope: 'param', run: (c) => ffuf.redirectSsrf(c) }],
  crlf: [
    { scope: 'endpoint', run: (c) => crlfuzz.generate(c) },
    { scope: 'param', run: (c) => ffuf.crlf(c) },
  ],
  broad: [
    { scope: 'endpoint', run: (c) => nuclei.generate(c) },
    { scope: 'endpoint', run: (c) => feroxbuster.generate(c) },
    { scope: 'endpoint', run: (c) => arjun.generate(c) },
  ],
};

// assessment types that operate on the endpoint, not a chosen parameter
const ENDPOINT_ONLY = new Set(['param-discovery', 'broad']);

/** Merge base request context with a single fuzz-target selection. */
function makeCtx(base, target) {
  return {
    ...base,
    targetParam: target ? target.name : null,
    paramLocation: target ? target.location : null,
  };
}

/**
 * Pure generation: given a fully-resolved base context, assessment type and
 * the selected params, return an ordered list of tool blocks.
 */
function buildAll(base, assessmentType, selectedParams) {
  const plan = PLANS[assessmentType] || [];
  const blocks = [];
  for (const step of plan) {
    if (step.scope === 'endpoint') {
      blocks.push(step.run(makeCtx(base, selectedParams[0] || null)));
    } else {
      for (const sp of selectedParams) {
        blocks.push(step.run(makeCtx(base, sp)));
      }
    }
  }
  return blocks;
}

/** Group blocks by tool, preserving first-appearance (broad->deep) order. */
function groupByTool(blocks) {
  const order = [];
  const byTool = new Map();
  for (const b of blocks) {
    if (!byTool.has(b.tool)) {
      byTool.set(b.tool, []);
      order.push(b.tool);
    }
    byTool.get(b.tool).push(...b.commands);
  }
  return order.map((tool) => ({ tool, commands: byTool.get(tool) }));
}

/** Render the final text (console + commands.txt share this). */
function renderOutput(groups, meta) {
  const bar = '='.repeat(64);
  const dash = '-'.repeat(64);
  const lines = [];
  lines.push(bar);
  lines.push(' command-composer — generated commands (GENERATOR ONLY)');
  lines.push(dash);
  lines.push(` Target        : ${meta.url}`);
  lines.push(` Host (scope)  : ${meta.host}`);
  lines.push(` Scope confirm : ${meta.scopeConfirmed ? 'CONFIRMED (operator typed the host back)' : 'NOT CONFIRMED'}`);
  lines.push(` Assessment    : ${meta.assessmentType}`);
  lines.push(` Params        : ${meta.paramsSummary || '(endpoint-level)'}`);
  lines.push(` Wordlist      : ${meta.wordlist}`);
  lines.push(` Throttle      : ${meta.throttleSummary}`);
  lines.push(` OOB canary    : ${meta.oob || '(none)'}`);
  lines.push(` Generated     : ${meta.generatedAt}`);
  lines.push(dash);
  lines.push(' Nothing was executed — review before running.');
  lines.push(bar);
  lines.push('');
  for (const g of groups) {
    lines.push(`##### ${g.tool} #####`);
    for (const c of g.commands) {
      lines.push(`# ${c.comment}`);
      lines.push(c.command);
      lines.push('');
    }
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Interactive driver
// ---------------------------------------------------------------------------

async function main() {
  const { input, select, checkbox, confirm } = require('@inquirer/prompts');

  console.log('command-composer — copy-paste generator for authorized pentest work.');
  console.log('This tool never executes anything; it only prints commands.\n');

  // 1) request.log path
  const reqPath = await input({
    message: 'Path to raw HTTP request file:',
    default: process.argv[2] || './request.log',
  });
  const raw = fs.readFileSync(path.resolve(reqPath), 'utf8');
  const parsed = parseRequest(raw);

  // 2) show + confirm parse
  console.log('\n--- Parsed request ------------------------------------------');
  console.log(`  method : ${parsed.method}`);
  console.log(`  url    : ${parsed.url}`);
  console.log(`  host   : ${parsed.host}`);
  console.log(`  body   : ${parsed.bodyType}`);
  console.log('  query params:');
  parsed.queryParams.forEach((p) => console.log(`    - ${p.name} = ${p.value}`));
  console.log('  body params :');
  parsed.bodyParams.forEach((p) => console.log(`    - ${p.name} = ${p.value}`));
  console.log('-------------------------------------------------------------\n');

  const ok = await confirm({ message: 'Is the parsed request correct?', default: true });
  if (!ok) {
    console.log('Aborted. Fix request.log and re-run.');
    return;
  }

  // 3) scope gate — type the host back
  if (!parsed.host) {
    console.log('No Host header found — cannot confirm scope. Aborting.');
    return;
  }
  console.log(`\nSCOPE GATE. Target host: ${parsed.host}`);
  const typed = await input({
    message: `Type the host back to confirm you are AUTHORIZED to test it:`,
  });
  if (typed.trim() !== parsed.host.trim()) {
    console.log(`Host mismatch ("${typed}" != "${parsed.host}"). Aborting — scope not confirmed.`);
    return;
  }
  console.log('Scope confirmed.\n');

  // 4) assessment type
  const assessmentType = await select({
    message: 'Assessment type:',
    choices: ASSESSMENT_TYPES.map((t) => ({ name: t, value: t })),
  });

  // 5) labelled params -> multi-select
  const labelled = labelAll(parsed.queryParams, parsed.bodyParams);
  let selectedParams = [];
  if (labelled.length > 0) {
    selectedParams = await checkbox({
      message: 'Select parameters to target:',
      choices: labelled.map((p) => ({
        name: `${p.name}  [${p.label}]  (${p.location})`,
        value: { name: p.name, location: p.location },
        checked: ['id-like', 'path-like', 'redirect-like'].includes(p.label),
      })),
    });
  }
  if (selectedParams.length === 0 && !ENDPOINT_ONLY.has(assessmentType)) {
    console.log('No parameters selected for a param-based assessment. Aborting.');
    return;
  }

  // 6) wordlist (per-type default from config, override allowed)
  const wordlist = await input({
    message: 'Wordlist path:',
    default: config.wordlistFor(assessmentType),
  });

  // 7) throttle
  const dflt = config.defaultThrottle();
  const throttleMode = await select({
    message: 'Throttle mode:',
    choices: [
      { name: 'requests per second (cap)', value: 'rps' },
      { name: 'delay seconds between requests', value: 'delay' },
    ],
    default: dflt.mode,
  });
  const throttleValueRaw = await input({
    message: throttleMode === 'rps' ? 'Max requests/sec:' : 'Delay seconds:',
    default: String(dflt.mode === throttleMode ? dflt.value : throttleMode === 'rps' ? 5 : 0.2),
  });
  const throttle = { mode: throttleMode, value: Number(throttleValueRaw) };

  // 7b) optional OOB / canary for blind classes
  const oob = await input({
    message: 'OOB / canary URL (interactsh/collaborator) — optional, blank to skip:',
    default: '',
  });

  // 8) build context + generate
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
    wordlist,
    throttle,
    oob: oob.trim() || null,
  };

  const blocks = buildAll(base, assessmentType, selectedParams);
  const groups = groupByTool(blocks);

  const meta = {
    url: parsed.url,
    host: parsed.host,
    scopeConfirmed: true,
    assessmentType,
    paramsSummary: selectedParams.map((p) => `${p.name} (${p.location})`).join(', '),
    wordlist,
    throttleSummary:
      throttle.mode === 'rps' ? `${throttle.value} req/s` : `${throttle.value}s delay`,
    oob: base.oob,
    generatedAt: new Date().toISOString(),
  };

  const output = renderOutput(groups, meta);
  console.log('\n' + output);

  const outPath = path.resolve('commands.txt');
  fs.writeFileSync(outPath, output + '\n', 'utf8');
  console.log(`\nSaved to ${outPath}`);
  console.log('Reminder: nothing was executed. Review every command before running.');
}

// export pure functions for testing; only run prompts when invoked directly
module.exports = { buildAll, groupByTool, renderOutput, PLANS, ASSESSMENT_TYPES };

if (require.main === module) {
  main().catch((err) => {
    if (err && err.name === 'ExitPromptError') {
      console.log('\nCancelled.');
      return;
    }
    console.error('Error:', err.message);
    process.exit(1);
  });
}
