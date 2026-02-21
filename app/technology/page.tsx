import type { Metadata } from "next"
import { TechHero } from "@/components/technology/tech-hero"
import { SmallMoleculesPlatform } from "@/components/technology/small-molecules-platform"
import { PeptidesPlatform } from "@/components/technology/peptides-platform"
import { TcmPlatform } from "@/components/technology/tcm-platform"
import { TechCta } from "@/components/technology/tech-cta"

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Explore angelpro AI-driven drug discovery platforms across small molecules, peptides, and traditional Chinese medicine.",
}

export default function TechnologyPage() {
  return (
    <>
      <TechHero />
      <SmallMoleculesPlatform />
      <PeptidesPlatform />
      <TcmPlatform />
      <TechCta />
    </>
  )
}
