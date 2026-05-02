"use client";
import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    const fallback = window.setTimeout(() => {
      if (!cancelled) el.classList.add("visible");
    }, 3200);

    const reveal = () => {
      window.clearTimeout(fallback);
      el.classList.add("visible");
    };

    const inViewport = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      return (
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < vh &&
        rect.left < vw
      );
    };

    const tryReveal = () => {
      if (inViewport()) {
        reveal();
        return true;
      }
      return false;
    };

    if (tryReveal()) {
      requestAnimationFrame(() => {
        if (!cancelled && !el.classList.contains("visible")) tryReveal();
      });
      return () => {
        cancelled = true;
        window.clearTimeout(fallback);
      };
    }

    requestAnimationFrame(() => {
      if (!cancelled) tryReveal();
    });

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return () => {
        cancelled = true;
        window.clearTimeout(fallback);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(el);
        }
      },
      { root: null, rootMargin: "0px 0px 12% 0px", threshold: [0, 0.02, 0.08] }
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);
  return ref;
}
