import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { APP_BOX_FEATURES } from "./lib/app-box";

const post = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  category: z.string(),
  readTime: z.string(),
  excerpt: z.string(),
  // Answer-first summary (40 to 60 words) shown under the header, for readers and AI answer engines.
  answer: z.string().optional(),
  // Glossary posts: the term the post defines, published as DefinedTerm structured data (description = answer).
  term: z.string().optional(),
  author: z.string().default("Heal Team"),
  keywords: z.string().optional(),
  image: z.string().optional(),
  draft: z.boolean().default(false),
  // Topic cluster: each post links to its cluster's pillar, and the pillar links to every post in it.
  cluster: z.enum(["no-contact", "texting-your-ex", "getting-over"]).optional(),
  pillar: z.boolean().default(false),
  // Day number in the "No contact day by day" series.
  seriesDay: z.number().int().positive().optional(),
  // The overview page for that series, linked first in its strip.
  seriesHub: z.boolean().default(false),
  // Closing call to action, written for this post's topic.
  cta: z.object({ title: z.string(), text: z.string() }).optional(),
  // The one app box after the first section, matched to the post's problem (see src/lib/app-box.ts):
  // unsent = the text you want to send, coach = someone to talk to, tracker = no contact count, sos = the urge now.
  appBox: z
    .object({ feature: z.enum(APP_BOX_FEATURES), title: z.string(), text: z.string(), button: z.string() })
    .optional(),
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
