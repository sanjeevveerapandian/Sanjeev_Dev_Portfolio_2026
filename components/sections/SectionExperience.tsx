import { SectionHead } from "@/components/ui/SectionHead";
import { TimelineRail } from "@/components/ui/TimelineRail";

/* Facts only. Company links are left out until confirmed. TODO(sanjeev): company URLs. */
const EXP = [
  {
    when: "Feb 2026 to Sep 2026",
    company: "Kanini Software Solutions",
    role: "Product Development Intern",
    points: [
      <>Built and maintained <b>10+ REST endpoints</b> in ASP.NET Core (C#) with EF Core, LINQ and stored procedures on MS SQL Server. Validated with Postman.</>,
      <>Refactored legacy service layers to <b>Clean Architecture</b>, SOLID and dependency injection.</>,
      <>Debugged Angular-to-.NET contract mismatches.</>,
    ],
    stack: ["ASP.NET Core", "C#", "EF Core", "LINQ", "MS SQL Server", "Angular", "Postman"],
  },
  {
    when: "Jul 2025 to Dec 2025",
    company: "TakeMyTickets",
    role: "Backend Developer Intern",
    points: [
      <>Built Node.js and Express APIs with <b>JWT auth and role-based access control</b> for a live ticketing platform with about <b>8,000 monthly users</b>.</>,
      <>Shipped <b>5+ features across 6 Agile sprints</b>, with React.js integration.</>,
    ],
    stack: ["Node.js", "Express", "JWT", "RBAC", "React"],
  },
  {
    when: "Jul 2024 to Jun 2025",
    company: "Ogrelix Solutions",
    role: "Full Stack Developer (part-time)",
    points: [
      <>Tuned MongoDB aggregations with compound indexes. Cut production API latency by about <b>60%</b>.</>,
      <>Built REST APIs in Laravel (PHP) and MySQL. Shipped MERN features.</>,
      <>Wrote contracts for <b>4 third-party integrations</b> across <b>8+ releases</b>.</>,
    ],
    stack: ["MongoDB", "Laravel", "PHP", "MySQL", "MERN"],
  },
];

export default function SectionExperience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHead index="03" label="Experience" title={<>Three roles, <em>real traffic</em>.</>} />
        <TimelineRail>
          {EXP.map((e) => (
            <article key={e.company} className="card role rise">
              <div>
                <p className="role-when">{e.when}</p>
                <h3 className="role-co">{e.company}</h3>
                <p className="role-title">{e.role}</p>
              </div>
              <div>
                <ul className="role-pts">
                  {e.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
                <div className="chip-row">{e.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
              </div>
            </article>
          ))}
        </TimelineRail>
      </div>
    </section>
  );
}
