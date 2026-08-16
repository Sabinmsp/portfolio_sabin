import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import { site, getSiteUrl } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = getSiteUrl();
const title = `${site.name} | AI & Software Engineer`;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title,
  description: site.tagline,
  applicationName: `${site.name} portfolio`,
  authors: [{ name: site.name, url: site.github }],
  keywords: [
    "AI Engineer",
    "Applied AI Engineer",
    "LLM Engineer",
    "RAG",
    "Python",
    "FastAPI",
    "Next.js",
    "TypeScript",
    site.name,
  ],
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "profile",
    title,
    description: site.tagline,
    siteName: `${site.name} portfolio`,
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of wrong theme before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}else{document.documentElement.setAttribute("data-theme","dark");}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              jobTitle: "AI / Software Engineer",
              description: site.tagline,
              email: `mailto:${site.email}`,
              sameAs: [site.github, site.linkedin],
              knowsAbout: [
                "Retrieval augmented generation",
                "Large language model applications",
                "Python",
                "FastAPI",
                "Next.js",
                "TypeScript",
              ],
              ...(siteUrl ? { url: siteUrl } : {}),
            }),
          }}
        />
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
