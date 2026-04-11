import {
  DESIGN_STYLE_OPTIONS,
  type DesignStyleOption,
} from "@/components/app-visualizer/types";
import { ConfigLabel, OptionButton } from "@/components/app-visualizer/selector-ui";

type StyleSelectorProps = {
  selected: DesignStyleOption;
  onChange: (value: DesignStyleOption) => void;
};

export function StyleSelector({ selected, onChange }: StyleSelectorProps) {
  return (
    <section className="space-y-3">
      <ConfigLabel>Design Style</ConfigLabel>
      <div className="grid grid-cols-2 gap-2">
        {DESIGN_STYLE_OPTIONS.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={selected === option}
            onClick={() => onChange(option)}
          />
        ))}
      </div>
    </section>
  );
}
