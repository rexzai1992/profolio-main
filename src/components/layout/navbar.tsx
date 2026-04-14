"use client";

import Link from "next/link";

import { usePerformanceMode } from "@/components/providers/performance-mode-provider";
import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const HIDDEN_SECTION_HREFS = new Set(["#roadmap", "#why-me", "#process", "#experience"]);

export function Navbar() {
  const { content } = usePortfolioContent();
  const { mode, toggleMode } = usePerformanceMode();
  const { theme, toggleTheme } = useTheme();
  const visibleNavLinks = content.navLinks.filter((link) => !HIDDEN_SECTION_HREFS.has(link.href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300",
        theme === "dark"
          ? "border-white/10 bg-ink/70"
          : "border-slate-300/80 bg-white/82",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:gap-6">
        <Link
          href="/"
          className={cn(
            "text-lg font-semibold tracking-tight transition duration-300 hover:text-cobalt",
            theme === "dark" ? "text-white" : "text-slate-900",
          )}
          aria-label="Go to homepage"
        >
          {content.site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center md:flex">
          <ul className="flex items-center gap-7">
            {visibleNavLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition duration-300",
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

        <button
          type="button"
          onClick={toggleMode}
          className={cn(
            "rounded-full border px-3 py-2 text-xs font-semibold transition duration-300 sm:px-4 sm:text-sm",
            theme === "dark"
              ? "border-white/20 bg-white/[0.06] text-white hover:border-cobalt/60 hover:bg-white/[0.1]"
              : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-slate-900",
          )}
          aria-label="Toggle performance mode"
        >
          <span className="sm:hidden">Perf</span>
          <span className="hidden sm:inline">{mode === "eco" ? "Eco Mode" : "Balanced FX"}</span>
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          className={cn(
            "rounded-full border px-3 py-2 text-xs font-semibold transition duration-300 sm:px-4 sm:text-sm",
            theme === "dark"
              ? "border-white/20 bg-white/[0.06] text-white hover:border-cobalt/60 hover:bg-white/[0.1]"
              : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-slate-900",
          )}
          aria-label="Toggle site theme"
        >
          <span className="sm:hidden">Theme</span>
          <span className="hidden sm:inline">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>

        <Link
          href="#contact"
          className={cn(
            "hidden rounded-full border px-3 py-2 text-xs font-semibold shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition duration-300 hover:-translate-y-0.5 sm:inline-flex sm:px-4 sm:text-sm",
            theme === "dark"
              ? "border-white/20 bg-white/[0.06] text-white hover:border-cobalt/60 hover:bg-white/[0.09]"
              : "border-slate-300 bg-white text-slate-800 hover:border-blue-300 hover:bg-slate-50",
          )}
        >
          Start a Project
        </Link>
      </Container>
    </header>
  );
}
