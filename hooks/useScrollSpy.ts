"use client";
import { useEffect, useState } from "react";

const HEADER_OFFSET = 88;

/**
 * Highlights the nav item for the section whose heading has passed the top band
 * (fixed header). Uses scroll/resize instead of multiple IntersectionObservers so
 * we never race or miss the active section when several intersect.
 */
export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState(() => ids[0] ?? "");
  const idKey = ids.join("|");

  useEffect(() => {
    const list = idKey.split("|").filter(Boolean);
    if (list.length === 0) return;

    const pick = () => {
      try {
        const vh = window.innerHeight;
        const scrollBottom = window.scrollY + vh;
        const docBottom = document.documentElement?.scrollHeight ?? 0;
        /* Only treat as “at document end” when layout has real height (avoids bad reads) */
        if (docBottom > vh && scrollBottom >= docBottom - 4) {
          const last = list[list.length - 1];
          setActive((p) => (p === last ? p : last));
          return;
        }

        let current = list[0];
        for (const id of list) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= HEADER_OFFSET) current = id;
        }
        setActive((p) => (p === current ? p : current));
      } catch {
        /* Never let scroll logic take down the tree */
      }
    };

    pick();
    const raf = requestAnimationFrame(pick);
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [idKey]);

  return active;
}
