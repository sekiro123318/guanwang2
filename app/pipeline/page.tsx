import type { Metadata } from "next"
import { PipelineHero } from "@/components/pipeline/pipeline-hero"
import { PipelinePrograms } from "@/components/pipeline/pipeline-programs"
import { PartnerLogos } from "@/components/pipeline/partner-logos"

export const metadata: Metadata = {
  title: "Pipeline",
  description:
    "Explore angelpro drug discovery pipeline spanning small molecules, peptides, and traditional Chinese medicine.",
}

export default function PipelinePage() {
  return (
    <>
      <PipelineHero />
      <PipelinePrograms />
      <PartnerLogos />
    </>
  )
}
