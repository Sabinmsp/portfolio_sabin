import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Work, Education } from "@/components/Experience";
import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Work />
        <Capabilities />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
