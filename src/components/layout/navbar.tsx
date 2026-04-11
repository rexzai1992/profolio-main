"use client";

import Link from "next/link";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { Container } from "@/components/ui/container";

export function Navbar() {
  const { content } = usePortfolioContent();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4 sm:gap-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white transition duration-300 hover:text-cobalt"
          aria-label="Go to homepage"
        >
          {content.site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center md:flex">
          <ul className="flex items-center gap-7">
            {content.navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-steel/85 transition duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="#contact"
          className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-cobalt/60 hover:bg-white/[0.09] sm:px-4 sm:text-sm"
        >
          Start a Project
        </Link>
      </Container>
    </header>
  );
}
