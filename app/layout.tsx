import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SITE_URL } from "@/lib/constants";

const fontBody = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  themeColor: "#0b0f14",
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

/* The site is dark only for now. Ignores any saved light choice. To bring the toggle back, restore the localStorage check here and remove forcedTheme below. */
const THEME_STORAGE_SCRIPT = `(function(){var r=document.documentElement;r.classList.remove('light');r.classList.add('dark');})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${fontBody.variable} ${fontMono.variable}`}
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
          forcedTheme="dark"
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
