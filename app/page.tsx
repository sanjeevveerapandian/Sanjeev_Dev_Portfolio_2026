import { Github, Linkedin } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import SectionHero from "@/components/sections/SectionHero";
import SectionAbout from "@/components/sections/SectionAbout";
import SectionExperience from "@/components/sections/SectionExperience";
import SectionProjects from "@/components/sections/SectionProjects";
import SectionSkills from "@/components/sections/SectionSkills";
import SectionContact from "@/components/sections/SectionContact";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <div className="page-bg" aria-hidden="true" />
      <CursorSpotlight />
      <ScrollProgress />
      <Navbar />
      <CommandPalette />
      <main id="main-content">
        <SectionHero />
        <SectionAbout />
        <SectionExperience />
        <SectionProjects />
        <SectionSkills />
        <SectionContact />
      </main>
      <footer className="footer">
        <div className="wrap footer-in">
          <p>© 2026 Sanjeev Veerapandian. Built with Next.js.</p>
          <div className="footer-links">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} aria-hidden /></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} aria-hidden /></a>
          </div>
        </div>
      </footer>
    </>
  );
}
