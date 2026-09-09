import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { Sprig } from "@/components/Sprig";
import { ImageBlock } from "@/components/ImageBlock";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — The Quiet House",
  description:
    "Reach The Quiet House — location, hours, and a note to tell us about your visit.",
};

export default function ContactPage() {
  return (
    <>
      <main className="flex-1">
        {/* HEADER */}
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-x-clip bg-tqh-wine px-6 text-center text-tqh-cream md:px-10">
          <Nav />

          <Marquee
            text="Get In Touch"
            align="bottom-raised"
            speed={40}
            textClassName="text-[32vw] text-tqh-accent md:text-[16vw]"
          />

          <Reveal className="relative z-10">
            <span className="mb-3 block text-xs uppercase tracking-widest text-tqh-cream/60">
              Contact
            </span>
          </Reveal>
          <Reveal className="relative z-10" delay={0.08}>
            <h1 className="font-display text-4xl uppercase leading-tight md:text-6xl">
              Let&apos;s Plan Your Visit
            </h1>
          </Reveal>
        </section>

        {/* SPLIT: statement + form */}
        <section className="relative z-10 overflow-hidden px-6 py-20 md:px-10 md:py-32">
          <div className="absolute inset-0">
            <ImageBlock
              tone="clay"
              src="/contact-page-back.jpg"
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-tqh-wine/45" />
          </div>

          <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
            <div className="flex min-h-[70vh] flex-col items-center justify-center gap-10 bg-tqh-wine px-10 py-20 text-center text-tqh-cream md:px-16">
              <Sprig className="h-4 w-4 text-tqh-accent" />
              <Reveal>
                <h2 className="max-w-md font-display text-3xl uppercase leading-tight md:text-5xl">
                  It would be a privilege to hear from you
                </h2>
              </Reveal>
              <Sprig className="h-4 w-4 text-tqh-accent" />
            </div>

            <div className="bg-tqh-blush px-6 py-20 md:px-12">
              <Reveal className="mx-auto max-w-md">
                <ContactForm />
              </Reveal>
            </div>
          </div>

          <Reveal className="relative mx-auto mb-10 mt-32 text-center text-tqh-cream md:mt-44">
            <p className="font-display text-lg uppercase tracking-wide md:text-xl">
              With love,
            </p>
            <p className="font-script text-7xl leading-tight md:text-8xl">
              The Quiet House
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
