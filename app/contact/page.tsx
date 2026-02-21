import type { Metadata } from "next"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactSection } from "@/components/contact/contact-section"
import { PartnershipInquiries } from "@/components/contact/partnership-inquiries"
import { FaqSection } from "@/components/contact/faq-section"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AION Labs. Reach out about partnerships, collaborations, careers, or general inquiries.",
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <PartnershipInquiries />
      <FaqSection />
    </>
  )
}
