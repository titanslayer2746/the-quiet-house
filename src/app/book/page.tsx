"use client";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import { ServiceStep } from "@/components/booking/ServiceStep";
import { DateTimeStep } from "@/components/booking/DateTimeStep";
import { DetailsStep } from "@/components/booking/DetailsStep";

export default function BookPage() {
  const { draft, updateDraft } = useBooking();
  const step = draft.step ?? 1;

  function goTo(n: number) {
    updateDraft({ step: n });
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <>
      <main className="flex-1">
        <section className="relative bg-tqh-blush px-6 pb-24 pt-32 md:px-10 md:pt-40">
          <Nav />

          <div className="mx-auto max-w-4xl">
            {step === 1 ? (
              <ServiceStep onContinue={() => goTo(2)} />
            ) : step === 2 ? (
              <DateTimeStep onBack={() => goTo(1)} onContinue={() => goTo(3)} />
            ) : (
              <DetailsStep onBack={() => goTo(2)} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
