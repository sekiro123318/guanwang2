"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function NewsHero() {
  const { t } = useI18n()

  return (
    <section className="bg-primary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <nav className="mb-8 flex items-center gap-1 text-sm text-primary-foreground/50">
          <Link href="/" className="transition-colors hover:text-primary-foreground">
            {t("nav.home")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary-foreground">{t("news.breadcrumb")}</span>
        </nav>
        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
          {t("news.heroTitle")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
          {t("news.heroDesc")}
        </p>
      </div>
    </section>
  )
}
