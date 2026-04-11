"use client";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { Container } from "@/components/ui/container";
import { PageSection } from "@/components/ui/page-section";

export function TrustStrip() {
  const { content } = usePortfolioContent();
  const trustStrip = content.trustStrip;

  return (
    <PageSection
      ariaLabel="Trust strip"
      tone="muted"
      spacing="compact"
      className="bg-white/[0.025]"
    >
      <Container>
        <p className="motion-fade-up text-center text-sm font-medium text-steel/90 sm:text-base">
          {trustStrip.message}
        </p>

        <ul className="mt-6 grid gap-3 text-center sm:grid-cols-2 lg:grid-cols-4">
          {trustStrip.marks.map((item) => (
            <li
              key={item}
              className="motion-fade-up rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-steel/90 transition duration-300 hover:-translate-y-0.5 hover:border-cobalt/40 hover:bg-white/[0.07]"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </PageSection>
  );
}
