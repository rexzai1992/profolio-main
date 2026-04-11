import type { VisualizerState } from "@/components/app-visualizer/types";

type ScopePreviewCardProps = {
  state: VisualizerState;
};

function formatList(values: string[]) {
  return values.length ? values.join(", ") : "None selected";
}

export function ScopePreviewCard({ state }: ScopePreviewCardProps) {
  return (
    <section
      aria-label="Generated scope preview"
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
        Generated Scope Preview
      </p>

      <dl className="mt-4 space-y-3">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-steel/70">Platforms</dt>
          <dd className="mt-1 text-sm text-steel/95">{formatList(state.platforms)}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-steel/70">Design Style</dt>
          <dd className="mt-1 text-sm text-steel/95">{state.designStyle}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-steel/70">Motion Level</dt>
          <dd className="mt-1 text-sm text-steel/95">{state.motion}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-steel/70">Backend/Admin</dt>
          <dd className="mt-1 text-sm text-steel/95">{state.adminSystem}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-steel/70">Enabled Modules</dt>
          <dd className="mt-1 text-sm text-steel/95">{formatList(state.features)}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-steel/70">Delivery Scope</dt>
          <dd className="mt-1 text-sm text-steel/95">{state.deliveryScope}</dd>
        </div>
      </dl>
    </section>
  );
}
