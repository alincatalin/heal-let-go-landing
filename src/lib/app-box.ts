// The one app box each blog post shows, matched to the reader's problem.
// A remark plugin (remarkAppBox) puts it after the post's first section, rendered here as plain
// HTML so it ships with the page (no client script, no layout shift). Store links use the base
// URLs; tagStoreLinks() in Base.astro re-tags them with the post's source and campaign like
// every other store link, so attribution (ct=blog, Play utm_campaign=<slug>) is unchanged.

export const APP_BOX_FEATURES = ["unsent", "coach", "tracker", "sos"] as const;
export type AppBoxFeature = (typeof APP_BOX_FEATURES)[number];

export interface AppBoxData {
  feature: AppBoxFeature;
  title: string;
  text: string;
  button: string;
}

interface FeatureCopy {
  eyebrow: string;
  image: string;
  alt: string;
  points: string[];
}

// Screens are real app screenshots (src/assets/screens), resized to /public/assets/app.
export const FEATURE_COPY: Record<AppBoxFeature, FeatureCopy> = {
  unsent: {
    eyebrow: "For the text you want to send",
    image: "/assets/app/sos-help.webp",
    alt: "Heal: What would help right now? Write it here instead. Type what you want to send them. It's never sent.",
    points: ["Write it to them. It never sends.", "A reality check on what's behind it", "An SOS for when the urge won't pass"],
  },
  coach: {
    eyebrow: "Someone to talk to at 2am",
    image: "/assets/app/sos-help.webp",
    alt: "Heal: What would help right now? Talk it through. Your coach is here, right now.",
    points: ["An AI coach that's there day or night", "Say what you'd say to them, privately", "Nothing ever reaches them"],
  },
  tracker: {
    eyebrow: "For no contact",
    image: "/assets/app/today.webp",
    alt: "Heal Today screen: days without contact and the next milestone",
    points: ["Counts every day without contact", "A slip resets the streak, never your total", "SOS one tap away when the pull hits"],
  },
  sos: {
    eyebrow: "For the urge, right now",
    image: "/assets/app/sos-breathe.webp",
    alt: "Heal SOS: Pause with me for a minute. The urge feels urgent. It isn't.",
    points: ["Name the urge, breathe, let it pass", "Write the text where it can't send", "Talk it through with the coach"],
  },
};

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const APP_STORE = "https://apps.apple.com/app/id6754834593";
const PLAY_STORE = "https://play.google.com/store/apps/details?id=co.betafocus.heal";

export function appBoxHtml(box: AppBoxData): string {
  const copy = FEATURE_COPY[box.feature];
  const points = copy.points.map((p) => `<li>${escape(p)}</li>`).join("");
  return `<aside class="app-box not-prose" data-cta="app-box" data-feature="${box.feature}" aria-label="Heal app">
<div class="app-box-body">
<p class="app-box-eyebrow"><img src="/apple-touch-icon.png" alt="" width="28" height="28" loading="lazy" decoding="async" /> Heal app · ${escape(copy.eyebrow)}</p>
<p class="app-box-title">${escape(box.title)}</p>
<p class="app-box-text">${escape(box.text)}</p>
<ul class="app-box-points">${points}</ul>
<a href="${APP_STORE}" data-platform="auto" target="_blank" rel="noreferrer" class="btn btn-lg btn-primary app-box-button">${escape(box.button)}</a>
<p class="app-box-stores">Free to start on <a href="${APP_STORE}" target="_blank" rel="noreferrer">iPhone</a> and <a href="${PLAY_STORE}" target="_blank" rel="noreferrer">Android</a></p>
</div>
<figure class="app-box-shot"><img src="${copy.image}" alt="${escape(copy.alt)}" width="320" height="718" loading="lazy" decoding="async" /></figure>
</aside>`;
}

type Ctx = {
  data: { astro?: { frontmatter?: Record<string, unknown> }; appBoxH2s?: number };
  insertBefore(node: unknown, content: unknown): void;
};

// Sätteri mdast plugin (Astro's Markdown processor): inserts the box right before the post's
// second "##" heading, so after the short answer and the first section. Every post has at least
// two "##" sections; the build check in the PR counts one box per post.
export const appBoxPlugin = {
  name: "heal-app-box",
  heading(node: { depth: number }, ctx: Ctx) {
    if (node.depth !== 2) return;
    const box = ctx.data.astro?.frontmatter?.appBox as AppBoxData | undefined;
    if (!box || !FEATURE_COPY[box.feature]) return;
    ctx.data.appBoxH2s = (ctx.data.appBoxH2s ?? 0) + 1;
    if (ctx.data.appBoxH2s === 2) ctx.insertBefore(node, { type: "html", value: appBoxHtml(box) });
  },
};
