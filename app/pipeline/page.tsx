import type { Metadata } from "next"
import { PipelineHero } from "@/components/pipeline/pipeline-hero"
import { PipelinePrograms } from "@/components/pipeline/pipeline-programs"
import { PartnerLogos } from "@/components/pipeline/partner-logos"
import { ImageCarousel, carouselImages } from "@/components/ui/image-carousel"

export const metadata: Metadata = {
  title: "Pipeline",
  description:
    "Explore angelpro drug discovery pipeline spanning small molecules, peptides, and traditional Chinese medicine.",
}

export default function PipelinePage() {
  return (
    <>
      <PipelineHero />
      
      {/* Image Carousel Section */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              研发管线背后的科学
            </h2>
            <p className="mt-2 text-muted-foreground">
              深入了解我们药物研发过程中的科学技术
            </p>
          </div>
          <ImageCarousel 
            images={carouselImages} 
            autoPlay={true} 
            interval={5000}
          />
        </div>
      </section>
      
      <PipelinePrograms />
      <PartnerLogos />
    </>
  )
}
