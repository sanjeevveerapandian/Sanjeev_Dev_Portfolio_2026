import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const fontDisplay = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
});

const fontBody = DM_Sans({
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
  /* Default matches primary (light) theme */
  themeColor: [
    { color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#030201" },
  ],
};

export const metadata: Metadata = {
  title: "Sanjeev Veerapandian — Full-Stack Engineer",
  description: "Full-Stack Engineer specialising in MERN, .NET/C#, Angular. Building scalable production systems from Chennai, India.",
  keywords: ["Full Stack Developer", "MERN", "React", "Node.js", ".NET", "Chennai", "Sanjeev Veerapandian"],
  authors: [{ name: "Sanjeev Veerapandian" }],
  openGraph: {
    title: "Sanjeev Veerapandian — Full-Stack Engineer",
    description: "Full-Stack Engineer · MERN, .NET/C#, Angular · Chennai, India",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanjeev Veerapandian — Full-Stack Engineer",
    description: "Full-Stack Engineer · MERN, .NET/C#, Angular · Chennai, India",
  },
  robots: { index: true, follow: true },
};

/* Sync localStorage → <html class> before paint — default light unless stored value is dark */
const THEME_STORAGE_SCRIPT = `(function(){try{var k='sv-portfolio-theme-v2';var t=localStorage.getItem(k);var r=document.documentElement;if(t==='dark'){r.classList.remove('light');r.classList.add('dark');}else{r.classList.remove('dark');r.classList.add('light');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
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
          defaultTheme="light"
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
