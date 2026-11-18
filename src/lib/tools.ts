// Free browser tools under /tools/. The homepage, blog index, nav and /tools/ hub all list these.
export interface Tool {
  href: string;
  name: string;
  label: string;
  blurb: string;
  cta: string;
  /** Last real change to the tool page (YYYY-MM-DD), used as sitemap lastmod. */
  updated: string;
}

export const tools: Tool[] = [
  {
    href: "/tools/no-contact-counter/",
    updated: "2026-11-18",
    name: "No Contact Counter",
    label: "Day count + milestones",
    blurb: "Pick the last day you contacted your ex. See which day of no contact you're on, your next milestone and what it tends to feel like.",
    cta: "Count my days",
  },
  {
    href: "/tools/new-year-reset/",
    updated: "2026-11-18",
    name: "2027 Reset Plan",
    label: "4 weeks, from Jan 1",
    blurb: "A four-week plan for the new year after a breakup, from four quick questions, with each step pointing at a tool in Heal.",
    cta: "See the plan",
  },
  {
    href: "/tools/holiday-challenge/",
    updated: "2026-11-18",
    name: "Holiday No Contact Challenge",
    label: "Nov 20 to Jan 1",
    blurb: "43 days without texting your ex, with one small task a day timed to Thanksgiving, Christmas and New Year's Eve.",
    cta: "See today's task",
  },
  {
    href: "/tools/year-wrapped/",
    updated: "2026-11-18",
    name: "Breakup Year Wrapped",
    label: "Story card for 2026",
    blurb: "Days since it ended, days without texting them and your word for the year, on one card for your story.",
    cta: "Make my card",
  },
  {
    href: "/tools/holiday-plan/",
    updated: "2026-10-26",
    name: "Holiday Survival Plan",
    label: "For Thanksgiving to New Year",
    blurb: "Pick the holiday days you're dreading and get a short plan for each, with what to say when people ask about your ex.",
    cta: "Make my plan",
  },
  {
    href: "/tools/unsent-text/",
    updated: "2026-11-09",
    name: "Unsent Text to Your Ex",
    label: "Nothing gets sent",
    blurb: "Write the text you want to send them in a chat that never delivers. Then read it back with three honest questions.",
    cta: "Write the text",
  },
  {
    href: "/tools/should-i-text-my-ex/",
    updated: "2026-10-10",
    name: "Should I Text My Ex? Quiz",
    label: "2-minute quiz",
    blurb: "Eight quick questions and an honest answer, plus what to do instead if now isn't the time.",
    cta: "Take the quiz",
  },
];
