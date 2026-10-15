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
