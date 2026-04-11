"use client";

import Link from "next/link";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { Container } from "@/components/ui/container";

export function Footer() {
  const { content } = usePortfolioContent();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink py-10">
      <Container className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-end">
        <div>
          <p className="text-lg font-semibold text-white">{content.site.name}</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-steel/85">
            {content.footer.tagline}
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.14em] text-steel/70">
            © {year} {content.site.name}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {content.navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel/85 transition duration-300 hover:text-white"
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
              className="rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:border-cobalt/60 hover:bg-white/[0.08]"
            >
              {content.site.contactEmail}
            </a>
          </address>
        </div>
      </Container>
    </footer>
  );
}
