import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Documents } from "@/components/Documents";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Documents />
      <Process />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
