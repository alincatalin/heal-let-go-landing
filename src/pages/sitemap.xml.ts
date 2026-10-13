import type { APIContext } from "astro";
import { articleUrl, getArticles, getGuides, guideUrl } from "../lib/site";

const day = (date: Date) => date.toISOString().slice(0, 10);

export async function GET(context: APIContext) {
  const site = context.site!;
  const articles = await getArticles();
  const guides = await getGuides();
  const latest = [...articles, ...guides].map((p) => p.data.updated ?? p.data.date).sort((a, b) => b.getTime() - a.getTime())[0];

  const urls: { loc: string; lastmod?: string }[] = [
    { loc: "/", lastmod: latest && day(latest) },
    { loc: "/blog/", lastmod: latest && day(latest) },
    { loc: "/tools/should-i-text-my-ex/" },
    ...guides.map((p) => ({ loc: guideUrl(p), lastmod: day(p.data.updated ?? p.data.date) })),
    ...articles.map((p) => ({ loc: articleUrl(p), lastmod: day(p.data.updated ?? p.data.date) })),
    { loc: "/privacy/" },
    { loc: "/terms/" },
    { loc: "/delete-account/" },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${new URL(u.loc, site)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`,
  )
  .join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
