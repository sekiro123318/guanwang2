"use client"

import { Pill, Dna, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"

const stageKeys = [
  "stage.discovery",
  "stage.leadOptimization",
  "stage.preclinical",
  "stage.indEnabling",
  "stage.ind",
  "stage.clinical1",
  "stage.clinical2",
  "stage.clinical3",
]

interface Program {
  nameKey: string
  classKey: string
  activeStage: number
  progress: number
}

interface PipelineSection {
  titleKey: string
  icon: React.ElementType
  programs: Program[]
}

const pipelineSections: PipelineSection[] = [
  {
    titleKey: "area.smallMolecules",
    icon: Pill,
    programs: [
      {
        nameKey: "pipeline.program.dfu12",
        classKey: "pipeline.class12",
        activeStage: 3, // IND-Enabling (最高只到IND前)
        progress: 85, // 对应IND-Enabling阶段的85%
      },
      {
        nameKey: "pipeline.program.dfu11",
        classKey: "pipeline.class11",
        activeStage: 2, // Preclinical
        progress: 60, // 对应Preclinical阶段的60%
      },
      {
        nameKey: "pipeline.program.alzheimers",
        classKey: "",
        activeStage: 1, // Lead Optimization
        progress: 40, // 对应Lead Optimization阶段的40%
      },
    ],
  },
  {
    titleKey: "area.peptides",
    icon: Dna,
    programs: [
      {
        nameKey: "pipeline.program.appetite",
        classKey: "",
        activeStage: 0, // Discovery
        progress: 20, // 对应Discovery阶段的20%
      },
    ],
  },
  {
    titleKey: "area.tcm",
    icon: Leaf,
    programs: [
      {
        nameKey: "pipeline.program.epilepsy",
        classKey: "",
        activeStage: 1, // Lead Optimization
        progress: 45, // 对应Lead Optimization阶段的45%
      },
    ],
  },
]

function StageTimeline({
  activeStage,
  t,
}: {
  activeStage: number
  t: (key: string) => string
}) {
  return (
    <div className="flex items-center gap-0 w-full">
      {stageKeys.map((key, i) => {
        const isCompleted = i < activeStage
        const isActive = i === activeStage
        const isUpcoming = i > activeStage

        return (
          <div key={key} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={cn(
                  "h-3 w-3 rounded-full border-2 transition-colors",
                  isCompleted && "border-primary bg-primary",
                  isActive && "border-accent bg-accent",
                  isUpcoming && "border-border bg-background"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium text-center leading-tight sm:text-xs",
                  isCompleted && "text-primary",
                  isActive && "text-accent font-semibold",
                  isUpcoming && "text-muted-foreground"
                )}
              >
                {t(key)}
              </span>
            </div>
            {i < stageKeys.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 -mt-5",
                  i < activeStage ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function ProgramCard({
  program,
  t,
}: {
  program: Program
  t: (key: string) => string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground sm:text-lg">
            {t(program.nameKey)}
          </h3>
          {program.classKey && (
            <span className="inline-block mt-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
              {t(program.classKey)}
            </span>
          )}
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {t(stageKeys[program.activeStage])}
        </span>
      </div>

      {/* Stage timeline */}
      <StageTimeline activeStage={program.activeStage} t={t} />

      {/* Progress bar - Based on 8 stages from discovery to clinical3 */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
          <span>研发进度</span>
          <span className="font-semibold text-foreground">
            {Math.round((program.activeStage + program.progress / 100) * 100 / 8)}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              program.activeStage >= 3 ? "bg-primary" : "bg-accent"
            )}
            style={{ 
              width: `${Math.round((program.activeStage + program.progress / 100) * 100 / 8)}%` 
            }}
          />
        </div>
      </div>


    </div>
  )
}

export function PipelinePrograms() {
  const { t } = useI18n()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Global stage legend */}
        <div className="mb-16 rounded-xl border border-border bg-secondary/50 p-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("pipeline.stagesLabel")}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            {stageKeys.map((key, i) => (
              <div key={key} className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-accent" />
                  {i < stageKeys.length - 1 && (
                    <div className="h-0.5 w-6 bg-border hidden sm:block" />
                  )}
                </div>
                <span className="text-sm font-medium text-foreground">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pipelineSections.map((section) => (
            <div key={section.titleKey} className="bg-card rounded-xl border border-border p-6">
              {/* Section header */}
              <div className="flex flex-col items-center text-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <section.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {t(section.titleKey)}
                </h2>
              </div>

              {/* Program cards */}
              <div className="flex flex-col gap-4">
                {section.programs.map((program, idx) => (
                  <ProgramCard
                    key={`${program.nameKey}-${idx}`}
                    program={program}
                    t={t}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
