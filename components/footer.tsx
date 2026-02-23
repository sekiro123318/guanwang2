"use client"

import Image from "next/image"
import Link from "next/link"
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
    ],
  }

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              </div>
              <span className="text-lg font-bold tracking-tight">Angelpro</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/70">
              {t("footer.desc")}
            </p>
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
        </div>
      </div>
    </footer>
  )
}
