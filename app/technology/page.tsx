import type { Metadata } from "next"
import { TechHero } from "@/components/technology/tech-hero"
import { SmallMoleculesPlatform } from "@/components/technology/small-molecules-platform"
import { PeptidesPlatform } from "@/components/technology/peptides-platform"
import { TcmPlatform } from "@/components/technology/tcm-platform"
import { TechCta } from "@/components/technology/tech-cta"
import { ImageCarousel, galleryImages } from "@/components/ui/image-carousel"

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Explore angelpro AI-driven drug discovery platforms across small molecules, peptides, and traditional Chinese medicine.",
}

export default function TechnologyPage() {
  return (
    <>
      <TechHero />
      
      {/* Image Carousel Section */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              我们的技术能力
            </h2>
            <p className="mt-2 text-muted-foreground">
              从基因编辑到蛋白质折叠，展示我们的核心技术平台
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
