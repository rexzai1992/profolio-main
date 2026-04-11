import Link from "next/link";

type CTAFooterProps = {
  complexityLabel: "Simple" | "Medium" | "Advanced" | "Enterprise";
  onReset: () => void;
};

export function CTAFooter({ complexityLabel, onReset }: CTAFooterProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
            Ready To Build
          </p>
          <p className="mt-2 text-sm text-steel/90">
            Your current scope maps to a <span className="font-semibold text-white">{complexityLabel}</span> delivery path.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:border-white/45"
          >
            Reset
          </button>
          <Link
            href="#contact"
            className="rounded-full border border-cobalt/40 bg-gradient-to-r from-cobalt/30 to-iris/30 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_34px_-20px_rgba(120,157,255,0.85)] transition duration-300 hover:-translate-y-0.5 hover:border-cobalt/70"
          >
            Request Proposal
          </Link>
        </div>
      </div>
    </div>
  );
}
