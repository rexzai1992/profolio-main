import {
  PLATFORM_OPTIONS,
  type PlatformOption,
} from "@/components/app-visualizer/types";
import { ConfigLabel, OptionButton } from "@/components/app-visualizer/selector-ui";

type PlatformSelectorProps = {
  selected: PlatformOption[];
  onToggle: (value: PlatformOption) => void;
};

const subtitles: Record<PlatformOption, string> = {
  "Web App": "Browser-first product experience",
  PWA: "Installable cross-device app",
  "Android App": "Native Android delivery",
  "iOS App": "Native iPhone delivery",
};

export function PlatformSelector({ selected, onToggle }: PlatformSelectorProps) {
  return (
    <section className="space-y-3">
      <ConfigLabel>Platform</ConfigLabel>
      <div className="grid grid-cols-2 gap-2">
        {PLATFORM_OPTIONS.map((option) => (
          <OptionButton
            key={option}
            label={option}
            subtitle={subtitles[option]}
            selected={selected.includes(option)}
            onClick={() => onToggle(option)}
          />
        ))}
      </div>
    </section>
  );
}
