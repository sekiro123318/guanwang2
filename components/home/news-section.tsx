"use client"

import { Calendar } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

const newsKeys = [
  { dateKey: "news.1.date", titleKey: "news.1.title", summaryKey: "news.1.summary" },
  { dateKey: "news.2.date", titleKey: "news.2.title", summaryKey: "news.2.summary" },
  { dateKey: "news.3.date", titleKey: "news.3.title", summaryKey: "news.3.summary" },
  { dateKey: "news.4.date", titleKey: "news.4.title", summaryKey: "news.4.summary" },
]

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
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {newsKeys.map((item) => (
            <article
              key={item.titleKey}
              className="group cursor-pointer rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-lg"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {t(item.dateKey)}
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                {t(item.titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(item.summaryKey)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
