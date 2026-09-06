import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Sprig } from "@/components/Sprig";
import { ArrowLink } from "@/components/ArrowLink";
import { ImageBlock } from "@/components/ImageBlock";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";

const TREATMENTS = [
  { name: "Signature Cut & Style", meta: "60 MIN · $95", tone: "clay" as const, src: "/treatment-1.jpg", position: "40% 50%" },
  { name: "Colour & Gloss", meta: "120 MIN · $180", tone: "wine" as const, src: "/treatment-2.jpg", position: "50% 50%" },
  { name: "Balayage", meta: "180 MIN · $285", tone: "sand" as const, src: "/treatment-3.jpg", position: "62% 50%" },
  { name: "Botanical Facial", meta: "50 MIN · $165", tone: "moss" as const, src: "/treatment-4.jpg", position: "40% 50%" },
  { name: "Classic Manicure", meta: "40 MIN · $45", tone: "sand" as const, src: "/treatment-5.jpg", position: "60% 50%" },
  { name: "Candlelight Facial", meta: "75 MIN · $210", tone: "moss" as const, src: "/treatment-6.jpg", position: "50% 60%" },
];

export default function Home() {
  return (
    <>
      <main className="flex-1">
        {/* HERO */}
        <section
          data-scroll-section
          className="relative bg-tqh-blush pb-0 pt-32 md:pt-36"
        >
          <Nav />
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <Reveal gate="load">
              <h1 className="whitespace-nowrap text-right font-display font-black uppercase leading-[0.85] tracking-tight text-[9vw] sm:text-[7vw] md:text-[5.2vw]">
                <span className="text-[0.42em] font-normal italic text-tqh-wine/90">
                  The{" "}
                </span>
                Quiet House
              </h1>
            </Reveal>
            <Reveal gate="load" delay={0.15}>
              <div className="mt-6 flex items-end justify-between gap-3 border-t border-tqh-wine/20 pt-6 text-xs sm:text-sm">
                <p className="uppercase tracking-wide">
                  Hair, Skin, Nails
                  <br />& Stillness
                </p>
                <Sprig className="hidden h-6 w-6 shrink-0 text-tqh-accent sm:block" />
                <p className="text-right uppercase tracking-wide">
                  Care,
                  <br />
                  Without Hurry
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-10">
            <HeroCarousel />
          </div>
        </section>

        {/* THE HOUSE — statement, marquee background */}
        <section
          data-scroll-section
          id="house"
          className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-tqh-wine px-6 py-28 text-tqh-cream md:px-10"
        >
          <Marquee text="The Quiet House" />

          <Reveal className="relative z-10">
            <span className="mb-8 block text-center text-xs uppercase tracking-widest text-tqh-cream/60">
              The House
            </span>
          </Reveal>

          <Reveal className="relative z-10 mx-auto max-w-6xl" delay={0.1}>
            <p className="text-center font-display text-3xl uppercase leading-tight text-tqh-cream md:text-5xl">
              The Quiet House is a private salon built around one idea — that
              rest is a practice, not an amenity. Every room, every ritual,
              every hour is set at the pace of an unhurried afternoon.
            </p>
          </Reveal>

          <Reveal className="relative z-10" delay={0.2}>
            <p className="mx-auto mt-16 max-w-2xl text-center text-sm uppercase tracking-wide text-tqh-cream/70">
              We believe rest is a discipline, not an indulgence
            </p>
          </Reveal>
        </section>

        {/* TREATMENTS grid */}
        <section
          data-scroll-section
          className="bg-tqh-blush px-6 py-24 md:px-10"
        >
          <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-x-clip text-center">
            <Marquee
              text="Hair, Skin & Body"
              speed={42}
              align="bottom-overflow"
              textClassName="text-[34vw] text-tqh-accent/80 md:text-[18vw]"
            />
            <Reveal className="relative z-10">
              <span className="mb-3 block text-xs uppercase tracking-widest">
                Treatments
              </span>
            </Reveal>
            <Reveal className="relative z-10" delay={0.08}>
              <h2 className="font-display text-4xl uppercase leading-tight md:text-6xl">
                Rituals for hair &amp; body
              </h2>
            </Reveal>
          </div>

          <div className="relative z-10 mx-auto max-w-[1600px]">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {TREATMENTS.map((t, i) => (
                <div key={t.name} className="flex flex-col gap-4">
                  <ImageBlock
                    tone={t.tone}
                    src={t.src}
                    alt={t.name}
                    position={t.position}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/5] w-full"
                  />
                  <Reveal delay={(i % 3) * 0.08} y={20}>
                    <h3 className="font-display text-xl">{t.name}</h3>
                    <p className="mt-1 text-sm text-tqh-wine/60">{t.meta}</p>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JOURNAL / editorial teaser */}
        <section
          data-scroll-section
          id="journal"
          className="relative bg-tqh-wine"
        >
          <ImageBlock
            tone="clay"
            src="/journal-teaser.jpg"
            className="aspect-[16/9] w-full md:aspect-[21/9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-tqh-wine via-tqh-wine/10 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between px-6 py-8 text-tqh-cream md:px-10 md:py-12">
            <Reveal y={16}>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest">
                <span>N.003</span>
                <span className="opacity-50">25·SEP·26</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="max-w-xl font-display text-3xl leading-tight md:text-5xl">
                Stillness is the treatment
              </h3>
              <ArrowLink
                href="/journal"
                className="max-w-xs !py-2 !text-tqh-cream"
              >
                Read more
              </ArrowLink>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section
          data-scroll-section
          className="bg-tqh-wine px-6 pb-24 pt-16 md:px-10"
        >
          <div className="relative mx-auto max-w-[1600px]">
            <ImageBlock
              tone="moss"
              src="/bottom-cta-home.jpg"
              sizes="(min-width: 1600px) 1600px, 100vw"
              className="aspect-[16/10] w-full"
            />
            <div className="absolute inset-x-0 bottom-0 left-0 max-w-xl bg-tqh-blush p-10 md:bottom-10 md:left-10 md:p-14">
              <ImageBlock
                tone="sand"
                src="/treatment-4.jpg"
                sizes="80px"
                className="absolute -top-16 right-8 hidden h-28 w-20 md:block"
              />
              <Reveal>
                <h3 className="font-display text-3xl uppercase leading-tight md:text-5xl">
                  It would be a quiet privilege to host you
                </h3>
                <ArrowLink href="/book" className="mt-4 !py-0">
                  Reserve a Visit
                </ArrowLink>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
