"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { StepIndicator } from "./StepShell";
import { FixedBackButton } from "./FixedBackButton";
import { FixedContinueButton } from "./FixedContinueButton";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d()+\-.\s]{7,}$/;

type Errors = Partial<Record<"name" | "email" | "phone", string>>;

export function DetailsStep({ onBack }: { onBack: () => void }) {
  const { draft, updateDraft, confirm, resetDraft } = useBooking();
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const next: Errors = {};
    if (!draft.name?.trim()) next.name = "Enter your name";
    if (!draft.email?.trim() || !EMAIL_RE.test(draft.email.trim()))
      next.email = "Enter a valid email";
    if (!draft.phone?.trim() || !PHONE_RE.test(draft.phone.trim()))
      next.phone = "Enter a valid phone number";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleConfirm() {
    if (!validate()) return;
    setSubmitting(true);
    confirm();
    resetDraft();
    router.push("/booking/confirmed");
  }

  return (
    <div>
      <StepIndicator current={3} />
      <span className="mb-3 block text-xs uppercase tracking-widest">
        Step Three
      </span>
      <h1 className="mb-10 font-display text-3xl uppercase leading-tight md:text-5xl">
        Your details
      </h1>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Field
            label="Full name"
            value={draft.name ?? ""}
            onChange={(v) => updateDraft({ name: v })}
            error={errors.name}
            autoComplete="name"
          />
          <Field
            label="Email"
            type="email"
            value={draft.email ?? ""}
            onChange={(v) => updateDraft({ email: v })}
            error={errors.email}
            autoComplete="email"
          />
          <Field
            label="Phone"
            type="tel"
            value={draft.phone ?? ""}
            onChange={(v) => updateDraft({ phone: v })}
            error={errors.phone}
            autoComplete="tel"
          />
        </div>

        <div>
          <h3 className="mb-6 text-xs uppercase tracking-widest text-tqh-wine/50">
            Review
          </h3>
          <dl className="flex flex-col gap-4 border-t border-tqh-wine/20 pt-6 text-sm">
            <Row label="Treatment" value={draft.serviceName ?? "—"} />
            <Row
              label="Date"
              value={
                draft.date
                  ? new Date(draft.date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      { weekday: "long", month: "long", day: "numeric" }
                    )
                  : "—"
              }
            />
            <Row label="Time" value={draft.time ?? "—"} />
          </dl>
        </div>
      </div>

      <FixedBackButton onClick={onBack} />
      <FixedContinueButton
        onClick={handleConfirm}
        label={submitting ? "Confirming…" : "Confirm Booking"}
        show
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-tqh-wine/50 uppercase tracking-wide text-xs">
        {label}
      </dt>
      <dd className="font-display text-lg">{value}</dd>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-widest text-tqh-wine/50">
        {label}
      </span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border-b bg-transparent pb-2 font-display text-lg outline-none transition-colors ${
          error
            ? "border-tqh-accent"
            : "border-tqh-wine/25 focus:border-tqh-wine"
        }`}
      />
      {error ? (
        <span className="mt-1 block text-xs text-tqh-accent">{error}</span>
      ) : null}
    </label>
  );
}
