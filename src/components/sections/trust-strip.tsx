"use client";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { Container } from "@/components/ui/container";
import { PageSection } from "@/components/ui/page-section";

export function TrustStrip() {
  const { content } = usePortfolioContent();
  const trustStrip = content.trustStrip;
  const brandItems = content.featuredProjects.items.map((project) => project.name);
  const marqueeItems = brandItems.length > 0 ? brandItems : trustStrip.marks;

  return (
    <PageSection
      ariaLabel="Trust strip"
      tone="muted"
      spacing="compact"
      className="bg-white/[0.025] py-8 md:py-10"
    >
      <Container>
        <div className="trust-ribbon-shell" aria-hidden>
          <span className="trust-ribbon-lane trust-ribbon-lane-a" />
          <span className="trust-ribbon-lane trust-ribbon-lane-b" />
        </div>

        <p className="mt-6 text-center text-sm font-medium text-steel/90 sm:text-base">
          {trustStrip.message}
        </p>

        <div className="trust-marquee mt-6" aria-label="Featured brands and products">
          <div className="trust-marquee-track">
            <ul className="trust-marquee-group">
              {marqueeItems.map((item) => (
                <li key={item} className="trust-marquee-pill">
                  {item}
                </li>
              ))}
            </ul>

            <ul className="trust-marquee-group" aria-hidden>
              {marqueeItems.map((item, index) => (
                <li key={`${item}-${index}`} className="trust-marquee-pill">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </PageSection>
  );
}
