"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"

interface ImageCarouselProps {
  images: Array<{
    src: string
    alt: string
    textKey?: string
  }>
  autoPlay?: boolean
  interval?: number
  className?: string
  showControls?: boolean
  showIndicators?: boolean
  showTextOverlay?: boolean
  overlayTextKey?: string
}

export function ImageCarousel({
  images,
  autoPlay = false,
  interval = 5000,
  className = "",
  showControls = true,
  showIndicators = true,
  showTextOverlay = false,
  overlayTextKey = "",
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { t } = useI18n()
  const [isPaused, setIsPaused] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (autoPlay && !isPaused) {
      timeoutRef.current = setTimeout(nextSlide, interval)
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentIndex, autoPlay, interval, isPaused])

  return (
    <div 
      className={cn("relative overflow-hidden rounded-xl", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Images */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {/* Text overlay in bottom right corner */}
            {(showTextOverlay || image.textKey) && (overlayTextKey || image.textKey) && (
              <div className="absolute bottom-4 right-4 max-w-[80%] text-white/90 text-xs sm:text-sm bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                {t(image.textKey || overlayTextKey)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {showControls && images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all hover:bg-white/40 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all hover:bg-white/40 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="transition-all hover:scale-125"
              aria-label={`Go to slide ${index + 1}`}
            >
              <Circle
                className={cn(
                  "h-2.5 w-2.5",
                  index === currentIndex
                    ? "fill-white text-white"
                    : "fill-white/40 text-white/40"
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export const carouselImages = [
  { src: "/pipeline/1.jpg", alt: "HE Staining", textKey: "carousel.pipeline.image1" },
  { src: "/pipeline/2.png", alt: "Masson Staining", textKey: "carousel.pipeline.image2" },
  { src: "/pipeline/3.png", alt: "F4/80+CD206+ Cells", textKey: "carousel.pipeline.image3" },
  { src: "/pipeline/4.png", alt: "F4/80+CD45+ Cells", textKey: "carousel.pipeline.image4" },
  { src: "/pipeline/5.png", alt: "Flow Cytometry", textKey: "carousel.pipeline.image5" },
  { src: "/pipeline/6.png", alt: "Immunofluorescence", textKey: "carousel.pipeline.image6" },
  { src: "/pipeline/7.jpg", alt: "Western Blot", textKey: "carousel.pipeline.image7" },
]

export const galleryImages = [
  { src: "/images/carousel/cell-microscopy.jpg", alt: "Cell Microscopy - Advanced cellular imaging technology" },
  { src: "/images/carousel/dna-helix.jpg", alt: "DNA Helix - Genetic research and molecular biology" },
  { src: "/images/carousel/drug-receptor.jpg", alt: "Drug Receptor - Pharmaceutical research and drug discovery" },
  { src: "/images/carousel/neural-bio.jpg", alt: "Neural Biology - Neuroscience and brain research" },
]

export const techGalleryImages = [
  { src: "/images/gallery/crispr.jpg", alt: "CRISPR Technology - Gene editing and precision medicine" },
  { src: "/images/gallery/heatmap.jpg", alt: "Heatmap - Data visualization and bioinformatics" },
  { src: "/images/gallery/organoid.jpg", alt: "Organoid Technology - 3D tissue culture and disease modeling" },
  { src: "/images/gallery/protein-folding.jpg", alt: "Protein Folding - Structural biology and computational design" },
]
