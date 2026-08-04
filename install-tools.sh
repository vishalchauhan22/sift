#!/usr/bin/env bash
#
# install-tools.sh — install the external tools that `sift` generates commands
# for. This script ONLY installs tooling; it never runs any security tool and
# never touches a target.
#
# Usage:
#   ./install-tools.sh              # install everything (all groups)
#   ./install-tools.sh --go --rust  # only selected groups
#   ./install-tools.sh --list       # show groups and tools, install nothing
#   ./install-tools.sh --help
#
# Groups: node go rust python scripts wordlists
#
# Notes:
#   * Go: prefers ~/custom_golang/bin/go, then `go` on PATH. Override with
#     SIFT_GO_BIN=/path/to/go (GOROOT is pinned to that binary's own tree).
#   * Missing toolchains (go/cargo/pipx/npm) are skipped with a hint, not fatal.
#   * Go bins land in $(go env GOPATH)/bin, pipx in ~/.local/bin, cargo in
#     ~/.cargo/bin, wrappers in ~/.local/bin — make sure those are on PATH.
#   * Re-runnable: most installers upgrade in place; git clones are pulled.

set -uo pipefail

# ---- config -----------------------------------------------------------------
OPT_DIR="${SIFT_OPT_DIR:-$HOME/.local/opt}"       # where script-tools get cloned
BIN_DIR="${SIFT_BIN_DIR:-$HOME/.local/bin}"       # where wrappers get written
SECLISTS_DIR="${SECLISTS_DIR:-/usr/share/seclists}"

# ---- go binary selection ----------------------------------------------------
# The system Go at /usr/local/go can be broken (e.g. "mapiterinit redeclared":
# a mismatched runtime source tree). Prefer an explicit / custom Go install.
#   Override:      SIFT_GO_BIN=/path/to/go
#   Auto-detected: ~/go_custom/go/bin/go, ~/custom_golang/bin/go, then `go` on PATH.
GO_BIN="${SIFT_GO_BIN:-}"
GO_CUSTOM=0
if [[ -n "$GO_BIN" ]]; then
  GO_CUSTOM=1
else
  for cand in "$HOME/go_custom/go/bin/go" "$HOME/custom_golang/bin/go"; do
    if [[ -x "$cand" ]]; then GO_BIN="$cand"; GO_CUSTOM=1; break; fi
  done
  if [[ -z "$GO_BIN" ]] && command -v go >/dev/null 2>&1; then
    GO_BIN="$(command -v go)"
  fi
fi

# ---- pretty logging ---------------------------------------------------------
c_g=$'\e[32m'; c_y=$'\e[33m'; c_r=$'\e[31m'; c_b=$'\e[36m'; c_0=$'\e[0m'
log()  { printf '%s[*]%s %s\n' "$c_b" "$c_0" "$*"; }
ok()   { printf '%s[+]%s %s\n' "$c_g" "$c_0" "$*"; }
warn() { printf '%s[!]%s %s\n' "$c_y" "$c_0" "$*"; }
err()  { printf '%s[x]%s %s\n' "$c_r" "$c_0" "$*"; }
have() { command -v "$1" >/dev/null 2>&1; }

INSTALLED=(); SKIPPED=(); FAILED=()
mark_ok()   { INSTALLED+=("$1"); }
mark_skip() { SKIPPED+=("$1"); }
mark_fail() { FAILED+=("$1"); }

# go install with self-healing toolchain: if a package needs a newer Go than
# $GO_BIN, parse the required version and retry with that clean toolchain
# (downloaded from go.dev — never the possibly-broken local /usr/local/go).
go_install() { # pkg
  local pkg="$1" out rc need
  out="$("$GO_BIN" install "$pkg" 2>&1)"; rc=$?
  if [[ $rc -ne 0 ]] && grep -q 'requires go >=' <<<"$out"; then
    need="$(grep -oE 'requires go >= [0-9.]+' <<<"$out" | head -1 | grep -oE '[0-9.]+')"
    case "$need" in *.*.*) ;; *.*) need="$need.0" ;; esac
    if [[ -n "$need" ]]; then
      warn "  needs go >= $need; fetching clean toolchain go$need"
      out="$(GOTOOLCHAIN="go$need" "$GO_BIN" install "$pkg" 2>&1)"; rc=$?
    fi
  fi
  [[ $rc -ne 0 ]] && printf '%s\n' "$out" | tail -4
  return $rc
}

# ---- group selection --------------------------------------------------------
ALL_GROUPS=(node go rust python scripts wordlists)
declare -A WANT
usage() {
  sed -n '2,20p' "$0" | sed 's/^# \{0,1\}//'
  exit 0
}
LIST_ONLY=0
if [[ $# -eq 0 ]]; then
  for g in "${ALL_GROUPS[@]}"; do WANT[$g]=1; done
else
  for arg in "$@"; do
    case "$arg" in
      --help|-h) usage ;;
      --list)    LIST_ONLY=1; for g in "${ALL_GROUPS[@]}"; do WANT[$g]=1; done ;;
      --all)     for g in "${ALL_GROUPS[@]}"; do WANT[$g]=1; done ;;
      --node|--go|--rust|--python|--scripts|--wordlists) WANT[${arg#--}]=1 ;;
      *) err "unknown option: $arg"; echo "try --help"; exit 2 ;;
    esac
  done
fi
want() { [[ -n "${WANT[$1]:-}" ]]; }

# ---- go tools ---------------------------------------------------------------
GO_TOOLS=(
  "ffuf|github.com/ffuf/ffuf/v2@latest"
  "nuclei|github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest"
  "katana|github.com/projectdiscovery/katana/cmd/katana@latest"
  "hakrawler|github.com/hakluke/hakrawler@latest"
  "gau|github.com/lc/gau/v2/cmd/gau@latest"
  "waybackurls|github.com/tomnomnom/waybackurls@latest"
  "getJS|github.com/003random/getJS@latest"
  "dalfox|github.com/hahwul/dalfox/v2@latest"
  "crlfuzz|github.com/dwisiswant0/crlfuzz/cmd/crlfuzz@latest"
  "interactsh-client|github.com/projectdiscovery/interactsh/cmd/interactsh-client@latest"
  "trufflehog|github.com/trufflesecurity/trufflehog/v3@latest"
  "sourcemapper|github.com/denandz/sourcemapper@latest"
)

RUST_TOOLS=(feroxbuster x8)

# name in pipx | package/spec
PIPX_TOOLS=(
  "arjun|arjun"
  "sqlmap|sqlmap"
  "commix|commix"
  "ghauri|git+https://github.com/r0oth3x49/ghauri.git"
  "paramspider|git+https://github.com/devanshbatham/paramspider.git"
)

# name | repo | script | interpreter
SCRIPT_TOOLS=(
  "linkfinder|https://github.com/GerbenJavado/LinkFinder|linkfinder.py|python3"
  "secretfinder|https://github.com/m4ll0k/SecretFinder|SecretFinder.py|python3"
  "tplmap|https://github.com/epinna/tplmap|tplmap.py|python2"
)

if [[ $LIST_ONLY -eq 1 ]]; then
  echo "Groups selected: ${!WANT[*]}"
  echo; echo "node:      npm deps for this app + js-beautify"
  printf 'go:        '; for t in "${GO_TOOLS[@]}"; do printf '%s ' "${t%%|*}"; done; echo
  printf 'rust:      %s\n' "${RUST_TOOLS[*]}"
  printf 'python:    '; for t in "${PIPX_TOOLS[@]}"; do printf '%s ' "${t%%|*}"; done; echo
  printf 'scripts:   '; for t in "${SCRIPT_TOOLS[@]}"; do printf '%s ' "${t%%|*}"; done; echo
  printf 'wordlists: SecLists -> %s\n' "$SECLISTS_DIR"
  exit 0
fi

log "sift tool installer — installs only, runs nothing"
log "groups: ${!WANT[*]}"
mkdir -p "$OPT_DIR" "$BIN_DIR"

# ---- node -------------------------------------------------------------------
if want node; then
  log "== node =="
  if have npm; then
    if [[ -f package.json ]]; then
      if npm install; then ok "app deps installed"; mark_ok "npm:@inquirer/prompts"; else mark_fail "npm install"; fi
    else
      warn "package.json not found (run from the repo root to install app deps)"
    fi
    if have js-beautify; then
      ok "js-beautify (already on PATH)"; mark_ok "js-beautify"
    elif npm install -g js-beautify >/dev/null 2>&1; then
      ok "js-beautify (npm -g)"; mark_ok "js-beautify"
    elif have pipx && pipx install jsbeautifier >/dev/null 2>&1; then
      ok "js-beautify (pipx jsbeautifier)"; mark_ok "js-beautify"
    else
      warn "js-beautify: npm -g lacked permission and pipx fallback failed — try 'pipx install jsbeautifier' or 'sudo npm i -g js-beautify'"
      mark_fail "js-beautify"
    fi
  else
    warn "npm not found — install Node.js 18+ (https://nodejs.org) then re-run --node"
    mark_skip "node group"
  fi
fi

# ---- go ---------------------------------------------------------------------
if want go; then
  log "== go =="
  if [[ -n "$GO_BIN" && -x "$GO_BIN" ]]; then
    # Pin GOROOT to the chosen binary's own tree so a stale global
    # GOROOT=/usr/local/go can't pull us back into a broken toolchain.
    if [[ "$GO_CUSTOM" -eq 1 ]]; then
      export GOROOT="$(cd "$(dirname "$GO_BIN")/.." && pwd)"
    fi
    log "using go: $GO_BIN"
    log "$("$GO_BIN" version 2>&1 | head -1)  (GOROOT=${GOROOT:-auto})"
    if ! "$GO_BIN" version >/dev/null 2>&1; then
      err "this go binary fails to run (broken toolchain?) — set SIFT_GO_BIN to a working Go"
      mark_fail "go toolchain"
    else
      for entry in "${GO_TOOLS[@]}"; do
        name="${entry%%|*}"; pkg="${entry#*|}"
        log "go install $name"
        if go_install "$pkg"; then ok "$name"; mark_ok "$name"; else err "$name failed"; mark_fail "$name"; fi
      done
      gobin="$("$GO_BIN" env GOPATH)/bin"
      case ":$PATH:" in *":$gobin:"*) ;; *) warn "add to PATH: export PATH=\"\$PATH:$gobin\"" ;; esac
    fi
  else
    warn "go not found — install Go (https://go.dev/dl), or set SIFT_GO_BIN, then re-run --go"
    mark_skip "go group"
  fi
fi

# ---- rust -------------------------------------------------------------------
if want rust; then
  log "== rust =="
  if have cargo; then
    for name in "${RUST_TOOLS[@]}"; do
      log "cargo install $name"
      if cargo install "$name"; then ok "$name"; mark_ok "$name"; else err "$name failed"; mark_fail "$name"; fi
    done
    case ":$PATH:" in *":$HOME/.cargo/bin:"*) ;; *) warn "add to PATH: export PATH=\"\$PATH:\$HOME/.cargo/bin\"" ;; esac
  else
    warn "cargo not found — install Rust (https://rustup.rs) then re-run --rust"
    mark_skip "rust group"
  fi
fi

# ---- python (pipx) ----------------------------------------------------------
if want python; then
  log "== python (pipx) =="
  if ! have pipx && have python3; then
    warn "pipx not found — attempting: python3 -m pip install --user pipx"
    python3 -m pip install --user pipx >/dev/null 2>&1 && python3 -m pipx ensurepath >/dev/null 2>&1
  fi
  if have pipx; then
    for entry in "${PIPX_TOOLS[@]}"; do
      name="${entry%%|*}"; spec="${entry#*|}"
      log "pipx install $name"
      if pipx install "$spec" >/dev/null 2>&1 || pipx install --force "$spec" >/dev/null 2>&1; then
        ok "$name"; mark_ok "$name"
      else
        err "$name failed"; mark_fail "$name"
      fi
    done
  else
    warn "pipx unavailable — install pipx (https://pipx.pypa.io) then re-run --python"
    mark_skip "python group"
  fi
fi

# ---- python script tools (git clone + wrapper) ------------------------------
make_wrapper() { # name scriptpath interpreter
  local name="$1" scriptpath="$2" interp="$3" real="$interp"
  have "$interp" || real="python3"   # fall back if e.g. python2 is absent
  cat > "$BIN_DIR/$name" <<EOF
#!/usr/bin/env bash
# auto-generated wrapper by sift install-tools.sh
exec $real "$scriptpath" "\$@"
EOF
  chmod +x "$BIN_DIR/$name"
}

if want scripts; then
  log "== python scripts (LinkFinder / SecretFinder / tplmap) =="
  if have git; then
    for entry in "${SCRIPT_TOOLS[@]}"; do
      IFS='|' read -r name repo script interp <<<"$entry"
      dest="$OPT_DIR/$name"
      log "clone/update $name -> $dest"
      if [[ -d "$dest/.git" ]]; then git -C "$dest" pull --ff-only >/dev/null 2>&1
      else git clone --depth 1 "$repo" "$dest" >/dev/null 2>&1; fi
      if [[ ! -f "$dest/$script" ]]; then err "$name: $script not found after clone"; mark_fail "$name"; continue; fi
      # Deps: use a per-tool venv (avoids Ubuntu PEP-668 "externally-managed"
      # blocks on `pip --user`). Wrapper then runs the tool with that venv's
      # python so its imports (jsbeautifier, requests, ...) resolve.
      if [[ "$interp" == python3 ]]; then
        if python3 -m venv "$dest/.venv" >/dev/null 2>&1; then
          "$dest/.venv/bin/pip" install -q --upgrade pip wheel >/dev/null 2>&1
          if [[ -f "$dest/requirements.txt" ]]; then
            "$dest/.venv/bin/pip" install -q -r "$dest/requirements.txt" >/dev/null 2>&1 \
              || warn "$name: some requirements failed to install (check $dest/.venv)"
          else
            "$dest/.venv/bin/pip" install -q jsbeautifier requests >/dev/null 2>&1
          fi
          make_wrapper "$name" "$dest/$script" "$dest/.venv/bin/python"
        else
          warn "$name: python3 venv unavailable — 'sudo apt install python3-venv'; wrapper uses system python3 (may miss deps)"
          make_wrapper "$name" "$dest/$script" "python3"
        fi
      else
        # legacy interpreter (e.g. tplmap wants python2)
        make_wrapper "$name" "$dest/$script" "$interp"
      fi
      ok "$name -> wrapper at $BIN_DIR/$name"; mark_ok "$name"
    done
    case ":$PATH:" in *":$BIN_DIR:"*) ;; *) warn "add to PATH: export PATH=\"\$PATH:$BIN_DIR\"" ;; esac
    have python2 || warn "tplmap needs python2 (legacy); the wrapper fell back to python3 which may not work — consider SSTImap instead"
  else
    warn "git not found — install git then re-run --scripts"
    mark_skip "scripts group"
  fi
fi

# ---- wordlists (SecLists) ---------------------------------------------------
if want wordlists; then
  log "== wordlists (SecLists) =="
  SECLISTS_RESOLVED=""
  seclists_ok() { [[ -d "$1" && -n "$(ls -A "$1" 2>/dev/null)" ]]; }
  if seclists_ok "$SECLISTS_DIR"; then
    SECLISTS_RESOLVED="$SECLISTS_DIR"
  elif seclists_ok "$HOME/tools/SecLists"; then
    SECLISTS_RESOLVED="$HOME/tools/SecLists"
  elif have apt-get && log "apt-get install seclists (needs sudo)" \
       && sudo apt-get update -qq && sudo apt-get install -y seclists >/dev/null 2>&1; then
    SECLISTS_RESOLVED="/usr/share/seclists"
  elif have git; then
    warn "apt unavailable/failed; cloning SecLists (large, ~1GB)"
    if git clone --depth 1 https://github.com/danielmiessler/SecLists "$SECLISTS_DIR" 2>/dev/null; then
      SECLISTS_RESOLVED="$SECLISTS_DIR"
    elif git clone --depth 1 https://github.com/danielmiessler/SecLists "$HOME/tools/SecLists" 2>/dev/null; then
      SECLISTS_RESOLVED="$HOME/tools/SecLists"
    fi
  fi

  if [[ -n "$SECLISTS_RESOLVED" ]]; then
    ok "SecLists at $SECLISTS_RESOLVED"; mark_ok "SecLists"
    if [[ "$SECLISTS_RESOLVED" != "/usr/share/seclists" ]]; then
      warn "SecLists is NOT at the default /usr/share/seclists."
      warn "Make sure config.json wordlist paths point at: $SECLISTS_RESOLVED"
      warn "(note: some SecLists files have moved, e.g. SQLi is now under Fuzzing/Databases/SQLi/)"
    fi
  else
    err "SecLists not installed"; mark_fail "SecLists"
  fi
fi

# ---- summary ----------------------------------------------------------------
echo
log "==================== summary ===================="
ok  "installed (${#INSTALLED[@]}): ${INSTALLED[*]:-none}"
[[ ${#SKIPPED[@]}  -gt 0 ]] && warn "skipped   (${#SKIPPED[@]}): ${SKIPPED[*]}"
[[ ${#FAILED[@]}   -gt 0 ]] && err  "failed    (${#FAILED[@]}): ${FAILED[*]}"
echo
log "PATH reminder — ensure these are on PATH:"
_gobin="$HOME/go"
[[ -n "$GO_BIN" && -x "$GO_BIN" ]] && _gobin="$("$GO_BIN" env GOPATH 2>/dev/null || echo "$HOME/go")"
echo "    $_gobin/bin   $HOME/.cargo/bin   $HOME/.local/bin"
log "Verify a tool's flags before running sift's commands (e.g. 'ffuf -h')."
[[ ${#FAILED[@]} -eq 0 ]] && exit 0 || exit 1
