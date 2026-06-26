import { remark } from "remark";
import html from "remark-html";

/**
 * Converts markdown text into safe HTML for server-side rendering.
 * Uses remark + remark-html pipeline to transform markdown content.
 * Returns empty string if input is null/undefined/empty.
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  if (!markdown?.trim()) {
    return "";
  }

  try {
    const result = await remark().use(html).process(markdown);
    return String(result);
  } catch (error) {
    console.error("Failed to render markdown:", error);
    // Fallback: wrap raw content in a muted paragraph
    return `<p class="text-muted">${markdown.substring(0, 200)}</p>`;
  }
}

/**
 * Server component that renders pre-processed markdown HTML with Tailwind typography.
 * Call renderMarkdown() in your page, then pass the resulting HTML here.
 */
export default function MarkdownRenderer({ htmlContent }: { htmlContent: string }) {
  if (!htmlContent) return null;

  return (
    <div className="prose prose-sm sm:prose lg:text-base max-w-none">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
