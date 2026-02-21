import type { Metadata } from "next"
import { TechHero } from "@/components/technology/tech-hero"
import { SmallMoleculesPlatform } from "@/components/technology/small-molecules-platform"
import { PeptidesPlatform } from "@/components/technology/peptides-platform"
import { TcmPlatform } from "@/components/technology/tcm-platform"
import { TechCta } from "@/components/technology/tech-cta"
import { ImageCarousel, galleryImages } from "@/components/ui/image-carousel"
import { useI18n } from "@/lib/i18n-context"

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Explore angelpro AI-driven drug discovery platforms across small molecules, peptides, and traditional Chinese medicine.",
}

export default function TechnologyPage() {
  const { t } = useI18n()

  return (
    <>
      <TechHero />
      
      {/* Image Carousel Section */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("carousel.tech.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("carousel.tech.desc")}
            </p>
          </div>
          <ImageCarousel 
            images={galleryImages} 
            autoPlay={true} 
            interval={4500}
          />
        </div>
      </section>
      
      <SmallMoleculesPlatform />
      <PeptidesPlatform />
      <TcmPlatform />
      <TechCta />
    </>
  )
}
