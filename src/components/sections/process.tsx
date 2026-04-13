"use client";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function Process() {
  const { content } = usePortfolioContent();
  const { theme } = useTheme();
  const process = content.process;
  const isDark = theme === "dark";

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
                <h3 className={cn("mt-3 text-xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
                  {item.title}
                </h3>
                <p className={cn("mt-3 text-sm leading-relaxed", isDark ? "text-steel/90" : "text-slate-600")}>
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
