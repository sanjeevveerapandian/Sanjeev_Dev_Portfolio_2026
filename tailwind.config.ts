import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas:      "var(--canvas)",
        surface:     "var(--surface)",
        elevated:    "var(--elevated)",
        "blue":      "var(--blue)",
        "blue-dim":  "var(--blue-dim)",
        "ink-1":     "var(--ink-1)",
        "ink-2":     "var(--ink-2)",
        "ink-3":     "var(--ink-3)",
        "bdr":       "var(--bdr)",
        "bdr-strong":"var(--bdr-strong)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
