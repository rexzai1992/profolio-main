import type { CSSProperties, ReactNode } from "react";

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
  const mergedStyle: CSSProperties | undefined =
    delayMs === undefined ? style : { ...style, animationDelay: `${delayMs}ms` };

  return (
    <article
      className={cn(
        animate && "motion-fade-up",
        "relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.035] p-6 transition duration-300",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_18px_34px_-28px_rgba(0,0,0,0.9)]",
        "hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05]",
        className,
      )}
      style={mergedStyle}
    >
      {children}
    </article>
  );
}
