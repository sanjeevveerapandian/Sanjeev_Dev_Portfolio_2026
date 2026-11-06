import { ArrowDown, ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { TerminalPrompt } from "@/components/ui/TerminalPrompt";
import { LIVE_SITE_URL, OSS_REPO_URL, RESUME_URL } from "@/lib/constants";

/* Every row below traces to the verified facts. */
const LOG: { when: string; kind: "merged" | "live" | "ship" | "now"; body: React.ReactNode }[] = [
  {
    when: "Nov 6, 2026",
    kind: "merged",
    body: (
      <>
        <span className="ok">merged</span>{" "}
        <a href={`${OSS_REPO_URL}/pull/42`} target="_blank" rel="noopener noreferrer">EventSapiens #42</a>
        <span className="sub">stop validate and build from archiving and deleting event files</span>
      </>
    ),
  },
  {
    when: "Nov 3, 2026",
    kind: "merged",
    body: (
      <>
        <span className="ok">merged</span>{" "}
        <a href={`${OSS_REPO_URL}/pull/40`} target="_blank" rel="noopener noreferrer">EventSapiens #40</a>
        <span className="sub">redeploy the site after the archive workflow commits to main</span>
      </>
    ),
  },
  {
    when: "Aug 2026",
    kind: "ship",
    body: (
      <>
        <em>shipped</em> ParkEase
        <span className="sub">ASP.NET Core, React, SQL Server. Built solo.</span>
      </>
    ),
  },
  {
    when: "In production",
    kind: "live",
    body: (
      <>
        <span className="ok">live</span>{" "}
        <a href={LIVE_SITE_URL} target="_blank" rel="noopener noreferrer">msschennai.in</a>
        <span className="sub">finance and billing platform</span>
      </>
    ),
  },
  {
    when: "Now",
    kind: "now",
    body: (
      <>
        <em>building</em> a stock exchange matching engine in Java
        <span className="sub">phase by phase, with tests</span>
        <span className="cursor" aria-hidden />
      </>
    ),
  },
];

const EVIDENCE = [
  { num: "~8,000", label: "monthly users on the live ticketing platform I built APIs for", src: "TakeMyTickets" },
  { num: "~60", unit: "%", label: "lower production API latency after tuning MongoDB aggregations", src: "Ogrelix Solutions" },
  { num: "10", unit: "+", label: "REST endpoints built in ASP.NET Core with EF Core", src: "Kanini Software" },
  { num: "2", label: "pull requests merged into an open source events site", src: "EventSapiens", href: `${OSS_REPO_URL}/pulls?q=is%3Apr+author%3Asanjeevveerapandian` },
  { num: "1", label: "live production site, used for finance and billing", src: "msschennai.in ↗", href: LIVE_SITE_URL },
];

export default function SectionHero() {
  return (
    <section id="hero" className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div style={{ minWidth: 0 }}>
            <p className="pill fade-in" data-status="live" style={{ marginBottom: 26 }}>
              Open to SDE-1 and Full-Stack roles
            </p>
            <h1 className="hero-name">
              <span className="line"><span>Sanjeev</span></span>
              <span className="line"><span>Veerapandian</span></span>
            </h1>
            <p className="hero-pitch fade-in d1">
              Full-stack engineer. I build <strong>APIs</strong> and the <strong>interfaces</strong> on top of them with React, Node.js, ASP.NET Core and SQL Server.
            </p>
            <p className="hero-meta fade-in d2">Chennai, India. B.E. Computer Science, Anna University, 2022 to 2026.</p>
            <p className="hero-tip fade-in d2" aria-hidden="true">Tip: press <kbd>Ctrl</kbd> <kbd>K</kbd> for the command menu, or type <kbd>help</kbd> in the terminal.</p>
            <div className="hero-cta fade-in d3">
              <Magnetic>
                <a href="#projects" className="btn btn--primary">
                  See the work <ArrowRight size={16} aria-hidden />
                </a>
              </Magnetic>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn">
                Resume <ArrowDown size={16} aria-hidden />
              </a>
            </div>
          </div>

          <figure className="term fade-in d2" aria-label="Recent work log">
            <div className="term-bar">
              <i /><i /><i />
              <b>sanjeev@chennai: ~/work</b>
            </div>
            <div className="term-body">
              <p className="term-cmd"><span className="p">$</span> git log --graph --recent</p>
              <ol className="term-log">
                {LOG.map((row, i) => (
                  <li key={row.when} className="term-row" data-kind={row.kind} style={{ "--i": i } as React.CSSProperties}>
                    <span>
                      <span className="term-when">{row.when}</span>
                      <span className="term-what">{row.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <TerminalPrompt />
            </div>
          </figure>
        </div>

        <ul className="evidence fade-in d3" aria-label="Results at a glance">
          {EVIDENCE.map((e) => (
            <li key={e.src} className="ev">
              <span className="ev-num">{e.num}{e.unit && <small>{e.unit}</small>}</span>
              <span className="ev-label">{e.label}</span>
              {e.href ? (
                <a className="ev-src" href={e.href} target="_blank" rel="noopener noreferrer">{e.src}</a>
              ) : (
                <span className="ev-src">{e.src}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
