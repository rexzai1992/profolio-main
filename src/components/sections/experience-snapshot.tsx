"use client";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";

export function ExperienceSnapshot() {
  const { content } = usePortfolioContent();
  const experience = content.experience;

  return (
    <PageSection id="experience" tone="muted">
      <Container>
        <SectionHeading
          animate
          eyebrow={experience.eyebrow}
          title={experience.title}
          description={experience.description}
        />

        <div className="mt-10 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-3">
            {experience.metrics.map((metric, index) => (
              <FeatureCard key={metric.label} animate delayMs={index * 90}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt">
                  {metric.label}
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-steel/85">{metric.context}</p>
              </FeatureCard>
            ))}
          </div>

          <FeatureCard animate delayMs={180}>
            <h3 className="text-xl font-semibold text-white">{experience.focusTitle}</h3>
            <ul className="mt-5 space-y-4">
              {experience.focuses.map((item) => (
                <li key={item.title}>
                  <p className="text-sm font-semibold text-cobalt/95">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-steel/90">
                    {item.details}
                  </p>
                </li>
              ))}
            </ul>
          </FeatureCard>
        </div>
      </Container>
    </PageSection>
  );
}
