"use client"

import Link from "next/link"
import { Linkedin, Twitter, Mail } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function Footer() {
  const { t } = useI18n()

  const footerLinks = {
    [t("footer.company")]: [
      { href: "/", label: t("nav.home") },
      { href: "/technology", label: t("nav.technology") },
      { href: "/pipeline", label: t("nav.pipeline") },
    ],
    [t("footer.resources")]: [
      { href: "/contact", label: t("nav.contact") },
      { href: "/contact", label: t("footer.partnerships") },
      { href: "/contact", label: t("footer.careers") },
      { href: "/contact", label: t("footer.publications") },
    ],
  }

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent-foreground">
                  <path d="M12 2L2 19h20L12 2z" fill="currentColor" opacity="0.8" />
                  <circle cx="12" cy="13" r="4" fill="currentColor" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">angelpro</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/70">
              {t("footer.desc")}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-primary-foreground/60 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-primary-foreground/60 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@angelpro.ai"
                className="rounded-md p-2 text-primary-foreground/60 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
                {title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {links.map((link, i) => (
                  <li key={`${link.label}-${i}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 md:flex-row">
          <p className="text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <Link href="/contact" className="transition-colors hover:text-primary-foreground">
              {t("footer.privacy")}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-primary-foreground">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
