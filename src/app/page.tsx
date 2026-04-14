import { Footer } from "@/components/layout/footer";
import {
  DeferredContact,
  DeferredFeaturedProjects,
  DeferredProblems,
  DeferredPricing,
  DeferredServices,
} from "@/components/sections/deferred-sections";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <main id="content">
        <Hero prioritizeMediaLoad />
        <DeferredServices />
        <DeferredProblems />
        <DeferredFeaturedProjects />
        <DeferredPricing />
        <DeferredContact />
      </main>
      <Footer />
    </>
  );
}
