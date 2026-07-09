"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Photo } from "@/lib/types";
import Lightbox from "./Lightbox";

interface LightboxClientProps {
  photos: Photo[];
}

/**
 * Client-side wrapper that renders a photo grid with click-to-open lightbox.
 * Keeps the gallery detail page server-rendered while providing interactivity.
 */
export default function LightboxClient({ photos }: LightboxClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const handlePhotoClick = useCallback((index: number) => {
    setInitialIndex(index);
    setLightboxOpen(true);
  }, []);

  if (photos.length === 0) return null;

  // Determine grid columns based on photo count
  const columns = photos.length <= 3 ? 1 : photos.length <= 6 ? 2 : 3;

  return (
    <>
      {/* Responsive photo grid with click-to-open lightbox */}
      <div
        className={`grid gap-4 ${
          columns === 1
            ? "grid-cols-1"
            : columns === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => handlePhotoClick(index)}
            className="group relative aspect-square w-full overflow-hidden rounded-[12px] bg-card border border-border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label={photo.caption ?? `View photo ${index + 1} of ${photos.length}`}
          >
            <Image
              src={photo.src}
              alt={photo.caption ?? ""}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <Lightbox
          photos={photos}
          initialIndex={initialIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
