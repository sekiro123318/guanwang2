"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"

const programs = [
  { nameKey: "pipeline.program.dfu12", stageKey: "stage.indApplication" },
  { nameKey: "pipeline.program.alzheimers", stageKey: "stage.leadOptimization" },
  { nameKey: "pipeline.program.appetite", stageKey: "stage.discovery" },
  { nameKey: "pipeline.program.epilepsy", stageKey: "stage.leadOptimization" },
]

const stageKeys = [
  "stage.discovery",
  "stage.leadOptimization",
  "stage.preclinical",
  "stage.indEnabling",
  "stage.ind",
  "stage.indApplication",
  "stage.clinical1",
  "stage.clinical2",
  "stage.clinical3",
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

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {programs.map((program) => {
            const currentStageIndex = stageKeys.indexOf(program.stageKey)

            return (
              <div
                key={program.nameKey}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-foreground truncate">
                        {t(program.nameKey)}
                      </h3>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground flex-shrink-0">
                      {t(program.stageKey)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 overflow-x-auto">
                    {stageKeys.map((key, index) => {
                      const isCompleted = index < currentStageIndex
                      const isCurrent = index === currentStageIndex
                      const isUpcoming = index > currentStageIndex

                      return (
                        <div key={key} className="flex items-center gap-1 flex-shrink-0">
                          <div className="flex items-center gap-1">
                            {isCompleted ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                            ) : (
                              <div
                                className={cn(
                                  "h-2.5 w-2.5 rounded-full border-2",
                                  isCurrent && "border-primary bg-primary",
                                  isUpcoming && "border-border bg-background"
                                )}
                              />
                            )}
                            <span
                              className={cn(
                                "text-[9px] font-medium whitespace-nowrap",
                                isCompleted && "text-primary",
                                isCurrent && "text-primary font-semibold",
                                isUpcoming && "text-muted-foreground"
                              )}
                            >
                              {t(key)}
                            </span>
                          </div>
                          {index < stageKeys.length - 1 && (
                            <div
                              className={cn(
                                "h-0.5 w-3 sm:w-4",
                                index < currentStageIndex ? "bg-primary" : "bg-border"
                              )}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
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
