"use client";

import type { ReactNode } from "react";

import { useTheme } from "@/components/providers/theme-provider";
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
  const { theme } = useTheme();

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative",
        spacing === "default" ? "py-20 md:py-24" : "py-9",
        tone === "muted" &&
          (theme === "dark"
            ? "border-y border-white/10 bg-white/[0.02]"
            : "border-y border-slate-300/70 bg-slate-100/65"),
        className,
      )}
    >
      {children}
    </section>
  );
}
