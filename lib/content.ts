import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { Gallery, BlogPost, Photo } from "./types";
import { markdownToHtml, calcReadingTime, parseMarkdownFile } from "./markdown";

const CONTENT_DIR = join(process.cwd(), "content");

/** Derive a slug from a filename: strip .md, lowercase, spaces to hyphens */
function deriveSlug(filename: string): string {
  return filename.replace(/\.md$/, "").toLowerCase().replace(/\s+/g, "-");
}

/** Load all gallery markdown files and return parsed Gallery[] */
export async function loadGalleries(): Promise<Gallery[]> {
  const galleryDir = join(CONTENT_DIR, "gallery");
  let files: string[] = [];
  try {
    files = readdirSync(galleryDir).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  const galleries: Gallery[] = [];

  for (const file of files) {
    const filePath = join(galleryDir, file);
    const { data, content } = parseMarkdownFile(filePath);

    // Skip empty bodies
    if (!content.trim()) continue;

    const photos: Photo[] = Array.isArray(data.photos) ? data.photos : [];

    galleries.push({
      title: typeof data.title === "string" ? data.title : file.replace(/\.md$/, ""),
      slug: typeof data.slug === "string" && data.slug.length > 0
        ? data.slug
        : deriveSlug(file),
      description: typeof data.description === "string" ? data.description : "",
      date: typeof data.date === "string" ? data.date : new Date().toISOString().split("T")[0],
      featuredImage: typeof data.featuredImage === "string" ? data.featuredImage : (photos[0]?.src ?? ""),
      photos,
      tags: Array.isArray(data.tags) ? data.tags : undefined,
    });
  }

  // Sort by date descending
  galleries.sort((a, b) => b.date.localeCompare(a.date));
  return galleries;
}

/** Load all blog post markdown files and return parsed BlogPost[] */
export async function loadBlogPosts(): Promise<BlogPost[]> {
  const blogDir = join(CONTENT_DIR, "blog");
  let files: string[] = [];
  try {
    files = readdirSync(blogDir).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  const posts: BlogPost[] = [];

  for (const file of files) {
    const filePath = join(blogDir, file);
    const { data, content } = parseMarkdownFile(filePath);

    // Skip empty bodies
    if (!content.trim()) continue;

    const htmlContent = await markdownToHtml(content);
    const rt = calcReadingTime(content);

    posts.push({
      title: typeof data.title === "string" ? data.title : file.replace(/\.md$/, ""),
      slug: typeof data.slug === "string" && data.slug.length > 0
        ? data.slug
        : deriveSlug(file),
      date: typeof data.date === "string" ? data.date : new Date().toISOString().split("T")[0],
      excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
      featuredImage: typeof data.featuredImage === "string" ? data.featuredImage : undefined,
      tags: Array.isArray(data.tags) ? data.tags : undefined,
      htmlContent,
      readingTime: rt,
    });
  }

  // Sort by date descending
  posts.sort((a, b) => b.date.localeCompare(a.date));
  return posts;
}

/** Get a single gallery by slug */
export async function getGalleryBySlug(slug: string): Promise<Gallery | null> {
  const galleries = await loadGalleries();
  return galleries.find((g) => g.slug === slug) ?? null;
}

/** Get a single blog post by slug */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await loadBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
