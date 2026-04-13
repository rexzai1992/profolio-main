"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLiteMode } from "@/lib/use-lite-mode";
import { cn } from "@/lib/utils";

type ProjectImageCarouselProps = {
  media?: Array<{ type: "image" | "video"; url: string }>;
  images?: string[];
  projectName: string;
  isDark: boolean;
  isActive: boolean;
  allowAutoplay: boolean;
  allowVideoPlayback: boolean;
};

type ProjectMediaSlide = {
  type: "image" | "video";
  url: string;
};

function normalizeProjectMedia(
  media?: Array<{ type: "image" | "video"; url: string }>,
  images?: string[],
): ProjectMediaSlide[] {
  const fromMedia = (media ?? [])
    .map((item) => {
      const url = typeof item?.url === "string" ? item.url.trim() : "";
      const type = item?.type === "video" ? "video" : "image";

      if (!url) {
        return null;
      }

      return { type, url };
    })
    .filter((item): item is ProjectMediaSlide => Boolean(item));

  const fromImages = (images ?? [])
    .map((image) => {
      const url = typeof image === "string" ? image.trim() : "";
      return url ? { type: "image" as const, url } : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const normalized = (fromMedia.length > 0 ? fromMedia : fromImages).slice(0, 8);

  if (normalized.length === 0) {
    return [{ type: "image", url: "" }];
  }

  return normalized;
}

function ProjectImageCarousel({
  media,
  images,
  projectName,
  isDark,
  isActive,
  allowAutoplay,
  allowVideoPlayback,
}: ProjectImageCarouselProps) {
  const carouselMedia = useMemo(() => normalizeProjectMedia(media, images), [media, images]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!allowAutoplay || !isActive || carouselMedia.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselMedia.length);
    }, 4200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [allowAutoplay, carouselMedia.length, isActive]);

  const safeActiveIndex = activeIndex % carouselMedia.length;

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + carouselMedia.length) % carouselMedia.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % carouselMedia.length);
  };

  return (
    <div
      className={cn(
        "relative mt-5 overflow-hidden rounded-2xl border",
        isDark ? "border-white/15 bg-[#0d1526]" : "border-slate-300 bg-slate-100",
      )}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${safeActiveIndex * 100}%)` }}
      >
        {carouselMedia.map((item, index) => {
          const shouldPlayVideo =
            allowVideoPlayback && isActive && safeActiveIndex === index;

          return (
            <div
              key={`${projectName}-image-${index + 1}`}
              className={cn(
                "relative h-44 min-w-full",
                isDark ? "bg-[#101a2f]" : "bg-slate-200",
              )}
              aria-label={`${projectName} media ${index + 1}`}
            >
              {item.url ? (
                item.type === "video" ? (
                  shouldPlayVideo ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      src={item.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                    />
                  ) : (
                    <div
                      className={cn(
                        "absolute inset-0 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.14em]",
                        isDark ? "bg-[#0f1a2f] text-steel/75" : "bg-slate-300 text-slate-600",
                      )}
                    >
                      Video Preview
                    </div>
                  )
                ) : (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(\"${item.url}\")` }}
                  />
                )
              ) : (
                <div
                  className={cn(
                    "absolute inset-4 flex items-center justify-center rounded-xl border border-dashed text-center text-xs font-medium",
                    isDark ? "border-white/20 text-steel/90" : "border-slate-400 text-slate-600",
                  )}
                >
                  Add image or video {index + 1}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label={`Previous ${projectName} image`}
            className={cn(
              "rounded-full border px-2.5 py-1.5 text-xs font-semibold transition",
              isDark
                ? "border-white/30 bg-[#0b1222]/80 text-white hover:border-cobalt/60"
                : "border-slate-400 bg-white/90 text-slate-800 hover:border-slate-500",
            )}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label={`Next ${projectName} image`}
            className={cn(
              "rounded-full border px-2.5 py-1.5 text-xs font-semibold transition",
              isDark
                ? "border-white/30 bg-[#0b1222]/80 text-white hover:border-cobalt/60"
                : "border-slate-400 bg-white/90 text-slate-800 hover:border-slate-500",
            )}
          >
            Next
          </button>
        </div>

        <div
          className="pointer-events-auto flex items-center gap-1.5"
          aria-label={`${projectName} image selector`}
        >
          {carouselMedia.map((_, index) => (
            <button
              key={`${projectName}-dot-${index + 1}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to ${projectName} image ${index + 1}`}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition",
                safeActiveIndex === index
                  ? isDark
                    ? "bg-white"
                    : "bg-slate-800"
                  : isDark
                    ? "bg-white/40 hover:bg-white/65"
                    : "bg-slate-400 hover:bg-slate-500",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  const { content } = usePortfolioContent();
  const { theme } = useTheme();
  const { width: viewportWidth, liteMode } = useLiteMode(1600);
  const featuredProjects = content.featuredProjects;
  const isDark = theme === "dark";
  const allowAutoMotion = !liteMode && viewportWidth >= 1600;
  const allowVideoPlayback = !liteMode && viewportWidth >= 1500;
  const totalProjects = featuredProjects.items.length;
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const safeActiveProjectIndex =
    totalProjects > 0 ? activeProjectIndex % totalProjects : 0;

  useEffect(() => {
    if (!allowAutoMotion || totalProjects <= 1 || isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveProjectIndex((current) => (current + 1) % totalProjects);
    }, 5600);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [allowAutoMotion, isPaused, totalProjects]);

  const goToPreviousProject = () => {
    if (totalProjects <= 1) {
      return;
    }

    setActiveProjectIndex((safeActiveProjectIndex - 1 + totalProjects) % totalProjects);
  };

  const goToNextProject = () => {
    if (totalProjects <= 1) {
      return;
    }

    setActiveProjectIndex((safeActiveProjectIndex + 1) % totalProjects);
  };

  return (
    <PageSection id="projects">
      <Container>
        <SectionHeading
          animate
          eyebrow={featuredProjects.eyebrow}
          title={featuredProjects.title}
          description={featuredProjects.description}
        />

        {totalProjects === 0 ? (
          <div
            className={cn(
              "mt-10 rounded-2xl border border-dashed p-8 text-center text-sm",
              isDark ? "border-white/20 text-steel/85" : "border-slate-400 text-slate-600",
            )}
          >
            Add at least one project in admin to show the carousel.
          </div>
        ) : (
          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p
                className={cn(
                  "text-xs font-semibold uppercase tracking-[0.16em]",
                  isDark ? "text-steel/80" : "text-slate-500",
                )}
                aria-live="polite"
              >
                Project {safeActiveProjectIndex + 1} of {totalProjects}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPreviousProject}
                  aria-label="Previous project"
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                    isDark
                      ? "border-white/20 bg-white/[0.03] text-white hover:border-cobalt/60 hover:bg-white/[0.08]"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
                  )}
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={goToNextProject}
                  aria-label="Next project"
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                    isDark
                      ? "border-white/20 bg-white/[0.03] text-white hover:border-cobalt/60 hover:bg-white/[0.08]"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
                  )}
                >
                  Next
                </button>
              </div>
            </div>

            <div
              className={cn(
                "overflow-hidden rounded-3xl border p-1.5 sm:p-2",
                isDark ? "border-white/12 bg-white/[0.02]" : "border-slate-300/80 bg-white/75",
              )}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocusCapture={() => setIsPaused(true)}
              onBlurCapture={() => setIsPaused(false)}
            >
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${safeActiveProjectIndex * 100}%)` }}
              >
                {featuredProjects.items.map((project, index) => (
                  <div key={project.name} className="min-w-full p-1">
                    <FeatureCard className="flex h-full flex-col">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt/95">
                        {project.category}
                      </p>
                      <h3 className={cn("mt-3 text-xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
                        {project.name}
                      </h3>
                      <p className={cn("mt-3 text-sm leading-relaxed", isDark ? "text-steel/90" : "text-slate-600")}>
                        {project.summary}
                      </p>

                      <ProjectImageCarousel
                        media={project.media}
                        images={project.images}
                        projectName={project.name}
                        isDark={isDark}
                        isActive={safeActiveProjectIndex === index}
                        allowAutoplay={allowAutoMotion}
                        allowVideoPlayback={allowVideoPlayback}
                      />

                      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.name} badges`}>
                        {project.badges.map((badge) => (
                          <li
                            key={badge}
                            className={cn(
                              "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
                              isDark
                                ? "border-white/15 bg-white/[0.04] text-steel/90"
                                : "border-slate-300 bg-white text-slate-700",
                            )}
                          >
                            {badge}
                          </li>
                        ))}
                      </ul>

                      <p className={cn("mt-5 text-sm leading-relaxed", isDark ? "text-steel/90" : "text-slate-600")}>
                        {project.impact}
                      </p>

                      <div className="mt-6">
                        <Link
                          href="#contact"
                          className={cn(
                            "inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition duration-300",
                            isDark
                              ? "border-white/20 bg-white/[0.04] text-white hover:border-cobalt/60 hover:bg-white/[0.08]"
                              : "border-slate-300 bg-white text-slate-800 hover:border-blue-300 hover:bg-slate-50",
                          )}
                        >
                          Build Something Similar
                        </Link>
                      </div>
                    </FeatureCard>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2" aria-label="Project selector">
              {featuredProjects.items.map((project, index) => (
                <button
                  key={`${project.name}-${index + 1}`}
                  type="button"
                  onClick={() => setActiveProjectIndex(index)}
                  aria-label={`Go to project ${index + 1}: ${project.name}`}
                  className={cn(
                    "h-2.5 w-9 rounded-full transition",
                    safeActiveProjectIndex === index
                      ? isDark
                        ? "bg-cobalt"
                        : "bg-slate-900"
                      : isDark
                        ? "bg-white/25 hover:bg-white/45"
                        : "bg-slate-300 hover:bg-slate-400",
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </PageSection>
  );
}
