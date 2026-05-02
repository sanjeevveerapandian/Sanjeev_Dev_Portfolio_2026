"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      role="alert"
      style={{
        margin: "2rem auto",
        maxWidth: 480,
        padding: 24,
        fontFamily: "system-ui,sans-serif",
        background: "var(--surface, #0f0c09)",
        color: "var(--ink-1, #fffbf5)",
        border: "1px solid var(--bdr-strong, rgba(251,191,36,0.3))",
        borderRadius: 12,
      }}
    >
      <h1 style={{ fontSize: "1.25rem", marginBottom: 12 }}>Something went wrong</h1>
      <p style={{ opacity: 0.85, marginBottom: 20, fontSize: 14 }}>{error.message}</p>
      <button
        type="button"
        onClick={reset}
        style={{
          padding: "10px 18px",
          borderRadius: 8,
          border: "none",
          background: "var(--blue, #f59e0b)",
          color: "#111",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
