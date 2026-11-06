"use client";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArchDiagram, type DiagramLayer } from "@/components/ui/ArchDiagram";
import { LIVE_SITE_URL, OSS_REPO_URL } from "@/lib/constants";

type Status = "live" | "shipped" | "prototype" | "research";
type Tag = "fullstack" | "ai" | "iot";

type Project = {
  title: string;
  category: string;
  tagline: string;
  status: Status;
  statusLabel: string;
  date: string;
  tags: Tag[];
  problem: string;
  architecture: string;
  outcome: string;
  stack: string[];
  live?: string;
  /* TODO(sanjeev): repo URL for this project. Code links stay hidden until a real URL is set. */
  code?: string;
  diagram?: { caption: string; layers: DiagramLayer[] };
  featured?: boolean;
};

/* Only facts from the verified list. Where a detail is missing it is marked TODO. */
const PROJECTS: Project[] = [
  {
    title: "ParkEase",
    category: "Full-stack · Clean Architecture",
    tagline: "A parking platform with separate views for drivers, operators and admins.",
    status: "shipped",
    statusLabel: "Shipped",
    date: "Aug 2026",
    tags: ["fullstack"],
    featured: true,
    problem: "Drivers, operators and admins use the same parking data, but each role needs different access.",
    architecture: "ASP.NET Core Web API under Clean Architecture. React and TypeScript client. SQL Server. JWT auth with Driver, Operator and Admin roles.",
    outcome: "Slot mapping, booking, overstay billing, email notifications and admin reports. Documented in Swagger. Built solo.",
    stack: ["ASP.NET Core", "Clean Architecture", "React", "TypeScript", "SQL Server", "JWT", "Swagger"],
    diagram: {
      caption: "ParkEase architecture",
      layers: [
        { label: "Client", title: "React + TypeScript" },
        { label: "Auth", title: "JWT roles", items: ["Driver", "Operator", "Admin"] },
        { label: "API", title: "ASP.NET Core Web API · Clean Architecture", items: ["Slot mapping", "Booking", "Overstay billing", "Email notifications", "Admin reports"], hot: true },
        { label: "Data", title: "SQL Server" },
      ],
    },
  },
  {
    title: "MSS Chennai",
    category: "Finance · Billing",
    tagline: "A finance and billing platform running in production.",
    status: "live",
    statusLabel: "Live",
    date: "msschennai.in",
    tags: ["fullstack"],
    featured: true,
    live: LIVE_SITE_URL,
    problem: "Finance and billing in one web app.", // TODO(sanjeev): what problem did it solve for the client?
    architecture: "React and Tailwind front end. SQL database behind REST APIs.", // TODO(sanjeev): backend stack, auth, hosting
    outcome: "Live in production at msschennai.in.", // TODO(sanjeev): users, scope, anything measurable
    stack: ["React", "Tailwind CSS", "SQL", "REST"],
  },
  {
    title: "Privacy-Preserving Medical Decision Support",
    category: "Final-year thesis · Healthcare AI",
    tagline: "Decision support for medical data that stays encrypted.",
    status: "research",
    statusLabel: "Thesis",
    date: "Final year",
    tags: ["ai"],
    problem: "Medical decision support needs patient data. That data needs to stay private.",
    architecture: "Homomorphic encryption (PKEST) and fuzzy logic, served through FastAPI, with an LLM layer on top.",
    outcome: "Final-year thesis project.", // TODO(sanjeev): result or evaluation to quote
    stack: ["Homomorphic encryption", "PKEST", "Fuzzy logic", "FastAPI", "LLM", "Python"],
    diagram: {
      caption: "Thesis architecture",
      layers: [
        { label: "Service", title: "FastAPI", items: ["Python"] },
        { label: "Privacy + reasoning", title: "PKEST homomorphic encryption", items: ["Fuzzy logic"], hot: true },
        { label: "Insight", title: "LLM layer" },
      ],
    },
  },
  {
    title: "Emergency Traffic Light Preemption",
    category: "IoT · Smart infrastructure",
    tagline: "A LoRa mesh that helps emergency vehicles through signals.",
    status: "prototype",
    statusLabel: "Prototype",
    date: "2025",
    tags: ["iot"],
    problem: "Emergency vehicles need to get through traffic signals.",
    architecture: "Flutter app, ESP32 nodes on a LoRa mesh, Firebase.",
    outcome: "Validated at 1.5 km. Presented at IIC Regional Meet 2025.",
    stack: ["Flutter", "ESP32", "LoRa mesh", "Firebase"],
    diagram: {
      caption: "Preemption system",
      layers: [
        { label: "Mobile", title: "Flutter app" },
        { label: "Edge", title: "ESP32 nodes", items: ["LoRa mesh"], hot: true },
        { label: "Cloud", title: "Firebase" },
      ],
    },
  },
  {
    title: "PrepWise",
    category: "AI · Voice",
    tagline: "Mock interviews you speak out loud, across 10+ roles.",
    status: "shipped",
    statusLabel: "Shipped",
    date: "Apr 2025",
    tags: ["ai", "fullstack"],
    problem: "Interview practice works better when you answer out loud.",
    architecture: "Next.js app on Firebase. Vapi AI runs the voice interviews.",
    outcome: "Covers 10+ roles.",
    stack: ["Next.js", "Firebase", "Vapi AI"],
  },
  {
    title: "MedRush",
    category: "Emergency response",
    tagline: "Connecting patients and ambulances with live location.",
    status: "prototype",
    statusLabel: "Pitchathon finalist",
    date: "VIT Chennai",
    tags: ["fullstack"],
    problem: "Patients and ambulance drivers need to find each other fast.",
    architecture: "React front end on Firebase Realtime Database, with Google Maps.",
    outcome: "Finalist at the Pitchathon, VIT Chennai.",
    stack: ["React", "Firebase Realtime DB", "Google Maps"],
  },
];

const FILTERS: { id: "all" | Tag; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full-stack" },
  { id: "ai", label: "AI" },
  { id: "iot", label: "IoT" },
];

const OSS = [
  { pr: 42, merged: "Nov 6, 2026", title: "Stop validate and build from archiving and deleting event files" },
  { pr: 40, merged: "Nov 3, 2026", title: "Redeploy the site after the archive workflow commits to main" },
];

function Links({ p }: { p: Pick<Project, "live" | "code"> }) {
  if (!p.live && !p.code) return null;
  return (
    <div className="chip-row">
      {p.live && (
        <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
          <ExternalLink size={15} aria-hidden /> Live site
        </a>
      )}
      {p.code && (
        <a href={p.code} target="_blank" rel="noopener noreferrer" className="btn btn--sm">
          <Github size={15} aria-hidden /> Code
        </a>
      )}
    </div>
  );
}

function Facts({ p }: { p: Project }) {
  return (
    <>
      <dl className="case-cols">
        <div><dt>Problem</dt><dd>{p.problem}</dd></div>
        <div><dt>Architecture</dt><dd>{p.architecture}</dd></div>
        <div><dt>Outcome</dt><dd>{p.outcome}</dd></div>
      </dl>
    </>
  );
}

function CaseStudy({ p, num }: { p: Project; num: string }) {
  return (
    <article className={`card case rise${p.diagram ? " case--diagram" : ""}`}>
      <div>
        <div className="case-meta">
          <span className="case-num">{num}</span>
          <span className="pill" data-status={p.status}>{p.statusLabel} · {p.date}</span>
          <span className="eyebrow">{p.category}</span>
        </div>
        <h3>{p.title}</h3>
        <p className="case-tag">{p.tagline}</p>
        <Facts p={p} />
        <div className="case-foot">
          <div className="chip-row">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
          <Links p={p} />
        </div>
      </div>
      {p.diagram && <ArchDiagram caption={p.diagram.caption} layers={p.diagram.layers} />}
    </article>
  );
}

function Mini({ p, num }: { p: Project; num: string }) {
  return (
    <details className="card mini">
      <summary>
        <div className="case-meta" style={{ marginBottom: 0 }}>
          <span className="case-num">{num}</span>
          <span className="pill" data-status={p.status}>{p.statusLabel} · {p.date}</span>
        </div>
        <h3>{p.title}</h3>
        <p className="mini-tag">{p.tagline}</p>
      </summary>
      <div className="mini-body">
        <dl style={{ display: "grid", gap: 14 }}>
          <div><dt>Problem</dt><dd>{p.problem}</dd></div>
          <div><dt>Architecture</dt><dd>{p.architecture}</dd></div>
          <div><dt>Outcome</dt><dd>{p.outcome}</dd></div>
        </dl>
        {p.diagram && <ArchDiagram caption={p.diagram.caption} layers={p.diagram.layers} />}
        <div className="chip-row">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
        <Links p={p} />
      </div>
    </details>
  );
}

export default function SectionProjects() {
  const [filter, setFilter] = useState<"all" | Tag>("all");
  const visible = (p: Project) => filter === "all" || p.tags.includes(filter);
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  const num = (p: Project) => String(PROJECTS.indexOf(p) + 1).padStart(2, "0");

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHead
          index="04"
          label="Projects"
          title={<>Things I built, and <em>how</em> they work.</>}
          lede="Open source first, then the projects. Each one says what it does, how it is built and where it stands."
        />

        <article className="card oss rise">
          <div>
            <span className="pill" data-status="live">2 PRs merged</span>
            <h3>EventSapiens</h3>
            <p className="case-tag">Open source events site from SapiensCampus. I fixed two bugs in its GitHub workflows.</p>
            <div className="chip-row" style={{ marginTop: 18 }}>
              <a href={OSS_REPO_URL} target="_blank" rel="noopener noreferrer" className="btn btn--sm">
                <Github size={15} aria-hidden /> Repository
              </a>
            </div>
          </div>
          <ul className="oss-prs">
            {OSS.map((o) => (
              <li key={o.pr} className="pr">
                <div className="pr-head">
                  <a href={`${OSS_REPO_URL}/pull/${o.pr}`} target="_blank" rel="noopener noreferrer" className="pr-num">#{o.pr} ↗</a>
                  <span className="pr-merged">Merged {o.merged}</span>
                </div>
                <p className="pr-title">{o.title}</p>
              </li>
            ))}
          </ul>
        </article>

        <div className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className="filter" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
              <span>{f.id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.tags.includes(f.id as Tag)).length}</span>
            </button>
          ))}
        </div>

        <div className="cases">
          {featured.filter(visible).map((p) => <CaseStudy key={p.title} p={p} num={num(p)} />)}
        </div>
        <div className="minis">
          {rest.filter(visible).map((p) => <Mini key={p.title} p={p} num={num(p)} />)}
        </div>

        <article className="card building rise">
          <div>
            <span className="pill" data-status="building">Currently building</span>
            <h3>Stock exchange matching engine</h3>
            <p className="case-tag">Written in Java and built phase by phase, with tests for each phase.</p>
          </div>
          <div className="chip-row"><span className="chip chip--accent">Java</span><span className="chip">Tests</span></div>
        </article>
      </div>
    </section>
  );
}
