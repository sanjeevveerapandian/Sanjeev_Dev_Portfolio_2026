import { SectionHead } from "@/components/ui/SectionHead";

const CORE = [
  { k: "Frontend", v: "React / Next.js" },
  { k: "Backend", v: "Node.js / Express" },
  { k: "Backend", v: "ASP.NET Core" },
  { k: "Database", v: "SQL Server" },
];

const GROUPS = [
  { label: "Languages", items: ["C#", "Java", "JavaScript", "TypeScript", "Python", "SQL", "PHP"] },
  { label: "Backend", items: ["ASP.NET Core", "EF Core", "Node.js", "Express", "Spring Boot", "Laravel", "FastAPI"] },
  { label: "Frontend", items: ["React", "Next.js", "Angular", "Tailwind CSS", "Flutter"] },
  { label: "Data", items: ["MS SQL Server", "MySQL", "MongoDB", "Firebase"] },
  { label: "Cloud and tooling", items: ["Azure", "Docker", "Git", "GitHub Actions", "Postman"] },
  { label: "Practices", items: ["Clean Architecture", "SOLID", "JWT / RBAC", "REST API design", "Agile"] },
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
