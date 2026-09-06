"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ImageBlock } from "./ImageBlock";

const SLIDES = [
  { tone: "clay" as const, src: "/hero-1.jpg" },
  { tone: "moss" as const, src: "/hero-2.jpg" },
  { tone: "sand" as const, src: "/hero-3.jpg" },
  { tone: "wine" as const, src: "/hero-4.jpg" },
];

const HIDDEN = "inset(0% 0% 0% 100%)";
const VISIBLE = "inset(0% 0% 0% 0%)";

export function HeroCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndex = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!root || !slides.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let running = false;
    let transitionTween: gsap.core.Tween | null = null;

    function advance() {
      const current = activeIndex.current;
      const next = (current + 1) % slides.length;

      gsap.set(slides[next], { clipPath: HIDDEN, zIndex: 3 });
      transitionTween = gsap.to(slides[next], {
        clipPath: VISIBLE,
        duration: 1.6,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(slides[current], { zIndex: 1 });
          gsap.set(slides[next], { zIndex: 2 });
          activeIndex.current = next;
          if (running) timeoutId = setTimeout(advance, 4200);
        },
      });
    }

    function start() {
      if (running) return;
      running = true;
      timeoutId = setTimeout(advance, 4200);
    }

    function stop() {
      running = false;
      clearTimeout(timeoutId);
      transitionTween?.pause();
    }

    // only run the autoplay loop while the hero is actually on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.1 }
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative h-[97vh] w-full overflow-hidden will-change-[clip-path]"
    >
      {SLIDES.map((s, i) => (
        <div
          key={i}
          ref={(el) => {
            slideRefs.current[i] = el;
          }}
          className="absolute inset-0"
          style={{
            clipPath: i === 0 ? VISIBLE : HIDDEN,
            zIndex: i === 0 ? 2 : 1,
          }}
        >
          <ImageBlock
            tone={s.tone}
            src={s.src}
            priority={i === 0}
            className="h-full w-full"
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-tqh-wine/60 via-transparent to-transparent" />
    </div>
  );
}
