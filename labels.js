'use strict';

/**
 * labels.js — regex-based heuristics that tag each parameter so the operator
 * can quickly pick sensible fuzz targets. Labels are hints only; they never
 * gate anything.
 *
 * Labels: id-like | path-like | redirect-like | auth | boring
 */

const RULES = [
  {
    label: 'redirect-like',
    // names that commonly drive redirects / SSRF
    name: /^(redirect|redirect_to|redirect_uri|return|return_url|returnurl|next|url|dest|destination|continue|callback|out|target|to|link|goto|forward|image_url|img|feed|host|domain)$/i,
    // or the value already looks like a URL / absolute path
    value: /^(https?:\/\/|\/\/|\/[^/])/i,
  },
  {
    label: 'path-like',
    name: /^(file|filename|path|dir|folder|page|template|include|doc|document|load|read|download|attachment|filepath)$/i,
    value: /(\.\.\/|\.\.\\|\.(pdf|txt|php|log|conf|ini|xml|json|jsp|asp|html)$|\/etc\/|^\/[a-z])/i,
  },
  {
    label: 'auth',
    name: /^(token|auth|authorization|session|sessionid|sid|jwt|access_token|refresh_token|api_key|apikey|key|secret|password|passwd|pwd|csrf|csrftoken|xsrf|otp|code)$/i,
    value: null,
  },
  {
    label: 'id-like',
    name: /^(id|.*_id|.*id|uid|uuid|guid|pid|user|userid|account|order|orderid|item|itemid|product|productid|cat|category|cid|num|number|ref|record|row)$/i,
    value: /^[0-9]+$|^[0-9a-f]{8}-[0-9a-f]{4}|^[0-9a-f]{24}$/i,
  },
];

/**
 * Return a label string for a single { name, value } param.
 * First matching rule wins (order encodes priority).
 */
function labelParam(param) {
  const name = String(param.name || '');
  const value = String(param.value || '');
  for (const rule of RULES) {
    const nameHit = rule.name && rule.name.test(name);
    const valueHit = rule.value && rule.value.test(value);
    if (nameHit || valueHit) return rule.label;
  }
  return 'boring';
}

/**
 * Attach a `label` and `location` to every param.
 * @param {Array} queryParams
 * @param {Array} bodyParams
 * @returns {Array} [{ name, value, label, location }]
 */
function labelAll(queryParams = [], bodyParams = []) {
  const q = queryParams.map((p) => ({ ...p, label: labelParam(p), location: 'query' }));
  const b = bodyParams.map((p) => ({ ...p, label: labelParam(p), location: 'body' }));
  return [...q, ...b];
}

module.exports = { labelParam, labelAll };
