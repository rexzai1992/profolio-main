"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { Container } from "@/components/ui/container";
import {
  defaultPortfolioContent,
  isPortfolioContentLike,
  type PortfolioContent,
} from "@/lib/site";

type Notice = {
  type: "success" | "error" | "info";
  message: string;
};

export default function AdminPage() {
  const { content, setContent, resetContent } = usePortfolioContent();
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState<Notice>({
    type: "info",
    message:
      "Edits in this admin panel are stored in your current browser using localStorage.",
  });

  useEffect(() => {
    setDraft(JSON.stringify(content, null, 2));
  }, [content]);

  const handleSave = () => {
    try {
      const parsed: unknown = JSON.parse(draft);

      if (!isPortfolioContentLike(parsed)) {
        setNotice({
          type: "error",
          message:
            "Invalid structure. Keep all top-level keys (site, hero, services, roadmap, contact, etc).",
        });
        return;
      }

      setContent(parsed as PortfolioContent);
      setNotice({
        type: "success",
        message: "Content saved. Refresh homepage to review updates.",
      });
    } catch {
      setNotice({
        type: "error",
        message: "JSON parse failed. Check commas, quotes, and brackets.",
      });
    }
  };

  const handleReset = () => {
    resetContent();
    setNotice({
      type: "success",
      message: "Reset complete. Default content restored.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([draft], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "portfolio-content.json";
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const handleLoadDefaultTemplate = () => {
    setDraft(JSON.stringify(defaultPortfolioContent, null, 2));
    setNotice({
      type: "info",
      message: "Loaded default template into editor. Save to apply it.",
    });
  };

  return (
    <main id="content" className="pb-20 pt-16 md:pt-20">
      <Container>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
            Admin Content Studio
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Edit website content and roadmap photos
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-steel/90">
            Update copy, pricing, projects, and roadmap gallery by editing JSON below.
            For roadmap photos, set `roadmap.items[].imageUrl` to a public URL or a
            local file path in `public` such as `/roadmap/app-1.jpg`.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-[#f1f4ff] px-4 py-2 text-sm font-semibold text-[#0b1022] transition duration-300 hover:bg-white"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-white/20 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:border-cobalt/60"
            >
              Reset to Default
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-full border border-white/20 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:border-cobalt/60"
            >
              Download JSON
            </button>
            <button
              type="button"
              onClick={handleLoadDefaultTemplate}
              className="rounded-full border border-white/20 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:border-cobalt/60"
            >
              Load Default Template
            </button>
            <Link
              href="/"
              className="rounded-full border border-white/20 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:border-cobalt/60"
            >
              View Homepage
            </Link>
          </div>

          <div
            className={
              "mt-4 rounded-xl border px-4 py-3 text-sm " +
              (notice.type === "success"
                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
                : notice.type === "error"
                  ? "border-red-400/40 bg-red-400/10 text-red-100"
                  : "border-cobalt/40 bg-cobalt/10 text-steel")
            }
          >
            {notice.message}
          </div>

          <label htmlFor="content-json" className="mt-6 block text-sm font-semibold text-white">
            Portfolio content JSON
          </label>
          <textarea
            id="content-json"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            spellCheck={false}
            className="mt-3 h-[70vh] min-h-[520px] w-full rounded-2xl border border-white/15 bg-ink/80 p-4 font-mono text-xs leading-relaxed text-white placeholder:text-steel/60"
          />

          <div className="mt-5 rounded-xl border border-white/10 bg-ink/60 p-4">
            <p className="text-sm font-semibold text-white">What to include next</p>
            <ul className="mt-2 space-y-2 text-sm text-steel/85">
              <li>1. Real roadmap screenshots for each phase.</li>
              <li>2. Project-specific outcomes (time saved, conversion uplift, cost reduction).</li>
              <li>3. Social proof: testimonials, logos, or case study links.</li>
              <li>4. A single primary conversion goal per section (call or brief submission).</li>
            </ul>
          </div>
        </div>
      </Container>
    </main>
  );
}
