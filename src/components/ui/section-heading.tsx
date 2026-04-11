import type { CSSProperties } from "react";

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
  const style: CSSProperties | undefined =
    delayMs === undefined ? undefined : { animationDelay: `${delayMs}ms` };

  return (
    <header className={cn("max-w-3xl", animate && "motion-fade-up", className)} style={style}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-steel/90">{description}</p>
    </header>
  );
}
