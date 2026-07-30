'use strict';

/**
 * parser.js
 *
 * Parses a raw HTTP request (as saved from Burp / mitmproxy / a browser "copy as
 * raw request") into a structured object the CLI can reason about.
 *
 * This module NEVER makes a network call and NEVER executes anything. It only
 * reads text and returns data.
 *
 * Extracted fields:
 *   method      - HTTP verb (GET, POST, ...)
 *   rawTarget   - the request-target exactly as it appeared on the request line
 *   host        - from the Host: header (falls back to an absolute-form target)
 *   scheme      - http | https (guessed; see note below)
 *   path        - URL path without query string
 *   url         - reconstructed absolute URL (scheme://host/path?query)
 *   queryParams - [{ name, value }] from the URL query string
 *   bodyParams  - [{ name, value }] when the body is form-urlencoded
 *   headers     - [{ name, value }] in original order
 *   body        - raw request body string (may be empty)
 *   bodyType    - 'form' | 'json' | 'raw' | 'none'
 *
 * Scheme note: a raw request line does not carry the scheme. We default to https
 * (the safe/common case) unless the Host header names port 80, or an
 * absolute-form request-target already includes the scheme.
 */

/**
 * Split a query string ("a=1&b=2") into ordered name/value pairs.
 * Values are stored DECODED so labels/UI are readable; generators re-encode.
 */
function parsePairs(str) {
  const pairs = [];
  if (!str) return pairs;
  for (const chunk of str.split('&')) {
    if (chunk === '') continue;
    const eq = chunk.indexOf('=');
    let name;
    let value;
    if (eq === -1) {
      name = chunk;
      value = '';
    } else {
      name = chunk.slice(0, eq);
      value = chunk.slice(eq + 1);
    }
    pairs.push({
      name: safeDecode(name),
      value: safeDecode(value),
    });
  }
  return pairs;
}

function safeDecode(s) {
  try {
    return decodeURIComponent(s.replace(/\+/g, ' '));
  } catch (_e) {
    return s; // leave malformed encodings untouched
  }
}

/**
 * Parse a raw HTTP request string.
 * @param {string} raw
 * @returns {object} parsed request (see module header)
 */
function parseRequest(raw) {
  if (typeof raw !== 'string' || raw.trim() === '') {
    throw new Error('parseRequest: empty or non-string input');
  }

  // Normalise newlines, then split headers from body on the first blank line.
  const normalised = raw.replace(/\r\n/g, '\n');
  const blankIdx = normalised.indexOf('\n\n');
  const headSection = blankIdx === -1 ? normalised : normalised.slice(0, blankIdx);
  const body = blankIdx === -1 ? '' : normalised.slice(blankIdx + 2);

  const lines = headSection.split('\n').filter((l) => l.length > 0);
  if (lines.length === 0) {
    throw new Error('parseRequest: no request line found');
  }

  // --- Request line: METHOD SP request-target SP HTTP/version
  const requestLine = lines.shift();
  const rlParts = requestLine.split(/\s+/);
  if (rlParts.length < 2) {
    throw new Error(`parseRequest: malformed request line: "${requestLine}"`);
  }
  const method = rlParts[0].toUpperCase();
  const rawTarget = rlParts[1];

  // --- Headers
  const headers = [];
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx === -1) continue; // skip folded/garbage lines defensively
    const name = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    headers.push({ name, value });
  }

  const getHeader = (want) => {
    const found = headers.find((h) => h.name.toLowerCase() === want.toLowerCase());
    return found ? found.value : undefined;
  };

  // --- Host + scheme + path resolution
  let host = getHeader('host');
  let scheme;
  let path;
  let queryString = '';

  if (/^https?:\/\//i.test(rawTarget)) {
    // absolute-form request-target (proxied requests)
    const u = new URL(rawTarget);
    scheme = u.protocol.replace(':', '');
    host = host || u.host;
    path = u.pathname;
    queryString = u.search.replace(/^\?/, '');
  } else {
    // origin-form: /path?query
    const qIdx = rawTarget.indexOf('?');
    if (qIdx === -1) {
      path = rawTarget;
    } else {
      path = rawTarget.slice(0, qIdx);
      queryString = rawTarget.slice(qIdx + 1);
    }
  }

  if (!scheme) {
    // Guess: https unless Host explicitly says :80
    scheme = host && /:80$/.test(host) ? 'http' : 'https';
  }

  const queryParams = parsePairs(queryString);

  // --- Body params (only when form-urlencoded)
  const contentType = (getHeader('content-type') || '').toLowerCase();
  let bodyType = 'none';
  let bodyParams = [];
  if (body && body.trim() !== '') {
    if (contentType.includes('application/x-www-form-urlencoded')) {
      bodyType = 'form';
      bodyParams = parsePairs(body.trim());
    } else if (contentType.includes('application/json')) {
      bodyType = 'json';
      bodyParams = parseJsonParams(body);
    } else {
      bodyType = 'raw';
    }
  }

  const url = host
    ? `${scheme}://${host}${path}${queryString ? '?' + queryString : ''}`
    : `${path}${queryString ? '?' + queryString : ''}`;

  return {
    method,
    rawTarget,
    host: host || null,
    scheme,
    path,
    url,
    queryParams,
    bodyParams,
    bodyType,
    headers,
    body,
  };
}

/**
 * Flatten top-level JSON keys into name/value pairs for labelling/targeting.
 * Nested objects/arrays are stringified; we keep it shallow on purpose.
 */
function parseJsonParams(body) {
  try {
    const obj = JSON.parse(body);
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      return Object.keys(obj).map((k) => ({
        name: k,
        value: typeof obj[k] === 'object' ? JSON.stringify(obj[k]) : String(obj[k]),
      }));
    }
  } catch (_e) {
    // fall through
  }
  return [];
}

module.exports = { parseRequest, parsePairs };
