"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageModal } from "@/components/ui/image-modal";
import { BlurFade } from "@/components/ui/blur-fade";
import { Expand } from "lucide-react";
import type { ProjectImage } from "@/types";

interface ProjectGalleryProps {
  images: ProjectImage[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedIndex(null);
  };

  const handlePrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <BlurFade key={index} delay={0.1 + index * 0.1} inView>
          <figure
            className="group relative rounded-xl overflow-hidden border shadow-lg cursor-pointer"
            onClick={() => handleOpenModal(index)}
          >
            <div className="relative h-[240px] md:h-[280px] overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-left-top transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 rounded-full bg-white/20 backdrop-blur-sm">
                  <Expand className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            {image.caption && (
              <figcaption className="p-4 bg-card border-t">
                <p className="text-sm text-muted-foreground">{image.caption}</p>
              </figcaption>
            )}
          </figure>
          </BlurFade>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={selectedIndex !== null}
          onClose={handleCloseModal}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
          caption={selectedImage.caption}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={selectedIndex !== null && selectedIndex > 0}
          hasNext={selectedIndex !== null && selectedIndex < images.length - 1}
        />
      )}
    </>
  );
}
