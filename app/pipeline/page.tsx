import type { Metadata } from "next"
import { PipelineHero } from "@/components/pipeline/pipeline-hero"
import { PipelineCarousel } from "./pipeline-carousel"
import { PipelinePrograms } from "@/components/pipeline/pipeline-programs"

export const metadata: Metadata = {
  title: "Pipeline",
  description:
    "Explore Angelpro drug discovery pipeline spanning small molecules, peptides, and traditional Chinese medicine.",
}

export default function PipelinePage() {
  return (
    <>
      <PipelineHero />
      <PipelineCarousel />
      <PipelinePrograms />
    </>
  )
}
