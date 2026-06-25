import Link from "next/link";
import Image from "next/image";

interface GalleryCardProps {
  slug: string;
  title: string;
  description: string;
  featuredImage: string;
  photos: Array<{ src: string }>;
  date?: string;
}

export default function GalleryCard({
  slug,
  title,
  description,
  featuredImage,
  photos,
  date,
}: GalleryCardProps) {
  return (
    <article className="group cursor-pointer">
      <Link href={`/gallery/${slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-[12px]">
          <div className="aspect-[4/3] w-full">
            <Image
              src={featuredImage}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-1">
          <h3 className="font-cormorant text-xl font-normal tracking-wide text-foreground transition-colors duration-200 group-hover:text-accent">
            {title}
          </h3>
          <p className="font-montserrat text-sm leading-relaxed text-muted">
            {description}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="font-montserrat text-xs tracking-wide text-muted">
              {photos.length} photo{photos.length !== 1 ? "s" : ""}
            </span>
            {date && (
              <>
                <span className="text-border">·</span>
                <span className="font-montserrat text-xs tracking-wide text-muted">
                  {date}
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
