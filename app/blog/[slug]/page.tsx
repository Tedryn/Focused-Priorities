import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadBlogPosts, getBlogPostBySlug } from "@/lib/content";
import SectionHeading from "@/components/SectionHeading";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await loadBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

function BlogPostContent({ post, allPosts }: { post: NonNullable<Awaited<ReturnType<typeof getBlogPostBySlug>>>; allPosts: Awaited<ReturnType<typeof loadBlogPosts>> }) {
  const idx = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = idx > 0 ? allPosts[idx - 1] : null;
  const nextPost = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;

  // Related posts: same tags, excluding current
  const postTags = post.tags ?? [];
  const related = postTags.length > 0
    ? allPosts.filter(
        (p) => p.slug !== post.slug && p.tags?.some((t) => postTags.includes(t))
      ).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="py-16 md:py-24 text-center">
          <h1 className="font-cormorant text-4xl font-normal tracking-wide text-foreground md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-montserrat text-sm tracking-wide text-muted">
            <time dateTime={post.date}>{post.date}</time>
            {post.readingTime && (
              <>
                <span className="text-border">·</span>
                <span>{post.readingTime.text}</span>
              </>
            )}
            {postTags.length > 0 && (
              <>
                <span className="text-border">·</span>
                <div className="flex flex-wrap items-center gap-1.5 justify-center">
                  {postTags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border px-3 py-0.5 text-xs tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mt-10 overflow-hidden rounded-[12px]">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          {/* Divider */}
          <div className="mx-auto mt-10 h-px w-16 bg-border" />
        </section>

        {/* Content */}
        <article className="pb-8">
          <div
            className="font-montserrat text-base leading-relaxed text-foreground md:text-lg"
            dangerouslySetInnerHTML={{ __html: post.htmlContent ?? "" }}
          />
        </article>

        {/* Prev / Next Post Navigation */}
        {(prevPost || nextPost) && (
          <nav aria-label="Blog post navigation" className="mt-16 border-t border-border py-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex max-w-[70%] items-center gap-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-muted transition-colors duration-200 group-hover:text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-montserrat text-xs tracking-widest uppercase text-muted">Previous</span>
                    <span className="font-cormorant text-lg tracking-wide transition-colors duration-200 group-hover:text-accent">
                      {prevPost.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex max-w-[70%] items-center justify-end gap-3 text-right sm:ml-auto"
                >
                  <div className="flex flex-col">
                    <span className="font-montserrat text-xs tracking-widest uppercase text-muted">Next</span>
                    <span className="font-cormorant text-lg tracking-wide transition-colors duration-200 group-hover:text-accent">
                      {nextPost.title}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-muted transition-colors duration-200 group-hover:text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </nav>
        )}

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="py-16 md:py-24">
            <SectionHeading title="Related Posts" subtitle="" />
            <div className="mt-8 grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group cursor-pointer"
                >
                  {r.featuredImage ? (
                    <div className="mb-4 overflow-hidden rounded-[12px]">
                      <img
                        src={r.featuredImage}
                        alt={r.title}
                        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <h4 className="font-cormorant text-xl font-normal tracking-wide text-foreground transition-colors duration-200 group-hover:text-accent">
                    {r.title}
                  </h4>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to all blog posts */}
        <section className="pb-16 pt-8 text-center">
          <Link
            href="/blog"
            className="font-montserrat text-sm tracking-wide text-muted underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
          >
            &larr; Back to all posts
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Jeffrey Andersen Photography`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.featuredImage ? [{ url: post.featuredImage, alt: post.title }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return notFound();
  }

  const allPosts = await loadBlogPosts();

  return <BlogPostContent post={post} allPosts={allPosts} />;
}
