"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "lucide-react";

const EXP = [
  {
    period: "Feb 2026 — Present",
    company: "Kanini Software Solutions",
    role: "Intern — Full Stack .NET Developer",
    location: "Chennai · On-site",
    desc: "Engineered scalable backend modules and RESTful APIs using .NET and MS SQL Server. Refactored architecture with modular C# principles improving maintainability and reducing team onboarding time.",
    stack: ["Angular", ".NET", "C#", "MS SQL Server", "REST APIs"],
    url: "https://kanini.com",
    current: true,
  },
  {
    period: "Jul 2025 — Dec 2025",
    company: "TakeMyTickets",
    role: "Software Developer Intern",
    location: "Chennai · On-site",
    desc: "Built and secured middleware components and RESTful APIs, implementing authentication flows. Developed responsive React.js interfaces to improve feature delivery and platform stability.",
    stack: ["React.js", "Node.js", "Tailwind CSS", "Middleware", "Auth"],
    url: "#",
    current: false,
  },
  {
    period: "Jul 2024 — Jun 2025",
    company: "Ogrelix Solutions",
    role: "Part-Time Full Stack Developer",
    location: "Chennai · Hybrid",
    desc: "Optimised MongoDB query pipelines and indexing strategies, reducing API response time under high load. Defined clean API contracts enabling cleaner third-party integrations.",
    stack: ["React.js", "Node.js", "MongoDB", "Query Optimization"],
    url: "#",
    current: false,
  },
];

function ExpCard({ exp }: { exp: typeof EXP[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative cursor-default rounded-xl p-5 sm:p-6 md:p-7 md:pb-6"
      style={{
        border: `1px solid ${hov ? "var(--blue)" : "var(--bdr)"}`,
        background: hov ? "var(--elevated)" : "var(--surface)",
        transition: "all 0.25s",
        boxShadow: hov ? "0 0 0 1px var(--blue-glow), 0 8px 32px rgba(0,0,0,0.12)" : "none",
      }}
    >
      {/* Left blue accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: 3, borderRadius: "12px 0 0 12px",
        background: hov ? "var(--blue)" : "var(--bdr)",
        transition: "background 0.25s",
      }} />

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-0" style={{ alignItems: "flex-start", marginBottom: 8 }}>
        <div className="min-w-0 flex-1">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blue)" }}>
              {exp.period}
            </span>
            {exp.current && (
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
                padding: "2px 8px", borderRadius: 9999,
                background: "var(--blue-dim)", color: "var(--blue)",
                letterSpacing: "0.05em",
              }}>CURRENT</span>
            )}
          </div>
          <h3 style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--ink-1)", marginBottom: 2 }}>
            {exp.role}
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-3)" }}>
            {exp.url && exp.url !== "#" ? (
              <a
                href={exp.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid transparent", transition: "border-color 0.2s, color 0.2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--blue)";
                  e.currentTarget.style.borderBottomColor = "var(--blue)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "inherit";
                  e.currentTarget.style.borderBottomColor = "transparent";
                }}
              >
                {exp.company}
              </a>
            ) : (
              exp.company
            )}
            {" "}· {exp.location}
          </p>
        </div>
        <div className="shrink-0 sm:self-start" style={{ opacity: hov ? 1 : 0, transition: "opacity 0.2s", color: "var(--blue)" }}>
          <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
        </div>
      </div>

      <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.8, marginBottom: 16, maxWidth: 560 }}>
        {exp.desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {exp.stack.map((s) => (
          <span key={s} style={{
            fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500,
            padding: "3px 10px", borderRadius: 4,
            border: "1px solid var(--bdr)", color: "var(--ink-3)", background: "var(--canvas)",
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

export default function SectionExperience() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="experience" ref={ref} className="section-stack reveal">
      <SectionLabel>Experience</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {EXP.map((e) => <ExpCard key={e.company} exp={e} />)}
      </div>

      {/* Certifications */}
      <div
        className="mt-6 rounded-xl bg-surface px-5 py-6 sm:px-7 sm:py-6"
        style={{ border: "1px solid var(--bdr)" }}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 16 }}>
          Certifications
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="max-sm:grid-cols-1">
          {["C# Masterclass — Udemy","React / Next.js / Redux — Udemy","JavaScript — Meta / Coursera","Java Foundations — Oracle Academy","Linux Essentials — Cisco"].map((c) => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "var(--blue)", fontSize: 8 }}>◆</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-2)" }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
