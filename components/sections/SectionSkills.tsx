import { SectionHead } from "@/components/ui/SectionHead";

const CORE = [
  { k: "Backend", v: "Java / Spring Boot" },
  { k: "Backend", v: "ASP.NET Core" },
  { k: "Backend", v: "Node.js / Express" },
  { k: "Data", v: "SQL Server + MongoDB" },
  { k: "Frontend", v: "React / Next.js" },
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
        <ul className="core rise">
          {CORE.map((c) => (
            <li key={c.v}><div><span>{c.k}</span>{c.v}</div></li>
          ))}
        </ul>
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
