"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Photo } from "@/lib/types";

interface LightboxProps {
  photos: Photo[];
  initialIndex?: number;
  onClose: () => void;
}

/**
 * Fullscreen lightbox overlay with keyboard navigation,
 * prev/next controls, caption display, and mobile swipe support.
 */
export default function Lightbox({ photos, initialIndex = 0, onClose }: LightboxProps) {
  if (photos.length === 0) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  const currentPhoto = photos[currentIndex];

  const goToPrev = useCallback(() => {
    setCurrentIndex((idx) => (idx === 0 ? photos.length - 1 : idx - 1));
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((idx) => (idx === photos.length - 1 ? 0 : idx + 1));
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goToPrev, goToNext]);

  // Prevent body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Mobile swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 50;

    if (diff > threshold) {
      goToNext(); // Swipe left → next
    } else if (diff < -threshold) {
      goToPrev(); // Swipe right → prev
    }

    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors duration-200"
        aria-label="Close lightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous */}
      <button
        onClick={goToPrev}
        className="absolute left-4 z-50 p-2 text-white/70 hover:text-white transition-colors duration-200"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image + caption container */}
      <div className="relative flex max-h-[80vh] w-full max-w-5xl flex-col items-center px-20">
        <div className="relative w-auto h-auto max-h-[70vh]">
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.caption ?? ""}
            width={1600}
            height={1200}
            sizes="100vw"
            className="max-h-[70vh] w-auto object-contain rounded-lg"
          />
        </div>

        {/* Caption */}
        {(currentPhoto.caption || currentPhoto.camera) && (
          <div className="mt-4 text-center text-sm text-white/60">
            {currentPhoto.caption && <p>{currentPhoto.caption}</p>}
            {currentPhoto.camera && (
              <p className="mt-1 text-xs text-white/40">
                {currentPhoto.camera}
                {currentPhoto.film ? ` · ${currentPhoto.film}` : ""}
                {currentPhoto.lens ? ` · ${currentPhoto.lens}` : ""}
                {currentPhoto.exposure ? ` · ${currentPhoto.exposure}` : ""}
              </p>
            )}
          </div>
        )}

        {/* Counter */}
        <p className="mt-2 text-xs text-white/30">
          {currentIndex + 1} / {photos.length}
        </p>
      </div>

      {/* Next */}
      <button
        onClick={goToNext}
        className="absolute right-4 z-50 p-2 text-white/70 hover:text-white transition-colors duration-200"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
