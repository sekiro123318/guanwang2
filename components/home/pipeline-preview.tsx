"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

const programs = [
  { areaKey: "area.smallMolecules", programKey: "program.dfu12", stageKey: "stage.indApplication", progress: 90 },
  { areaKey: "area.peptides", programKey: "program.appetite", stageKey: "stage.discovery", progress: 30 },
  { areaKey: "area.tcm", programKey: "program.epilepsy", stageKey: "stage.leadOptimization", progress: 60 },
]

export function PipelinePreview() {
  const { t } = useI18n()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            {t("pipelinePreview.tag")}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("pipelinePreview.heading")}
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {programs.map((item) => (
            <div
              key={item.programKey}
              className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {t(item.areaKey)}
              </span>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {t(item.programKey)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{t(item.stageKey)}</p>
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{t("pipelinePreview.progress")}</span>
                  <span className="font-semibold text-foreground">{item.progress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-accent transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="border-border text-foreground hover:bg-secondary"
          >
            <Link href="/pipeline">
              {t("pipelinePreview.viewFull")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
