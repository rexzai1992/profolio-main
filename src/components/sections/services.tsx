"use client";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { KeyPointList } from "@/components/ui/key-point-list";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function Services() {
  const { content } = usePortfolioContent();
  const { theme } = useTheme();
  const services = content.services;
  const isDark = theme === "dark";

  return (
    <PageSection id="services">
      <Container>
        <SectionHeading
          animate
          eyebrow={services.eyebrow}
          title={services.title}
          description={services.description}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.items.map((service, index) => (
            <FeatureCard key={service.title} animate delayMs={index * 90}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cobalt/95">
                Service {`0${index + 1}`}
              </p>
              <h3 className={cn("mt-4 text-xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
                {service.title}
              </h3>
              <p className={cn("mt-3 text-sm leading-relaxed", isDark ? "text-steel/90" : "text-slate-600")}>
                {service.summary}
              </p>

              <KeyPointList items={service.highlights} className="mt-5" />
            </FeatureCard>
          ))}
        </div>
      </Container>
    </PageSection>
  );
}
