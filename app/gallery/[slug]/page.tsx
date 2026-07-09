import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadGalleries, getGalleryBySlug } from "@/lib/content";
import GalleryCard from "@/components/GalleryCard";
import type { Gallery } from "@/lib/types";
import SectionHeading from "@/components/SectionHeading";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LightboxClient from "@/components/LightboxClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const galleries = await loadGalleries();
  return galleries.map((g) => ({ slug: g.slug }));
}

function GalleryContent({ gallery, allGalleries }: { gallery: Gallery; allGalleries: Awaited<ReturnType<typeof loadGalleries>> }) {
  const idx = allGalleries.findIndex((g) => g.slug === gallery.slug);
  const prevGallery = idx > 0 ? allGalleries[idx - 1] : null;
  const nextGallery = idx < allGalleries.length - 1 ? allGalleries[idx + 1] : null;

  // Related galleries: same tags, excluding current
  const related = allGalleries.filter(
    (g) => g.slug !== gallery.slug && gallery.tags?.some((t) => g.tags?.includes(t))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="py-16 md:py-24 text-center">
          <h1 className="font-cormorant text-4xl font-normal tracking-wide text-foreground md:text-5xl lg:text-6xl">
            {gallery.title}
          </h1>
          <p className="mt-4 max-w-[700px] mx-auto font-montserrat text-base leading-relaxed text-muted">
            {gallery.description}
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-montserrat text-sm tracking-wide text-muted">
            <time dateTime={gallery.date}>{gallery.date}</time>
            {gallery.tags && gallery.tags.length > 0 && (
              <>
                <span className="text-border">·</span>
                <div className="flex flex-wrap items-center gap-1.5 justify-center">
                  {gallery.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border px-3 py-0.5 text-xs tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="mx-auto mt-10 h-px w-16 bg-border" />
        </section>

        {/* Photo Grid with lightbox support */}
        {gallery.photos.length > 0 && (
          <section className="pb-8">
            <LightboxClient photos={gallery.photos} />
          </section>
        )}

        {/* Previous / Next Gallery Navigation */}
        {(prevGallery || nextGallery) && (
          <nav aria-label="Gallery navigation" className="mt-16 border-t border-border py-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {prevGallery ? (
                <Link
                  href={`/gallery/${prevGallery.slug}`}
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
                      {prevGallery.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextGallery ? (
                <Link
                  href={`/gallery/${nextGallery.slug}`}
                  className="group flex max-w-[70%] items-center justify-end gap-3 text-right sm:ml-auto"
                >
                  <div className="flex flex-col">
                    <span className="font-montserrat text-xs tracking-widest uppercase text-muted">Next</span>
                    <span className="font-cormorant text-lg tracking-wide transition-colors duration-200 group-hover:text-accent">
                      {nextGallery.title}
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

        {/* Related Galleries */}
        {related.length > 0 && (
          <section className="py-16 md:py-24">
            <SectionHeading title="More From This Collection" subtitle="" />
            <div className="mt-8 grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {related.map((g) => (
                <GalleryCard
                  key={g.slug}
                  slug={g.slug}
                  title={g.title}
                  description={g.description}
                  featuredImage={g.featuredImage}
                  photos={g.photos}
                  date={g.date}
                />
              ))}
            </div>
          </section>
        )}

        {/* Back to all galleries */}
        <section className="pb-16 pt-8 text-center">
          <Link
            href="/gallery"
            className="font-montserrat text-sm tracking-wide text-muted underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
          >
            &larr; Back to all galleries
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await getGalleryBySlug(slug);
  if (!gallery) return {};

  return {
    title: `${gallery.title} — Gallery | Jeffrey Andersen Photography`,
    description: gallery.description,
  };
}

export default async function GalleryDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const gallery = await getGalleryBySlug(resolvedParams.slug);

  if (!gallery || !gallery.featuredImage) {
    return notFound();
  }

  // Validate featured image URL
  try {
    new URL(gallery.featuredImage);
  } catch {
    return notFound();
  }

  const allGalleries = await loadGalleries();

  return <GalleryContent gallery={gallery} allGalleries={allGalleries} />;
}
