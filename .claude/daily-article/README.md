# Daily article workflow (tryheal.app blog)

One deep, sourced article per day, picked from keywords where Google already shows tryheal.app but the site earns few or no clicks. Each article ships as **its own PR**. Nothing is published until Alin merges it (no scheduled publishing).

A scheduled cloud session runs this file every morning. A human or Claude can also run it by hand: "Follow .claude/daily-article/README.md".

## Hard rules (from Alin)

1. **One article per PR.** The PR holds the new post plus 2-4 one-line backlinks in older posts, nothing else.
2. **Depth over volume.** If no keyword passes the bar in step 2, do not write a filler post. Open no PR and say why in the run summary. A skipped day is better than a thin post.
3. **Every claim that needs a source gets a real, opened link.** Never invent a study, number or quote. Fetch each source before citing it.
4. **Byline "Heal Team".** Positioning: *Heal is what you open instead of texting your ex.*
5. **No new paid tools or services.** Free data only (Search Console via BigQuery, the queue below, web search).
6. **Never merge.** Alin merges. Never push to `main`.

## Step 1: Get the opportunity data

**A. Search Console in BigQuery (preferred, once the bulk export is on).**
Use the Google Cloud BigQuery connector, project `heal-86f0f`. List datasets; if a dataset starting with `searchconsole` exists, list its tables (Google's export creates `searchdata_site_impression` and `searchdata_url_impression`; confirm with `list_table_ids`, don't assume). Pull the last 28 days:

```sql
-- query-level opportunities: impressions but few clicks / weak position
SELECT query,
       SUM(impressions) AS impressions,
       SUM(clicks) AS clicks,
       ROUND(SUM(sum_position) / SUM(impressions) + 1, 1) AS avg_position,
       ARRAY_AGG(DISTINCT url IGNORE NULLS LIMIT 3) AS urls
FROM `heal-86f0f.searchconsole.searchdata_url_impression`
WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
  AND NOT is_anonymized_query
  AND search_type = 'WEB'
GROUP BY query
HAVING impressions >= 5 AND (clicks = 0 OR avg_position > 8)
ORDER BY impressions DESC
LIMIT 300
```

Check the column names against the table schema first (`get_table_info`) and adjust if Google's schema differs.

**B. Fallback: the queue.** If BigQuery has no Search Console data, take the top unclaimed item from [`queue.md`](queue.md). Each item there was picked from a real Search Console export, with the evidence listed.

**Google Keyword Planner** is not wired in: the Google Ads API needs Basic access (brand verification + application) for keyword planning, and a Google Ads account. If that is ever set up, add search volume as a tie-breaker in step 2, nothing more.

## Step 2: Pick one keyword

Group the queries into topics (same reader, same question). For each topic decide:

| Situation | Action |
|---|---|
| A live post already targets it and ranks 1-10 | Not a new article. Skip (a refresh is a separate task). |
| A live post targets it but ranks 11+ or gets 0 clicks | Not a new article unless the intent is clearly different (e.g. "they texted me" vs "should I text them"). |
| No live post answers it, and the query is about breakups, exes, no contact, texting an ex, getting over someone | **Candidate.** |
| Off-topic (other languages, unrelated news, brand typos) | Skip. |

Rank candidates by: impressions → high intent (the reader is about to act: text, reply, break no contact, download an app) → closeness to a Heal feature (unsent text, coach, no contact tracker, SOS).

Dedup before writing:
- `ls src/content/articles/` and grep titles/keywords for the topic.
- List open PRs on `alincatalin/heal-let-go-landing` and check titles and changed files.
- Check `src/lib/tools.ts` so a post doesn't duplicate a free tool.

## Step 3: Research

- `WebSearch` the primary query. Note what the top results cover and what they miss (that gap is the article's angle).
- Find 2-4 real sources (peer-reviewed studies, NHS/Mayo/APA, findahelpline.com for safety). Fetch each one and note author, year, journal, DOI and the exact finding. Reuse studies the site already cites (`grep -rh "doi.org" src/content/articles | sort | uniq -c | sort -rn`) when they fit.

## Step 4: Write the post

File: `src/content/articles/YYYY-MM-DD-<slug>.md` (today's date). Copy the front matter shape from a recent post, for example `2026-11-23-my-ex-texted-me.md`:

- `title` ≤ 60 chars, primary query in it, phrased the way people search. Same as H1.
- `excerpt` 140-160 chars with the primary query (it's the meta description).
- `answer` 40-60 words, a direct answer that works on its own (AI answer engines lift it).
- `keywords`, `cluster` (`no-contact` | `texting-your-ex` | `getting-over`), `category`, `readTime`.
- `appBox` (feature `unsent` | `coach` | `tracker` | `sos`, matched to the reader's moment) and `cta`. Do **not** write raw `<aside>` CTAs.
- `tool` if a free tool fits better than the cluster default (see `CLUSTER_TOOL` in `src/lib/tools.ts`).

Body:
- Open on the reader's real moment in 2-3 short lines, no throat-clearing.
- First `##` section answers the head question directly. The app box is inserted automatically before the 2nd `##`.
- H2s phrased as real searches (from the GSC queries in the topic).
- **One table** that does real work (a decision table, a comparison, a by-situation guide).
- Practical steps or scripts the reader can use tonight.
- 1-2 in-flow links to a free tool and one natural mention of Heal where it genuinely helps (the moment of the urge). Never more than that.
- A short research section with the sources, then `## FAQ` (5-7 questions phrased like searches; it becomes FAQPage schema) and `## Sources`.
- Safety line on posts about abusive/controlling exes or distress (findahelpline.com).
- Plain words, short sentences, no "In today's world", no "delve", no lists of platitudes. Every paragraph should be something a friend who knows the research would actually say.

## Step 5: Internal links (pass authority to the new post)

- **Out:** the cluster pillar (`no-contact-rule-guide`, `should-i-text-my-ex` or `7-stages-of-breakup`), 2+ siblings, 1 free tool.
- **In:** add one natural sentence with a link to the new post in **2-4 existing posts** that rank for related queries, inside the section where a reader would want it (not in the footer, no exact-match spam). Pillars list cluster posts automatically.

## Step 6: Check

```bash
npm ci   # if node_modules is missing
npx astro build
```

Then check the built `dist/blog/articles/<slug>/index.html`: one H1, title and meta lengths, BlogPosting + BreadcrumbList + FAQPage JSON-LD, the app box and tool box render, the URL is in the sitemap, and every internal `href` resolves to a file in `dist/`.

## Step 7: Open the PR

- Branch: the branch name your session instructions give, plus `-<slug>`.
- Title: `Add post: <title>`.
- Body: the project attribution lines your session gives, then: **why this keyword** (table of the GSC queries with impressions, clicks, position, date range), **dedup check**, **SEO + AEO brief** (primary/secondary queries, title, meta, answer, table, FAQ list, sources with one-line findings), **conversion** (app box, tool, CTA), **internal links in/out**, **checks run**, and "If it merges on a later day, change `date:` to that day."
- Add `<!-- daily-article -->` at the end of the body so later runs can find these PRs.
- Assign `alincatalin`.

If a queue item was used, the PR also ticks it in `queue.md` (`- [x]`, with the PR number).

## Step 8: Summary

End the run with a 3-line summary: the keyword and its evidence, the PR link, and anything skipped or blocked.
