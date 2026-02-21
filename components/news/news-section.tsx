"use client"

import { useI18n } from "@/lib/i18n-context"

export function NewsSection() {
  const { t } = useI18n()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            {t("news.comingSoon")}
          </p>
        </div>
      </div>
    </section>
  )
}
