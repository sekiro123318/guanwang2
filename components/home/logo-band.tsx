"use client"

import Image from "next/image"
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

export function LogoBand() {
  const { t } = useI18n()

  return (
    <section className="border-b border-border bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("logoBand.title")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
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
      </div>
    </section>
  )
}
