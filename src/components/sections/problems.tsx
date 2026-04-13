"use client";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function Problems() {
  const { content } = usePortfolioContent();
  const { theme } = useTheme();
  const problems = content.problems;
  const isDark = theme === "dark";

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
              <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
                {problem.title}
              </h3>

              <div
                className={cn(
                  "mt-4 rounded-xl border p-4",
                  isDark ? "border-white/10 bg-ink/60" : "border-slate-300 bg-slate-100/70",
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt">
                  Current pain
                </p>
                <p className={cn("mt-2 text-sm leading-relaxed", isDark ? "text-steel/90" : "text-slate-600")}>
                  {problem.pain}
                </p>
              </div>

              <div
                className={cn(
                  "mt-4 rounded-xl border p-4",
                  isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-300 bg-white",
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt">
                  What I build
                </p>
                <p className={cn("mt-2 text-sm leading-relaxed", isDark ? "text-steel/90" : "text-slate-600")}>
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
