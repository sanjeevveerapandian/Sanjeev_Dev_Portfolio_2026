"use client";
import { useReveal } from "@/hooks/useReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const INTERESTS = [
  "Distributed Systems","Clean Architecture","REST & WebSocket APIs",
  "IoT Networking","LLM Integration","Security Engineering",
  "Cloud (Azure)","Mobile Dev","Open Source",
];
const LANGS = [
  { name: "Tamil",   level: "Native" },
  { name: "English", level: "Professional" },
  { name: "Hindi",   level: "Professional" },
  { name: "German",  level: "Beginner" },
];

export default function SectionAbout() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="about" ref={ref} className="section-stack reveal">
      <SectionLabel>About</SectionLabel>

      <div
        style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", alignItems: "start" }}
        className="max-lg:grid-cols-1 gap-[clamp(2rem,5vw,4rem)]"
      >
        {/* Left: prose */}
        <div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, fontFamily: "var(--font-body)", fontSize: "clamp(14px, 2.6vw, 16px)", color: "var(--ink-2)", lineHeight: 1.85, marginBottom: 32 }}>
  <p>
    I build full-stack software that ships and scales. My work spans{" "}
    <strong style={{ color: "var(--ink-1)", fontWeight: 500 }}>Node.js</strong>,{" "}
    <strong style={{ color: "var(--ink-1)", fontWeight: 500 }}>ASP.NET Core</strong>, and{" "}
    <strong style={{ color: "var(--ink-1)", fontWeight: 500 }}>React.js</strong>{" "}
    — across startups, enterprise clients, and independent projects.
  </p>
  <p>
    I think in systems before I write a single line. Whether it&apos;s designing REST API
    contracts, optimising MongoDB query pipelines, or locking down authentication middleware
    — I approach every problem from an architecture-first perspective, not just a
    &ldquo;make it work&rdquo; one.
  </p>
  <p>
    Outside of professional work, I&apos;ve engineered IoT systems with LoRa mesh networks,
    explored homomorphic encryption for privacy-preserving medical AI, and built
    AI-powered tools that solve real problems. I&apos;m always working on something.
  </p>
</div>

          <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 14 }}>
            Areas of interest
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {INTERESTS.map((i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 11,
                  padding: "5px 12px", borderRadius: 9999,
                  border: "1px solid var(--bdr)", color: "var(--ink-2)",
                  background: "var(--surface)", cursor: "default",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.color = "var(--blue)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bdr)"; e.currentTarget.style.color = "var(--ink-2)"; }}
              >{i}</span>
            ))}
          </div>
        </div>

        {/* Right: languages + recognition */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ padding: "clamp(18px,4vw,24px)", borderRadius: 12, border: "1px solid var(--bdr)", background: "var(--surface)" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 16 }}>
              Languages
            </p>
            <div className="flex flex-col">
              {LANGS.map(({ name, level }) => (
                <div
                  key={name}
                  className="flex flex-col gap-1 border-b border-[color:var(--bdr)] py-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "var(--ink-1)" }}>{name}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", textAlign: "right" }} className="max-sm:text-left">{level}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "clamp(18px,4vw,24px)", borderRadius: 12, border: "1px solid var(--bdr)", background: "var(--surface)" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 16 }}>
              Recognition
            </p>
            {[
              "College Ideathon (inter-college innovation) — 9th place",
              "IIC Regional Meet 2025 by AICTE. — Selected",
              "24-Hour Hackathon (VIT Chennai) — Made Top 10",
            ].map((a) => (
              <div key={a} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                <span style={{ color: "var(--blue)", fontSize: 8, marginTop: 5 }}>◆</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.6 }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
