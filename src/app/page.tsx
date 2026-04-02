import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <LoadingScreen>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </LoadingScreen>
  );
}
