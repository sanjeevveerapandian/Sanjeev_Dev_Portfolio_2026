"use client";
import { useEffect, useRef, useState } from "react";
import { Command, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { RESUME_URL } from "@/lib/constants";
import { OPEN_PALETTE_EVENT } from "@/components/ui/CommandPalette";

const SECTION_IDS = ["hero", "about", "experience", "projects", "skills", "contact"] as const;

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const active = useScrollSpy(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = [
          burgerRef.current,
          ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("button, a") ?? []),
        ].filter(Boolean) as HTMLElement[];
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const cur = document.activeElement;
        if (e.shiftKey && cur === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth >= 820) setOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <header className="nav" data-scrolled={scrolled || open ? "true" : "false"}>
      <div className="wrap nav-inner">
        <a href="#hero" className="nav-logo" aria-label="Sanjeev Veerapandian, back to top" onClick={(e) => { e.preventDefault(); go("hero"); }}>
          SV<span>.</span>
        </a>

        <nav aria-label="Primary" className="nav-links">
          {NAV_LINKS.map(({ label, id }) => (
            <a key={id} href={`#${id}`} className="nav-link" aria-current={active === id ? "true" : undefined} onClick={(e) => { e.preventDefault(); go(id); }}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-tools">
          <button type="button" className="icon-btn" aria-label="Open command menu" title="Command menu (Ctrl K)" onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}>
            <Command size={18} strokeWidth={1.8} aria-hidden />
          </button>
          <ThemeToggle />
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm nav-resume">
            Resume ↗
          </a>
          <button
            ref={burgerRef}
            type="button"
            className="icon-btn nav-burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} strokeWidth={1.8} aria-hidden /> : <Menu size={20} strokeWidth={1.8} aria-hidden />}
          </button>
        </div>
      </div>
    </header>

      {open && (
        <div id="mobile-menu" ref={menuRef} className="mobile-menu">
          {NAV_LINKS.map(({ label, id }, i) => (
            <button key={id} type="button" className="mobile-link" aria-current={active === id ? "true" : undefined} onClick={() => go(id)}>
              {label}
              <span>0{i + 2}</span>
            </button>
          ))}
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ marginTop: 24, width: "100%" }} onClick={() => setOpen(false)}>
            Resume ↗
          </a>
        </div>
      )}
    </>
  );
}
