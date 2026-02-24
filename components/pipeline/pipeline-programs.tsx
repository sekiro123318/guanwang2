"use client"

import { Pill, Dna, Leaf, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"

interface Program {
  nameKey: string
  classKey: string
  stageKey: string
}

const allPrograms: Program[] = [
  {
    nameKey: "pipeline.program.dfu12",
    classKey: "pipeline.class12",
    stageKey: "stage.indEnabling",
  },
  {
    nameKey: "pipeline.program.dfu11",
    classKey: "pipeline.class11",
    stageKey: "stage.preclinical",
  },
  {
    nameKey: "pipeline.program.alzheimers",
    classKey: "",
    stageKey: "stage.leadOptimization",
  },
  {
    nameKey: "pipeline.program.appetite",
    classKey: "",
    stageKey: "stage.discovery",
  },
  {
    nameKey: "pipeline.program.epilepsy",
    classKey: "",
    stageKey: "stage.leadOptimization",
  },
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

function ProgramCard({
  program,
  t,
}: {
  program: Program
  t: (key: string) => string
}) {
  const currentStageIndex = stageKeys.indexOf(program.stageKey)
  
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-lg">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-foreground truncate">
              {t(program.nameKey)}
            </h3>
            {program.classKey && (
              <span className="inline-block mt-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                {t(program.classKey)}
              </span>
            )}
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
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <div
                      className={cn(
                        "h-3 w-3 rounded-full border-2",
                        isCurrent && "border-primary bg-primary",
                        isUpcoming && "border-border bg-background"
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "text-[10px] font-medium whitespace-nowrap",
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
                      "h-0.5 w-4 sm:w-6",
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
}

export function PipelinePrograms() {
  const { t } = useI18n()

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("pipeline.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("pipeline.subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {allPrograms.map((program, idx) => (
            <ProgramCard
              key={`${program.nameKey}-${idx}`}
              program={program}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
