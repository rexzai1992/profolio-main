"use client";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function Contact() {
  const { content } = usePortfolioContent();
  const { theme } = useTheme();
  const contact = content.contact;
  const isDark = theme === "dark";
  const labelClass = cn("text-sm font-medium", isDark ? "text-steel/90" : "text-slate-700");
  const fieldClass = cn(
    "mt-2 w-full rounded-xl border px-4 py-2.5 text-sm",
    isDark
      ? "border-white/15 bg-ink/70 text-white placeholder:text-steel/60"
      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400",
  );

  return (
    <PageSection id="contact" tone="muted">
      <Container>
        <SectionHeading
          animate
          eyebrow={contact.eyebrow}
          title={contact.title}
          description={contact.description}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <ul className="space-y-4">
            {contact.channels.map((channel, index) => (
              <li key={channel.label}>
                <FeatureCard animate delayMs={index * 80}>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt/95">
                    {channel.label}
                  </p>
                  <a
                    href={channel.href}
                    className={cn(
                      "mt-2 inline-flex text-base font-semibold underline-offset-4 transition duration-300 hover:text-cobalt hover:underline",
                      isDark ? "text-white" : "text-slate-900",
                    )}
                  >
                    {channel.value}
                  </a>
                  <p className={cn("mt-2 text-sm", isDark ? "text-steel/85" : "text-slate-600")}>
                    {channel.note}
                  </p>
                </FeatureCard>
              </li>
            ))}
          </ul>

          <FeatureCard animate delayMs={140}>
            <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
              {contact.formTitle}
            </h3>
            <p className={cn("mt-2 text-sm", isDark ? "text-steel/85" : "text-slate-600")}>
              {contact.formIntro}
            </p>

            <form
              action={"mailto:" + content.site.contactEmail}
              method="post"
              encType="text/plain"
              className="mt-6 space-y-4"
            >
              <fieldset className="grid gap-4 sm:grid-cols-2">
                <legend className="sr-only">Personal details</legend>
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={fieldClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldClass}
                    placeholder="you@company.com"
                  />
                </div>
              </fieldset>

              <div>
                <label htmlFor="project_type" className={labelClass}>
                  Project type
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  required
                  className={fieldClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a project type
                  </option>
                  <option value="Web app">Web app</option>
                  <option value="Automation">Automation</option>
                  <option value="Mobile app">Mobile app</option>
                  <option value="Dashboard">Dashboard</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  What problem do you want to solve?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={fieldClass + " py-3"}
                  placeholder="Share your current workflow challenge, goals, and target timeline."
                />
              </div>

              <button
                type="submit"
                className={cn(
                  "rounded-full px-6 py-3 text-sm font-semibold shadow-[0_8px_22px_-14px_rgba(128,167,255,0.55)] transition duration-300 hover:-translate-y-0.5",
                  isDark
                    ? "bg-[#f1f4ff] text-[#0b1022] hover:bg-white"
                    : "bg-slate-900 text-white hover:bg-slate-800",
                )}
              >
                Send Project Brief
              </button>
            </form>
          </FeatureCard>
        </div>
      </Container>
    </PageSection>
  );
}
