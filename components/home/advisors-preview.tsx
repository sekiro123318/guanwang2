import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const advisors = [
  {
    name: "Dr. Richard Thornton",
    title: "Nobel Laureate, Stanford University",
    image: "/images/team/advisor-1.jpg",
  },
  {
    name: "Dr. Margaret Okafor",
    title: "Professor of Biochemistry, Harvard",
    image: "/images/team/advisor-2.jpg",
  },
  {
    name: "Dr. Hiro Tanaka",
    title: "Professor of Computational Biology, MIT",
    image: "/images/team/advisor-3.jpg",
  },
  {
    name: "Dr. Ingrid Holm",
    title: "Nobel Laureate, Karolinska Institute",
    image: "/images/team/advisor-4.jpg",
  },
]

export function AdvisorsPreview() {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Advisory Board
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Guided by world-class scientific leadership
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {advisors.map((advisor) => (
            <div key={advisor.name} className="group text-center">
              <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-2 border-border transition-all group-hover:border-accent">
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">
                {advisor.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {advisor.title}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="border-border text-foreground hover:bg-background"
          >
            <Link href="/team">
              Meet the Team <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
