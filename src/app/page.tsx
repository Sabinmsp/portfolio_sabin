import Curtain from "@/components/Curtain";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AskMe from "@/components/AskMe";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Curtain />
      <Navbar />
      <main>
        <Hero />
        <AskMe />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
