import { articleUrl, type Article } from "./site";

export const CLUSTER_NAMES: Record<NonNullable<Article["data"]["cluster"]>, string> = {
  "no-contact": "No contact",
  "texting-your-ex": "Texting your ex",
  "getting-over": "Getting over someone",
};

interface Current {
  id: string;
  category: string;
  cluster?: Article["data"]["cluster"];
}

const toLink = (post: Article) => ({ href: articleUrl(post), title: post.data.title });

// Same-cluster posts first, then same category, then the newest of the rest.
export function relatedArticles(current: Current, all: Article[], count = 3) {
  const others = all.filter((post) => post.id !== current.id);
  const rank = (post: Article) =>
    current.cluster && post.data.cluster === current.cluster ? 0 : post.data.category === current.category ? 1 : 2;
  return [...others]
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, count)
    .map((post) => ({
      ...toLink(post),
      excerpt: post.data.excerpt,
      category: post.data.category,
      date: post.data.date,
      readTime: post.data.readTime,
    }));
}

// A pillar links to every post in its cluster; any other post links to its pillar and two siblings.
export function clusterLinks(current: Current, all: Article[]) {
  if (!current.cluster) return undefined;
  const members = all.filter((post) => post.data.cluster === current.cluster);
  const pillar = members.find((post) => post.data.pillar);
  const others = members.filter((post) => post.id !== current.id && post !== pillar);
  const isPillar = pillar?.id === current.id;
  return {
    name: CLUSTER_NAMES[current.cluster],
    isPillar,
    pillar: pillar && !isPillar ? toLink(pillar) : undefined,
    posts: (isPillar ? others : others.slice(0, 2)).map(toLink),
  };
}

// The "No contact day by day" series, in day order.
export function seriesLinks(all: Article[]) {
  const hub = all.find((post) => post.data.seriesHub);
  const days = all
    .filter((post) => post.data.seriesDay)
    .sort((a, b) => a.data.seriesDay! - b.data.seriesDay!)
    .map((post) => ({ ...toLink(post), label: `Day ${post.data.seriesDay}` }));
  return hub ? [{ ...toLink(hub), label: "All days" }, ...days] : days;
}
