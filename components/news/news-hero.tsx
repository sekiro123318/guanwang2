"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { Protein3DComplex } from "@/components/pipeline/protein-3d-complex"

export function NewsHero() {
  const { t } = useI18n()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-950 to-teal-900 py-20 lg:py-28">
      {/* Animated background with 3D protein complex */}
      <div className="absolute inset-0">
        <Protein3DComplex className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-slate-900/40 to-teal-900/30" />
        
        {/* Floating particles animation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-300/20"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 7 + 4}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <nav className="mb-8 flex items-center gap-1 text-sm text-cyan-200/50">
          <Link href="/" className="transition-colors hover:text-cyan-200">
            {t("nav.home")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-cyan-100">{t("news.breadcrumb")}</span>
        </nav>
        <h1 
          className={`max-w-3xl text-balance text-4xl font-bold tracking-tight text-cyan-50 md:text-5xl transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {t("news.heroTitle")}
        </h1>
        <p 
          className={`mt-6 max-w-2xl text-lg leading-relaxed text-cyan-100/80 transition-all duration-700 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {t("news.heroDesc")}
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(180deg); }
        }
      `}</style>
    </section>
  )
}
