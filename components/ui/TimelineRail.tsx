"use client";
import { useEffect, useRef } from "react";

/**
 * Wraps the experience cards. A rail fills as you scroll and the card nearest the middle
 * of the viewport is marked active. Transform and attributes only. Without JS the static rail still shows.
 */
export function TimelineRail({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const bar = fill.current;
    if (!el || !bar) return;
    const roles = Array.from(el.querySelectorAll<HTMLElement>(".role"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      bar.style.transform = `scaleY(${p})`;

      let active = -1;
      let best = Infinity;
      roles.forEach((role, i) => {
        const rr = role.getBoundingClientRect();
        const d = mid < rr.top ? rr.top - mid : mid > rr.bottom ? mid - rr.bottom : 0;
        if (d < best) { best = d; active = i; }
      });
      roles.forEach((role, i) => {
        const top = role.getBoundingClientRect().top;
        role.dataset.active = String(i === active && r.top < mid + 200 && r.bottom > mid - 200);
        role.dataset.passed = String(top < mid);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrap} className="timeline">
      <div ref={fill} className="rail-fill" aria-hidden="true" />
      {children}
    </div>
  );
}
