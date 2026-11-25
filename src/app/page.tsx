import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Lab from "@/components/Lab";
import Assistant from "@/components/Assistant";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import { Cursor, ScrollProgress, SmoothScroll } from "@/components/Interactive";

export default function Home() {
  return (
    <>
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:px-4 focus:py-2"
        style={{ background: "var(--accent)", color: "var(--on-accent)" }}
      >
        Skip to projects
      </a>
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <CommandPalette />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <Lab />
        <Assistant />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
