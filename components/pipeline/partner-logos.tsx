"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

const partners = [
  "Pfizer",
  "Novartis",
  "Merck",
  "AstraZeneca",
  "Roche",
  "GSK",
]

export function PartnerLogos() {
  const { t } = useI18n()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {t("partners.heading")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          {t("partners.desc")}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {partners.map((name) => (
            <span
              key={name}
              className="text-lg font-bold tracking-wide text-muted-foreground/40 md:text-xl"
            >
              {name}
            </span>
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
