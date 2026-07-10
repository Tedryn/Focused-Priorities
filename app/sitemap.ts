import { loadGalleries, loadBlogPosts } from "@/lib/content";

const BASE_URL = "https://jeffreyandersenphotography.com";

export default async function sitemap() {
  const galleries = await loadGalleries();
  const posts = await loadBlogPosts();

  const galleryEntries = galleries.map((gallery) => ({
    url: `${BASE_URL}/gallery/${gallery.slug}`,
    lastModified: new Date(gallery.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postEntries = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postEntries,
    ...galleryEntries,
  ];
}
