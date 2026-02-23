"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

const partnerLogos = [
  { src: "/logo/1.png", alt: "Partner Logo 1" },
  { src: "/logo/2.png", alt: "Partner Logo 2" },
  { src: "/logo/3.png", alt: "Partner Logo 3" },
  { src: "/logo/4.png", alt: "Partner Logo 4" },
  { src: "/logo/5.png", alt: "Partner Logo 5" },
  { src: "/logo/6.png", alt: "Partner Logo 6" },
  { src: "/logo/7.png", alt: "Partner Logo 7" }
]

export function PartnerLogos() {
  const { t } = useI18n()

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {t("partners.heading")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          {t("partners.desc")}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partnerLogos.map((logo, index) => (
            <div
              key={index}
              className="relative h-16 w-32 transition-opacity hover:opacity-80"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        <Button
          asChild
          className="mt-12 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Link href="/contact">
            {t("partners.cta")} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
