import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { articleUrl, getArticles, getGuides, guideUrl } from "../../lib/site";

export async function GET(context: APIContext) {
  const articles = await getArticles();
  const guides = await getGuides();
  const items = [
    ...articles.map((post) => ({ post, link: articleUrl(post) })),
    ...guides.map((post) => ({ post, link: guideUrl(post) })),
  ]
    .sort((a, b) => b.post.data.date.getTime() - a.post.data.date.getTime())
    .map(({ post, link }) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      categories: [post.data.category],
      link,
    }));

  return rss({
    title: "Heal Blog",
    description: "Honest, practical breakup recovery advice from the team behind Heal: No Contact & Breakup.",
    site: context.site!,
    items,
  });
}
