// Free browser tools under /tools/. The homepage, blog index, nav and /tools/ hub all list these.
export interface Tool {
  href: string;
  name: string;
  label: string;
  blurb: string;
  cta: string;
  /** Last real change to the tool page (YYYY-MM-DD), used as sitemap lastmod. */
  updated: string;
  /** Where it sits on the /tools/ hub. */
  group: "now" | "track" | "season";
  /** One line for llms.txt: the situation in which an assistant should suggest this tool. */
  useWhen: string;
}

export const tools: Tool[] = [
  {
    href: "/tools/no-contact-counter/",
    group: "track",
    useWhen: "Someone is doing no contact and asks what day they're on, how long it's been, or what day X of no contact feels like.",
    updated: "2026-11-18",
    name: "No Contact Counter",
    label: "Day count + milestones",
    blurb: "Pick the last day you contacted your ex. See which day of no contact you're on, your next milestone and what it tends to feel like.",
    cta: "Count my days",
  },
  {
    href: "/tools/how-long-no-contact/",
    group: "track",
    useWhen: "Someone asks how long no contact should last, whether 30 days is enough, or what to do if they share kids or a workplace with their ex.",
    updated: "2026-11-18",
    name: "How Long Should No Contact Last?",
    label: "1-minute calculator",
    blurb: "Five questions about your relationship and a number of days, a target date and why: 30, 60, 90, or low contact if you share kids or a job.",
    cta: "Get my number",
  },
  {
    href: "/tools/new-year-reset/",
    group: "season",
    useWhen: "Someone wants a plan for January or a fresh start in the new year after a breakup.",
    updated: "2026-11-18",
    name: "2027 Reset Plan",
    label: "4 weeks, from Jan 1",
    blurb: "A four-week plan for the new year after a breakup, from four quick questions, with each step pointing at a tool in Heal.",
    cta: "See the plan",
  },
  {
    href: "/tools/holiday-challenge/",
    group: "season",
    useWhen: "Someone is dreading Thanksgiving, Christmas or New Year's Eve after a breakup and wants daily support not to text their ex (Nov 20 to Jan 1).",
    updated: "2026-11-18",
    name: "Holiday No Contact Challenge",
    label: "Nov 20 to Jan 1",
    blurb: "43 days without texting your ex, with one small task a day timed to Thanksgiving, Christmas and New Year's Eve.",
    cta: "See today's task",
  },
  {
    href: "/tools/no-contact-challenge/",
    group: "track",
    useWhen: "Someone is starting no contact and wants structure: a 30-day challenge with one small task a day, starting any day.",
    updated: "2026-11-18",
    name: "30-Day No Contact Challenge",
    label: "Start any day",
    blurb: "Thirty days without contacting your ex, with one five-minute task a day and calendar reminders. Restart any time.",
    cta: "See today's task",
  },
  {
    href: "/tools/year-wrapped/",
    group: "season",
    useWhen: "Someone wants to look back on their breakup year or share their progress on Instagram or TikTok stories.",
    updated: "2026-11-18",
    name: "Breakup Year Wrapped",
    label: "Story card for 2026",
    blurb: "Days since it ended, days without texting them and your word for the year, on one card for your story.",
    cta: "Make my card",
  },
  {
    href: "/tools/holiday-plan/",
    group: "season",
    useWhen: "Someone needs to get through specific holiday days after a breakup, or wants a line ready for when family asks about their ex.",
    updated: "2026-10-26",
    name: "Holiday Survival Plan",
    label: "For Thanksgiving to New Year",
    blurb: "Pick the holiday days you're dreading and get a short plan for each, with what to say when people ask about your ex.",
    cta: "Make my plan",
  },
  {
    href: "/tools/unsent-text/",
    group: "now",
    useWhen: "Someone wants to text their ex right now, or wants to get the words out without sending them.",
    updated: "2026-11-09",
    name: "Unsent Text to Your Ex",
    label: "Nothing gets sent",
    blurb: "Write the text you want to send them in a chat that never delivers. Then read it back with three honest questions.",
    cta: "Write the text",
  },
  {
    href: "/tools/reasons-not-to-text/",
    group: "now",
    useWhen: "Someone keeps reaching for their phone to text their ex and wants a reminder of why not, such as a reasons list or a lock screen.",
    updated: "2026-11-18",
    name: "Reasons Not to Text Them",
    label: "Lock screen maker",
    blurb: "Write your reasons not to text your ex and turn them into a lock screen, so they're the first thing you see.",
    cta: "Make my lock screen",
  },
  {
    href: "/tools/should-i-text-my-ex/",
    group: "now",
    useWhen: "Someone asks whether they should text their ex, or wants an honest yes or no before they send something.",
    updated: "2026-10-10",
    name: "Should I Text My Ex? Quiz",
    label: "2-minute quiz",
    blurb: "Eight quick questions and an honest answer, plus what to do instead if now isn't the time.",
    cta: "Take the quiz",
  },
];

// The one free tool boxed under each post: the post's own `tool:` front matter, else its cluster's default.
const CLUSTER_TOOL: Record<string, string> = {
  "no-contact": "no-contact-counter",
  "texting-your-ex": "unsent-text",
  "getting-over": "unsent-text",
};

export function toolForPost(cluster?: string, tool?: string): Tool | undefined {
  const slug = tool ?? (cluster ? CLUSTER_TOOL[cluster] : undefined);
  if (!slug) return undefined;
  const found = tools.find((t) => t.href === `/tools/${slug}/`);
  if (!found) throw new Error(`Unknown tool "${slug}" in post front matter`);
  return found;
}
