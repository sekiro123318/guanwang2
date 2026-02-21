import type { Metadata } from "next"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactSection } from "@/components/contact/contact-section"
import { PartnershipInquiries } from "@/components/contact/partnership-inquiries"
import { FaqSection } from "@/components/contact/faq-section"
import { ImageCarousel, galleryImages } from "@/components/ui/image-carousel"
import { useI18n } from "@/lib/i18n-context"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AION Labs. Reach out about partnerships, collaborations, careers, or general inquiries.",
}

export default function ContactPage() {
  const { t } = useI18n()

  return (
    <>
      <ContactHero />
      
      {/* Image Carousel Section */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("carousel.contact.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("carousel.contact.desc")}
            </p>
          </div>
          <ImageCarousel 
            images={galleryImages} 
            autoPlay={true} 
            interval={5000}
          />
        </div>
      </section>
      
      <ContactSection />
      <PartnershipInquiries />
      <FaqSection />
    </>
  )
}
