import { SectionHead } from "@/components/ui/SectionHead";

export default function SectionAbout() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionHead index="02" label="About" title={<>Backend first, <em>full stack</em> when it counts.</>} />

        <div className="bento">
          <div className="card b-bio rise">
            <p>
              I&apos;m a full-stack engineer in Chennai. I&apos;ve built <strong>Node.js and Express APIs</strong> for a live ticketing platform, <strong>ASP.NET Core services</strong> on SQL Server, and <strong>React</strong> interfaces on top of them.
            </p>
            <p>
              At Ogrelix I tuned MongoDB aggregations in production. At Kanini I moved legacy service layers to Clean Architecture. I&apos;m looking for SDE-1 and Full-Stack roles at product companies.
            </p>
          </div>

          <div className="card b-edu rise">
            <h3>Education</h3>
            <p className="stat-big">B.E.</p>
            <p style={{ marginTop: 10, color: "var(--ink-2)" }}>
              Computer Science Engineering
              <br />
              Panimalar Engineering College, Anna University
              <br />
              <span className="mono" style={{ fontSize: 13, color: "var(--ink-3)" }}>2022 to 2026</span>
            </p>
          </div>

          <div className="card b-rec rise">
            <h3>Recognition</h3>
            <ul className="plain-list">
              <li><b>IIC Regional Meet 2025</b> (AICTE). Selected.</li>
              <li><b>Pitchathon, VIT Chennai.</b> Finalist.</li>
              <li><b>College ideathon.</b> 9th place.</li>
            </ul>
          </div>

          <div className="card b-now rise">
            <h3>Right now</h3>
            <ul className="plain-list">
              <li>Shipped a stock exchange matching engine in <b>Java</b>, built phase by phase, with tests. It is live.</li>
              <li>Open to <b>SDE-1</b> and <b>Full-Stack</b> roles.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
