"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Plus, Minus, ExternalLink, Github } from "lucide-react";

const PROJECTS = [
  {
    num:"01", category:"Healthcare AI · Cryptography",
    title:"Privacy-Preserving Medical Decision Support",
    tagline:"Encrypted ML inference — zero plaintext patient data exposure",
    badge:"Final Year Thesis",
    problem:"Medical AI requires sensitive patient data, yet unencrypted health records create severe HIPAA/GDPR risk and breach exposure.",
    architecture:"PKEST homomorphic encryption layer over a fuzzy-logic diagnostic model. FastAPI orchestration with LLM reasoning layer — source records never decrypted server-side.",
    outcome:"Demonstrates compliance-safe AI diagnostics. Physician queries encrypted records, receives LLM-generated insights — system never sees plaintext.",
    stack:["Homomorphic Encryption (PKEST)","LLMs","Fuzzy Logic","Python","FastAPI","ML"],
    github:"https://github.com/sanjeevveerapandian",
  },
  {
    num:"02", category:"IoT · Smart Infrastructure",
    title:"Emergency Traffic Light Preemption",
    tagline:"LoRa mesh network — autonomous green-wave for ambulances",
    badge:"Apr 2025",
    problem:"Urban traffic congestion critically impacts ambulance response time. Traditional signals have no mechanism to detect approaching emergency vehicles.",
    architecture:"Flutter app → ESP32 nodes via LoRa mesh → Firebase RTDB → Google Maps. ESP32 nodes autonomously switch signals on detecting preemption packet.",
    outcome:"Prototype validated at 1.5km range with sub-200ms signal response. Presented at IIC Regional Meet 2025.",
    stack:["Flutter","ESP32","LoRa Mesh","Firebase","Google Maps API","Embedded C"],
    github:"https://github.com/sanjeevveerapandian",
  },
  {
    num:"03", category:"AI · Developer Tools",
    title:"PrepWise — AI Mock Interview Platform",
    tagline:"Gemini-powered evaluation with role-specific question generation",
    badge:"Personal Project",
    problem:"Candidates lack realistic pressure-simulated practice. Traditional prep is passive — doesn't surface the gaps real interviews do.",
    architecture:"Next.js 14 + Gemini API for dynamic, role-specific question generation. Firebase Auth/Firestore for session history and performance tracking.",
    outcome:"Live platform with structured AI feedback. Adaptive difficulty and structured scoring per session.",
    stack:["Next.js 14","Google Gemini API","Firebase","TypeScript","Tailwind CSS"],
    github:"https://github.com/sanjeevveerapandian",
  },
  {
    num:"04", category:"Fintech · Internal Tools",
    title:"MSS Chennai — Finance & Billing Platform",
    tagline:"Production billing system replacing error-prone manual workflows",
    badge:"Production · Live",
    problem:"Finance team operated on manual spreadsheet-based invoicing causing errors, delays, and administrative overhead.",
    architecture:"React.js + Tailwind SPA, SQL backend, REST API layer. Role-based access, printable invoice generation. Deployed and actively used.",
    outcome:"Eliminated manual billing. Live at msschennai.in — actively used in production finance operations.",
    stack:["React.js","Tailwind CSS","SQL","REST APIs"],
    github:"https://msschennai.in/team",
    live:"https://msschennai.in",
  },
  {
    num:"05", category:"Emergency Response",
    title:"MedRush — Ambulance Connector App",
    tagline:"Real-time patient-to-driver coordination with live tracking",
    badge:"Personal Project",
    problem:"Emergency medical coordination is fragmented — patients can't easily reach nearby ambulances, drivers lack optimised routing.",
    architecture:"Two React.js interfaces (patient + driver) backed by Firebase Realtime DB for live location streaming. Hospital routing via Google Maps API.",
    outcome:"End-to-end coordination system. Average driver-to-patient match under 30 seconds in testing.",
    stack:["React.js","Firebase Realtime DB","Google Maps API","JavaScript","Tailwind CSS"],
    github:"https://github.com/sanjeevveerapandian/MedRush",
  },
];

function ProjectCard({ p, panelId }: { p: typeof PROJECTS[0]; panelId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="project-card" data-open={open ? "true" : "false"}>
      <button
        type="button"
        id={`${panelId}-trigger`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="project-trigger flex w-full touch-manipulation items-start justify-between gap-3 px-4 py-5 text-left sm:gap-4 sm:px-6 sm:py-[22px]"
        style={{ background: "none", border: "none", cursor: "pointer", width: "100%" }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)" }}>{p.num}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.category}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, padding: "2px 9px", borderRadius: 9999, background: "var(--blue-dim)", color: "var(--blue)" }}>
              {p.badge}
            </span>
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontStyle: "italic", color: "var(--ink-1)", marginBottom: 4, lineHeight: 1.3 }}>
            {p.title}
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-3)" }}>{p.tagline}</p>
        </div>
        <div
          className="project-toggle shrink-0 sm:h-7 sm:w-7 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
          aria-hidden
        >
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </div>
      </button>

      {open && (
        <div
          id={panelId}
          className="project-panel"
          role="region"
          aria-labelledby={`${panelId}-trigger`}
          style={{ borderTop: "1px solid var(--bdr)" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--bdr)" }} className="max-md:grid-cols-1">
            {[["Problem",p.problem],["Architecture",p.architecture],["Outcome",p.outcome]].map(([label, content]) => (
              <div key={label} className="bg-surface px-4 py-5 sm:px-[22px] sm:py-5">
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--blue)", marginBottom: 10 }}>
                  {label}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.8 }}>{content}</p>
              </div>
            ))}
          </div>
          <div
            className="flex flex-col items-stretch gap-4 px-4 py-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:px-[22px] sm:py-3.5"
            style={{ borderTop: "1px solid var(--bdr)" }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="transition-colors duration-200"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 10, padding: "3px 10px", borderRadius: 4, border: "1px solid var(--bdr)", color: "var(--ink-3)", background: "var(--canvas)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--blue)";
                    e.currentTarget.style.color = "var(--blue)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--bdr)";
                    e.currentTarget.style.color = "var(--ink-3)";
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-200"
                  style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--blue)", textDecoration: "none" }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  <Github size={12} /> Code
                </a>
              )}
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-200"
                  style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--blue)", textDecoration: "none" }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  <ExternalLink size={12} /> Live
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SectionProjects() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="projects" ref={ref} className="section-stack reveal">
      <SectionLabel>Projects</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PROJECTS.map((p) => (
          <ProjectCard key={p.num} p={p} panelId={`project-panel-${p.num}`} />
        ))}
      </div>
    </section>
  );
}
