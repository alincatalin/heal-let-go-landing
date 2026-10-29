import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://tryheal.app",
  trailingSlash: "ignore",
  build: { format: "directory" },
  redirects: {
    // Old React-router blog URLs from the Lovable site
    "/blog/no-contact-rule": "/blog/articles/no-contact-rule-guide/",
    "/blog/hardest-day-no-contact": "/blog/articles/hardest-day-no-contact/",
    "/blog/should-i-text-my-ex": "/blog/articles/should-i-text-my-ex/",
    "/blog/7-stages-of-breakup": "/blog/articles/7-stages-of-breakup/",
    // Duplicate posts merged into the stronger page (Oct 2026)
    "/blog/guides/text-your-ex-guide": "/blog/articles/should-i-text-my-ex/",
    "/blog/articles/breakup-healing-stages-guide": "/blog/articles/7-stages-of-breakup/",
    "/blog/articles/ai-breakup-coach-2026": "/blog/articles/what-is-heal/",
    "/blog/articles/urge-to-text-ex-survival-guide": "/blog/articles/what-to-do-instead-of-texting-your-ex/",
    "/blog/articles/no-contact-hardest-thing": "/blog/articles/no-contact-rule-guide/",
    // Stray URL that shows up in Search Console
    "/blog/articles/should-i-text-your-ex": "/blog/articles/should-i-text-my-ex/",
  },
});
