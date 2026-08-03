"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowRight } from "lucide-react";

const HeroGlobe = dynamic(() => import("@/components/3d/HeroGlobe"), { ssr: false });

/** Defers loading three.js until the hero column is near the viewport */
function HeroGlobeDeferred() {
  const [show, setShow] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 z-[1]">
      {show ? (
        <HeroGlobe />
      ) : (
        <div className="h-full min-h-[260px] w-full sm:min-h-[280px] lg:min-h-[480px]" aria-hidden />
      )}
    </div>
  );
}

const STATS = [
  { value: "3+",   label: "Years\nexperience" },
  { value: "5+",   label: "Systems\nshipped" },
  { value: "3",   label: "Companies\nworked" },
];

export default function SectionHero() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    el.style.transformOrigin = "left";
    el.style.transform = "scaleX(0)";
    const t = setTimeout(() => {
      el.style.transition = "transform 1.1s cubic-bezier(0.22,1,0.36,1)";
      el.style.transform = "scaleX(1)";
    }, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="flex w-full shrink-0 items-center pb-16 pt-[calc(72px+env(safe-area-inset-top))] sm:pb-20 sm:pt-[calc(88px+env(safe-area-inset-top))] lg:pb-24 lg:pt-[calc(96px+env(safe-area-inset-top))]"
      style={{ minHeight: "100dvh", position: "relative" }}
    >
      <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "6px 14px", borderRadius: 9999,
              border: "1px solid var(--bdr-strong)",
              background: "var(--surface)",
              marginBottom: 32,
            }}
          >
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--blue)", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-2)" }}>
              Open to opportunities
            </span>
          </div>

          {/* Main headline — single h1 for document outline */}
          <div style={{ marginBottom: 24 }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.35rem, 6vw + 0.8rem, 5rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              <span style={{ display: "block", color: "var(--ink-1)" }}>Sanjeev</span>
              <span style={{ display: "block", marginTop: 6, fontStyle: "italic", color: "var(--blue)" }}>Veerapandian</span>
            </h1>
          </div>

          {/* Divider */}
          <div ref={lineRef} style={{ height: 1, background: `linear-gradient(to right, var(--blue), transparent)`, marginBottom: 24, width: "80%" }} />

          {/* Sub headline */}
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px, 2.8vw, 17px)", fontWeight: 400, color: "var(--ink-2)", lineHeight: 1.75, maxWidth: 560 }}>
              Full-Stack Engineer building production-grade systems —{" "}
              <span style={{ color: "var(--ink-1)", fontWeight: 500 }}>MERN</span>,{" "}
              <span style={{ color: "var(--ink-1)", fontWeight: 500 }}>.NET/C#</span>, and{" "}
              <span style={{ color: "var(--ink-1)", fontWeight: 500 }}>Angular</span> — from API design to deployment.
            </p>
          </div>
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-3)", letterSpacing: "0.03em" }}>
              Chennai, India · Available for full-time roles
            </p>
          </div>

          {/* CTAs */}
          <div className="mb-7 flex flex-wrap gap-2.5 sm:mb-10 sm:gap-3">
            <button
              type="button"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="min-h-[44px] touch-manipulation sm:min-h-0"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "var(--blue)", color: "#fff",
                fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
                padding: "11px 20px", borderRadius: 8, border: "none",
                cursor: "pointer", transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
            >
              View Projects <ArrowRight size={14} />
            </button>
            <a
              href="https://drive.google.com/file/d/16HOG-BTc9iBqQHR-CNXjcvggzDrKjWej/view?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="min-h-[44px] touch-manipulation sm:min-h-0"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "transparent", color: "var(--ink-2)",
                fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 400,
                padding: "11px 18px", borderRadius: 8,
                border: "1px solid var(--bdr-strong)", cursor: "pointer",
                transition: "all 0.2s", textDecoration: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.color = "var(--ink-1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bdr-strong)"; e.currentTarget.style.color = "var(--ink-2)"; }}
            >
              Resume <ArrowDown size={14} />
            </a>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 max-[380px]:grid-cols-1"
            style={{ gap: 1, borderRadius: 10, overflow: "hidden", border: "1px solid var(--bdr)", background: "var(--bdr)" }}
          >
            {STATS.map(({ value, label }) => (
              <div
                key={value}
                style={{ background: "var(--surface)", padding: "14px 16px" }}
                className="sm:!px-5 sm:!py-4"
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--elevated)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface)"; }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 6vw, 2rem)", fontWeight: 400, color: "var(--ink-1)", lineHeight: 1, marginBottom: 4 }}>
                  {value}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-3)", whiteSpace: "pre-line", lineHeight: 1.5 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none">
          <div className="relative h-[260px] w-full sm:h-[280px] lg:h-[480px]">
            <div
              style={{
                position: "absolute", inset: "10%", zIndex: 0,
                borderRadius: "50%",
                background: "radial-gradient(circle, var(--blue-glow) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <HeroGlobeDeferred />

            <div className="pointer-events-none hidden lg:block">
              <div
                className="float-anim absolute left-[-5%] top-[12%] rounded-lg px-3.5 py-2 font-mono text-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
                style={{
                  animationDelay: "0s",
                  border: "1px solid var(--bdr-strong)",
                  background: "var(--surface)",
                  color: "var(--blue)",
                }}
              >
                ✦ MERN Stack
              </div>
              <div
                className="float-anim absolute left-[-0%] bottom-[12%] rounded-lg px-3.5 py-2 font-mono text-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
                style={{
                  animationDelay: "0s",
                  border: "1px solid var(--bdr-strong)",
                  background: "var(--surface)",
                  color: "var(--blue)",
                }}
              >
                ✦ React Native
              </div>
              <div
                className="float-anim absolute bottom-[18%] right-[-2%] rounded-lg px-3.5 py-2 font-mono text-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
                style={{
                  animationDelay: "2s",
                  border: "1px solid var(--bdr-strong)",
                  background: "var(--surface)",
                  color: "var(--blue)",
                }}
              >
                ✦ .NET / C#
              </div>
              <div
                className="float-anim absolute right-[-8%] top-[45%] rounded-lg px-3.5 py-2 font-mono text-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
                style={{
                  animationDelay: "1s",
                  border: "1px solid var(--bdr-strong)",
                  background: "var(--surface)",
                  color: "var(--ink-2)",
                }}
              >
                ✦ Angular
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2 lg:hidden">
            {["MERN", ".NET / C#", "Angular"].map((t) => (
              <span
                key={t}
                className="rounded-full px-3 py-1.5 font-mono text-[10px]"
                style={{
                  border: "1px solid var(--bdr-strong)",
                  background: "var(--surface)",
                  color: "var(--blue)",
                }}
              >
                ✦ {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        type="button"
        aria-label="Scroll to About section"
        className="pb-[env(safe-area-inset-bottom)] max-md:hidden"
        style={{
          position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          color: "var(--ink-3)", cursor: "pointer",
          background: "none", border: "none",
        }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" }}>scroll</span>
        <ArrowDown size={12} strokeWidth={1.5} />
      </button>
    </section>
  );
}
