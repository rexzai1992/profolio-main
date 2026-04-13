"use client";

import Link from "next/link";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const HIDDEN_SECTION_HREFS = new Set(["#roadmap", "#why-me", "#process", "#experience"]);

export function Footer() {
  const { content } = usePortfolioContent();
  const { theme } = useTheme();
  const year = new Date().getFullYear();
  const visibleNavLinks = content.navLinks.filter((link) => !HIDDEN_SECTION_HREFS.has(link.href));

  return (
    <footer
      className={cn(
        "border-t py-10 transition-colors duration-300",
        theme === "dark" ? "border-white/10 bg-ink" : "border-slate-300/80 bg-slate-100",
      )}
    >
      <Container className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-end">
        <div>
          <p className={cn("text-lg font-semibold", theme === "dark" ? "text-white" : "text-slate-900")}>
            {content.site.name}
          </p>
          <p
            className={cn(
              "mt-2 max-w-xl text-sm leading-relaxed",
              theme === "dark" ? "text-steel/85" : "text-slate-600",
            )}
          >
            {content.footer.tagline}
          </p>
          <p
            className={cn(
              "mt-6 text-xs uppercase tracking-[0.14em]",
              theme === "dark" ? "text-steel/70" : "text-slate-500",
            )}
          >
            &copy; {year} {content.site.name}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {visibleNavLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm transition duration-300",
                      theme === "dark"
                        ? "text-steel/85 hover:text-white"
                        : "text-slate-600 hover:text-slate-900",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <address className="not-italic">
            <a
              href={`mailto:${content.site.contactEmail}`}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition duration-300",
                theme === "dark"
                  ? "border-white/20 bg-white/[0.04] text-white hover:border-cobalt/60 hover:bg-white/[0.08]"
                  : "border-slate-300 bg-white text-slate-800 hover:border-blue-300 hover:bg-slate-50",
              )}
            >
              {content.site.contactEmail}
            </a>
          </address>
        </div>
      </Container>
    </footer>
  );
}
