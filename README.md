# command-composer

> A **generator-only** CLI that turns a saved HTTP request into copy-pasteable
> web-pentest commands. It parses input and prints strings — **it never executes
> any security tool and never sends traffic to a target.**

<p>
  <img alt="Node.js" src="https://img.shields.io/badge/node-%3E%3D18-brightgreen">
  <img alt="Executes nothing" src="https://img.shields.io/badge/executes-nothing-blue">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-lightgrey">
</p>

Hand-crafting `ffuf` / `sqlmap` / `dalfox` invocations per parameter is
error-prone: you forget to URL-encode, mangle the `FUZZ` point, drop the auth
cookie, or run wide open with no throttle. **command-composer** composes those
strings from one parsed request — consistently — so you can focus on reviewing
them before you run anything.

---

## ⚠️ Authorized use only

This is a composition aid for **authorized** security testing (pentest
engagements, bug-bounty programs with the target in scope, CTFs, your own lab).

- The tool **does not attack anything.** It prints commands to your terminal and
  to `commands.txt`. Nothing is executed and no requests reach the target.
- The interactive **scope gate** (type the host back) is a speed-bump to catch
  mistakes — **not** authorization.
- **You** are responsible for having explicit permission for the target and for
  reviewing every generated command before running it.

Don't point the generated commands at systems you aren't authorized to test.

---

## Install

```bash
git clone <your-repo-url>
cd command-composer
npm install          # installs @inquirer/prompts (the only dependency)
```

Requires **Node.js 18+**.

## Usage

```bash
node cli.js [path/to/request.log]      # or: npm start
```

Save a request from Burp / mitmproxy / "copy as raw HTTP" into `request.log`
(a sample is included). The flow:

1. **Parse & confirm** — shows method, URL, host, query/body params, headers.
2. **Scope gate** — prints the target host and makes you **type it back** to
   confirm authorization. Mismatch = abort.
3. **Assessment type** — `param-discovery · sqli · xss · command-injection ·
   ssti · path-traversal · redirect-ssrf · crlf · broad`.
4. **Pick params** — each is labelled (`id-like`, `path-like`, `redirect-like`,
   `auth`, `boring`); multi-select which to target.
5. **Wordlist** — per-type default from `config.json`; override inline.
6. **Throttle** — requests/sec or delay (safe default), translated into each
   tool's own flag.
7. **OOB / canary URL** — optional (interactsh/collaborator) for blind classes.

Output is printed grouped by tool, ordered **broad → deep**, each command with a
one-line comment, then written to `commands.txt` with a header stating the
target, scope-confirmation, and **"Nothing was executed — review before
running."**

### Example output

```
================================================================
 command-composer — generated commands (GENERATOR ONLY)
----------------------------------------------------------------
 Target        : https://shop.example.com/api/v2/search?category=books&id=1042&...
 Host (scope)  : shop.example.com
 Scope confirm : CONFIRMED (operator typed the host back)
 Assessment    : sqli
 Params        : id (query), query (body)
 Throttle      : 5 req/s
----------------------------------------------------------------
 Nothing was executed — review before running.
================================================================

##### ffuf #####
# ffuf: fuzz "id" with SQLi payloads; -ac auto-filters baseline noise (before sqlmap)
ffuf -u 'https://shop.example.com/api/v2/search?category=books&id=FUZZ&...' -X POST \
  -d 'query=laptop&sort=price&...' -H 'Content-Type: application/x-www-form-urlencoded' \
  -w '/usr/share/seclists/Fuzzing/SQLi/Generic-SQLi.txt' -ac -rate 5

##### sqlmap #####
# sqlmap: deep SQLi confirmation/exploitation on "id" (run after ffuf flags it)
sqlmap -u 'https://shop.example.com/api/v2/search?...' -p 'id' --method POST \
  --cookie 'session=...' --batch --level 2 --risk 1 --delay 0.2
```

## Assessment → tool mapping

| Type | Tools (broad → deep) |
|------|----------------------|
| param-discovery | arjun → x8 → paramspider |
| sqli | ffuf (SQLi wordlist, `-ac`) → sqlmap (`-p`) → ghauri |
| xss | ffuf (XSS wordlist) → dalfox (`--param`) |
| command-injection | ffuf (canary match) → commix |
| ssti | ffuf (`{{7*7}}` → match `49`) → tplmap |
| path-traversal | ffuf (LFI wordlist, match `root:x:`) |
| redirect-ssrf | ffuf (param ⇒ OOB canary, match callback) |
| crlf | crlfuzz → ffuf |
| broad | nuclei → feroxbuster → arjun |

## Project layout

```
parser.js            raw HTTP request -> structured object
labels.js            regex heuristics: id/path/redirect/auth/boring
config.js            loads config.json (with built-in fallback)
config.json          per-type default wordlists + default throttle
util.js              shared FUZZ/encoding/throttle helpers
cli.js               prompts + orchestration + output/commands.txt
generators/
  ffuf.js sqlmap.js dalfox.js arjun.js x8.js commix.js
  tplmap.js nuclei.js crlfuzz.js feroxbuster.js ghauri.js paramspider.js
test.js              non-interactive smoke test of the generation pipeline
request.log          sample raw request
```

Each generator is a small, isolated module. The top of every generator lists the
flags it emits and carries a **`TODO: verify against installed --help`** note —
tool flags drift between versions, so confirm before running.

## Configuration

Edit `config.json`:

- `wordlists` — default [SecLists](https://github.com/danielmiessler/SecLists)
  path per assessment type. Paths are **not** checked for existence (the tool
  only prints strings); point them at your install and override per-run.
- `defaultThrottle` — `{ "mode": "rps" | "delay", "value": <number> }`.

## Development

```bash
node test.js         # runs the generation pipeline with no prompts / no execution
```

`cli.js` lazy-requires `@inquirer/prompts` inside `main()`, so the pure
generation functions (`buildAll`, `groupByTool`, `renderOutput`) are importable
and testable without the dependency installed.

## Known limitations

- One wordlist is chosen per run; in the `broad` plan `arjun` therefore reuses
  the broad wordlist rather than a parameter-name list. Override if needed.
- JSON bodies are flattened to top-level keys for labelling; deep JSON fuzzing
  is not composed automatically.
- Flags reflect common tool versions — **verify each against your installed
  `--help`** (see the TODO in each generator).

## Contributing

Generators are intentionally isolated so you can fix one tool's flags without
touching the others. PRs that correct flags against a specific tool version are
welcome — please note the tool version you verified against.

## License

MIT — see `LICENSE`.
