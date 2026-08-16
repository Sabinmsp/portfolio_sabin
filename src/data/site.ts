/** Single source of truth for identity, links and the resume file. */
export const site = {
  name: "Sabin Pradhan",
  role: "AI / Software Engineer",
  email: "sabinmsp@gmail.com",
  github: "https://github.com/Sabinmsp",
  linkedin: "https://www.linkedin.com/in/sabin-pradhan-652b333b6/",
  /** Lives in public/. The filename is what a recruiter sees on download. */
  resume: "/Sabin_Pradhan_AI_Software_Engineer_Resume.pdf",
  tagline:
    "AI and software engineer building RAG systems, LLM applications and full-stack AI products with Python, FastAPI, Next.js and TypeScript.",
} as const;

/**
 * Absolute site URL, used for canonical and Open Graph tags. Read from the
 * environment rather than hard coded, so it is correct on whatever domain
 * this is deployed to. Vercel provides the fallback automatically.
 */
export function getSiteUrl(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  return vercel ? `https://${vercel}` : undefined;
}

export const socialLinks = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
] as const;
