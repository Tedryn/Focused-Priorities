import Link from "next/link";
import { Metadata } from "next";
import { loadGalleries, loadBlogPosts } from "@/lib/content";
import GalleryCard from "@/components/GalleryCard";
import BlogCard from "@/components/BlogCard";
import SectionHeading from "@/components/SectionHeading";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Jeffrey Andersen — Photography",
  description:
    "Capturing light, telling stories. A personal photography portfolio and journal by Jeffrey Andersen.",
};

export default async function HomePage() {
  const galleries = await loadGalleries();
  const posts = await loadBlogPosts();

  const recentGalleries = galleries.slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <header className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        {/* Subtle background gradient for warmth */}
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-background" />

        <div className="relative z-10 text-center px-4 py-20 sm:px-6 lg:px-8">
          <h1 className="font-cormorant text-5xl font-normal tracking-wide text-foreground md:text-7xl lg:text-8xl">
            Jeffrey Andersen
          </h1>
          <p className="mt-4 font-montserrat text-base tracking-[0.2em] uppercase text-muted md:text-lg">
            Photography
          </p>

          {/* Divider line */}
          <div className="mx-auto mt-8 h-px w-16 bg-border" />

          {/* Scroll indicator */}
          <div className="mt-12 animate-bounce">
            <svg
              className="w-5 h-5 mx-auto text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Recent Galleries Section */}
        {recentGalleries.length > 0 && (
          <section className="py-16 md:py-24">
            <SectionHeading title="Recent Work" subtitle="Selected galleries and collections" />

            <div className="mt-8 grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {recentGalleries.map((gallery) => (
                <GalleryCard
                  key={gallery.slug}
                  slug={gallery.slug}
                  title={gallery.title}
                  description={gallery.description}
                  featuredImage={gallery.featuredImage}
                  photos={gallery.photos}
                  date={gallery.date}
                />
              ))}
            </div>

            {galleries.length > 3 && (
              <div className="mt-12 text-center">
                <Link
                  href="/gallery"
                  className="inline-block font-montserrat text-sm tracking-wide text-muted underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                >
                  View all galleries &rarr;
                </Link>
              </div>
            )}
          </section>
        )}

        {/* Recent Blog Posts Section */}
        {recentPosts.length > 0 && (
          <section className="py-16 md:py-24">
            <SectionHeading title="Journal" subtitle="Thoughts on photography and the process" />

            <div className="mt-8 space-y-8 max-w-[750px]">
              {recentPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  featuredImage={post.featuredImage}
                  readingTime={post.readingTime}
                  tags={post.tags}
                />
              ))}
            </div>

            {posts.length > 3 && (
              <div className="mt-12 text-center max-w-[750px] mx-auto">
                <Link
                  href="/blog"
                  className="inline-block font-montserrat text-sm tracking-wide text-muted underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                >
                  View all posts &rarr;
                </Link>
              </div>
            )}
          </section>
        )}

        {/* Empty state — when no content exists yet */}
        {recentGalleries.length === 0 && recentPosts.length === 0 && (
          <section className="py-24 text-center">
            <p className="font-cormorant text-3xl font-normal tracking-wide text-muted md:text-4xl">
              Content coming soon.
            </p>
            <p className="mt-2 font-montserrat text-sm tracking-wide text-muted">
              Galleries and journal posts will appear here.
            </p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
