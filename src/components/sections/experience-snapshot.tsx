"use client";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function ExperienceSnapshot() {
  const { content } = usePortfolioContent();
  const { theme } = useTheme();
  const experience = content.experience;
  const isDark = theme === "dark";

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
                <p className={cn("mt-3 text-3xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
                  {metric.value}
                </p>
                <p className={cn("mt-3 text-sm leading-relaxed", isDark ? "text-steel/85" : "text-slate-600")}>
                  {metric.context}
                </p>
              </FeatureCard>
            ))}
          </div>

          <FeatureCard animate delayMs={180}>
            <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
              {experience.focusTitle}
            </h3>
            <ul className="mt-5 space-y-4">
              {experience.focuses.map((item) => (
                <li key={item.title}>
                  <p className="text-sm font-semibold text-cobalt/95">{item.title}</p>
                  <p className={cn("mt-1 text-sm leading-relaxed", isDark ? "text-steel/90" : "text-slate-600")}>
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
