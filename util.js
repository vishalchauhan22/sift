'use strict';

const path = require('path');

/**
 * util.js — shared helpers used by every generator.
 *
 * Pure string helpers only. No network, no process spawning. The generators
 * build FUZZ-injected URLs/bodies and translate the chosen throttle into
 * per-tool flags through this module so each tool file stays tiny.
 */

/** Shell-quote a value for safe copy-paste (single quotes, POSIX). */
function q(value) {
  const s = String(value);
  return `'${s.replace(/'/g, `'\\''`)}'`;
}

/** Is the fuzz target located in the request body? */
function targetInBody(ctx) {
  return ctx.paramLocation === 'body';
}

/**
 * Build a query string, URL-encoding every name/value, but dropping the marker
 * (unencoded) at the target param when it lives in the query.
 */
function buildQueryString(ctx, marker) {
  return ctx.queryParams
    .map((p) => {
      if (ctx.paramLocation === 'query' && p.name === ctx.targetParam) {
        return `${encodeURIComponent(p.name)}=${marker}`;
      }
      return `${encodeURIComponent(p.name)}=${encodeURIComponent(p.value)}`;
    })
    .join('&');
}

/**
 * Full absolute URL. When the target param is in the query the marker (default
 * "FUZZ") is inserted there; otherwise the URL keeps original query values.
 */
function buildUrl(ctx, marker = 'FUZZ') {
  const useMarker = ctx.paramLocation === 'query' ? marker : null;
  const qs = buildQueryString(
    // if target is in body, buildQueryString sees no matching target -> all encoded
    ctx,
    useMarker || 'FUZZ'
  );
  const base = `${ctx.scheme}://${ctx.host}${ctx.path}`;
  return qs ? `${base}?${qs}` : base;
}

/** URL without any FUZZ marker (all params encoded as-is). */
function plainUrl(ctx) {
  const qs = ctx.queryParams
    .map((p) => `${encodeURIComponent(p.name)}=${encodeURIComponent(p.value)}`)
    .join('&');
  const base = `${ctx.scheme}://${ctx.host}${ctx.path}`;
  return qs ? `${base}?${qs}` : base;
}

/**
 * Body string. When the target param is in the body, inject the marker there;
 * other body params are preserved and URL-encoded.
 */
function buildBody(ctx, marker = 'FUZZ') {
  if (ctx.bodyType !== 'form') return ctx.body || '';
  return ctx.bodyParams
    .map((p) => {
      if (ctx.paramLocation === 'body' && p.name === ctx.targetParam) {
        return `${encodeURIComponent(p.name)}=${marker}`;
      }
      return `${encodeURIComponent(p.name)}=${encodeURIComponent(p.value)}`;
    })
    .join('&');
}

/** Body with all params encoded, no marker. */
function plainBody(ctx) {
  if (ctx.bodyType !== 'form') return ctx.body || '';
  return ctx.bodyParams
    .map((p) => `${encodeURIComponent(p.name)}=${encodeURIComponent(p.value)}`)
    .join('&');
}

/** Replace the target BODY param's value with an arbitrary string (e.g. OOB URL). */
function buildBodyValue(ctx, value) {
  if (ctx.bodyType !== 'form') return ctx.body || '';
  return ctx.bodyParams
    .map((p) => {
      if (ctx.paramLocation === 'body' && p.name === ctx.targetParam) {
        return `${encodeURIComponent(p.name)}=${encodeURIComponent(value)}`;
      }
      return `${encodeURIComponent(p.name)}=${encodeURIComponent(p.value)}`;
    })
    .join('&');
}

/** Replace the target param's value with an arbitrary string (e.g. OOB URL). */
function urlWithParamValue(ctx, value) {
  const enc = encodeURIComponent(value);
  const qs = ctx.queryParams
    .map((p) => {
      if (ctx.paramLocation === 'query' && p.name === ctx.targetParam) {
        return `${encodeURIComponent(p.name)}=${enc}`;
      }
      return `${encodeURIComponent(p.name)}=${encodeURIComponent(p.value)}`;
    })
    .join('&');
  const base = `${ctx.scheme}://${ctx.host}${ctx.path}`;
  return qs ? `${base}?${qs}` : base;
}

/**
 * Translate the throttle into concrete numbers each generator can map to its
 * own flag. Input: { mode: 'rps' | 'delay', value: number }.
 */
function normalizeThrottle(t) {
  const throttle = t || { mode: 'rps', value: 5 };
  let rps;
  let delaySec;
  if (throttle.mode === 'delay') {
    delaySec = Number(throttle.value) || 0;
    rps = delaySec > 0 ? Math.max(1, Math.round(1 / delaySec)) : 1;
  } else {
    rps = Number(throttle.value) || 1;
    delaySec = rps > 0 ? Number((1 / rps).toFixed(3)) : 0;
  }
  return { rps, delaySec, delayMs: Math.round(delaySec * 1000) };
}

/** Extra -H header flags for method/content-type when fuzzing a body. */
function bodyHeaderFlags(ctx) {
  if (!targetInBody(ctx) && ctx.method === 'GET') return '';
  const ct =
    (ctx.headers.find((h) => h.name.toLowerCase() === 'content-type') || {}).value ||
    'application/x-www-form-urlencoded';
  return `-H ${q('Content-Type: ' + ct)}`;
}

// --- output routing -------------------------------------------------------

/** Make a host/param string safe for a filename (drop ":", "/", etc.). */
function sanitize(s) {
  return String(s || 'target').replace(/[^a-zA-Z0-9._-]+/g, '_');
}

/**
 * A shell-quoted result-file path inside the project's output dir, named
 * <label>_<host>_<runId>.<ext>. Every generator routes its -o/output here so
 * all artifacts land in one project folder with the run timestamp.
 */
function outFile(ctx, label, ext = 'txt') {
  const name = `${label}_${sanitize(ctx.host)}_${ctx.runId || 'run'}.${ext}`;
  return q(path.join(ctx.outDir || '.', name));
}

/** Shell-quoted project output directory (for tools that take a dir). */
function outDirQ(ctx) {
  return q(ctx.outDir || '.');
}

/** Append a `| tee <file>` so tools without a native -o still save output. */
function teeTo(ctx, label) {
  return `2>&1 | tee ${outFile(ctx, label, 'log')}`;
}

module.exports = {
  q,
  targetInBody,
  buildUrl,
  plainUrl,
  buildBody,
  plainBody,
  buildBodyValue,
  urlWithParamValue,
  normalizeThrottle,
  bodyHeaderFlags,
  sanitize,
  outFile,
  outDirQ,
  teeTo,
};
