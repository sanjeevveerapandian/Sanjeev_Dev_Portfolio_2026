"use client";
import { useReveal } from "@/hooks/useReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Mail, MapPin } from "lucide-react";

export default function SectionContact() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="contact" ref={ref} className="section-stack reveal">
      <SectionLabel>Contact</SectionLabel>

      <div style={{
        borderRadius: 20, overflow: "hidden",
        border: "1px solid var(--bdr)",
        background: "var(--surface)",
        position: "relative",
      }}>
        {/* Blue glow top-right */}
        <div style={{
          position: "absolute", top: -80, right: -80, width: 280, height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--blue-glow) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="relative border-b border-bdr px-6 pb-8 pt-9 sm:px-11 sm:pb-9 sm:pt-11">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: 14, letterSpacing: "-0.02em", color: "var(--ink-1)" }}>
            Let&apos;s build something{" "}
            <em style={{ color: "var(--blue)", fontStyle: "italic" }}>remarkable</em>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.85, maxWidth: 460 }}>
            Open to full-time engineering roles, contract engagements, and technical collaborations.
            If you&apos;re working on something ambitious — I&apos;d love to hear about it.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--bdr)" }} className="max-md:grid-cols-1">
          <div className="bg-surface px-5 py-5 sm:px-7">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 10 }}>Email</p>
            <a href="mailto:sanjeevveerapandian@gmail.com"
              className="min-w-0 flex-wrap break-words text-[13px] leading-snug"
              style={{ display: "flex", alignItems: "flex-start", gap: 7, fontFamily: "var(--font-body)", fontWeight: 500, color: "var(--blue)", textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <Mail size={13} className="mt-0.5 shrink-0" strokeWidth={2} /> sanjeevveerapandian@gmail.com
            </a>
          </div>
          <div className="bg-surface px-5 py-5 sm:px-7">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 10 }}>Location</p>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "var(--ink-1)" }}>
              <MapPin size={13} style={{ color: "var(--blue)" }} /> Chennai, Tamil Nadu, India
            </div>
          </div>
          <div className="bg-surface px-5 py-5 sm:px-7">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 10 }}>Status</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="pulse-green" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--blue)", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "var(--ink-1)" }}>Available for roles</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 px-5 py-5 sm:gap-2.5 sm:px-7">
          {[
            { label: "Get in touch →", href: "mailto:sanjeevveerapandian@gmail.com", primary: true },
            { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/sanjeev-veerapandian-43692a243/", primary: false },
            { label: "Resume ↗", href: "https://drive.google.com/file/d/1M-KyhbLMVbgQeG7ynLgnIY4tfS1ceFNF/view?usp=sharing", primary: false },
          ].map(({ label, href, primary }) => (
            <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
              className="inline-flex min-h-[44px] touch-manipulation items-center justify-center sm:min-h-0"
              style={{
                alignItems: "center", gap: 6,
                fontFamily: "var(--font-body)", fontSize: 12, fontWeight: primary ? 600 : 400,
                padding: "10px 18px", borderRadius: 7,
                background: primary ? "var(--blue)" : "transparent",
                color: primary ? "#fff" : "var(--ink-2)",
                border: primary ? "none" : "1px solid var(--bdr-strong)",
                cursor: "pointer", transition: "all 0.2s", textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                if (primary) { e.currentTarget.style.opacity = "0.85"; }
                else { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.color = "var(--ink-1)"; }
              }}
              onMouseLeave={(e) => {
                if (primary) { e.currentTarget.style.opacity = "1"; }
                else { e.currentTarget.style.borderColor = "var(--bdr-strong)"; e.currentTarget.style.color = "var(--ink-2)"; }
              }}
            >{label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
