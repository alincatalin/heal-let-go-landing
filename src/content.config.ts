import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const post = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  category: z.string(),
  readTime: z.string(),
  excerpt: z.string(),
  author: z.string().default("Heal Team"),
  keywords: z.string().optional(),
  image: z.string().optional(),
  draft: z.boolean().default(false),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: post,
});

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: post,
});

export const collections = { articles, guides };
