import { articleUrl, type Article } from "./site";

// Same-category posts first, then the newest of the rest.
export function relatedArticles(current: { id: string; category: string }, all: Article[], count = 3) {
  const others = all.filter((post) => post.id !== current.id);
  const sameCategory = others.filter((post) => post.data.category === current.category);
  const rest = others.filter((post) => post.data.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count).map((post) => ({
    href: articleUrl(post),
    title: post.data.title,
    excerpt: post.data.excerpt,
    category: post.data.category,
    date: post.data.date,
    readTime: post.data.readTime,
  }));
}
