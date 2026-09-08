"use client";

import { useBooking } from "@/context/BookingContext";
import { SERVICE_CATEGORIES } from "@/data/services";
import { StepIndicator } from "./StepShell";
import { FixedContinueButton } from "./FixedContinueButton";

export function ServiceStep({ onContinue }: { onContinue: () => void }) {
  const { draft, updateDraft } = useBooking();

  return (
    <div>
      <StepIndicator current={1} />
      <span className="mb-3 block text-xs uppercase tracking-widest">
        Step One
      </span>
      <h1 className="mb-10 font-display text-3xl uppercase leading-tight md:text-5xl">
        Choose a treatment
      </h1>

      <div>
        {SERVICE_CATEGORIES.map((category) => (
          <div key={category.name} className="mb-10">
            <h2 className="mb-3 text-xs uppercase tracking-widest text-tqh-wine/50">
              {category.name}
            </h2>
            <div>
              {category.services.map((service) => {
                const selected = draft.serviceName === service.name;
                return (
                  <button
                    key={service.name}
                    type="button"
                    onClick={() => updateDraft({ serviceName: service.name })}
                    className={`flex w-full flex-col gap-1 border-b border-l-2 border-tqh-wine/15 py-5 pl-4 text-left transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 ${
                      selected
                        ? "border-l-tqh-accent"
                        : "border-l-transparent hover:border-l-tqh-wine/30"
                    }`}
                  >
                    <div className="sm:max-w-md">
                      <h3 className="font-display text-xl">
                        {service.name}
                        {selected ? (
                          <span className="ml-3 align-middle text-xs uppercase tracking-widest text-tqh-accent">
                            Selected
                          </span>
                        ) : null}
                      </h3>
                      <p className="mt-1 text-sm text-tqh-wine/60">
                        {service.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-baseline gap-4 text-sm uppercase tracking-wide text-tqh-wine/70 sm:flex-col sm:items-end sm:gap-1">
                      <span>{service.duration}</span>
                      <span className="font-display text-lg normal-case text-tqh-wine">
                        {service.price}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <FixedContinueButton
        onClick={onContinue}
        show={Boolean(draft.serviceName)}
      />
    </div>
  );
}
