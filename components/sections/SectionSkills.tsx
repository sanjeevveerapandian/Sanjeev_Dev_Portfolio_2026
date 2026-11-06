import { SectionHead } from "@/components/ui/SectionHead";

const CORE = [
  { title: "Backend", items: ["Java / Spring Boot", "ASP.NET Core", "Node.js / Express"] },
  { title: "Data", items: ["SQL Server", "MongoDB"] },
  { title: "Frontend", items: ["React / Next.js"] },
];

const GROUPS = [
  { label: "Languages", items: ["C#", "Java", "JavaScript", "TypeScript", "Python", "SQL"] },
  { label: "Backend", items: ["Java", "Spring Boot", "ASP.NET Core", "EF Core", "Node.js", "Express"] },
  { label: "Frontend", items: ["React", "Next.js", "Angular", "Tailwind CSS"] },
  { label: "Data", items: ["MS SQL Server", "MySQL", "MongoDB"] },
  { label: "Cloud and tooling", items: ["Azure", "Docker", "Git", "GitHub Actions"] },
  { label: "Practices", items: ["Clean Architecture", "SOLID", "JWT / RBAC", "REST API design"] },
];

export default function SectionSkills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <SectionHead index="05" label="Skills" title={<>The <em>core stack</em>, then the rest.</>} />
        <div className="core rise">
          {CORE.map((c) => (
            <div key={c.title} className="core-group">
              <h3>{c.title}</h3>
              <ul>
                {c.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="skill-grid">
          {GROUPS.map((g) => (
            <div key={g.label} className="card rise">
              <h3>{g.label}</h3>
              <ul className="chip-row">
                {g.items.map((i) => <li key={i} className="chip">{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
