import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SITE_URL } from "@/lib/constants";

const fontDisplay = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#0a0908",
};

const TITLE = "Sanjeev Veerapandian | Full-Stack Engineer";
const DESCRIPTION =
  "Full-stack engineer in Chennai, open to SDE-1 and Full-Stack roles. React, Node.js, ASP.NET Core and SQL Server. Two merged open source PRs and a live production site.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["Full Stack Developer", "SDE-1", "React", "Next.js", "Node.js", "ASP.NET Core", "Chennai", "Sanjeev Veerapandian"],
  authors: [{ name: "Sanjeev Veerapandian" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_IN",
    siteName: "Sanjeev Veerapandian",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

/* Dark unless the visitor explicitly chose light with the toggle. Runs before first paint. */
const THEME_STORAGE_SCRIPT = `(function(){var r=document.documentElement;try{if(localStorage.getItem('sv-portfolio-theme-v2')==='light'){r.classList.remove('dark');r.classList.add('light');return;}}catch(e){}r.classList.remove('light');r.classList.add('dark');})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_STORAGE_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["light", "dark"]}
          enableSystem={false}
          enableColorScheme={false}
          storageKey="sv-portfolio-theme-v2"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
