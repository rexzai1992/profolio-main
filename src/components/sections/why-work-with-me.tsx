"use client";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyWorkWithMe() {
  const { content } = usePortfolioContent();
  const why = content.whyWorkWithMe;

  return (
    <PageSection id="why-me">
      <Container>
        <SectionHeading
          animate
          eyebrow={why.eyebrow}
          title={why.title}
          description={why.description}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {why.items.map((point, index) => (
            <FeatureCard key={point.title} animate delayMs={index * 80}>
              <h3 className="text-xl font-semibold text-white">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-steel/90">{point.details}</p>
            </FeatureCard>
          ))}
        </div>
      </Container>
    </PageSection>
  );
}
