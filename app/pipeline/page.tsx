import type { Metadata } from "next"
import { PipelineHero } from "@/components/pipeline/pipeline-hero"
import { PipelinePrograms } from "@/components/pipeline/pipeline-programs"
import { PartnerLogos } from "@/components/pipeline/partner-logos"
import { ImageCarousel, carouselImages } from "@/components/ui/image-carousel"
import { useI18n } from "@/lib/i18n-context"

export const metadata: Metadata = {
  title: "Pipeline",
  description:
    "Explore angelpro drug discovery pipeline spanning small molecules, peptides, and traditional Chinese medicine.",
}

export default function PipelinePage() {
  const { t } = useI18n()

  return (
    <>
      <PipelineHero />
      
      {/* Image Carousel Section */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("carousel.pipeline.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("carousel.pipeline.desc")}
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
