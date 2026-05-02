"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ margin: 0, fontFamily: "system-ui,sans-serif", background: "#030201", color: "#fffbf5", minHeight: "100dvh" }}>
        <div style={{ margin: "2rem auto", maxWidth: 480, padding: 24 }}>
          <h1 style={{ fontSize: "1.25rem", marginBottom: 12 }}>Something went wrong</h1>
          <p style={{ opacity: 0.85, marginBottom: 20, fontSize: 14 }}>{error.message}</p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              border: "none",
              background: "#f59e0b",
              color: "#111",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
