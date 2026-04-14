"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

import { usePerformanceMode } from "@/components/providers/performance-mode-provider";
import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { BrandMarquee } from "@/components/sections/brand-marquee";
import { Container } from "@/components/ui/container";
import { useLiteMode } from "@/lib/use-lite-mode";
import { cn } from "@/lib/utils";

const LazyRibbonBackgroundCanvas = dynamic(
  () =>
    import("@/components/sections/ribbon-background-canvas").then(
      (module) => module.RibbonBackgroundCanvas,
    ),
  { ssr: false },
);

function revealStyle(shouldAnimate: boolean, delayInSeconds: number) {
  if (!shouldAnimate || delayInSeconds <= 0) {
    return undefined;
  }

  return { animationDelay: `${Math.round(delayInSeconds * 1000)}ms` };
}

type HeroProps = {
  prioritizeMediaLoad?: boolean;
};

export function Hero({ prioritizeMediaLoad = false }: HeroProps) {
  const { content } = usePortfolioContent();
  const { isEcoMode } = usePerformanceMode();
  const { theme } = useTheme();
  const hero = content.hero;
  const [reduceMotion, setReduceMotion] = useState(true);
  const [showHeroContent, setShowHeroContent] = useState(() => !prioritizeMediaLoad);
  const { width: viewportWidth, liteMode } = useLiteMode(1600);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    updateMotionPreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMotionPreference);
      return () => {
        mediaQuery.removeEventListener("change", updateMotionPreference);
      };
    }

    mediaQuery.addListener(updateMotionPreference);
    return () => {
      mediaQuery.removeListener(updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (!prioritizeMediaLoad || showHeroContent) {
      return;
    }

    let timeoutId: number | null = null;
    let idleId: number | null = null;
    const revealContent = () => {
      setShowHeroContent(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(revealContent, { timeout: 1100 });
    } else {
      timeoutId = window.setTimeout(revealContent, 520);
    }

    return () => {
      if (idleId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [prioritizeMediaLoad, showHeroContent]);

  const shouldShowHeroContent = !prioritizeMediaLoad || showHeroContent;

  const shouldAnimate = !reduceMotion && !liteMode && !isEcoMode;
  const isDark = theme === "dark";
  const backgroundMedia = hero.backgroundMedia?.url?.trim() ? hero.backgroundMedia : null;
  const showRibbon = viewportWidth >= 760;
  const animateRibbon = !reduceMotion && viewportWidth >= 900 && !isEcoMode;
  const allowBackgroundVideo =
    backgroundMedia?.type === "video" && shouldAnimate && viewportWidth >= 1500;
  const animateMarquee = !reduceMotion;
  const marqueeDurationSeconds = isEcoMode ? 88 : 46;

  return (
    <section
      id="home"
      className={cn(
        "relative min-h-[760px] overflow-hidden pb-16 pt-16 md:pb-24 md:pt-24",
        isDark ? "bg-[#0a172d]" : "bg-[#eff4fd]",
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className={cn("absolute inset-0", isDark ? "bg-[#09182f]" : "bg-[#f7f9ff]")} />
        {backgroundMedia ? (
          backgroundMedia.type === "video" ? (
            allowBackgroundVideo ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={backgroundMedia.url}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
              />
            ) : null
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${backgroundMedia.url}")` }}
            />
          )
        ) : null}

        {showRibbon ? (
          <LazyRibbonBackgroundCanvas
            theme={theme}
            animate={animateRibbon}
            className={cn(
              "absolute inset-0 z-[2] h-full w-full",
              animateRibbon
                ? isDark
                  ? "opacity-[0.84] xl:opacity-[0.9]"
                  : "opacity-[0.96] xl:opacity-[1]"
                : isDark
                  ? "opacity-[0.7] sm:opacity-[0.76]"
                  : "opacity-[0.88] sm:opacity-[0.92]",
            )}
          />
        ) : null}

        <div
          className={cn(
            "absolute inset-y-0 left-0 z-[3]",
            isDark
              ? "w-[46%] bg-[linear-gradient(90deg,rgba(9,24,47,0.95)_36%,rgba(9,24,47,0.62)_60%,rgba(9,24,47,0.12)_84%,rgba(9,24,47,0)_100%)] max-lg:w-full max-lg:bg-[linear-gradient(180deg,rgba(9,24,47,0.92)_0%,rgba(9,24,47,0.75)_38%,rgba(9,24,47,0.24)_72%,rgba(9,24,47,0)_100%)]"
              : "w-[46%] bg-[linear-gradient(90deg,rgba(255,255,255,0.78)_34%,rgba(255,255,255,0.42)_60%,rgba(255,255,255,0.08)_84%,rgba(255,255,255,0)_100%)] max-lg:w-full max-lg:bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.84)_44%,rgba(255,255,255,0.24)_76%,rgba(255,255,255,0)_100%)]",
          )}
        />

        <div
          className={cn(
            "absolute inset-0 z-[4]",
            backgroundMedia
              ? isDark
                ? "bg-[#091627]/62"
                : "bg-[#eff4fd]/52"
              : isDark
                ? "bg-[radial-gradient(circle_at_12%_16%,rgba(99,91,255,0.18),transparent_44%),radial-gradient(circle_at_85%_86%,rgba(14,165,233,0.12),transparent_42%)]"
                : "bg-[radial-gradient(circle_at_12%_16%,rgba(99,91,255,0.2),transparent_44%),radial-gradient(circle_at_85%_86%,rgba(244,114,182,0.14),transparent_42%)]",
          )}
        />

        {!liteMode && !isEcoMode ? (
          <div className={cn("hero-grain-overlay absolute inset-0 z-[5]", isDark ? "opacity-30" : "opacity-15")} />
        ) : null}
      </div>

      <Container className="relative z-10">
        {shouldShowHeroContent ? (
          <div className="max-w-3xl pt-10 md:pt-16">
            <p
              style={revealStyle(shouldAnimate, 0.05)}
              className={cn(
                shouldAnimate && "motion-fade-up",
                "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
                isDark
                  ? "border-cobalt/45 bg-cobalt/10 text-cobalt"
                  : "border-violet-300/80 bg-violet-100/80 text-violet-700",
              )}
            >
              {hero.eyebrow}
            </p>

            <h1
              style={revealStyle(shouldAnimate, 0.12)}
              className={cn(
                shouldAnimate && "motion-fade-up",
                "mt-6 max-w-2xl text-[clamp(2.8rem,5.8vw,5.15rem)] font-semibold leading-[0.98] tracking-[-0.055em]",
                isDark ? "text-white" : "text-[#0a2540]",
              )}
            >
              {hero.title}
            </h1>

            <p
              style={revealStyle(shouldAnimate, 0.2)}
              className={cn(
                shouldAnimate && "motion-fade-up",
                "mt-6 max-w-xl text-base leading-relaxed sm:text-lg",
                isDark ? "text-steel/90" : "text-[#425466]",
              )}
            >
              {hero.description}
            </p>

            <div
              style={revealStyle(shouldAnimate, 0.3)}
              className={cn(shouldAnimate && "motion-fade-up", "mt-8 flex flex-wrap items-center gap-3")}
            >
              <Link
                href={hero.primaryCtaHref}
                className={cn(
                  "rounded-full px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5",
                  isDark
                    ? "bg-[#635bff] text-white shadow-[0_12px_24px_rgba(99,91,255,0.28)] hover:bg-[#756dff]"
                    : "bg-[#635bff] text-white shadow-[0_12px_24px_rgba(99,91,255,0.22)] hover:bg-[#7269ff]",
                )}
              >
                {hero.primaryCtaLabel}
              </Link>
              <Link
                href={hero.secondaryCtaHref}
                className={cn(
                  "rounded-full border px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5",
                  isDark
                    ? "border-white/18 bg-white/[0.06] text-white hover:border-white/35 hover:bg-white/[0.12]"
                    : "border-slate-300/80 bg-white/90 text-[#0a2540] hover:border-slate-400 hover:bg-white",
                )}
              >
                {hero.secondaryCtaLabel}
              </Link>
            </div>
          </div>
        ) : (
          <div className="h-7" />
        )}

        <div
          style={shouldShowHeroContent ? revealStyle(shouldAnimate, 0.4) : undefined}
          className={cn(shouldShowHeroContent && shouldAnimate && "motion-fade-up", "mt-8 pb-1")}
        >
          <BrandMarquee
            className="w-full max-w-none"
            animate={animateMarquee}
            durationSeconds={marqueeDurationSeconds}
          />
        </div>
      </Container>
    </section>
  );
}
