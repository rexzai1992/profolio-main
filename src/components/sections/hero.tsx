"use client";

import Link from "next/link";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { Container } from "@/components/ui/container";

export function Hero() {
  const { content } = usePortfolioContent();
  const hero = content.hero;

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-16 md:pb-24 md:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-150px] top-[-110px] h-[260px] w-[260px] rounded-full bg-iris/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-140px] top-[14%] h-[240px] w-[240px] rounded-full bg-cobalt/10 blur-[130px]"
      />

      <Container className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="motion-fade-up">
          <p className="inline-flex items-center rounded-full border border-iris/40 bg-iris/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel/90 sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={hero.primaryCtaHref}
              className="motion-fade-up motion-delay-1 rounded-full bg-[#f1f4ff] px-6 py-3 text-sm font-semibold text-[#0b1022] shadow-[0_8px_22px_-14px_rgba(128,167,255,0.55)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              {hero.primaryCtaLabel}
            </Link>
            <Link
              href={hero.secondaryCtaHref}
              className="motion-fade-up motion-delay-2 rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-cobalt/60 hover:bg-white/[0.08]"
            >
              {hero.secondaryCtaLabel}
            </Link>
          </div>

          <ul
            className="motion-fade-up motion-delay-3 mt-10 flex flex-wrap gap-3"
            aria-label="Platform capabilities"
          >
            {hero.platformBadges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-steel/90"
              >
                {badge}
              </li>
            ))}
          </ul>
        </div>

        <aside className="motion-fade-up motion-delay-2 relative overflow-hidden rounded-3xl border border-white/10 bg-panel/70 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_20px_40px_-30px_rgba(94,112,170,0.45)]">
          <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cobalt/12 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-iris/10 blur-3xl" />

          <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-steel/90">
            {hero.storyEyebrow}
          </p>
          <h2 className="relative mt-3 text-2xl font-semibold text-white">
            {hero.storyTitle}
          </h2>
          <p className="relative mt-4 text-sm leading-relaxed text-steel/90">
            {hero.storyDescription}
          </p>

          <ul className="relative mt-6 space-y-3 text-sm text-steel/90">
            {hero.storyPoints.map((point) => (
              <li key={point} className="border-l border-white/15 pl-3">
                {point}
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </section>
  );
}
