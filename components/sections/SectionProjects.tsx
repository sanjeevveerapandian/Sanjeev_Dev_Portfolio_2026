"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Plus, ExternalLink, Github } from "lucide-react";

const GITHUB = "https://github.com/sanjeevveerapandian";

type Status = "live" | "shipped" | "prototype" | "research";
type Tag = "fullstack" | "ai" | "iot";

type Project = {
  title: string;
  category: string;
  tagline: string;
  status: Status;
  date: string;
  tags: Tag[];
  problem: string;
  architecture: string;
  outcome: string;
  stack: string[];
  github?: string;
  live?: string;
};

type Building = {
  title: string;
  category: string;
  summary: string;
  stack: string[];
  github?: string;
};

const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  shipped: "Shipped",
  prototype: "Prototype",
  research: "Research",
};

const PROJECTS: Project[] = [
  {
    title: "ParkEase — Smart Parking Management",
    category: "Full-Stack · Clean Architecture",
    tagline: "Role-based parking platform for drivers, operators and admins",
    status: "shipped",
    date: "Aug 2026",
    tags: ["fullstack"],
    problem:
      "One parking lot, three very different users: drivers who need a slot, operators running the floor, and admins who need the numbers. Each needs its own view of the same data.",
    architecture:
      "ASP.NET Core Web API under Clean Architecture with a React (TypeScript) frontend. JWT role-based auth for Driver, Operator and Admin. Vehicle-slot mapping, booking, overstay billing and email notifications on SQL Server.",
    outcome:
      "Built solo, end to end, from schema design through deployment. Admin reporting endpoints, full Swagger docs, and a phased git workflow.",
    stack: ["ASP.NET Core", "React + TypeScript", "SQL Server", "JWT / RBAC", "Swagger"],
    github: GITHUB,
  },
  {
    title: "PrepWise — AI Mock Interview Platform",
    category: "AI · Voice",
    tagline: "Voice-based mock interviews with automated feedback",
    status: "shipped",
    date: "Apr 2025",
    tags: ["ai", "fullstack"],
    problem:
      "Interview prep is mostly passive reading. It rarely puts you in a live conversation where the gaps actually show up.",
    architecture:
      "Next.js frontend integrated directly with Firebase for auth and data. Vapi AI runs the voice interview conversation and generates feedback at the end of each session.",
    outcome: "Supports 10+ interview roles with sub-3s load time. A v2 with its own interview engine is in progress below.",
    stack: ["Next.js", "Firebase", "Vapi AI", "TypeScript", "Tailwind CSS"],
    github: GITHUB,
  },
  {
    title: "MSS Chennai — Finance & Billing Platform",
    category: "Fintech · Internal Tools",
    tagline: "Production billing system replacing manual spreadsheet workflows",
    status: "live",
    date: "In production",
    tags: ["fullstack"],
    problem:
      "The finance team ran invoicing on spreadsheets, which meant errors, delays and a lot of admin overhead.",
    architecture:
      "React + Tailwind SPA over a SQL backend and REST API layer. Role-based access and printable invoice generation.",
    outcome: "Replaced manual billing. Live at msschennai.in and used in day-to-day finance operations.",
    stack: ["React.js", "Tailwind CSS", "SQL", "REST APIs"],
    live: "https://msschennai.in",
  },
  {
    title: "Privacy-Preserving Medical Decision Support",
    category: "Healthcare AI · Cryptography",
    tagline: "Encrypted ML inference with no plaintext patient data on the server",
    status: "research",
    date: "Final year thesis",
    tags: ["ai"],
    problem:
      "Medical AI needs sensitive patient data, and unencrypted health records carry serious HIPAA/GDPR and breach risk.",
    architecture:
      "PKEST homomorphic encryption layer over a fuzzy-logic diagnostic model, orchestrated with FastAPI and an LLM reasoning layer. Source records are never decrypted server-side.",
    outcome:
      "A physician queries encrypted records and gets LLM-generated insights back, while the system never sees plaintext.",
    stack: ["Homomorphic Encryption", "LLMs", "Fuzzy Logic", "Python", "FastAPI"],
    github: GITHUB,
  },
  {
    title: "Emergency Traffic Light Preemption",
    category: "IoT · Smart Infrastructure",
    tagline: "LoRa mesh network that clears signals ahead of ambulances",
    status: "prototype",
    date: "Apr 2025",
    tags: ["iot"],
    problem:
      "Congestion delays ambulances, and traditional signals have no way to detect an approaching emergency vehicle.",
    architecture:
      "Flutter app → ESP32 nodes over a LoRa mesh → Firebase RTDB → Google Maps. Nodes switch signals on their own when they receive a preemption packet.",
    outcome: "Prototype validated at 1.5 km range with sub-200 ms signal response. Presented at IIC Regional Meet 2025.",
    stack: ["Flutter", "ESP32", "LoRa Mesh", "Firebase", "Embedded C"],
    github: GITHUB,
  },
  {
    title: "MedRush — Ambulance Connector App",
    category: "Emergency Response",
    tagline: "Real-time patient-to-driver coordination with live tracking",
    status: "prototype",
    date: "Pitchathon finalist",
    tags: ["fullstack"],
    problem:
      "Emergency coordination is fragmented. Patients can't easily reach nearby ambulances, and drivers lack good routing.",
    architecture:
      "Two React.js apps (patient + driver) on Firebase Realtime DB for live location streaming, with hospital routing via the Google Maps API.",
    outcome:
      "End-to-end coordination flow with driver-to-patient matching under 30 seconds in testing. Finalist at the VIT Chennai Pitchathon.",
    stack: ["React.js", "Firebase Realtime DB", "Google Maps API", "JavaScript"],
    github: `${GITHUB}/MedRush`,
  },
];

const BUILDING: Building[] = [
  {
    title: "PrepWise v2",
    category: "GenAI · RAG",
    summary:
      "Rebuilding PrepWise so the interview engine is mine, not a voice API's. Resume + JD retrieval to tailor questions, an adaptive interviewer that asks follow-ups, rubric scoring backed by transcript evidence, and a labelled eval set. Voice comes last, as an interface.",
    stack: ["Next.js", "FastAPI", "PostgreSQL + pgvector", "Docker", "GitHub Actions"],
  },
  {
    title: "LedgerFlow",
    category: "Java · Payments",
    summary: "A payment processing and ledger service in Java and Spring Boot.",
    stack: ["Java", "Spring Boot", "REST APIs"],
  },
];

const FILTERS: { id: "all" | Tag; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "ai", label: "AI" },
  { id: "iot", label: "IoT" },
];

function StatusPill({ status, date }: { status: Status; date: string }) {
  return (
    <span className="status-pill" data-status={status}>
      <span className="status-dot" aria-hidden />
      {STATUS_LABEL[status]}
      <span className="status-sep" aria-hidden>·</span>
      <span className="status-date">{date}</span>
    </span>
  );
}

function ProjectLinks({ p }: { p: { github?: string; live?: string } }) {
  if (!p.github && !p.live) return null;
  return (
    <div className="project-links">
      {p.live && (
        <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link project-link--primary">
          <ExternalLink size={12} aria-hidden /> Live
        </a>
      )}
      {p.github && (
        <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">
          <Github size={12} aria-hidden /> Code
        </a>
      )}
    </div>
  );
}

function ProjectCard({ p, num, panelId, defaultOpen }: { p: Project; num: string; panelId: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const preview = p.stack.slice(0, 4);
  const more = p.stack.length - preview.length;

  return (
    <article className="project-card" data-open={open ? "true" : "false"}>
      <div className="project-head">
        <button
          type="button"
          id={`${panelId}-trigger`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="project-trigger"
        >
          <div className="project-meta">
            <span className="project-num">{num}</span>
            <span className="project-cat">{p.category}</span>
            <StatusPill status={p.status} date={p.date} />
          </div>
          <h3 className="project-title">{p.title}</h3>
          <p className="project-tagline">{p.tagline}</p>
          <div className="project-preview" aria-hidden={open}>
            {preview.map((s) => (
              <span key={s} className="chip chip--sm">{s}</span>
            ))}
            {more > 0 && <span className="chip chip--sm chip--ghost">+{more}</span>}
          </div>
          <span className="project-toggle" aria-hidden>
            <Plus size={13} />
          </span>
        </button>
        <ProjectLinks p={p} />
      </div>

      <div className="project-panel" id={panelId} role="region" aria-labelledby={`${panelId}-trigger`}>
        <div className="project-panel-inner">
          <div className="project-grid">
            {([
              ["Problem", p.problem],
              ["Architecture", p.architecture],
              ["Outcome", p.outcome],
            ] as const).map(([label, content]) => (
              <div key={label} className="project-cell">
                <p className="project-cell-label">{label}</p>
                <p className="project-cell-body">{content}</p>
              </div>
            ))}
          </div>
          <div className="project-stack">
            {p.stack.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function BuildingCard({ b }: { b: Building }) {
  return (
    <article className="building-card">
      <div className="project-meta">
        <span className="status-pill" data-status="building">
          <span className="status-dot pulse-dot" aria-hidden />
          In progress
        </span>
        <span className="project-cat">{b.category}</span>
      </div>
      <h3 className="project-title">{b.title}</h3>
      <p className="building-summary">{b.summary}</p>
      <div className="project-stack project-stack--flat">
        {b.stack.map((s) => (
          <span key={s} className="chip">{s}</span>
        ))}
      </div>
      <ProjectLinks p={b} />
    </article>
  );
}

export default function SectionProjects() {
  const ref = useReveal<HTMLElement>();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const shown = PROJECTS.filter((p) => filter === "all" || p.tags.includes(filter));

  return (
    <section id="projects" ref={ref} className="section-stack reveal">
      <SectionLabel>Projects</SectionLabel>

      <div className="project-filters" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => {
          const count = f.id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.tags.includes(f.id as Tag)).length;
          return (
            <button
              key={f.id}
              type="button"
              className="filter-chip"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="project-list">
        {shown.map((p) => {
          const idx = PROJECTS.indexOf(p);
          const num = String(idx + 1).padStart(2, "0");
          return (
            <ProjectCard
              key={p.title}
              p={p}
              num={num}
              panelId={`project-panel-${num}`}
              defaultOpen={idx === 0}
            />
          );
        })}
      </div>

      <div className="building-wrap">
        <p className="building-label">Currently building</p>
        <div className="building-grid">
          {BUILDING.map((b) => (
            <BuildingCard key={b.title} b={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
