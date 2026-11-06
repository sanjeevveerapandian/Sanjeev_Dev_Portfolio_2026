"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { EMAIL } from "@/lib/constants";

export function CopyEmail() {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setDone(true);
      window.setTimeout(() => setDone(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <button type="button" className="btn" onClick={copy} aria-live="polite">
      {done ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      {done ? "Copied" : "Copy email"}
    </button>
  );
}
