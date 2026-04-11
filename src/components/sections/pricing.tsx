"use client";

import Link from "next/link";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { KeyPointList } from "@/components/ui/key-point-list";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function Pricing() {
  const { content } = usePortfolioContent();
  const pricing = content.pricing;

  return (
    <PageSection id="pricing" tone="muted">
      <Container>
        <SectionHeading
          animate
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          description={pricing.description}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {pricing.plans.map((plan, index) => (
            <FeatureCard
              key={plan.name}
              className={cn("flex h-full flex-col", plan.featured && "border-cobalt/50")}
              animate
              delayMs={index * 90}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                {plan.featured ? (
                  <span className="rounded-full border border-cobalt/60 bg-cobalt/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cobalt">
                    Popular
                  </span>
                ) : null}
              </div>

              <p className="mt-3 text-2xl font-semibold text-white">{plan.price}</p>
              <p className="mt-3 text-sm leading-relaxed text-steel/90">{plan.summary}</p>

              <KeyPointList items={plan.deliverables} className="mt-5" />

              <div className="mt-6">
                <Link
                  href="#contact"
                  className={cn(
                    "inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition duration-300",
                    plan.featured
                      ? "border-cobalt/60 bg-cobalt/15 text-white hover:bg-cobalt/25"
                      : "border-white/20 bg-white/[0.04] text-white hover:border-cobalt/60 hover:bg-white/[0.08]",
                  )}
                >
                  Discuss This Plan
                </Link>
              </div>
            </FeatureCard>
          ))}
        </div>
      </Container>
    </PageSection>
  );
}
