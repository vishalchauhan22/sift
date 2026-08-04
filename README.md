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
  to a project file. Nothing is executed for you.
- **One deliberate exception:** in JS-recon mode you may opt in (per run, after
  the scope gate) to a **single passive `GET`** of the JavaScript URL you paste,
  so the app can extract endpoints/secrets locally. That is the *only* network
  request the app itself ever makes — no crawling, no writes, no other traffic.
  Decline the prompt and the app stays a pure generator.
- The interactive **scope gate** (type the host back) is a speed-bump to catch
  mistakes — **not** authorization.
- **You** are responsible for having explicit permission for the target and for
  reviewing every generated command before running it.

Don't point the generated commands at systems you aren't authorized to test.

---

## Setup

### 1. The app itself

```bash
git clone <your-repo-url>
cd command-composer
npm install          # installs @inquirer/prompts (the only Node dependency)
node cli.js          # run it
```

Requires **Node.js 18+**. That's everything the *generator* needs — the JS-mode
passive fetch uses Node's built-in `http`/`https`, no extra package.

### 2. The tools it generates commands for

The app only prints commands; to actually **run** them you install the tools you
plan to use. Nothing here is required to generate — install only what you need.

**Quickest path — the installer script** (installs only, runs nothing):

```bash
./install-tools.sh            # everything
./install-tools.sh --go --rust   # just selected groups
./install-tools.sh --list     # show groups/tools, install nothing
./install-tools.sh --help
```

Groups: `node go rust python scripts wordlists`. Missing toolchains
(go/cargo/pipx/npm) are skipped with a hint, not fatal; it's re-runnable and
prints a PATH reminder + a summary at the end. It writes wrapper scripts for the
clone-only Python tools (LinkFinder/SecretFinder/tplmap) into `~/.local/bin` so
the command names resolve.

Prefer to do it by hand? The exact commands the script runs, grouped by
installer, are below. The left column is the binary name the generated commands
call (alias if yours differs).

**Go tools** (need Go; binaries land in `~/go/bin`, add it to `PATH`). If your
system Go is broken (e.g. `mapiterinit redeclared` — a corrupted
`/usr/local/go` runtime tree), point the installer at a good Go with
`SIFT_GO_BIN=/path/to/go ./install-tools.sh --go`; it also auto-detects
`~/go_custom/go/bin/go` and pins `GOROOT` to that tree. If a tool needs a newer
Go than yours (e.g. getJS now wants ≥1.25), the installer auto-fetches a clean
toolchain from go.dev for that build — never the broken local one:

```bash
go install github.com/ffuf/ffuf/v2@latest
go install github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest
go install github.com/projectdiscovery/katana/cmd/katana@latest
go install github.com/hakluke/hakrawler@latest
go install github.com/lc/gau/v2/cmd/gau@latest
go install github.com/tomnomnom/waybackurls@latest
go install github.com/003random/getJS@latest
go install github.com/hahwul/dalfox/v2@latest
go install github.com/dwisiswant0/crlfuzz/cmd/crlfuzz@latest
# optional OOB listener for blind classes:
go install github.com/projectdiscovery/interactsh/cmd/interactsh-client@latest
```

**Rust tools** (need `cargo`):

```bash
cargo install feroxbuster
cargo install x8
```

**Python tools** (`pipx` keeps each isolated):

```bash
pipx install arjun
pipx install sqlmap
pipx install commix
pipx install git+https://github.com/r0oth3x49/ghauri.git
pipx install git+https://github.com/devanshbatham/paramspider.git
```

**Python tools that ship as scripts** (clone, then alias the entrypoint so the
generated command name resolves):

```bash
# LinkFinder
git clone https://github.com/GerbenJavado/LinkFinder && cd LinkFinder \
  && pip install -r requirements.txt && python setup.py install
# SecretFinder
git clone https://github.com/m4ll0k/SecretFinder && cd SecretFinder \
  && pip install -r requirements.txt
# tplmap (or use the maintained SSTImap)
git clone https://github.com/epinna/tplmap
```

Handy aliases if the binary names differ from what the commands call:

```bash
alias linkfinder='python3 /opt/LinkFinder/linkfinder.py'
alias secretfinder='python3 /opt/SecretFinder/SecretFinder.py'
alias tplmap='python2 /opt/tplmap/tplmap.py'
```

**Deobfuscation / beautify:**

```bash
npm install -g js-beautify        # local beautify fallback
# de4js is an online tool (no install): https://lelinhtinh.github.io/de4js/
```

Every generator's top comment lists the exact flags it emits with a
`TODO: verify against installed --help` — **confirm flags against your installed
version**, since they drift between releases.

### 3. Wordlists (SecLists)

Request-mode commands reference [SecLists](https://github.com/danielmiessler/SecLists):

```bash
# Kali / Debian:
sudo apt install seclists            # -> /usr/share/seclists
# or anywhere:
git clone https://github.com/danielmiessler/SecLists /usr/share/seclists
```

Then point `config.json` at your path (below). JS-mode does not use wordlists.

## Configure

Edit **`config.json`** (falls back to built-in defaults if missing/malformed):

```json
{
  "wordlists": {
    "sqli":  "/usr/share/seclists/Fuzzing/SQLi/Generic-SQLi.txt",
    "xss":   "/usr/share/seclists/Fuzzing/XSS/XSS-Jhaddix.txt",
    "broad": "/usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt"
  },
  "defaultThrottle": { "mode": "rps", "value": 5 }
}
```

- **`wordlists`** — default path per assessment type (`param-discovery`, `sqli`,
  `xss`, `command-injection`, `ssti`, `path-traversal`, `redirect-ssrf`, `crlf`,
  `broad`). Paths are **not** checked for existence — the app only prints
  strings. You can override the path per run at the prompt.
- **`defaultThrottle`** — `mode` is `"rps"` (requests/sec cap) or `"delay"`
  (seconds between requests); `value` is the number. Start conservative on
  shared/production targets.

## Usage

```bash
node cli.js [path/to/request.log]      # or: npm start
```

Every run starts the same way:

- **Project workspace** — pick a projects base dir (default `./projects`), then
  **select an existing project or create a new one**. All artifacts land there.
- **Input mode** — choose **HTTP request file** (parameter testing) or
  **JavaScript URL / domain** ([JS-recon](#js-recon-mode), below).

### Request-file mode

Save a request from Burp / mitmproxy / "copy as raw HTTP" into `request.log`
(a sample is included). Then:

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
one-line comment, then written to the project folder as
`sift_commands_<assessment>_<runId>.txt` with a header stating the project,
output dir, run ID, target, scope-confirmation, a "how to read this file"
legend, and **"Nothing was executed — review before running."**

### Project workspace & output routing

- The run is scoped to a **project folder** (`<base>/<project>/`, base defaults
  to `./projects`). The picker lists existing projects and offers "Create new".
- Every generated command is rewritten so its results land **in that folder**,
  named `<tool>_<host>_<runId>` — via each tool's native flag where one exists
  (`-o`, `-oT`, `-of json`, `--output-dir`) or a `| tee` fallback otherwise
  (tplmap, ghauri). Host/port is sanitised for filenames (`localhost:8099` →
  `localhost_8099`).
- **Run ID** is a `YYYYMMDD-HHMMSS` timestamp shared by the master file and every
  artifact, so repeated runs never overwrite each other.

### Example output

```
================================================================
 command-composer — generated commands (GENERATOR ONLY)
----------------------------------------------------------------
 Project       : acme-bugbounty
 Output dir    : /home/you/projects/acme-bugbounty
 Run ID        : 20260731-140507
----------------------------------------------------------------
 Target        : https://shop.example.com/api/v2/search?category=books&id=1042&...
 Host (scope)  : shop.example.com
 Scope confirm : CONFIRMED (operator typed the host back)
 Assessment    : sqli
 Params        : id (query), query (body)
 Throttle      : 5 req/s
----------------------------------------------------------------
 How to read this file: ... NOTHING WAS EXECUTED — review before running.
================================================================

##### ffuf #####
# ffuf: fuzz "id" with SQLi payloads; -ac auto-filters baseline noise (before sqlmap)
ffuf -u 'https://shop.example.com/api/v2/search?category=books&id=FUZZ&...' -X POST \
  -d 'query=laptop&sort=price&...' -H 'Content-Type: application/x-www-form-urlencoded' \
  -w '/usr/share/seclists/Fuzzing/SQLi/Generic-SQLi.txt' -ac -rate 5 \
  -o '/home/you/projects/acme-bugbounty/ffuf_sqli_id_shop.example.com_20260731-140507.json' -of json

##### sqlmap #####
# sqlmap: deep SQLi confirmation/exploitation on "id" (run after ffuf flags it)
sqlmap -u 'https://shop.example.com/api/v2/search?...' -p 'id' --method POST \
  --cookie 'session=...' --batch --level 2 --risk 1 --delay 0.2 \
  --output-dir '/home/you/projects/acme-bugbounty'
```

## JS-recon mode

Pick **"JavaScript URL / domain"** at the mode prompt, then paste either a single
`.js` URL or a bare domain. The scope gate and project/output routing work the
same as request mode.

- **Paste a `.js` URL** → the app offers a **single passive fetch** (opt-in) that
  downloads the file and runs a local static analysis (raw saved as `js_*.js`):
  - endpoints → `jsanalyze_endpoints_*`
  - secret candidates, **entropy-scored** and severity-ranked → `jsanalyze_secrets_*`
    (loose patterns must clear an entropy floor; long random blobs are flagged
    even without a named pattern)
  - **DOM-XSS** source→sink taint pass, with candidate flows → `jsanalyze_domxss_*`
  - **source-map** candidates (`//# sourceMappingURL` + `<file>.js.map`) → `jsanalyze_sourcemaps_*`

  then emits extraction/analysis commands and a beautify step.
- **Paste a domain** → no live fetch; it emits the **discovery** phase first
  (gau, waybackurls, getJS, katana, hakrawler) to *find* JS files, then the
  extraction phase against `scheme://host/*`.

Pipeline, broad → deep:

| Phase | Tools |
|-------|-------|
| Discovery (domain input) | gau · waybackurls · getJS · katana · hakrawler |
| Extraction | LinkFinder · SecretFinder · nuclei (`-tags exposure,token,jsleak,secret`) · **trufflehog** (verified secrets) · **sourcemapper** (rebuild original source from `.js.map`) · **domxss** (source→sink grep sweep) · **endpoint-ffuf** (extracted routes → live validation) |
| Deobfuscate | de4js (online, guided) + local `js-beautify` fallback |
| Monitor | **jsdiff** (diff a fresh pull against the previous run's saved bundle) |
| Passive (opt-in, `.js` URL) | built-in fetch + local endpoint/secret/entropy/DOM-XSS/source-map analysis |

De4js and Burp extensions (JS Link Finder, GAP) are GUI/online, so they appear as
guided manual steps rather than generated commands. `sourcemapper`, `trufflehog`,
and the `endpoint-ffuf` replay send live traffic — like every generated command,
you run them, sift only prints them.

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
util.js              shared FUZZ/encoding/throttle/output-path helpers
jsanalyze.js         JS-mode passive fetch + local endpoint/secret extraction
                     (the ONLY module that touches the network)
cli.js               prompts + orchestration (request mode + JS-recon mode)
generators/
  # request mode
  ffuf.js sqlmap.js dalfox.js arjun.js x8.js commix.js
  tplmap.js nuclei.js crlfuzz.js feroxbuster.js ghauri.js paramspider.js
  # JS-recon mode  (nuclei.js is shared)
  getjs.js katana.js hakrawler.js gau.js waybackurls.js
  linkfinder.js secretfinder.js de4js.js
  trufflehog.js sourcemapper.js domxss.js endpointffuf.js jsdiff.js
test.js              non-interactive smoke test of both pipelines
install-tools.sh     installs the external tools (grouped; installs only)
request.log          sample raw request
```

Each generator is a small, isolated module. The top of every generator lists the
flags it emits and carries a **`TODO: verify against installed --help`** note —
tool flags drift between versions, so confirm before running.

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
