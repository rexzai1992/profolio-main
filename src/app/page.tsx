import { Footer } from "@/components/layout/footer";
import { AppVisualizer } from "@/components/sections/app-visualizer";
import { Contact } from "@/components/sections/contact";
import { ExperienceSnapshot } from "@/components/sections/experience-snapshot";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Problems } from "@/components/sections/problems";
import { Process } from "@/components/sections/process";
import { Roadmap } from "@/components/sections/roadmap";
import { Services } from "@/components/sections/services";
import { TrustStrip } from "@/components/sections/trust-strip";
import { WhyWorkWithMe } from "@/components/sections/why-work-with-me";

export default function Home() {
  return (
    <>
      <main id="content">
        <Hero />
        <TrustStrip />
        <Services />
        <Problems />
        <FeaturedProjects />
        <AppVisualizer />
        <Roadmap />
        <ExperienceSnapshot />
        <WhyWorkWithMe />
        <Pricing />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
