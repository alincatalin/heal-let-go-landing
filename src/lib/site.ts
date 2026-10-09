import { getCollection, type CollectionEntry } from "astro:content";
import { appStoreUrl, playStoreUrl } from "./store";

export const SITE_NAME = "Heal: Let Them Go";
export const APP_STORE_URL = appStoreUrl("landing");
export const PLAY_STORE_URL = playStoreUrl("landing");
export const SUPPORT_EMAIL = "healletgo@proton.me";

export type Article = CollectionEntry<"articles">;
export type Guide = CollectionEntry<"guides">;

export const articleUrl = (entry: Article) => `/blog/articles/${entry.id}/`;
export const guideUrl = (entry: Guide) => `/blog/guides/${entry.id}/`;

export async function getArticles(): Promise<Article[]> {
  const entries = await getCollection("articles", ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getGuides(): Promise<Guide[]> {
  const entries = await getCollection("guides", ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export const readTimeLabel = (readTime: string) => (/read$/i.test(readTime) ? readTime : `${readTime} read`);
