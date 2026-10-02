import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Marquee />
      <Services />
      <Process />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
