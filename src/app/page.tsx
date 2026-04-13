import { Footer } from "@/components/layout/footer";
import {
  DeferredContact,
  DeferredFeaturedProjects,
  DeferredPricing,
} from "@/components/sections/deferred-sections";
import { Hero } from "@/components/sections/hero";
import { Problems } from "@/components/sections/problems";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <>
      <main id="content">
        <Hero />
        <Services />
        <Problems />
        <DeferredFeaturedProjects />
        <DeferredPricing />
        <DeferredContact />
      </main>
      <Footer />
    </>
  );
}
