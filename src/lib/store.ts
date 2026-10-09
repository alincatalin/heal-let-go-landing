// Store links carry their traffic source so store analytics can tell channels apart.
// Play: the referrer string is read by the app through the Install Referrer API.
// App Store: `ct` is reported in App Store Connect only when `pt` (provider token) is set.
export const APP_STORE_ID = "6754834593";
export const PLAY_PACKAGE = "co.betafocus.heal";
export const APP_STORE_PROVIDER_TOKEN = "127837885";

export function appStoreUrl(source: string, campaign?: string) {
  const url = new URL(`https://apps.apple.com/app/id${APP_STORE_ID}`);
  if (APP_STORE_PROVIDER_TOKEN) url.searchParams.set("pt", APP_STORE_PROVIDER_TOKEN);
  url.searchParams.set("ct", (campaign ? `${source}-${campaign}` : source).slice(0, 40));
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

// Runs in the browser: re-tags every store link with the page's own UTM source/campaign
// (so /?utm_source=tiktok reaches the store as "tiktok"), and on phones shows only the
// matching store button inside [data-match-device] blocks.
export function tagStoreLinks(doc: Document, location: Location, userAgent: string) {
  const params = new URLSearchParams(location.search);
  const body = doc.body.dataset;
  const source = params.get("utm_source") ?? body.storeSource ?? "web";
  const campaign = params.get("utm_campaign") ?? body.storeCampaign ?? undefined;
  const medium = params.get("utm_medium") ?? undefined;
  const platform = detectPlatform(userAgent);

  doc.querySelectorAll<HTMLAnchorElement>('a[href^="https://apps.apple.com/"]').forEach((a) => {
    a.href = appStoreUrl(source, campaign);
  });
  doc.querySelectorAll<HTMLAnchorElement>('a[href^="https://play.google.com/store/"]').forEach((a) => {
    a.href = playStoreUrl(source, campaign, medium);
  });
  doc.querySelectorAll<HTMLAnchorElement>('a[data-platform="auto"]').forEach((a) => {
    a.href = platform === "android" ? playStoreUrl(source, campaign, medium) : appStoreUrl(source, campaign);
  });
  if (platform) {
    doc.querySelectorAll<HTMLElement>("[data-match-device] [data-platform]").forEach((el) => {
      if (el.dataset.platform !== platform) el.hidden = true;
    });
  }
}
