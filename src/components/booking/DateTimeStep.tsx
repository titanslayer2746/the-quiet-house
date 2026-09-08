"use client";

import { useBooking } from "@/context/BookingContext";
import { getSlotsForDate } from "@/lib/booking-slots";
import { Calendar } from "./Calendar";
import { StepIndicator } from "./StepShell";
import { FixedBackButton } from "./FixedBackButton";
import { FixedContinueButton } from "./FixedContinueButton";

export function DateTimeStep({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const { draft, updateDraft } = useBooking();
  const slots = draft.date ? getSlotsForDate(draft.date) : [];

  function selectDate(iso: string) {
    updateDraft({ date: iso, time: undefined });
  }

  return (
    <div>
      <StepIndicator current={2} />
      <span className="mb-3 block text-xs uppercase tracking-widest">
        Step Two
      </span>
      <h1 className="mb-10 font-display text-3xl uppercase leading-tight md:text-5xl">
        Pick a date &amp; time
      </h1>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <Calendar selectedISO={draft.date} onSelect={selectDate} />

        <div>
          <h3 className="mb-6 font-display text-2xl">
            {draft.date
              ? new Date(draft.date + "T00:00:00").toLocaleDateString(
                  "en-US",
                  { weekday: "long", month: "long", day: "numeric" }
                )
              : "Select a date"}
          </h3>

          {draft.date ? (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {slots.map((slot) => {
                const selected = draft.time === slot.label;
                return (
                  <button
                    key={slot.label}
                    type="button"
                    disabled={slot.booked}
                    onClick={() => updateDraft({ time: slot.label })}
                    className={`border py-3 text-center text-sm transition-colors ${
                      selected
                        ? "border-tqh-wine bg-tqh-wine text-tqh-blush"
                        : slot.booked
                          ? "cursor-not-allowed border-tqh-wine/10 text-tqh-wine/25 line-through"
                          : "border-tqh-wine/25 text-tqh-wine hover:border-tqh-wine"
                    }`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-tqh-wine/50">
              Choose a date on the calendar to see available times.
            </p>
          )}
        </div>
      </div>

      <FixedBackButton onClick={onBack} />
      <FixedContinueButton
        onClick={onContinue}
        show={Boolean(draft.date && draft.time)}
      />
    </div>
  );
}
