"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

const featureKeys = [
  "platform.feat1",
  "platform.feat2",
  "platform.feat3",
  "platform.feat4",
  "platform.feat5",
]

export function PlatformPreview() {
  const { t } = useI18n()

  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              {t("platform.tag")}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("platform.heading")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t("platform.desc")}
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {featureKeys.map((key) => (
                <li key={key} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm">{t(key)}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/technology">
                {t("platform.learnMore")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border shadow-xl">
            <Image
              src="/images/platform-viz.jpg"
              alt="angelpro AI platform visualization showing interconnected nodes and molecular structures"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
