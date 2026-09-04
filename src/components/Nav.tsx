"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sprig } from "./Sprig";

const LINKS = [
  { href: "/services", label: "Treatments" },
  { href: "/#house", label: "The House" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

const IDLE_HIDE_MS = 2500;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const textColor = "text-tqh-wine";
  const bg = "bg-tqh-blush border-tqh-wine/10";

  useEffect(() => {
    function armIdleTimer() {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        // Stay put at the very top of the page — only auto-hide once the
        // user has actually scrolled down.
        if (window.scrollY <= 4) return;
        setVisible(false);
      }, IDLE_HIDE_MS);
    }

    function onScroll() {
      setVisible(true);
      armIdleTimer();
    }

    armIdleTimer();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  // Keep the bar down while the mobile menu is open.
  const shown = visible || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${bg} ${
        shown ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 text-sm md:px-10 ${textColor}`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-base tracking-tight"
        >
          <Sprig className="h-5 w-5" />
          The Quiet House
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:opacity-60">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Link
            href="/book"
            className="hidden items-center gap-2 hover:opacity-60 sm:flex"
          >
            Reserve a Visit
            <span className="flex h-7 w-7 items-center justify-center border border-current">
              <svg
                viewBox="0 0 20 20"
                className="h-3.5 w-3.5 fill-none stroke-current"
                strokeWidth="1.2"
              >
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </span>
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center border border-current md:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 stroke-current" strokeWidth="1.2">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-tqh-wine/20 bg-tqh-blush px-6 pb-6 text-tqh-wine md:hidden">
          <ul className="flex flex-col gap-4 pt-4 text-base">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" onClick={() => setOpen(false)}>
                Reserve a Visit
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
