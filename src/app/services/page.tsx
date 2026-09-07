import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Sprig } from "@/components/Sprig";
import { ArrowLink } from "@/components/ArrowLink";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { SERVICE_CATEGORIES } from "@/data/services";

export const metadata: Metadata = {
  title: "Services — The Quiet House",
  description:
    "Prices and durations for every treatment at The Quiet House salon — hair, nails, skin, massage, and enhancements.",
};

export default function ServicesPage() {
  return (
    <>
      <main className="flex-1">
        {/* HEADER */}
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-x-clip bg-tqh-blush px-6 text-center md:px-10">
          <Nav />

          <Marquee
            text="Every Ritual"
            align="bottom-overflow"
            speed={38}
            textClassName="text-[30vw] text-tqh-accent/80 md:text-[15vw]"
          />

          <Reveal className="relative z-10">
            <span className="mb-3 block text-xs uppercase tracking-widest">
              Services
            </span>
          </Reveal>
          <Reveal className="relative z-10" delay={0.08}>
            <h1 className="font-display text-4xl uppercase leading-tight md:text-6xl">
              Every Ritual, In Full
            </h1>
          </Reveal>
          <Reveal className="relative z-10 mt-6 max-w-xl" delay={0.16}>
            <p className="text-sm uppercase tracking-wide text-tqh-wine/70">
              Prices and durations for every treatment at The Quiet House.
              Enhancements can be added to any booking.
            </p>
          </Reveal>
        </section>

        {/* SERVICE LIST */}
        <section className="relative z-10 bg-tqh-wine px-6 py-24 text-tqh-cream md:px-10">
          <div className="mx-auto max-w-4xl">
            {SERVICE_CATEGORIES.map((category, ci) => (
              <div key={category.name} className={ci > 0 ? "mt-20" : ""}>
                <Reveal>
                  <div className="mb-8 flex flex-col gap-1 border-b border-tqh-cream/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <h2 className="font-display text-2xl uppercase leading-tight md:text-3xl">
                      {category.name}
                    </h2>
                    {category.note ? (
                      <p className="text-xs uppercase tracking-wide text-tqh-cream/50">
                        {category.note}
                      </p>
                    ) : null}
                  </div>
                </Reveal>

                <div>
                  {category.services.map((service, si) => (
                    <Reveal key={service.name} delay={(si % 4) * 0.05} y={16}>
                      <div className="flex flex-col gap-3 border-b border-tqh-cream/10 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                        <div className="sm:max-w-md">
                          <h3 className="font-display text-xl">
                            {service.name}
                          </h3>
                          <p className="mt-1 text-sm text-tqh-cream/60">
                            {service.description}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-baseline gap-4 text-sm uppercase tracking-wide text-tqh-cream/70 sm:flex-col sm:items-end sm:gap-1">
                          <span>{service.duration}</span>
                          <span className="font-display text-lg normal-case text-tqh-cream">
                            {service.price}
                          </span>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-tqh-blush px-6 py-28 text-center md:px-10">
          <Reveal className="flex flex-col items-center">
            <Sprig className="mb-6 h-6 w-6 text-tqh-accent" />
            <h2 className="max-w-2xl font-display text-3xl uppercase leading-tight md:text-5xl">
              Ready when you are
            </h2>
            <ArrowLink href="/book" className="mt-6">
              Reserve a Visit
            </ArrowLink>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
