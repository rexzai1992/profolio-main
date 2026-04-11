"use client";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";

export function Problems() {
  const { content } = usePortfolioContent();
  const problems = content.problems;

  return (
    <PageSection id="problems" tone="muted">
      <Container>
        <SectionHeading
          animate
          eyebrow={problems.eyebrow}
          title={problems.title}
          description={problems.description}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {problems.items.map((problem, index) => (
            <FeatureCard key={problem.title} animate delayMs={index * 90}>
              <h3 className="text-xl font-semibold text-white">{problem.title}</h3>

              <div className="mt-4 rounded-xl border border-white/10 bg-ink/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt">
                  Current pain
                </p>
                <p className="mt-2 text-sm leading-relaxed text-steel/90">{problem.pain}</p>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt">
                  What I build
                </p>
                <p className="mt-2 text-sm leading-relaxed text-steel/90">
                  {problem.solution}
                </p>
              </div>
            </FeatureCard>
          ))}
        </div>
      </Container>
    </PageSection>
  );
}
