# Illyism SEO skills (vendored, partial)

Source: https://github.com/Illyism/seo-skills, commit
`af48ce5953e00ca75d1cd4d440e77d0c0d61a038` (MIT, by Ilias Ism). Copied verbatim.

## Kept

- `.claude/skills/customer-journey/` — maps the 5 awareness stages with the prompts
  people type into Google and ChatGPT. Used to build the AEO prompt set we track.
  Note: it defaults to B2B SaaS; Heal is a consumer breakup app, so say so when invoking it.
- `.claude/skills/blog-refresher/` — refresh an existing post against the SERP (gap table,
  approval checkpoint, then rewrite). Complements `seo-content-brief`, which plans new pages.
- `.claude/skills/seo-title-optimization/` — title tag / H1 / meta title rewrites with a
  before/after table. The 2026-10-08 audit found most post titles truncated in results.

## Left out on purpose

- `seo-autopilot` — daily end-to-end agent that keeps its own `seo/` state folder; it would
  duplicate the Heal Growth Board and strategy files, and it recommends paid tools.
- `linkdr` (buys paid backlinks) and `scribiz` (paid video transcription service).
- `blitz-seo`, `intro`, `blitz-copy`, `understand-customers`, `diff-marketing` — overlap with
  the editorial plan, the claude-seo skills and the built-in marketing skills, or don't fit
  (the app's commits live in another repo).

Updates are manual: re-copy from a newer upstream commit and re-review.
