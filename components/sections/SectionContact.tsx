import { Code2, Github, Linkedin } from "lucide-react";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { SectionHead } from "@/components/ui/SectionHead";
import { EMAIL, GITHUB_URL, LEETCODE_URL, LINKEDIN_URL, RESUME_URL } from "@/lib/constants";

export default function SectionContact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <SectionHead index="06" label="Contact" title={<>Hiring for <em>SDE-1</em>?</>} />
        <div className="card contact rise">
          <h2>Let&apos;s <em>talk</em>.</h2>
          <p>I&apos;m open to SDE-1 and Full-Stack roles. Email is the fastest way to reach me. I&apos;m based in Chennai, India.</p>
          <a href={`mailto:${EMAIL}`} className="contact-mail">{EMAIL}</a>
          <div className="contact-links">
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("SDE-1 opportunity")}`} className="btn btn--primary">Email me</a>
            <CopyEmail />
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn">Resume ↗</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn"><Linkedin size={16} aria-hidden /> LinkedIn</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn"><Github size={16} aria-hidden /> GitHub</a>
            <a href={LEETCODE_URL} target="_blank" rel="noopener noreferrer" className="btn"><Code2 size={16} aria-hidden /> LeetCode</a>
          </div>
        </div>
      </div>
    </section>
  );
}
