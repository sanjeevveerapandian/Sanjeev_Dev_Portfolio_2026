"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "lucide-react";

const EXP = [
  {
    period: "Feb 2026 — Sep 2026",
    company: "Kanini Software Solutions",
    role: "Product Development Intern",
    location: "Chennai · On-site",
    points: [
      "Built and maintained 10+ REST API endpoints in ASP.NET Core (C#) with Entity Framework Core, LINQ and stored procedures on MS SQL Server, validated with Postman across multiple business modules.",
      "Refactored legacy service layers to Clean Architecture, SOLID and dependency injection during code reviews, and debugged Angular-to-.NET contract mismatches, cutting QA turnaround.",
    ],
    stack: ["ASP.NET Core", "C#", "EF Core", "MS SQL Server", "Angular"],
    url: "https://kanini.com",
    current: false,
  },
  {
    period: "Jul 2025 — Dec 2025",
    company: "TakeMyTickets",
    role: "Backend Developer Intern",
    location: "Chennai · On-site",
    points: [
      "Designed and shipped Node.js/Express API layers with JWT authentication and role-based access control for a live ticketing platform serving ~8,000 monthly users.",
      "Delivered 5+ features across 6 Agile sprints, owning core business logic and React.js integration and working with QA on release quality.",
    ],
    stack: ["Node.js", "Express", "JWT / RBAC", "React.js"],
    url: "#",
    current: false,
  },
  {
    period: "Jul 2024 — Jun 2025",
    company: "Ogrelix Solutions",
    role: "Full Stack Developer (Part-time)",
    location: "Chennai · Hybrid",
    points: [
      "Tuned MongoDB aggregation queries and added compound indexes, cutting production API latency by ~60% on high-traffic endpoints.",
      "Built REST APIs and business logic in Laravel (PHP) with MySQL, contributed MERN features, and defined contracts for 4 third-party integrations across 8+ releases.",
    ],
    stack: ["MongoDB", "Laravel", "MySQL", "MERN", "REST APIs"],
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

      <ul className="exp-points">
        {exp.points.map((pt) => (
          <li key={pt}>{pt}</li>
        ))}
      </ul>

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
          {["Java Foundations — Oracle","React & Next.js — Udemy","JavaScript — Meta / Coursera","C# Masterclass — Udemy","Linux Essentials — Cisco","Problem Solving (Intermediate) — HackerRank"].map((c) => (
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
