// Store links carry their traffic source so store analytics can tell channels apart.
// Play: the referrer string is read by the app through the Install Referrer API.
// App Store: `ct` is reported in App Store Connect only when `pt` (provider token) is set.
export const APP_STORE_ID = "6754834593";
export const PLAY_PACKAGE = "co.betafocus.heal";
export const APP_STORE_PROVIDER_TOKEN = "127837885";

// Smart App Banner on iPhone Safari. It was off while the listing showed 1.0 stars from 1 rating.
// On (2026-11-06): iOS 3.0 is live and the US listing says "This app's overall rating was recently
// reset", with no stars shown. Turn it off again if the new rating drops below about 4 stars.
export const SHOW_SMART_APP_BANNER = true;

// Custom product pages in App Store Connect, by blog cluster: each opens the store page whose
// first screenshot matches what the reader came for. Created in App Store Connect 2026-11-06; until
// Apple approves a page, its ppid opens the default page, so wiring them early is harmless.
export const APP_STORE_PAGES: Record<string, string> = {
  "texting-your-ex": "d02b7db1-fa5d-429d-b36f-48f45d086b4a", // "Stop texting your ex"
  "no-contact": "89a81955-9dcc-43e3-8f3b-89cfa7fbdec2", // "No contact tracker"
  "getting-over": "1d2dd5aa-9858-4b67-a22c-a48245194d0a", // "Get over him"
};

export function appStorePage(cluster?: string) {
  return (cluster && APP_STORE_PAGES[cluster]) || undefined;
}

// App Store Connect hides a campaign until it has at least 5 first-time downloads in the chosen
// date range, so a token per blog post (blog-<slug>) would never show. iOS links therefore carry
// only the source ("landing", "blog", "tool", "tiktok"...); the per-page campaign stays on the
// Play referrer, which Firebase reports without a threshold. `campaign` is kept in the signature
// so callers don't change.
export function appStoreUrl(source: string, _campaign?: string, page?: string) {
  const url = new URL(`https://apps.apple.com/app/id${APP_STORE_ID}`);
  if (APP_STORE_PROVIDER_TOKEN) url.searchParams.set("pt", APP_STORE_PROVIDER_TOKEN);
  if (page) url.searchParams.set("ppid", page);
  url.searchParams.set("ct", source.slice(0, 40));
  url.searchParams.set("mt", "8");
  return url.toString();
}

export function playStoreUrl(source: string, campaign?: string, medium = "web") {
  const referrer = new URLSearchParams({ utm_source: source, utm_medium: medium });
  if (campaign) referrer.set("utm_campaign", campaign);
  const url = new URL("https://play.google.com/store/apps/details");
  url.searchParams.set("id", PLAY_PACKAGE);
  url.searchParams.set("referrer", referrer.toString());
  return url.toString();
}

export type Platform = "ios" | "android";

export function detectPlatform(userAgent: string): Platform | undefined {
  if (/android/i.test(userAgent)) return "android";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "ios";
  return undefined;
}

type Utm = { source: string; campaign?: string; medium?: string };
const UTM_KEY = "heal-utm";

// UTM tags from the link the visitor arrived on (e.g. the TikTok bio link). They are kept for the
// rest of the visit, so someone who lands on /?utm_source=tiktok and then opens a tool or a post
// still reaches the store as "tiktok" and not as "tool" or "blog". Storage can be blocked
// (private mode, some in-app browsers); then only the landing page carries the tag.
function visitUtm(search: string): Utm | undefined {
  const params = new URLSearchParams(search);
  const source = params.get("utm_source");
  try {
    if (source) {
      const utm: Utm = {
        source,
        campaign: params.get("utm_campaign") ?? undefined,
        medium: params.get("utm_medium") ?? undefined,
      };
      sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
      return utm;
    }
    const saved = sessionStorage.getItem(UTM_KEY);
    return saved ? (JSON.parse(saved) as Utm) : undefined;
  } catch {
    return source ? { source, campaign: params.get("utm_campaign") ?? undefined, medium: params.get("utm_medium") ?? undefined } : undefined;
  }
}

// Runs in the browser: re-tags every store link with the visit's UTM source/campaign
// (so /?utm_source=tiktok reaches the store as "tiktok"), falling back to the page's own
// source (landing, blog, tool), and on phones shows only the matching store button inside
// [data-match-device] blocks. Each link also gets data-source for the Umami "Store Click" event.
export function tagStoreLinks(doc: Document, location: Location, userAgent: string) {
  const utm = visitUtm(location.search);
  const body = doc.body.dataset;
  const source = utm?.source ?? body.storeSource ?? "web";
  const campaign = utm?.campaign ?? body.storeCampaign ?? undefined;
  const page = body.storePage || undefined;
  const medium = utm?.medium;
  const platform = detectPlatform(userAgent);

  doc.querySelectorAll<HTMLAnchorElement>('a[href^="https://apps.apple.com/"]').forEach((a) => {
    a.href = appStoreUrl(source, campaign, page);
  });
  doc.querySelectorAll<HTMLAnchorElement>('a[href^="https://play.google.com/store/"]').forEach((a) => {
    a.href = playStoreUrl(source, campaign, medium);
  });
  doc.querySelectorAll<HTMLAnchorElement>('a[data-platform="auto"]').forEach((a) => {
    a.href = platform === "android" ? playStoreUrl(source, campaign, medium) : appStoreUrl(source, campaign, page);
  });
  doc.querySelectorAll<HTMLAnchorElement>('a[href^="https://apps.apple.com/"], a[href^="https://play.google.com/store/"]').forEach((a) => {
    a.dataset.source = source;
  });
  if (platform) {
    doc.querySelectorAll<HTMLElement>("[data-match-device] [data-platform]").forEach((el) => {
      if (el.dataset.platform !== platform) el.hidden = true;
    });
  }
}
