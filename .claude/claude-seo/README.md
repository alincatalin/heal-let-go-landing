# Claude SEO (vendored)

Source: https://github.com/AgriciDaniel/claude-seo, v2.4.2, commit
`4b99de2f7de7e7d5247042e5fb5b4ea9368ef734` (MIT, see `LICENSE`).

Vendored so every Claude session on this repo picks the skills up without a
plugin install. Updates are manual: re-copy from a newer upstream tag and
re-review.

## Layout

- `.claude/skills/seo*/` — the 26 upstream skills (`/seo audit <url>`, `/seo page <url>`, ...)
- `.claude/agents/seo-*.md` — the 19 upstream subagents the audit fans out to
- `.claude/claude-seo/scripts/` — launcher (`claude-seo`), `runtime.py`, bundled Python tools
- `.claude/claude-seo/{schema,data,requirements.txt}` — files the scripts read

`${CLAUDE_PLUGIN_ROOT}` paths in the skills and agents were rewritten to these
repo-relative paths, so run Claude from the repository root.

## Left out on purpose

- `hooks/` — upstream registers a PostToolUse hook that runs Python on every Edit/Write.
- `extensions/` — paid-API/MCP add-ons (DataForSEO, Ahrefs, Firecrawl, ...) with their own installers.
- `plugins/seo-cockpit`, `tests/`, `install.sh`/`install.ps1`.

## First-time setup (only for script-backed commands)

```bash
.claude/claude-seo/scripts/claude-seo setup    # creates .claude/claude-seo/.venv, pip installs requirements.txt, downloads Chromium
.claude/claude-seo/scripts/claude-seo doctor
```

The venv and browser download are gitignored. Many skills work without setup
(they read the site source and use WebFetch); fetch/render/PageSpeed/Search
Console tooling needs it. Google, Moz, Bing, etc. scripts only call those APIs
when you supply credentials.
