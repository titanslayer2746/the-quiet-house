import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { ImageBlock } from "@/components/ImageBlock";
import { JOURNAL_ENTRIES } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal — The Quiet House",
  description:
    "Short notes from The Quiet House on hair, skin, and slowing down.",
};

export default function JournalPage() {
  return (
    <>
      <main className="flex-1">
        {/* HEADER */}
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-x-clip bg-tqh-wine px-6 text-center text-tqh-cream md:px-10">
          <Nav />

          <Marquee
            text="Slow Notes"
            align="bottom-raised"
            speed={40}
            textClassName="text-[32vw] text-tqh-accent/70 md:text-[16vw]"
          />

          <Reveal className="relative z-10">
            <span className="mb-3 block text-xs uppercase tracking-widest text-tqh-cream/60">
              The Journal
            </span>
          </Reveal>
          <Reveal className="relative z-10" delay={0.08}>
            <h1 className="font-display text-4xl uppercase leading-tight md:text-6xl">
              Notes from the House
            </h1>
          </Reveal>
        </section>

        {/* ENTRIES */}
        <section className="relative z-10 bg-tqh-wine px-6 pb-28 pt-10 text-tqh-cream md:px-10">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-24">
            {JOURNAL_ENTRIES.map((entry) => (
              <article key={entry.number}>
                <div className="relative">
                  <ImageBlock
                    tone={entry.tone}
                    src={entry.src}
                    sizes="(min-width: 1600px) 1600px, 100vw"
                    className="aspect-[16/9] w-full md:aspect-[21/9]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tqh-wine/85 via-tqh-wine/10 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-widest">
                      <span>{entry.number}</span>
                      <span className="opacity-60">{entry.date}</span>
                    </div>
                    <h2 className="max-w-2xl font-display text-3xl leading-tight md:text-5xl">
                      {entry.title}
                    </h2>
                  </div>
                </div>

                <Reveal className="mt-8 max-w-2xl">
                  <p className="text-sm leading-relaxed text-tqh-cream/70 md:text-base">
                    {entry.excerpt}
                  </p>
                </Reveal>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
