// Free browser tools under /tools/. The homepage, blog index, nav and /tools/ hub all list these.
export interface Tool {
  href: string;
  name: string;
  label: string;
  blurb: string;
  cta: string;
}

export const tools: Tool[] = [
  {
    href: "/tools/holiday-challenge/",
    name: "Holiday No Contact Challenge",
    label: "Nov 20 to Jan 1",
    blurb: "43 days without texting your ex, with one small task a day timed to Thanksgiving, Christmas and New Year's Eve.",
    cta: "See today's task",
  },
  {
    href: "/tools/holiday-plan/",
    name: "Holiday Survival Plan",
    label: "For Thanksgiving to New Year",
    blurb: "Pick the holiday days you're dreading and get a short plan for each, with what to say when people ask about your ex.",
    cta: "Make my plan",
  },
  {
    href: "/tools/unsent-text/",
    name: "Unsent Text to Your Ex",
    label: "Nothing gets sent",
    blurb: "Write the text you want to send them in a chat that never delivers. Then read it back with three honest questions.",
    cta: "Write the text",
  },
  {
    href: "/tools/should-i-text-my-ex/",
    name: "Should I Text My Ex? Quiz",
    label: "2-minute quiz",
    blurb: "Eight quick questions and an honest answer, plus what to do instead if now isn't the time.",
    cta: "Take the quiz",
  },
];
