"use client"

import { ImageCarousel, carouselImages } from "@/components/ui/image-carousel"
import { useI18n } from "@/lib/i18n-context"

export function HomeCarousel() {
  const { t } = useI18n()

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {t("carousel.home.title")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("carousel.home.desc")}
          </p>
        </div>
        <ImageCarousel 
          images={carouselImages} 
          autoPlay={true} 
          interval={4000}
        />
      </div>
    </section>
  )
}
