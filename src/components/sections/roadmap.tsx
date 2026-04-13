"use client";

/* eslint-disable @next/next/no-img-element */

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function Roadmap() {
  const { content } = usePortfolioContent();
  const { theme } = useTheme();
  const roadmap = content.roadmap;
  const isDark = theme === "dark";

  return (
    <PageSection id="roadmap" tone="muted">
      <Container>
        <SectionHeading
          animate
          eyebrow={roadmap.eyebrow}
          title={roadmap.title}
          description={roadmap.description}
        />

        <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {roadmap.items.map((item, index) => (
            <li key={item.phase + item.title}>
              <FeatureCard className="h-full" animate delayMs={index * 90}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt/95">
                  {item.phase}
                </p>
                <h3 className={cn("mt-3 text-xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
                  {item.title}
                </h3>
                <p className={cn("mt-3 text-sm leading-relaxed", isDark ? "text-steel/90" : "text-slate-600")}>
                  {item.description}
                </p>

                <div
                  className={cn(
                    "mt-5 overflow-hidden rounded-xl border",
                    isDark ? "border-white/10 bg-ink/70" : "border-slate-300 bg-slate-100/70",
                  )}
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title + " app preview"}
                      className="h-44 w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={cn(
                        "flex h-44 items-center justify-center text-center text-xs font-semibold uppercase tracking-wide",
                        isDark ? "text-steel/70" : "text-slate-500",
                      )}
                    >
                      Add image URL in Admin to show app photo
                    </div>
                  )}
                </div>
              </FeatureCard>
            </li>
          ))}
        </ol>
      </Container>
    </PageSection>
  );
}
