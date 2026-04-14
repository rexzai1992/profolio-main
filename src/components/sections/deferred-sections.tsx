"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentType } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type DeferredSectionShellProps = {
  id: string;
  label: string;
  minHeightClass: string;
  rootMargin?: string;
  Component: ComponentType;
};

function DeferredSectionShell({
  id,
  label,
  minHeightClass,
  rootMargin = "220px 0px",
  Component,
}: DeferredSectionShellProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) {
      return;
    }

    const sectionElement = sectionRef.current;
    if (!sectionElement) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const rafId = window.requestAnimationFrame(() => {
        setReady(true);
      });

      return () => {
        window.cancelAnimationFrame(rafId);
      };
    }

    let cancelled = false;
    const enableReady = () => {
      if (!cancelled) {
        setReady(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          enableReady();
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      },
    );

    observer.observe(sectionElement);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [ready, rootMargin]);

  if (ready) {
    return <Component />;
  }

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn("py-20 sm:py-24", minHeightClass)}
      aria-label={`${label} loading`}
    >
      <Container>
        <div className="rounded-3xl border border-white/10 bg-black/20 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cobalt/85">
            {label}
          </p>
          <p className="mt-2 text-sm text-steel/85">
            Loading section...
          </p>
          <div className="mt-5 h-56 rounded-2xl border border-white/10 bg-white/[0.02] sm:h-64" />
        </div>
      </Container>
    </section>
  );
}

const LazyFeaturedProjects = dynamic(
  () =>
    import("@/components/sections/featured-projects").then(
      (module) => module.FeaturedProjects,
    ),
  { ssr: false },
);

const LazyServices = dynamic(
  () =>
    import("@/components/sections/services").then(
      (module) => module.Services,
    ),
  { ssr: false },
);

const LazyProblems = dynamic(
  () =>
    import("@/components/sections/problems").then(
      (module) => module.Problems,
    ),
  { ssr: false },
);

const LazyPricing = dynamic(
  () =>
    import("@/components/sections/pricing").then(
      (module) => module.Pricing,
    ),
  { ssr: false },
);

const LazyContact = dynamic(
  () =>
    import("@/components/sections/contact").then(
      (module) => module.Contact,
    ),
  { ssr: false },
);

export function DeferredFeaturedProjects() {
  return (
    <DeferredSectionShell
      id="projects"
      label="Featured Projects"
      minHeightClass="min-h-[520px]"
      Component={LazyFeaturedProjects}
    />
  );
}

export function DeferredServices() {
  return (
    <DeferredSectionShell
      id="services"
      label="Services"
      minHeightClass="min-h-[480px]"
      rootMargin="260px 0px"
      Component={LazyServices}
    />
  );
}

export function DeferredProblems() {
  return (
    <DeferredSectionShell
      id="problems"
      label="Problems"
      minHeightClass="min-h-[460px]"
      rootMargin="240px 0px"
      Component={LazyProblems}
    />
  );
}

export function DeferredPricing() {
  return (
    <DeferredSectionShell
      id="pricing"
      label="Pricing"
      minHeightClass="min-h-[460px]"
      Component={LazyPricing}
    />
  );
}

export function DeferredContact() {
  return (
    <DeferredSectionShell
      id="contact"
      label="Contact"
      minHeightClass="min-h-[500px]"
      rootMargin="180px 0px"
      Component={LazyContact}
    />
  );
}
