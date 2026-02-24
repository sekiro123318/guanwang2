"use client"

import Image from "next/image"
import { useI18n } from "@/lib/i18n-context"

const partners = [
  { name: "Partner 1", image: "/logo/1.png" },
  { name: "Partner 2", image: "/logo/2.png" },
  { name: "Partner 3", image: "/logo/3.png" },
  { name: "Partner 4", image: "/logo/4.png" },
  { name: "Partner 5", image: "/logo/5.png" },
  { name: "Partner 6", image: "/logo/6.png" },
  { name: "Partner 7", image: "/logo/7.png" },
]

export function LogoBand() {
  const { t } = useI18n()

  return (
    <section className="border-b border-border bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("logoBand.title")}
        </p>
        <div className="flex items-center justify-center gap-8 md:gap-12 overflow-hidden">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex-shrink-0 transition-transform hover:scale-110"
            >
              <Image
                src={partner.image}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
