import type { VisualizerState } from "@/components/app-visualizer/types";
import { featureToShortLabel } from "@/components/app-visualizer/utils";

type SelectionSummaryProps = {
  state: VisualizerState;
  summary: string;
  complexity: {
    label: "Simple" | "Medium" | "Advanced" | "Enterprise";
    score: number;
  };
};

function pill(text: string) {
  return (
    <li
      key={text}
      className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-steel"
    >
      {text}
    </li>
  );
}

export function SelectionSummary({ state, summary, complexity }: SelectionSummaryProps) {
  const featureLabels = state.features.slice(0, 6).map((feature) => featureToShortLabel(feature));

  return (
    <section
      aria-label="Selection summary"
      aria-live="polite"
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
          Live Summary
        </p>
        <span className="rounded-full border border-cobalt/40 bg-cobalt/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-cobalt">
          {complexity.label}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-steel/90">{summary}</p>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Selected items">
        {state.platforms.map((platform) => pill(platform))}
        {pill(state.designStyle)}
        {pill(state.motion)}
        {pill(state.adminSystem)}
        {pill(state.deliveryScope)}
        {featureLabels.map((label) => pill(label))}
      </ul>

      <p className="mt-4 text-xs text-steel/75">Complexity score: {complexity.score}</p>
    </section>
  );
}
