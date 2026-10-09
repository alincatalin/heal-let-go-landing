# tryheal.app

The landing page and blog for **Heal: Let Them Go**, built with [Astro](https://astro.build) as a fully static site and deployed to GitHub Pages.

Every push to `main` builds the site and publishes it (see `.github/workflows/deploy.yml`).

## Write a blog post

1. Add a Markdown file to `src/content/articles/` (or `src/content/guides/` for a long-form guide). Name it `YYYY-MM-DD-short-name.md`.
2. Start it with this frontmatter:

   ```markdown
   ---
   title: "Should I Text My Ex? Read This Before You Hit Send"
   slug: "should-i-text-my-ex"
   date: "2026-02-08"
   category: "No Contact"
   readTime: "10 min"
   excerpt: "One or two sentences. Used as the meta description and on the post card."
   author: "Heal Team"
   keywords: "optional, comma separated"
   # updated: "2026-03-01"   # optional, shown as "Updated" and used as dateModified
   # image: "/images/blog/should-i-text-my-ex.png"   # optional social image, put the file in public/
   # draft: true             # optional, hides the post
   ---
   ```

3. Write the body in Markdown. Use `##` and `###` for headings; the page already renders the title as the `<h1>`.
4. Commit and push to `main`. The post appears at `/blog/articles/<slug>/` (or `/blog/guides/<slug>/`), and the blog index, homepage "Healing Wisdom" cards, `sitemap.xml` and `blog/rss.xml` update automatically.

## What's where

| Path | What it is |
| --- | --- |
| `src/pages/index.astro` | Homepage (sections live in `src/components/`) |
| `src/pages/blog/` | Blog index, article and guide pages, RSS feed |
| `src/pages/sitemap.xml.ts` | `sitemap.xml` |
| `src/layouts/Base.astro` | `<head>`: title, description, canonical, Open Graph, JSON-LD |
| `src/content/` | Blog posts (Markdown) |
| `public/privacy`, `public/terms`, `public/delete-account` | Legal pages linked from the app and the stores |
| `public/win-back-survey` | Win-back survey; it posts to `heal-backend.onrender.com` |
| `public/CNAME` | Custom domain for GitHub Pages |
| `src/styles/global.css` | Heal design tokens (colors, depth, type) shared with the app, plus buttons, cards and reading styles |
| `public/heal-page.css` | The same tokens for the standalone pages in `public/` |
| `src/assets/screens/` | App screenshots used on the homepage |

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
```
