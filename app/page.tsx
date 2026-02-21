import { HeroSection } from "@/components/home/hero-section"
import { LogoBand } from "@/components/home/logo-band"
import { ValueProps } from "@/components/home/value-props"
import { PlatformPreview } from "@/components/home/platform-preview"
import { PipelinePreview } from "@/components/home/pipeline-preview"
import { NewsSection } from "@/components/home/news-section"
import { CareersSection } from "@/components/home/careers-section"
import { ImageCarousel, carouselImages } from "@/components/ui/image-carousel"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      {/* Image Carousel Section */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              探索我们的前沿研究
            </h2>
            <p className="mt-2 text-muted-foreground">
              从细胞生物学到计算化学，全方位展示我们的研究领域
            </p>
          </div>
          <ImageCarousel 
            images={carouselImages} 
            autoPlay={true} 
            interval={4000}
          />
        </div>
      </section>
      
      <LogoBand />
      <ValueProps />
      <PlatformPreview />
      <PipelinePreview />
      <NewsSection />
      <CareersSection />
    </>
  )
}
