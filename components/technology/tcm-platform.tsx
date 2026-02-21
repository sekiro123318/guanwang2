"use client"

import { useState } from "react"
import Image from "next/image"
import { Leaf, Search, FlaskConical, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"

const capKeys = Array.from({ length: 11 }, (_, i) => `tcm.cap${i + 1}`)

const sectionDefs = [
  {
    id: "discovery",
    icon: Search,
    tagKey: "tcm.discovery.tag",
    titleKey: "tcm.discovery.title",
    descKey: "tcm.discovery.desc",
    image: "/technology/2.3-tcm.jpeg",
    imageAlt: "TCM Discovery - Class 2.3 modified new drug discovery",
  },
  {
    id: "screening",
    icon: FlaskConical,
    tagKey: "tcm.screening.tag",
    titleKey: "tcm.screening.title",
    descKey: "tcm.screening.desc",
    capabilities: capKeys,
    image: "/technology/tcm-bioactivity.jpeg",
    imageAlt: "TCM Bioactivity - TCM active platform development",
  },
]

export function TcmPlatform() {
  const [openSection, setOpenSection] = useState<string | null>("discovery")
  const { t } = useI18n()

  return (
    <section id="tcm" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            {t("tcm.platformTag")}
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("tcm.title")}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {t("tcm.desc")}
        </p>

        {/* Accordion cards */}
        <div className="mt-12 flex flex-col gap-4">
          {sectionDefs.map((section) => {
            const isOpen = openSection === section.id
            return (
              <div
                key={section.id}
                className={cn(
                  "rounded-xl border transition-all",
                  isOpen
                    ? "border-accent/30 bg-card shadow-lg"
                    : "border-border bg-card hover:border-accent/20 hover:shadow-md"
                )}
              >
                <button
                  onClick={() =>
                    setOpenSection(isOpen ? null : section.id)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                        isOpen
                          ? "bg-accent text-accent-foreground"
                          : "bg-accent/10 text-accent"
                      )}
                    >
                      <section.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-accent">
                        {t(section.tagKey)}
                      </span>
                      <h3 className="text-base font-semibold text-foreground md:text-lg">
                        {t(section.titleKey)}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-border pt-5 pl-14">
                      <p className="leading-relaxed text-muted-foreground">
                        {t(section.descKey)}
                      </p>
                      {/* Technology image */}
                      <div className="mt-6 relative aspect-video overflow-hidden rounded-lg border border-border">
                        <Image
                          src={section.image}
                          alt={section.imageAlt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {section.capabilities && (
                        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                          {section.capabilities.map((capKey) => (
                            <li
                              key={capKey}
                              className="flex items-start gap-2 text-sm text-foreground"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              {t(capKey)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
