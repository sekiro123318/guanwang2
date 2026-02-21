import { HeroSection } from "@/components/home/hero-section"
import { LogoBand } from "@/components/home/logo-band"
import { ValueProps } from "@/components/home/value-props"
import { PlatformPreview } from "@/components/home/platform-preview"
import { PipelinePreview } from "@/components/home/pipeline-preview"
import { NewsSection } from "@/components/home/news-section"
import { CareersSection } from "@/components/home/careers-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoBand />
      <ValueProps />
      <PlatformPreview />
      <PipelinePreview />
      <NewsSection />
      <CareersSection />
    </>
  )
}
