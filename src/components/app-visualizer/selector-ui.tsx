import { cn } from "@/lib/utils";

type OptionButtonProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  subtitle?: string;
};

export function OptionButton({
  label,
  selected,
  onClick,
  subtitle,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-3 py-3 text-left transition duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
        selected
          ? "border-cobalt/60 bg-cobalt/15 text-white shadow-[0_10px_22px_-18px_rgba(126,170,255,0.8)]"
          : "border-white/10 bg-white/[0.03] text-steel/90 hover:border-white/30 hover:bg-white/[0.06]",
      )}
    >
      <span className="block text-sm font-semibold">{label}</span>
      {subtitle ? <span className="mt-1 block text-xs text-steel/80">{subtitle}</span> : null}
    </button>
  );
}

export function ConfigLabel({ children }: { children: string }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-steel/80">
      {children}
    </h3>
  );
}
