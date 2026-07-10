import { Metadata } from "next";
import { loadBlogPosts } from "@/lib/content";
import SectionHeading from "@/components/SectionHeading";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogListClient from "./BlogListClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jeffreyandersenphotography.com";

export const metadata: Metadata = {
  title: "Blog — Jef Photography",
  description:
    "Thoughts, processes, and stories behind the images. Explore essays on photography technique, location guides, and project updates.",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: "Blog — Jef Photography",
    description:
      "Thoughts, processes, and stories behind the images.",
    type: "website",
    url: "/blog",
    siteName: "Jef Photography",
    images: [
      {
        url: "/images/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Blog — Jef Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Jef Photography",
    description: "Thoughts, processes, and stories behind the images.",
  },
};

export default async function BlogPage() {
  const posts = await loadBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="py-16 md:py-24 text-center" aria-labelledby="blog-heading">
          <h1 id="blog-heading" className="font-cormorant text-4xl font-normal tracking-wide text-foreground md:text-5xl lg:text-6xl">
            Blog
          </h1>
          <p className="mt-4 max-w-[700px] mx-auto font-montserrat text-base leading-relaxed text-muted">
            Thoughts, processes, and stories behind the images.
          </p>

          {/* Divider */}
          <div className="mx-auto mt-10 h-px w-16 bg-border" />
        </section>

        <BlogListClient posts={posts} />
      </main>

      <Footer />
    </div>
  );
}
