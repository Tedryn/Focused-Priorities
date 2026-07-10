import { Metadata } from "next";
import { loadBlogPosts } from "@/lib/content";
import SectionHeading from "@/components/SectionHeading";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog — Jeffrey Andersen Photography",
  description: "Thoughts, processes, and stories behind the images.",
};

export default async function BlogPage() {
  const posts = await loadBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="py-16 md:py-24 text-center">
          <h1 className="font-cormorant text-4xl font-normal tracking-wide text-foreground md:text-5xl lg:text-6xl">
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
