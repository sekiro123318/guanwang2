"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function HeroSection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-protein.jpg"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-primary/60" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center lg:px-8 lg:py-36">
        <span className="mb-4 inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
          {t("hero.badge")}
        </span>
        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
          {t("hero.title")}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
          {t("hero.subtitle")}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/technology">
              {t("hero.exploreTech")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link href="/pipeline">{t("hero.viewPipeline")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
