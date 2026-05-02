"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="min-h-[44px] min-w-[44px] shrink-0 md:h-9 md:w-9"
        style={{ borderRadius: 8, border: "1px solid var(--bdr-strong)", background: "var(--surface)" }}
        aria-hidden
      />
    );
  }

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex touch-manipulation items-center justify-center md:size-9 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0"
      style={{
        borderRadius: 8,
        border: "1px solid var(--bdr-strong)",
        background: "var(--surface)",
        cursor: "pointer",
        transition: "all 0.2s",
        color: "var(--ink-2)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--blue)";
        e.currentTarget.style.color = "var(--blue)";
        e.currentTarget.style.background = "var(--blue-dim)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--bdr-strong)";
        e.currentTarget.style.color = "var(--ink-2)";
        e.currentTarget.style.background = "var(--surface)";
      }}
    >
      {isDark ? <Sun size={15} strokeWidth={1.8} /> : <Moon size={15} strokeWidth={1.8} />}
    </button>
  );
}
