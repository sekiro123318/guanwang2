import type { Metadata } from "next"
import { NewsHero } from "@/components/news/news-hero"
import { NewsSection } from "@/components/news/news-section"

export const metadata: Metadata = {
  title: "News",
  description:
    "Stay updated with Angelpro latest news, research breakthroughs, and company announcements.",
}

export default function NewsPage() {
  return (
    <>
      <NewsHero />
      <NewsSection />
    </>
  )
}
