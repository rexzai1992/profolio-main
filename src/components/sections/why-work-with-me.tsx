"use client";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function WhyWorkWithMe() {
  const { content } = usePortfolioContent();
  const { theme } = useTheme();
  const why = content.whyWorkWithMe;
  const isDark = theme === "dark";

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
              <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
                {point.title}
              </h3>
              <p className={cn("mt-3 text-sm leading-relaxed", isDark ? "text-steel/90" : "text-slate-600")}>
                {point.details}
              </p>
            </FeatureCard>
          ))}
        </div>
      </Container>
    </PageSection>
  );
}
