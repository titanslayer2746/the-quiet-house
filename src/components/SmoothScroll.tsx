"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // lerp (not duration) is what gives smooth, responsive scrolling for
    // continuous wheel/touch input: each frame eases toward the live target
    // instead of replaying a fixed-length animation that would restart on
    // every wheel tick and never catch up.
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    // gsap.ticker reports time in seconds; Lenis.raf expects a
    // requestAnimationFrame-style millisecond timestamp. Without the *1000
    // conversion, every internal Lenis time-delta is ~1000x too small, which
    // makes its easing crawl forward almost imperceptibly on real input.
    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);

    // The loading screen holds <html> at height:100% / overflow:hidden while
    // it's up, which can leave Lenis's cached scroll-limit stuck at 0 (it
    // measures once on construction, and the root element's own box never
    // resizes even once real content height is restored). Force a
    // recalculation once layout has actually settled.
    const resize = () => lenis.resize();
    const raf1 = requestAnimationFrame(() => requestAnimationFrame(resize));
    window.addEventListener("site:loaded", resize);
    window.addEventListener("load", resize);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(raf1);
      window.removeEventListener("site:loaded", resize);
      window.removeEventListener("load", resize);
      resizeObserver.disconnect();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
