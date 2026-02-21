"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useI18n } from "@/lib/i18n-context"

const faqKeys = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
]

export function FaqSection() {
  const { t } = useI18n()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("faq.heading")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("faq.subtitle")}
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqKeys.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-accent">
                {t(faq.q)}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                {t(faq.a)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
