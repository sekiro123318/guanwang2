"use client"

import { useI18n } from "@/lib/i18n-context"

export function NewsSection() {
  const { t } = useI18n()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            {t("news.tag")}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("news.heading")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("news.description")}
          </p>
        </div>
      </div>
    </section>
  )
}
