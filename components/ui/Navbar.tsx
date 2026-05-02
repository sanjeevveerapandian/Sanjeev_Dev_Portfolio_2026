"use client";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About",       id: "about" },
  { label: "Experience",  id: "experience" },
  { label: "Projects",    id: "projects" },
  { label: "Skills",      id: "skills" },
  { label: "Contact",     id: "contact" },
];

const RESUME_URL = "https://drive.google.com/file/d/1fBWbbh_zIB1pkwjzNEAcoWCuaREiU-kf/view?usp=sharing";

export default function Navbar({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "all 0.3s",
        paddingTop: "env(safe-area-inset-top)",
        background: scrolled ? "var(--nav-scrim)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--bdr)" : "1px solid transparent",
      }}
    >
      <div
        className="mx-auto flex h-[54px] max-w-[1180px] items-center justify-between gap-3 px-4 sm:h-[62px] sm:px-6 md:px-8"
      >
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 19, color: "var(--ink-1)", letterSpacing: "-0.02em" }}
          className="min-w-0 shrink-0 touch-manipulation sm:text-xl"
        >
          SV<span style={{ color: "var(--blue)", fontStyle: "italic" }}>.</span>
        </button>

        <nav style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden md:flex">
          {NAV_LINKS.map(({ label, id }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-body)", fontSize: 13, fontWeight: isActive ? 500 : 400,
                  color: isActive ? "var(--blue)" : "var(--ink-2)",
                  padding: "6px 14px", borderRadius: 6,
                  transition: "color 0.2s, background 0.2s",
                  position: "relative",
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = "var(--ink-1)"; e.currentTarget.style.background = "var(--surface)"; } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = "var(--ink-2)"; e.currentTarget.style.background = "none"; } }}
              >
                {label}
                {isActive && (
                  <span style={{
                    position: "absolute", bottom: 1, left: "50%", transform: "translateX(-50%)",
                    width: 16, height: 2, borderRadius: 2, background: "var(--blue)", display: "block",
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <ThemeToggle />
          <a
            href={RESUME_URL}
            target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex"
            style={{
              alignItems: "center", gap: 6,
              background: "var(--blue)", color: "#fff",
              fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500,
              padding: "7px 16px", borderRadius: 6,
              transition: "opacity 0.2s", textDecoration: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            Resume ↗
          </a>
          <button
            type="button"
            className="flex touch-manipulation h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "var(--surface)", border: "1px solid var(--bdr-strong)",
              borderRadius: 8,
              cursor: "pointer", color: "var(--ink-2)",
            }}
          >
            {mobileOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed bottom-0 left-0 right-0 top-[calc(54px+env(safe-area-inset-top))] z-[48] bg-black/45 backdrop-blur-sm sm:top-[calc(62px+env(safe-area-inset-top))] md:hidden dark:bg-black/55"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="fixed left-0 right-0 top-[calc(54px+env(safe-area-inset-top))] z-[49] max-h-[min(70vh,calc(100dvh-54px-env(safe-area-inset-top)))] overflow-y-auto pb-[env(safe-area-inset-bottom)] shadow-lg sm:top-[calc(62px+env(safe-area-inset-top))] sm:max-h-[min(75vh,calc(100dvh-62px-env(safe-area-inset-top)))] md:hidden"
            style={{
              borderBottom: "1px solid var(--bdr)",
              backgroundColor: "var(--canvas)",
            }}
          >
            <div className="px-4 pb-5 pt-2 sm:px-6">
              {NAV_LINKS.map(({ label, id }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="touch-manipulation min-h-[48px] w-full border-b border-[color:var(--bdr)] py-3.5 text-left font-body text-[15px] transition-colors last:border-b-0"
                    style={{
                      color: isActive ? "var(--blue)" : "var(--ink-2)",
                      fontWeight: isActive ? 600 : 400,
                      background: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex h-11 w-full touch-manipulation items-center justify-center rounded-lg font-body text-[13px] font-medium text-white"
                style={{ background: "var(--blue)", textDecoration: "none" }}
                onClick={() => setMobileOpen(false)}
              >
                Resume ↗
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
