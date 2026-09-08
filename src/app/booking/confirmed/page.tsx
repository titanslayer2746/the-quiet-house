"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Sprig } from "@/components/Sprig";
import { ArrowLink } from "@/components/ArrowLink";
import { useBooking, type ConfirmedBooking } from "@/context/BookingContext";

export default function BookingConfirmedPage() {
  const { getConfirmed } = useBooking();
  const [booking, setBooking] = useState<ConfirmedBooking | null | undefined>(
    undefined
  );

  useEffect(() => {
    setBooking(getConfirmed());
  }, [getConfirmed]);

  return (
    <>
      <main className="flex-1">
        <section className="relative flex min-h-screen flex-col items-center justify-center bg-tqh-wine px-6 py-32 text-center text-tqh-cream md:px-10">
          <Nav />

          {booking === undefined ? null : booking === null ? (
            <>
              <Sprig className="mb-6 h-6 w-6 text-tqh-accent" />
              <h1 className="mb-4 font-display text-3xl uppercase leading-tight md:text-5xl">
                No booking found
              </h1>
              <p className="mb-8 max-w-md text-sm text-tqh-cream/70">
                We couldn&apos;t find a recent reservation on this browser.
              </p>
              <ArrowLink href="/book" className="text-tqh-cream">
                Book a Visit
              </ArrowLink>
            </>
          ) : (
            <>
              <span className="mb-3 text-xs uppercase tracking-widest text-tqh-cream/60">
                Confirmation {booking.code}
              </span>
              <Sprig className="my-6 h-7 w-7 text-tqh-accent" />
              <h1 className="mb-6 max-w-2xl font-display text-3xl uppercase leading-tight md:text-5xl">
                It would be a quiet privilege to host you
              </h1>

              <dl className="mb-10 flex w-full max-w-md flex-col gap-4 border-t border-tqh-cream/20 pt-6 text-left text-sm">
                <Row label="Treatment" value={booking.serviceName ?? "—"} />
                <Row
                  label="Date"
                  value={
                    booking.date
                      ? new Date(
                          booking.date + "T00:00:00"
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"
                  }
                />
                <Row label="Time" value={booking.time ?? "—"} />
                <Row label="Name" value={booking.name ?? "—"} />
                <Row label="Email" value={booking.email ?? "—"} />
              </dl>

              <p className="mb-10 max-w-md text-sm text-tqh-cream/60">
                A confirmation has been noted for {booking.email}. We look
                forward to your visit.
              </p>

              <Link
                href="/"
                className="text-xs uppercase tracking-widest text-tqh-cream/50 hover:text-tqh-cream"
              >
                Return Home
              </Link>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-xs uppercase tracking-wide text-tqh-cream/50">
        {label}
      </dt>
      <dd className="font-display text-lg">{value}</dd>
    </div>
  );
}
