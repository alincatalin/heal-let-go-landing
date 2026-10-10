import { getCollection, type CollectionEntry } from "astro:content";
import { appStoreUrl, playStoreUrl } from "./store";

export const SITE_NAME = "Heal: No Contact & Breakup";
export const APP_STORE_URL = appStoreUrl("landing");
export const PLAY_STORE_URL = playStoreUrl("landing");
export const SUPPORT_EMAIL = "healletgo@proton.me";

export type Article = CollectionEntry<"articles">;
export type Guide = CollectionEntry<"guides">;

export const articleUrl = (entry: Article) => `/blog/articles/${entry.id}/`;
export const guideUrl = (entry: Guide) => `/blog/guides/${entry.id}/`;

// A post dated in the future stays hidden until a build on or after that date (UTC);
// the deploy workflow rebuilds daily so scheduled posts go live on their own.
const isPublished = ({ draft, date }: { draft: boolean; date: Date }) => !draft && date.getTime() <= Date.now();

export async function getArticles(): Promise<Article[]> {
  const entries = await getCollection("articles", ({ data }) => isPublished(data));
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getGuides(): Promise<Guide[]> {
  const entries = await getCollection("guides", ({ data }) => isPublished(data));
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export const readTimeLabel = (readTime: string) => (/read$/i.test(readTime) ? readTime : `${readTime} read`);
