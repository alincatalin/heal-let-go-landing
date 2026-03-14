export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

// Import all markdown files as raw strings
import matter from 'gray-matter';

// Adjust the relative path according to this file's location
const markdownModules = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default' });

export const blogPosts: BlogPost[] = await Promise.all(
  Object.entries(markdownModules).map(async ([path, loader]) => {
    const raw = await (loader as () => Promise<string>)();
    const { data, content } = matter(raw);
    return {
      slug: data.slug,
      title: data.title,
      description: data.description,
      category: data.category,
      date: data.date,
      readTime: data.readTime,
      content,
    } as BlogPost;
  })
).then(posts =>
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);
