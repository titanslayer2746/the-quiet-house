"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Sprig } from "./Sprig";

export function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    document.documentElement.classList.add("is-loading");

    const finish = () => {
      document.documentElement.classList.remove("is-loading");
      gsap.set(overlay, { display: "none" });
      window.dispatchEvent(new Event("site:loaded"));
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      finish();
      return;
    }

    const tl = gsap.timeline({ onComplete: finish });

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    )
      .fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.3, ease: "power1.inOut", transformOrigin: "left" },
        "<0.1"
      )
      .to({}, { duration: 0.6 })
      .to(overlay, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-tqh-wine text-tqh-cream"
    >
      <div ref={contentRef} className="flex flex-col items-center gap-5">
        <Sprig className="h-8 w-8 text-tqh-accent" />
        <span className="font-display text-2xl italic">The Quiet House</span>
        <div className="h-px w-24 overflow-hidden bg-tqh-cream/20">
          <div ref={barRef} className="h-full w-full bg-tqh-accent" />
        </div>
      </div>
    </div>
  );
}
