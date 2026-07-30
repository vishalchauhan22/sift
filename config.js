'use strict';

/**
 * config.js — loads config.json and exposes typed accessors with fallbacks.
 * If config.json is missing or malformed we fall back to built-in defaults so
 * the CLI still works.
 */

const fs = require('fs');
const path = require('path');

const BUILTIN = {
  wordlists: {
    'param-discovery': '/usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt',
    sqli: '/usr/share/seclists/Fuzzing/SQLi/Generic-SQLi.txt',
    xss: '/usr/share/seclists/Fuzzing/XSS/XSS-Jhaddix.txt',
    'command-injection': '/usr/share/seclists/Fuzzing/command-injection-commix.txt',
    ssti: '/usr/share/seclists/Fuzzing/template-engines-special-vars.txt',
    'path-traversal': '/usr/share/seclists/Fuzzing/LFI/LFI-Jhaddix.txt',
    'redirect-ssrf': '/usr/share/seclists/Fuzzing/URL-based-SSRF-Payloads.txt',
    crlf: '/usr/share/seclists/Fuzzing/CRLF-injection.txt',
    broad: '/usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt',
  },
  defaultThrottle: { mode: 'rps', value: 5 },
};

function load() {
  try {
    const raw = fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8');
    const parsed = JSON.parse(raw);
    return {
      wordlists: { ...BUILTIN.wordlists, ...(parsed.wordlists || {}) },
      defaultThrottle: parsed.defaultThrottle || BUILTIN.defaultThrottle,
    };
  } catch (_e) {
    return BUILTIN;
  }
}

const cfg = load();

function wordlistFor(assessmentType) {
  return cfg.wordlists[assessmentType] || cfg.wordlists.broad;
}

function defaultThrottle() {
  return cfg.defaultThrottle;
}

module.exports = { wordlistFor, defaultThrottle, raw: cfg };
