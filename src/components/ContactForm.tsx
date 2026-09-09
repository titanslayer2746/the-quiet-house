"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (sent) {
    return (
      <div className="py-16 text-center">
        <h3 className="mb-3 font-display text-2xl uppercase">Thank you</h3>
        <p className="text-sm text-tqh-wine/60">
          We&apos;ve noted your message and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-6"
    >
      <p className="text-sm uppercase tracking-wide text-tqh-wine/60">
        Tell us about your visit
      </p>

      <Field
        label="Your Name"
        value={name}
        onChange={setName}
        required
        autoComplete="name"
      />
      <Field
        label="Your Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
        autoComplete="email"
      />
      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-widest text-tqh-wine/50">
          Your Message
        </span>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none border-b border-tqh-wine/25 bg-transparent pb-2 font-display text-lg outline-none transition-colors focus:border-tqh-wine"
        />
      </label>

      <button
        type="submit"
        className="group mt-4 flex items-center justify-between border-t border-tqh-wine/20 pt-6 text-left"
      >
        <span className="font-display text-lg italic">Send Message</span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-current transition-colors group-hover:bg-tqh-wine group-hover:text-tqh-blush">
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4 fill-none stroke-current"
            strokeWidth="1.2"
          >
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </span>
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-widest text-tqh-wine/50">
        {label}
      </span>
      <input
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-tqh-wine/25 bg-transparent pb-2 font-display text-lg outline-none transition-colors focus:border-tqh-wine"
      />
    </label>
  );
}
