"use client";

import type { CSSProperties, ReactNode } from "react";

import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  animate?: boolean;
  delayMs?: number;
};

export function FeatureCard({
  children,
  className,
  style,
  animate = false,
  delayMs,
}: FeatureCardProps) {
  const { theme } = useTheme();
  const mergedStyle: CSSProperties | undefined =
    delayMs === undefined ? style : { ...style, animationDelay: `${delayMs}ms` };

  return (
    <article
      className={cn(
        animate && "motion-fade-up",
        "relative overflow-hidden rounded-2xl border p-6 transition duration-300",
        theme === "dark"
          ? "border-white/12 bg-white/[0.035] shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_18px_34px_-28px_rgba(0,0,0,0.9)] hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05]"
          : "border-slate-300/80 bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_18px_34px_-28px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white",
        className,
      )}
      style={mergedStyle}
    >
      {children}
    </article>
  );
}
