import { FEATURE_OPTIONS, type FeatureOption } from "@/components/app-visualizer/types";
import { ConfigLabel, OptionButton } from "@/components/app-visualizer/selector-ui";

type FeaturesSelectorProps = {
  selected: FeatureOption[];
  onToggle: (value: FeatureOption) => void;
};

const FEATURE_MODULE_LIMIT = 5;

export function FeaturesSelector({ selected, onToggle }: FeaturesSelectorProps) {
  const visibleOptions = FEATURE_OPTIONS.slice(0, FEATURE_MODULE_LIMIT);

  return (
    <section className="space-y-3">
      <ConfigLabel>Features</ConfigLabel>
      <div className="grid grid-cols-2 gap-2">
        {visibleOptions.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={selected.includes(option)}
            onClick={() => onToggle(option)}
          />
        ))}
      </div>
    </section>
  );
}
