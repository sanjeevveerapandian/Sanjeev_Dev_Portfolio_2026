"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

/* Both icons are always in the DOM; CSS shows the right one from the <html> class,
   so the first paint is correct and there is no placeholder button. */
export function ThemeToggle() {
  const { setTheme } = useTheme();

  const toggle = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button type="button" onClick={toggle} className="icon-btn" aria-label="Toggle light and dark theme" title="Toggle theme">
      <Sun className="theme-icon-sun" size={18} strokeWidth={1.8} aria-hidden />
      <Moon className="theme-icon-moon" size={18} strokeWidth={1.8} aria-hidden />
    </button>
  );
}
