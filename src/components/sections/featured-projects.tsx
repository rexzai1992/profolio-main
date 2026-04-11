"use client";

import Link from "next/link";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";

export function FeaturedProjects() {
  const { content } = usePortfolioContent();
  const featuredProjects = content.featuredProjects;

  return (
    <PageSection id="projects">
      <Container>
        <SectionHeading
          animate
          eyebrow={featuredProjects.eyebrow}
          title={featuredProjects.title}
          description={featuredProjects.description}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.items.map((project, index) => (
            <FeatureCard
              key={project.name}
              className="flex h-full flex-col"
              animate
              delayMs={index * 80}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt/95">
                {project.category}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">{project.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-steel/90">{project.summary}</p>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.name} badges`}>
                {project.badges.map((badge) => (
                  <li
                    key={badge}
                    className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-steel/90"
                  >
                    {badge}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-sm leading-relaxed text-steel/90">{project.impact}</p>

              <div className="mt-6">
                <Link
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:border-cobalt/60 hover:bg-white/[0.08]"
                >
                  Build Something Similar
                </Link>
              </div>
            </FeatureCard>
          ))}
        </div>
      </Container>
    </PageSection>
  );
}
