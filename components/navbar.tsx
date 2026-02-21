"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"

const linkKeys = [
  { href: "/", key: "nav.home" },
  { href: "/pipeline", key: "nav.pipeline" },
  { href: "/news", key: "nav.news" },
  { href: "/contact", key: "nav.contact" },
]

const techPlatforms = [
  { href: "/technology#small-molecules", key: "area.smallMolecules" },
  { href: "/technology#peptides", key: "area.peptides" },
  { href: "/technology#tcm", key: "area.tcm" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [techDropdownOpen, setTechDropdownOpen] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { locale, setLocale, t } = useI18n()

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setTechDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setTechDropdownOpen(false)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
              <path d="M12 2L2 19h20L12 2z" fill="currentColor" opacity="0.8" />
              <circle cx="12" cy="13" r="4" fill="currentColor" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            angelpro
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {/* Home, Pipeline, News, Contact */}
          {linkKeys.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
                pathname === link.href
                  ? "text-accent"
                  : "text-muted-foreground"
              )}
            >
              {t(link.key)}
            </Link>
          ))}
          
          {/* Technology Dropdown */}
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
              onClick={() => setTechDropdownOpen(!techDropdownOpen)}
              className={cn(
                "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
                pathname.startsWith("/technology")
                  ? "text-accent"
                  : "text-muted-foreground"
              )}
            >
              {t("nav.technology")}
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {/* Dropdown Menu */}
            {techDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-1 w-48 rounded-lg border border-border bg-card shadow-lg"
              >
                <div className="py-1">
                  {techPlatforms.map((platform) => (
                    <Link
                      key={platform.href}
                      href={platform.href}
                      onClick={() => setTechDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      {t(platform.key)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Language Switch + CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center overflow-hidden rounded-lg border border-border">
            <button
              onClick={() => setLocale("en")}
              className={cn(
                "px-2.5 py-1 text-xs font-semibold transition-colors",
                locale === "en"
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("zh")}
              className={cn(
                "px-2.5 py-1 text-xs font-semibold transition-colors",
                locale === "zh"
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {"\u4e2d\u6587"}
            </button>
          </div>


          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-secondary md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            {/* Home, Pipeline, News, Contact */}
            {linkKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary",
                  pathname === link.href
                    ? "text-accent"
                    : "text-muted-foreground"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
            
            {/* Technology Link */}
            <Link
              href="/technology"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary",
                pathname.startsWith("/technology")
                  ? "text-accent"
                  : "text-muted-foreground"
              )}
            >
              {t("nav.technology")}
            </Link>
            
            {/* Technology Platforms (indented) */}
            <div className="ml-4 border-l border-border pl-3">
              {techPlatforms.map((platform) => (
                <Link
                  key={platform.href}
                  href={platform.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {t(platform.key)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
