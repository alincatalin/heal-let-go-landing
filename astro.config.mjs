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
  },
});
