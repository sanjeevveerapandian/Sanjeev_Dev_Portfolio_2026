import { SectionHead } from "@/components/ui/SectionHead";

/* `core` items are highlighted. */
const GROUPS: { label: string; size?: "wide" | "full"; items: { name: string; core?: boolean }[] }[] = [
  {
    label: "Backend",
    size: "wide",
    items: [
      { name: "Java", core: true },
      { name: "Spring Boot", core: true },
      { name: "ASP.NET Core", core: true },
      { name: "Node.js", core: true },
      { name: "Express" },
      { name: "EF Core" },
    ],
  },
  {
    label: "Data",
    items: [{ name: "SQL Server", core: true }, { name: "MongoDB", core: true }, { name: "MySQL" }],
  },
  {
    label: "Frontend",
    items: [{ name: "React", core: true }, { name: "Next.js", core: true }, { name: "TypeScript" }, { name: "Angular" }, { name: "Tailwind CSS" }],
  },
  {
    label: "Languages",
    items: [{ name: "Java", core: true }, { name: "C#" }, { name: "JavaScript" }, { name: "Python" }, { name: "SQL" }],
  },
  {
    label: "Cloud and tooling",
    items: [{ name: "Azure" }, { name: "Docker" }, { name: "Git" }, { name: "GitHub Actions" }],
  },
  {
    label: "Practices",
    size: "full",
    items: [{ name: "Clean Architecture" }, { name: "SOLID" }, { name: "JWT / RBAC" }, { name: "REST API design" }],
  },
];

export default function SectionSkills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <SectionHead
          index="05"
          label="Skills"
          title={<>Skills, with the <em>core stack</em> lit up.</>}
          lede="Highlighted items are the ones I work in most."
        />
        <div className="skill-grid">
          {GROUPS.map((g) => (
            <div key={g.label} className={`card rise${g.size ? ` skill-${g.size}` : ""}`}>
              <h3>{g.label}</h3>
              <ul className="chip-row">
                {g.items.map((i) => (
                  <li key={i.name} className={`chip${i.core ? " chip--accent" : ""}`}>{i.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
