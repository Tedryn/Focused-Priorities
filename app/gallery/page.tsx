import { Metadata } from "next";
import { loadGalleries } from "@/lib/content";
import GalleryCard from "@/components/GalleryCard";
import SectionHeading from "@/components/SectionHeading";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gallery — Jeffrey Andersen Photography",
  description: "Browse all photography galleries by subject and collection.",
};

export default async function GalleryPage() {
  const galleries = await loadGalleries();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionHeading title="Gallery" subtitle="All photography collections" />

        {galleries.length > 0 ? (
          <div className="mt-8 grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {galleries.map((gallery) => (
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
        ) : (
          <section className="mt-16 text-center">
            <p className="font-cormorant text-2xl font-normal tracking-wide text-muted md:text-3xl">
              No galleries yet.
            </p>
            <p className="mt-2 font-montserrat text-sm tracking-wide text-muted">
              New collections will appear here soon.
            </p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
