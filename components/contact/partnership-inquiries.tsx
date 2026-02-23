"use client"

import { Handshake, Mail } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function PartnershipInquiries() {
  const { t } = useI18n()

  return (
    <section className="bg-secondary py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-card p-8 text-center md:flex-row md:text-left lg:p-12">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Handshake className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              {t("partnership.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("partnership.desc")}
            </p>
          </div>
          <a
            href="mailto:partnerships@angelpro.ai"
            className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <Mail className="h-4 w-4" />
            partnerships@angelpro.ai
          </a>
        </div>
      </div>
    </section>
  )
}
