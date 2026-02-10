"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  caption,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: ImageModalProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const isLoaded = loadedSrc === imageSrc;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasPrevious && onPrevious) onPrevious();
      else if (e.key === "ArrowRight" && hasNext && onNext) onNext();
    },
    [onClose, onPrevious, onNext, hasPrevious, hasNext],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex flex-col" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

      {/* Header */}
      <div
        className="relative z-10 flex items-center justify-between px-4 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.20)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10" />
        <p className="text-white/90 text-sm md:text-base font-medium text-center flex-1 px-4">
          {caption ?? imageAlt}
        </p>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Image area - desktop: arrows on sides, mobile: image full width */}
      <div className="relative z-10 flex items-center justify-center flex-1 min-h-0 px-4 py-4">
        {/* Prev - desktop only */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrevious?.(); }}
          disabled={!hasPrevious}
          className="hidden sm:flex shrink-0 mr-3 w-10 h-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Image frame */}
        <div
          className="flex-1 max-w-5xl h-full flex items-center justify-center min-h-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Skeleton - shown while loading, same aspect ratio as image */}
          {!isLoaded && (
            <div className="rounded-xl bg-white/5 animate-pulse flex flex-col items-center justify-center gap-3 w-full max-w-2xl aspect-video">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
              <p className="text-white/40 text-xs">Loading image...</p>
            </div>
          )}
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1920}
            height={1080}
            className={`rounded-xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.9)] max-h-full w-auto max-w-full transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0 absolute"}`}
            priority
            onLoad={() => setLoadedSrc(imageSrc)}
          />
        </div>

        {/* Next - desktop only */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext?.(); }}
          disabled={!hasNext}
          className="hidden sm:flex shrink-0 ml-3 w-10 h-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 py-3 text-center text-white/40 text-xs"
        style={{ borderTop: "1px solid rgba(255,255,255,0.20)" }}
      >
        {/* Mobile: prev/next arrows */}
        {(hasPrevious || hasNext) && (
          <div className="flex sm:hidden items-center justify-center gap-6 mb-2">
            <button
              onClick={(e) => { e.stopPropagation(); onPrevious?.(); }}
              disabled={!hasPrevious}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-0 disabled:pointer-events-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext?.(); }}
              disabled={!hasNext}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-0 disabled:pointer-events-none"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
        Press ESC to close
        {(hasPrevious || hasNext) && " • Arrow keys to navigate"}
      </div>
    </div>
  );
}
