import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PrintButton } from "@/components/ui/PrintButton";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, LIVE_SITE_URL, OSS_REPO_URL, RESUME_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resume | Sanjeev Veerapandian",
  description: "Resume of Sanjeev Veerapandian, full-stack engineer in Chennai. Open to SDE-1 and Full-Stack roles.",
};

/* Every line below traces to the verified facts. */
const JOBS = [
  {
    co: "Kanini Software Solutions", role: "Product Development Intern", when: "Feb 2026 to Sep 2026",
    pts: [
      "Built and maintained 10+ REST endpoints in ASP.NET Core (C#) with EF Core, LINQ and stored procedures on MS SQL Server. Validated with Postman.",
      "Refactored legacy service layers to Clean Architecture, SOLID and dependency injection.",
      "Debugged Angular-to-.NET contract mismatches.",
    ],
  },
  {
    co: "TakeMyTickets", role: "Backend Developer Intern", when: "Jul 2025 to Dec 2025",
    pts: [
      "Built Node.js and Express APIs with JWT auth and role-based access control for a live ticketing platform with about 8,000 monthly users.",
      "Shipped 5+ features across 6 Agile sprints, with React.js integration.",
    ],
  },
  {
    co: "Ogrelix Solutions", role: "Full Stack Developer (part-time)", when: "Jul 2024 to Jun 2025",
    pts: [
      "Tuned MongoDB aggregations with compound indexes. Cut production API latency by about 60%.",
      "Built REST APIs in Laravel (PHP) and MySQL. Shipped MERN features.",
      "Wrote contracts for 4 third-party integrations across 8+ releases.",
    ],
  },
];

const PROJECTS: [string, string][] = [
  ["ParkEase (Aug 2026)", "Parking platform. ASP.NET Core Web API under Clean Architecture, React and TypeScript, SQL Server, JWT roles (Driver, Operator, Admin). Slot mapping, booking, overstay billing, email notifications, admin reports, Swagger. Built solo."],
  ["MSS Chennai", "Finance and billing platform in production at msschennai.in. React, Tailwind, SQL, REST."],
  ["PrepWise (Apr 2025)", "Voice mock interviews for 10+ roles. Next.js, Firebase, Vapi AI."],
  ["Privacy-preserving medical decision support", "Final-year thesis. Homomorphic encryption (PKEST), fuzzy logic, FastAPI, LLM layer."],
  ["Emergency traffic light preemption", "Flutter, ESP32, LoRa mesh, Firebase. Validated at 1.5 km. Presented at IIC Regional Meet 2025."],
  ["MedRush", "React, Firebase Realtime DB, Google Maps. Pitchathon (VIT Chennai) finalist."],
];

export default function ResumePage() {
  return (
    <main id="main-content" className="resume wrap">
      <div className="resume-bar no-print">
        <Link href="/" className="btn btn--sm"><ArrowLeft size={15} aria-hidden /> Back to site</Link>
        <div className="chip-row">
          <PrintButton />
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn--sm">PDF version ↗</a>
        </div>
      </div>

      <header className="resume-head">
        <h1>Sanjeev Veerapandian</h1>
        <p>Full-stack engineer. Open to SDE-1 and Full-Stack roles.</p>
        <p className="resume-contact">
          Chennai, India · <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href={LINKEDIN_URL}>linkedin.com/in/sanjeev-veerapandian-43692a243</a> · <a href={GITHUB_URL}>github.com/sanjeevveerapandian</a>
        </p>
      </header>

      <section className="resume-sec">
        <h2>Experience</h2>
        {JOBS.map((j) => (
          <div key={j.co} className="resume-item">
            <div className="resume-row"><strong>{j.co}</strong><span>{j.when}</span></div>
            <p className="resume-role">{j.role}</p>
            <ul>{j.pts.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}
      </section>

      <section className="resume-sec">
        <h2>Open source</h2>
        <div className="resume-item">
          <div className="resume-row"><strong>EventSapiens</strong><span>Nov 2026</span></div>
          <ul>
            <li><a href={`${OSS_REPO_URL}/pull/40`}>#40</a> merged Nov 3, 2026: redeploy the site after the archive workflow commits to main.</li>
            <li><a href={`${OSS_REPO_URL}/pull/42`}>#42</a> merged Nov 6, 2026: stop validate and build from archiving and deleting event files.</li>
          </ul>
        </div>
      </section>

      <section className="resume-sec">
        <h2>Projects</h2>
        <ul>
          {PROJECTS.map(([t, d]) => (
            <li key={t}>
              <strong>{t}.</strong> {d}
              {t === "MSS Chennai" && <> <a href={LIVE_SITE_URL}>Live site</a>.</>}
            </li>
          ))}
          <li><strong>Currently building.</strong> A stock exchange matching engine in Java, phase by phase, with tests.</li>
        </ul>
      </section>

      <section className="resume-sec">
        <h2>Skills</h2>
        <p><strong>Core:</strong> Java / Spring Boot, ASP.NET Core, Node.js / Express, SQL Server, MongoDB, React / Next.js.</p>
        <p><strong>Also:</strong> C#, Java, JavaScript, TypeScript, Python, SQL, Spring Boot, Angular, MongoDB, MySQL, Docker, Azure, Git and GitHub Actions.</p>
      </section>

      <section className="resume-sec">
        <h2>Education</h2>
        <div className="resume-row"><strong>B.E. Computer Science Engineering</strong><span>2022 to 2026</span></div>
        <p>Panimalar Engineering College, Anna University</p>
      </section>

      <section className="resume-sec">
        <h2>Recognition</h2>
        <ul>
          <li>IIC Regional Meet 2025 (AICTE): selected.</li>
          <li>Pitchathon, VIT Chennai: finalist.</li>
          <li>College ideathon: 9th place.</li>
        </ul>
      </section>
    </main>
  );
}
