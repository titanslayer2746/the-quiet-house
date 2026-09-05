"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** "scroll" animates in on scroll into view (default). "load" waits for the loading-screen shutter to finish. */
  gate?: "scroll" | "load";
  delay?: number;
  y?: number;
};

export function Reveal({
  children,
  className,
  gate = "scroll",
  delay = 0,
  y = 32,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, y });

    const animate = () =>
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: "power3.out",
      });

    if (gate === "load") {
      if (document.documentElement.classList.contains("is-loading")) {
        const onLoaded = () => animate();
        window.addEventListener("site:loaded", onLoaded, { once: true });
        return () => window.removeEventListener("site:loaded", onLoaded);
      }
      animate();
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: animate,
    });

    return () => trigger.kill();
  }, [gate, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
