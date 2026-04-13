"use client";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { BrandMarquee } from "@/components/sections/brand-marquee";
import { useTheme } from "@/components/providers/theme-provider";
import { Container } from "@/components/ui/container";
import { PageSection } from "@/components/ui/page-section";
import { cn } from "@/lib/utils";

export function TrustStrip() {
  const { content } = usePortfolioContent();
  const { theme } = useTheme();
  const trustStrip = content.trustStrip;
  const isDark = theme === "dark";

  return (
    <PageSection
      ariaLabel="Trust strip"
      tone="muted"
      spacing="compact"
      className={isDark ? "bg-white/[0.02]" : "bg-slate-100/45"}
    >
      <Container>
        <p
          className={cn(
            "motion-fade-up text-center text-sm font-medium sm:text-base",
            isDark ? "text-steel/90" : "text-[#425466]",
          )}
        >
          {trustStrip.message}
        </p>

        <BrandMarquee className="mx-auto mt-6" />
      </Container>
    </PageSection>
  );
}
