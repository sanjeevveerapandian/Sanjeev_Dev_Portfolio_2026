# Sanjeev Veerapandian | Developer Portfolio

Personal portfolio of Sanjeev Veerapandian, a full-stack engineer in Chennai, India, open to SDE-1 and Full-Stack roles.

**Live site:** https://sanjeevveerapandian.github.io/Sanjeev_Dev_Portfolio_2026/

It is a static Next.js site, deployed to GitHub Pages. It is dark only, works from 360px to 1920px wide, and stays readable without JavaScript.

## What is on the site

- **Hero:** a `git log` style terminal of recent work, a stack summary, and an evidence strip of real numbers.
- **Working terminal:** type `help`, `whoami`, `projects`, `stack`, `oss`, `contact`, `resume`, `goto <section>` or `clear` under the log.
- **Command menu:** press `Ctrl K` (or `Cmd K`) to jump to a section or open a link.
- **About, Experience, Projects, Skills, Contact:** a bento About, an experience timeline whose rail fills as you scroll, a project explorer, and a skills grid with the core stack highlighted.
- **Project explorer:** every project has a problem, architecture, outcome and stack. Some have an inline SVG architecture diagram. It is built with radio inputs and CSS, so it works without JavaScript and with the arrow keys.
- **Resume page:** `/resume/` is a readable, printable version with its own print styles. The PDF link is separate.
- **Polish:** a custom 404 page, a favicon, Open Graph and Twitter images, and a skip link.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 14.1.4 (App Router, `output: 'export'`) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 plus a hand-written design system in `app/globals.css` |
| Fonts | Hanken Grotesk and JetBrains Mono through `next/font/google` |
| Icons | `lucide-react` |
| Theme | `next-themes`, forced to dark |
| Hosting | GitHub Pages, deployed by GitHub Actions |

There are no runtime dependencies beyond React, Next.js, `next-themes` and `lucide-react`. There is no 3D library and no animation library. Motion is CSS and small `requestAnimationFrame` handlers that only change `transform` and `opacity`.

## Getting started

You need Node.js 18.17 or newer. CI uses Node 20.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build, exported to `out/` |
| `npm run lint` | ESLint through `next lint` |
| `npm run clean` | Delete `.next` and the build cache |

> **Do not run `npm run build` while `npm run dev` is running.** Both write to `.next`, and the dev server will then serve an unstyled page. Stop the dev server, run `npm run clean`, and start it again.

## Project structure

```
app/
  layout.tsx              fonts, metadata, theme provider
  page.tsx                the home page
  resume/page.tsx         the printable resume page
  not-found.tsx           the 404 page
  globals.css             design tokens, layout and component styles
  icon.svg                favicon
  opengraph-image.png     social preview image
components/
  sections/               Hero, About, Experience, Projects, Skills, Contact
  ui/                     Navbar, TerminalPrompt, CommandPalette, ArchDiagram,
                          TimelineRail, ScrollProgress, CursorSpotlight, and more
hooks/useScrollSpy.ts     highlights the current section in the nav
lib/constants.ts          links and URLs
.github/workflows/        GitHub Pages deployment
```

## Editing the content

- **Links and URLs** (resume PDF, GitHub, LinkedIn, LeetCode, live projects): `lib/constants.ts`. The resume PDF link lives only there, as `RESUME_URL`.
- **Projects:** the `PROJECTS` array in `components/sections/SectionProjects.tsx`. Add a `live` or `code` URL and the buttons appear. Add a `diagram` with layers to show an architecture diagram.
- **Experience:** the `EXP` array in `components/sections/SectionExperience.tsx`.
- **Skills:** the `GROUPS` array in `components/sections/SectionSkills.tsx`. Items marked `core: true` are highlighted.
- **Resume page text:** `app/resume/page.tsx`. It is typed by hand, so it does not change when `RESUME_URL` changes. Update it when your resume changes.

Section ids (`hero`, `about`, `experience`, `projects`, `skills`, `contact`) are used by the nav and scroll spy, so keep them.

## Design notes

- **Dark only.** `app/layout.tsx` sets the theme to dark and ignores any saved choice. The light tokens still exist in `app/globals.css` (the `.light` class), so a toggle can come back later. The comment in `layout.tsx` says what to restore.
- **Never blank.** Entrance animations use CSS scroll-driven animation only where the browser supports it. Everywhere else, content is simply visible. There is no IntersectionObserver reveal.
- **Reduced motion.** `prefers-reduced-motion` turns animation off, and the page stays fully readable.
- **Accessibility.** Visible focus rings, a skip link, 44px touch targets, labelled controls, and keyboard support for the terminal, command menu and project explorer.

## Deployment

Every push to `main` runs `.github/workflows/nextjs.yml`. It runs `npm ci` and `next build`, then publishes `out/` to GitHub Pages. The workflow adds the repository sub-path automatically, so the site works under `https://<user>.github.io/<repo>/`.

Keep `package-lock.json` in sync with `package.json`. After adding or removing a dependency, run `npm install` and commit both files, because the deploy uses `npm ci`.

If you rename the repo, the live URL changes and the old Pages URL stops working. Re-run the deploy after renaming. Then set `SITE_URL` in `lib/constants.ts` (or the `NEXT_PUBLIC_SITE_URL` environment variable) to the new address so Open Graph URLs are correct.

## Performance

The home page ships about 98 kB of First Load JS. Heavy features were avoided on purpose: no 3D scene, no animation library, and system fallbacks for fonts.

## License

All rights reserved. This is a personal portfolio, not a template.
