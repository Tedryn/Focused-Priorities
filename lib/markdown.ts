import { readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

/** Convert raw markdown text to safe HTML string */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return String(result);
}

/** Calculate reading time from a text string */
export function calcReadingTime(text: string) {
  const rt = readingTime(text);
  return {
    minutes: Math.ceil(rt.minutes),
    text: rt.text,
  };
}

/** Read a markdown file and parse frontmatter + body */
export function parseMarkdownFile(filePath: string): { data: Record<string, any>; content: string } {
  const raw = readFileSync(filePath, "utf-8");
  return matter(raw);
}
