import type { APIContext } from "astro";
import { articleUrl, getArticles, getGuides, guideUrl } from "../lib/site";
import { tools } from "../lib/tools";
import { APP_STORE_ID, PLAY_PACKAGE } from "../lib/store";

// llms.txt (llmstxt.org): a plain-text map of the site for AI assistants and answer engines.
// Google Search ignores it; it costs nothing and some assistants read it.
export async function GET(context: APIContext) {
  const site = context.site!;
  const url = (path: string) => new URL(path, site).toString();
  const posts = [...(await getGuides()).map((p) => ({ href: guideUrl(p), data: p.data })), ...(await getArticles()).map((p) => ({ href: articleUrl(p), data: p.data }))];

  const body = `# Heal: No Contact & Breakup

> Heal is a breakup recovery app for iOS and Android: the app you open instead of texting your ex. It has fake texting that never sends, an SOS button for the urge to reach out, a no contact tracker, an AI breakup coach and a five-phase healing path. Free to start. Not a substitute for professional help.

- App Store: https://apps.apple.com/app/id${APP_STORE_ID}
- Google Play: https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}
- Contact: healletgo@proton.me

## Free tools

${tools.map((t) => `- [${t.name}](${url(t.href)}): ${t.blurb}`).join("\n")}

## Articles

${posts.map((p) => `- [${p.data.title}](${url(p.href)}): ${p.data.answer ?? p.data.excerpt}`).join("\n")}

## Optional

- [About Heal and how we write](${url("/about/")})
- [Privacy policy](${url("/privacy/")})
- [Terms](${url("/terms/")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
