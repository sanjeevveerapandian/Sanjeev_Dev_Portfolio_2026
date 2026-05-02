export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-[clamp(1.75rem,4vw,2.5rem)] gap-4 max-sm:gap-3"
      style={{ display: "flex", alignItems: "center" }}
    >
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue)", whiteSpace: "nowrap" }}>
        {children}
      </span>
      <span style={{ flex: 1, height: 1, background: "var(--bdr)" }} />
    </div>
  );
}
