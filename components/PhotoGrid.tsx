import Image from "next/image";
import { Photo } from "@/lib/types";

interface PhotoGridProps {
  photos: Photo[];
  columns?: number;
  showCaptions?: boolean;
}

/**
 * Responsive photo grid with consistent row heights.
 * Renders Next.js <Image> components with lazy loading,
 * rounded corners (12px), and 16px gaps between cells.
 */
export default function PhotoGrid({ photos, columns = 3, showCaptions = false }: PhotoGridProps) {
  const columnClass = columns === 2
    ? "grid-cols-1 sm:grid-cols-2"
    : columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`${columnClass} grid gap-4`}>
      {photos.map((photo) => (
        <figure key={photo.src} className="m-0">
          <div className="relative aspect-square overflow-hidden rounded-[12px] bg-card border border-border">
            <Image
              src={photo.src}
              alt={photo.caption ?? ""}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-cover"
            />
          </div>
          {showCaptions && photo.caption && (
            <figcaption className="mt-2 text-sm text-muted text-center">
              {photo.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
