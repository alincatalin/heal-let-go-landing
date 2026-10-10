// Plausible custom events. Goals with these exact names are set up in the Plausible dashboard.
// The stub in Base.astro queues calls made before the script has loaded.
export type AnalyticsEvent = "Store Click" | "Tool Completed" | "Email Signup";

type Plausible = (event: string, options?: { props?: Record<string, string> }) => void;

export function track(event: AnalyticsEvent, props?: Record<string, string>) {
  const plausible = (window as unknown as { plausible?: Plausible }).plausible;
  plausible?.(event, props ? { props } : undefined);
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
