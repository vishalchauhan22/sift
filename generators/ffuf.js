'use strict';

/**
 * generators/ffuf.js
 *
 * Flags used:
 *   -u <url>            target URL (FUZZ marks the injection point)
 *   -w <wordlist>       payload wordlist
 *   -X <method>         HTTP method (for body fuzzing)
 *   -d <data>           request body (FUZZ marks the injection point)
 *   -H <header>         extra header (Content-Type when fuzzing a body)
 *   -ac                 auto-calibrate filtering (noise reduction) [sqli]
 *   -mr <regex>         match response regex (SSTI 49, LFI root:x:, SSRF token)
 *   -mc <codes>         match status codes (redirect discovery)
 *   -rate <n>           max requests/second  (throttle: requests/sec)
 *   -p <sec>            pause seconds between requests (throttle: delay)
 *   -o <file> -of json  write JSON results into the project folder
 *
 * TODO: verify against installed `ffuf --help` (flag names drift between
 *       versions; e.g. `-rate` vs `-rate-limit`, `-p` vs `-p "0.1"`).
 */

const u = require('../util');

/** Build the throttle flag ffuf understands from the normalized throttle. */
function throttleFlag(ctx) {
  const t = u.normalizeThrottle(ctx.throttle);
  if (ctx.throttle && ctx.throttle.mode === 'delay') {
    return `-p ${t.delaySec}`; // seconds between requests
  }
  return `-rate ${t.rps}`; // requests per second cap
}

/** Common transport flags: URL, method, body, content-type header. */
function transport(ctx, marker) {
  if (u.targetInBody(ctx)) {
    const url = u.plainUrl(ctx);
    const body = u.buildBody(ctx, marker);
    return `-u ${u.q(url)} -X ${ctx.method} -d ${u.q(body)} ${u.bodyHeaderFlags(ctx)}`.trim();
  }
  // target is in the query string
  const url = u.buildUrl(ctx, marker);
  if (ctx.method === 'GET') return `-u ${u.q(url)}`;
  // non-GET: keep the original (unfuzzed) body so the request stays valid
  const bodyPart =
    ctx.bodyType === 'form'
      ? `-d ${u.q(u.plainBody(ctx))} ${u.bodyHeaderFlags(ctx)}`
      : '';
  return `-u ${u.q(url)} -X ${ctx.method} ${bodyPart}`.trim();
}

function block(comment, command) {
  return { tool: 'ffuf', commands: [{ comment, command: command.replace(/\s+/g, ' ').trim() }] };
}

/** ffuf JSON output routed into the project folder, unique per class+param. */
function outFlag(ctx, kind) {
  const label = `ffuf_${kind}_${u.sanitize(ctx.targetParam || 'endpoint')}`;
  return `-o ${u.outFile(ctx, label, 'json')} -of json`;
}

// --- one preset per assessment class -------------------------------------

function sqli(ctx) {
  const cmd = `ffuf ${transport(ctx, 'FUZZ')} -w ${u.q(ctx.wordlist)} -ac ${throttleFlag(ctx)} ${outFlag(ctx, 'sqli')}`;
  return block(
    `ffuf: fuzz "${ctx.targetParam}" with SQLi payloads; -ac auto-filters baseline noise (broad triage before sqlmap)`,
    cmd
  );
}

function xss(ctx) {
  const cmd = `ffuf ${transport(ctx, 'FUZZ')} -w ${u.q(ctx.wordlist)} ${throttleFlag(ctx)} ${outFlag(ctx, 'xss')}`;
  return block(
    `ffuf: reflect XSS payloads through "${ctx.targetParam}"; grep responses for un-encoded reflections before dalfox`,
    cmd
  );
}

function commandInjection(ctx) {
  const canary = 'ffufcanary8321';
  const cmd = `ffuf ${transport(ctx, 'FUZZ')} -w ${u.q(ctx.wordlist)} -mr ${u.q(canary)} ${throttleFlag(ctx)} ${outFlag(ctx, 'cmdi')}`;
  return block(
    `ffuf: command-injection payloads that echo the canary "${canary}"; -mr matches it in the response (feed hits to commix)`,
    cmd
  );
}

function ssti(ctx) {
  // {{7*7}} style canary — a vulnerable template renders 49.
  const cmd = `ffuf ${transport(ctx, 'FUZZ')} -w ${u.q(ctx.wordlist)} -mr ${u.q('49')} ${throttleFlag(ctx)} ${outFlag(ctx, 'ssti')}`;
  return block(
    `ffuf: SSTI probes ({{7*7}} etc.); -mr '49' flags engines that evaluated the expression (confirm with tplmap)`,
    cmd
  );
}

function pathTraversal(ctx) {
  const cmd = `ffuf ${transport(ctx, 'FUZZ')} -w ${u.q(ctx.wordlist)} -mr ${u.q('root:.*:0:0:')} ${throttleFlag(ctx)} ${outFlag(ctx, 'lfi')}`;
  return block(
    `ffuf: LFI/path-traversal payloads; -mr matches /etc/passwd signature "root:x:0:0:"`,
    cmd
  );
}

function redirectSsrf(ctx) {
  // Swap the param to the OOB/canary URL and watch for the callback.
  const oob = ctx.oob || 'https://YOUR-OOB-CANARY.example';
  const directUrl = u.targetInBody(ctx) ? u.plainUrl(ctx) : u.urlWithParamValue(ctx, oob);
  const match = ctx.oob
    ? `-mr ${u.q(hostToken(ctx.oob))}`
    : `-mc 301,302,303,307,308`; // no OOB -> just surface redirects
  let cmd;
  if (u.targetInBody(ctx)) {
    const body = u.buildBodyValue(ctx, oob);
    cmd = `ffuf -w ${u.q(ctx.wordlist)} -u ${u.q(directUrl)} -X ${ctx.method} -d ${u.q(body)} ${u.bodyHeaderFlags(ctx)} ${match} ${throttleFlag(ctx)} ${outFlag(ctx, 'redirect')}`;
  } else {
    cmd = `ffuf -w ${u.q(ctx.wordlist)} -u ${u.q(directUrl)} ${match} ${throttleFlag(ctx)} ${outFlag(ctx, 'redirect')}`;
  }
  return block(
    `ffuf: set "${ctx.targetParam}" to the OOB canary (${oob}); ${ctx.oob ? 'match the callback token in-band, and watch your OOB listener' : 'no OOB given — matching redirect status codes only'}`,
    cmd
  );
}

function crlf(ctx) {
  const cmd = `ffuf ${transport(ctx, 'FUZZ')} -w ${u.q(ctx.wordlist)} -mr ${u.q('ffufcrlf: injected')} ${throttleFlag(ctx)} ${outFlag(ctx, 'crlf')}`;
  return block(
    `ffuf: CRLF payloads via "${ctx.targetParam}"; -mr looks for an injected header echoed back (secondary to crlfuzz)`,
    cmd
  );
}

// helpers ------------------------------------------------------------------

function hostToken(oob) {
  try {
    return new URL(oob).host;
  } catch (_e) {
    return oob;
  }
}

module.exports = {
  sqli,
  xss,
  commandInjection,
  ssti,
  pathTraversal,
  redirectSsrf,
  crlf,
};
