"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const OPEN = 14;
const WIDE = 26;
const CLOSED = 1;
const ORIGIN = "20 20";

function Arm() {
  return (
    <>
      <path
        d="M20 2 L22 20 L18.4 20 Z"
        fill="#f3dcc7"
        stroke="#2b171b"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="28"
        stroke="#ef4fb0"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle
        cx="20"
        cy="32"
        r="4.2"
        fill="none"
        stroke="#ef4fb0"
        strokeWidth="2"
      />
    </>
  );
}

export function CursorFollower() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const armARef = useRef<SVGGElement>(null);
  const armBRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    const a = armARef.current;
    const b = armBRef.current;
    if (!wrap || !tilt || !a || !b) return;

    gsap.set(wrap, { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(a, { rotation: -OPEN, svgOrigin: ORIGIN });
    gsap.set(b, { rotation: OPEN, svgOrigin: ORIGIN });

    document.documentElement.classList.add("has-custom-cursor");

    const xTo = gsap.quickTo(wrap, "x", { duration: 0.12, ease: "power3" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 0.12, ease: "power3" });
    const rotTo = gsap.quickTo(tilt, "rotation", {
      duration: 0.45,
      ease: "power3",
    });

    let angle = 0;
    let lastX = 0;
    let lastY = 0;
    let first = true;
    let visible = false;

    function show(v: boolean) {
      if (v === visible) return;
      visible = v;
      gsap.to(wrap, { opacity: v ? 1 : 0, duration: 0.25, overwrite: "auto" });
    }

    function onMove(e: MouseEvent) {
      const x = e.clientX;
      const y = e.clientY;

      if (first) {
        gsap.set(wrap, { x, y });
        lastX = e.clientX;
        lastY = e.clientY;
        first = false;
      } else {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        if (Math.hypot(dx, dy) > 4) {
          const target = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
          angle += ((target - angle + 540) % 360) - 180;
          rotTo(angle);
          lastX = e.clientX;
          lastY = e.clientY;
        }
      }

      xTo(x);
      yTo(y);
      const t = e.target as Element | null;
      show(!t?.closest?.("input, textarea"));
    }

    function onOver(e: MouseEvent) {
      const t = e.target as Element | null;
      const interactive = Boolean(t?.closest?.("a, button, [role='button']"));
      const open = interactive ? WIDE : OPEN;
      gsap.to(a, { rotation: -open, svgOrigin: ORIGIN, duration: 0.25 });
      gsap.to(b, { rotation: open, svgOrigin: ORIGIN, duration: 0.25 });
    }

    function onDown() {
      const snip = { duration: 0.07, yoyo: true, repeat: 1, ease: "power1.in" };
      gsap.to(a, { rotation: -CLOSED, svgOrigin: ORIGIN, ...snip });
      gsap.to(b, { rotation: CLOSED, svgOrigin: ORIGIN, ...snip });
    }

    const hide = () => show(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      document.documentElement.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[110] h-14 w-14 opacity-0"
    >
      <div ref={tiltRef} className="h-full w-full">
        <svg viewBox="0 0 40 40" className="h-full w-full overflow-visible">
          <g ref={armARef}>
            <Arm />
          </g>
          <g ref={armBRef}>
            <Arm />
          </g>
          <circle cx="20" cy="20" r="1.6" fill="#2b171b" />
        </svg>
      </div>
    </div>
  );
}
