"use client";

import type { CSSProperties } from "react";

import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  animate?: boolean;
  delayMs?: number;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  animate = false,
  delayMs,
}: SectionHeadingProps) {
  const { theme } = useTheme();
  const style: CSSProperties | undefined =
    delayMs === undefined ? undefined : { animationDelay: `${delayMs}ms` };

  return (
    <header className={cn("max-w-3xl", animate && "motion-fade-up", className)} style={style}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 text-3xl font-semibold leading-tight sm:text-4xl",
          theme === "dark" ? "text-white" : "text-slate-900",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-4 text-base leading-relaxed",
          theme === "dark" ? "text-steel/90" : "text-slate-600",
        )}
      >
        {description}
      </p>
    </header>
  );
}
