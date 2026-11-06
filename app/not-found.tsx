import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404 | Sanjeev Veerapandian",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <div className="page-bg" aria-hidden="true" />
      <main id="main-content" className="nf">
        <div className="nf-box">
          <p className="nf-code" aria-hidden="true">404</p>
          <h1>This page does not exist.</h1>
          <p>The link may be old, or the address may have a typo.</p>
          <p className="term-cmd mono" style={{ fontSize: 13 }}>
            <span style={{ color: "var(--accent)" }}>$</span> git checkout main
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn--primary">
              <ArrowLeft size={16} aria-hidden /> Back to the portfolio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
