"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function TechCta() {
  const { t } = useI18n()

  return (
    <section className="bg-secondary py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {t("techCta.heading")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          {t("techCta.desc")}
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Link href="/contact">
            {t("techCta.cta")} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
