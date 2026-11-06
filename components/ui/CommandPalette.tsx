"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { RESUME_URL, EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";

type Item = { id: string; label: string; hint: string; run: () => void };

export const OPEN_PALETTE_EVENT = "sv:open-palette";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const { setTheme } = useTheme();

  const close = () => {
    setOpen(false);
    setQ("");
    setSel(0);
    returnTo.current?.focus();
  };

  const items: Item[] = useMemo(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const ext = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
    return [
      { id: "hero", label: "Top", hint: "Go to", run: go("hero") },
      { id: "about", label: "About", hint: "Go to", run: go("about") },
      { id: "experience", label: "Experience", hint: "Go to", run: go("experience") },
      { id: "projects", label: "Projects", hint: "Go to", run: go("projects") },
      { id: "skills", label: "Skills", hint: "Go to", run: go("skills") },
      { id: "contact", label: "Contact", hint: "Go to", run: go("contact") },
      { id: "theme", label: "Toggle light and dark theme", hint: "Action", run: () => setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark") },
      { id: "resume", label: "Open resume", hint: "Link", run: ext(RESUME_URL) },
      { id: "email", label: "Send an email", hint: "Link", run: () => { window.location.href = `mailto:${EMAIL}`; } },
      { id: "github", label: "GitHub profile", hint: "Link", run: ext(GITHUB_URL) },
      { id: "linkedin", label: "LinkedIn profile", hint: "Link", run: ext(LINKEDIN_URL) },
    ];
  }, [setTheme]);

  const shown = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const openIt = () => {
      returnTo.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openIt();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, openIt);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, openIt);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  const choose = (item?: Item) => {
    if (!item) return;
    close();
    item.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, shown.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); choose(shown[sel]); }
    else if (e.key === "Tab") { e.preventDefault(); inputRef.current?.focus(); }
  };

  return (
    <div className="pal-back" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="pal" role="dialog" aria-modal="true" aria-label="Command menu" onKeyDown={onKeyDown}>
        <input
          ref={inputRef}
          className="pal-input"
          value={q}
          onChange={(e) => { setQ(e.target.value); setSel(0); }}
          placeholder="Type a command or section"
          role="combobox"
          aria-expanded="true"
          aria-controls="pal-list"
          aria-activedescendant={shown[sel] ? `pal-${shown[sel].id}` : undefined}
          aria-label="Search commands"
          autoComplete="off"
          spellCheck={false}
        />
        <ul id="pal-list" role="listbox" className="pal-list">
          {shown.map((it, i) => (
            <li
              key={it.id}
              id={`pal-${it.id}`}
              role="option"
              aria-selected={i === sel}
              className="pal-item"
              onMouseMove={() => setSel(i)}
              onClick={() => choose(it)}
            >
              <span>{it.label}</span>
              <span className="pal-hint">{it.hint}</span>
            </li>
          ))}
          {shown.length === 0 && <li className="pal-empty">No match</li>}
        </ul>
        <p className="pal-foot"><kbd>↑</kbd> <kbd>↓</kbd> move <kbd>Enter</kbd> select <kbd>Esc</kbd> close</p>
      </div>
    </div>
  );
}
