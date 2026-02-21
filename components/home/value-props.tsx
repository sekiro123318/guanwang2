"use client"

import { Dna, Atom, BarChart3 } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

const valueKeys = [
  { icon: Dna, titleKey: "valueProps.target.title", descKey: "valueProps.target.desc" },
  { icon: Atom, titleKey: "valueProps.lead.title", descKey: "valueProps.lead.desc" },
  { icon: BarChart3, titleKey: "valueProps.clinical.title", descKey: "valueProps.clinical.desc" },
]

export function ValueProps() {
  const { t } = useI18n()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("valueProps.heading")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t("valueProps.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {valueKeys.map((item) => (
            <div
              key={item.titleKey}
              className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-accent/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {t(item.titleKey)}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {t(item.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
