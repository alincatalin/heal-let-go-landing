// Umami custom events (loaded in Base.astro); they show up under Events in the Umami dashboard.
export type AnalyticsEvent = "Store Click" | "Tool Completed" | "Email Signup";

type Umami = { track: (event: string, data?: Record<string, string>) => void };

export function track(event: AnalyticsEvent, data?: Record<string, string>) {
  (window as unknown as { umami?: Umami }).umami?.track(event, data);
}

// One "Store Click" per tap on any App Store or Google Play link, with which store and which
// placement (data-cta on the link or its container: "inline", "final", "hero"...; "button" otherwise).
export function trackStoreClicks(doc: Document) {
  doc.addEventListener("click", (event) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
    if (!link) return;
    const store = link.href.startsWith("https://apps.apple.com/")
      ? "ios"
      : link.href.startsWith("https://play.google.com/store/")
        ? "android"
        : undefined;
    if (!store) return;
    const placement = link.closest<HTMLElement>("[data-cta]")?.dataset.cta ?? "button";
    track("Store Click", { store, placement });
  });
}
