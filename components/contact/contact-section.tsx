"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, Phone, Linkedin } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const { t } = useI18n()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("contact.formTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("contact.formDesc")}
            </p>

            {submitted ? (
              <div className="mt-8 flex-1 rounded-xl border border-accent/30 bg-accent/5 p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Mail className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {t("contact.msgSent")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("contact.msgSentDesc")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5 flex-1">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      {t("contact.fullName")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder={t("contact.namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      {t("contact.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder={t("contact.emailPlaceholder")}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="organization"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {t("contact.organization")}
                  </label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder={t("contact.orgPlaceholder")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder={t("contact.msgPlaceholder")}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
                >
                  {t("contact.send")}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-8 lg:pl-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {t("contact.infoTitle")}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {t("contact.infoDesc")}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {t("contact.office")}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t("contact.address")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {t("contact.emailLabel")}
                  </h3>
                  <a
                    href="mailto:info@Angelpro.ai"
                    className="mt-1 block text-sm text-accent hover:underline"
                  >
                    info@Angelpro.ai
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {t("contact.phone")}
                  </h3>
                  <a
                    href="tel:18729082967"
                    className="mt-1 block text-sm text-accent hover:underline"
                  >
                    18729082967
                  </a>
                </div>
              </div>


            </div>

            {/* Location Image */}
            <div className="mt-4 overflow-hidden rounded-xl border border-border">
              <Image
                src="/local.png"
                alt="海淀和盈中心位置"
                width={400}
                height={200}
                className="w-full h-52 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
