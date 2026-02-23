"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function CareersSection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-primary py-20 lg:py-28">
      <div className="absolute inset-0">
        <Image
          src="/images/lab-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
          {t("careers.heading")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
          {t("careers.desc")}
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Link href="/contact">
            {t("careers.cta")} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
