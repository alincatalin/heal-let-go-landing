// Reads a post's "## FAQ..." section, written as **Question?** lines each followed by an answer,
// so it can be published as FAQPage structured data.
const plain = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();

export function extractFaq(body: string | undefined) {
  const section = body?.split(/^## FAQ.*$/m)[1]?.split(/^## /m)[0];
  if (!section) return [];
  const items: { question: string; answer: string }[] = [];
  for (const block of section.split(/\n\s*\n/)) {
    const [first, ...rest] = block.trim().split("\n");
    const question = first?.match(/^\*\*(.+\?)\*\*$/)?.[1];
    const answer = plain(rest.join(" "));
    if (question && answer) items.push({ question: plain(question), answer });
  }
  return items;
}
