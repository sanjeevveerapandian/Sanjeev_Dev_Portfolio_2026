"use client";
import dynamic from "next/dynamic";
import { useReveal } from "@/hooks/useReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const Marquee = dynamic(() => import("react-fast-marquee").then((m) => m.default), {
  ssr: false,
  loading: () => <div className="h-10 w-full" aria-hidden />,
});

const CATS = [
  { label:"Languages",    items:["JavaScript","TypeScript","Java","C#","Python","Dart","HTML/CSS"] },
  { label:"Backend",      items:["Node.js","Express.js",".NET","FastAPI","REST APIs","WebSockets","JWT Auth"] },
  { label:"Frontend",     items:["React.js","Next.js 14","Angular","React Native","Tailwind CSS","Framer Motion"] },
  { label:"Databases",    items:["MongoDB","MS SQL Server","PostgreSQL","Firebase RTDB","Firestore"] },
  { label:"Cloud & DevOps",items:["Azure","Firebase","Vercel","Git","GitHub Actions","Linux"] },
  { label:"Concepts",     items:["Clean Architecture","System Design","Homomorphic Encryption","IoT Networking","LLM Integration","Agile"] },
];

const MARQUEE = ["React.js","Next.js","TypeScript","Java","Node.js","Angular",".NET/C#","MongoDB","PostgreSQL","Azure","Docker","Git","Python","React Native","Tailwind CSS","Firebase","REST APIs","WebSockets","LLM Integration","Clean Architecture","FastAPI","JWT Auth","System Design"];

export default function SectionSkills() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="skills" ref={ref} className="section-stack reveal">
      <SectionLabel>Skills</SectionLabel>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--bdr)", borderRadius: 12, overflow: "hidden", border: "1px solid var(--bdr)", marginBottom: 24 }} className="max-sm:grid-cols-1 max-md:grid-cols-2">
        {CATS.map((cat) => (
          <div
            key={cat.label}
            className="bg-surface p-4 transition-colors duration-200 sm:p-[22px]"
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--elevated)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface)"; }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--ink-3)", marginBottom: 14 }}>
              {cat.label}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {cat.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500,
                    padding: "4px 10px", borderRadius: 9999,
                    border: "1px solid var(--bdr)", color: "var(--ink-2)", background: "var(--canvas)",
                    cursor: "default", transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.color = "var(--blue)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bdr)"; e.currentTarget.style.color = "var(--ink-2)"; }}
                >{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: "relative", overflow: "hidden" }} aria-hidden>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-14 md:w-20"
          style={{ background: "linear-gradient(to right, var(--canvas), transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-14 md:w-20"
          style={{ background: "linear-gradient(to left, var(--canvas), transparent)" }}
        />
        <Marquee gradient={false} speed={32} pauseOnHover className="py-1">
          {MARQUEE.map((s) => (
            <span key={s} style={{
              margin: "0 8px", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--ink-3)", border: "1px solid var(--bdr)",
              padding: "6px 14px", borderRadius: 9999, background: "var(--surface)",
              cursor: "default", transition: "border-color 0.2s, color 0.2s", whiteSpace: "nowrap",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.color = "var(--blue)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bdr)"; e.currentTarget.style.color = "var(--ink-3)"; }}
            >{s}</span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
