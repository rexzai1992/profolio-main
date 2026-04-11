import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageSectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  ariaLabel?: string;
  tone?: "default" | "muted";
  spacing?: "default" | "compact";
};

export function PageSection({
  children,
  id,
  className,
  ariaLabel,
  tone = "default",
  spacing = "default",
}: PageSectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative",
        spacing === "default" ? "py-20 md:py-24" : "py-9",
        tone === "muted" && "border-y border-white/10 bg-white/[0.02]",
        className,
      )}
    >
      {children}
    </section>
  );
}
