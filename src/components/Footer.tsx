import { ArrowUp, ArrowUpRight } from "lucide-react";

const explore = [
  { name: "About", href: "#about" },
  { name: "Ask me", href: "#ask" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--on-ink)" }}>
      <div className="page-container grid gap-10 pt-16 pb-10 md:grid-cols-3 md:pt-20">
        <div>
          <p className="font-display text-3xl font-bold tracking-tight">
            Sabin.
          </p>
          <p className="mt-3 text-sm opacity-70">
            AI Engineer &amp;
            <br />
            Full-Stack Developer.
          </p>
        </div>

        <div>
          <p className="text-sm opacity-60">Explore</p>
          <ul className="mt-4 flex max-w-xs flex-wrap gap-x-6 gap-y-3">
            {explore.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="font-display font-medium hover:underline"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm opacity-60">Get in touch</p>
          <a
            href="mailto:sabinmsp@gmail.com"
            className="font-display mt-4 inline-flex items-center gap-1.5 font-medium hover:underline"
          >
            sabinmsp@gmail.com
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <div className="mt-3 flex gap-5 text-sm">
            <a
              href="https://github.com/Sabinmsp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sabin-pradhan-652b333b6/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </div>
          <p className="mt-5 text-xs opacity-50">
            © {new Date().getFullYear()} Sabin Pradhan
          </p>
        </div>
      </div>

      <div className="page-container flex flex-wrap items-end justify-between gap-4 pb-12">
        <p className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
          Thanks for scrolling.
        </p>
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-sm hover:underline"
        >
          Back to top
          <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
