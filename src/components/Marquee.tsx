"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Marquee({
  text,
  textClassName = "text-[46vw] text-tqh-accent/50 md:text-[26vw]",
  speed = 40,
  align = "center",
}: {
  text: string;
  textClassName?: string;
  speed?: number;
  /** "center" sits inside its container as usual; "bottom-overflow" anchors
   * the text's vertical center to the container's bottom edge, so half the
   * glyph height bleeds below it (needs overflow-y left open on the parent
   * and a following element that overlaps upward to cover the spill). */
  align?: "center" | "bottom-overflow" | "bottom-raised";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.set(container, { opacity: 0 });

    if (reduceMotion) {
      gsap.set(container, { opacity: 1 });
      return;
    }

    const loop = gsap.to(track, {
      xPercent: -50,
      duration: speed,
      ease: "none",
      repeat: -1,
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      once: true,
      onEnter: () => {
        gsap.to(container, { opacity: 1, duration: 1.2, ease: "power2.out" });
        loop.play();
      },
    });

    return () => {
      trigger.kill();
      loop.kill();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={
        align === "bottom-overflow"
          ? "pointer-events-none absolute inset-x-0 bottom-0 z-0 flex translate-y-1/2 select-none items-center overflow-x-clip opacity-0"
          : align === "bottom-raised"
            ? "pointer-events-none absolute inset-x-0 bottom-0 z-0 flex translate-y-[15%] select-none items-center overflow-x-clip opacity-0"
            : "pointer-events-none absolute inset-0 z-0 flex select-none items-center overflow-hidden opacity-0"
      }
    >
      <div
        ref={trackRef}
        className="flex w-max items-center whitespace-nowrap will-change-transform"
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`flex items-center font-script leading-none ${textClassName}`}
          >
            {text}
            <span className="mx-10">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
