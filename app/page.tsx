"use client";
import Navbar from "@/components/ui/Navbar";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import SectionHero from "@/components/sections/SectionHero";
import SectionAbout from "@/components/sections/SectionAbout";
import SectionExperience from "@/components/sections/SectionExperience";
import SectionProjects from "@/components/sections/SectionProjects";
import SectionSkills from "@/components/sections/SectionSkills";
import SectionContact from "@/components/sections/SectionContact";
import { Github, Linkedin, Twitter, Code2 } from "lucide-react";

const SECTION_IDS = ["hero","about","experience","projects","skills","contact"];

const SOCIALS = [
  { icon: Github,   href: "https://github.com/sanjeevveerapandian",                      label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sanjeev-veerapandian-43692a243/", label: "LinkedIn" },
  { icon: Twitter,  href: "https://x.com/Sanjeev_004",                                   label: "X" },
  { icon: Code2,    href: "https://leetcode.com/u/sanjeevveerapandian/",                  label: "LeetCode" },
];

export default function Home() {
  const active = useScrollSpy(SECTION_IDS);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        minHeight: "100vh",
      }}
    >
      <CursorSpotlight />
      <Navbar active={active} />

      <main
        id="main-content"
        className="relative z-[1] mx-auto w-full max-w-[1160px] px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 md:px-8 lg:max-w-[1180px]"
      >
        <SectionHero />
        <SectionAbout />
        <SectionExperience />
        <SectionProjects />
        <SectionSkills />
        <SectionContact />

        {/* Footer */}
        <footer
          className="flex flex-col gap-6 pt-7 pb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          style={{ borderTop: "1px solid var(--bdr)" }}
        >
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.04em" }}>
            © 2026 Sanjeev Veerapandian · Built with Next.js
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-[18px]">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-lg sm:min-h-0 sm:min-w-0 sm:p-1"
                style={{ color: "var(--ink-3)", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--blue)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink-3)"; }}
              >
                <Icon size={17} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
