"use client";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  const { content } = usePortfolioContent();
  const process = content.process;

  return (
    <PageSection id="process">
      <Container>
        <SectionHeading
          animate
          eyebrow={process.eyebrow}
          title={process.title}
          description={process.description}
        />

        <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {process.steps.map((item, index) => (
            <li key={item.step}>
              <FeatureCard className="h-full" animate delayMs={index * 80}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt/95">
                  Step {item.step}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel/90">
                  {item.description}
                </p>
              </FeatureCard>
            </li>
          ))}
        </ol>
      </Container>
    </PageSection>
  );
}
