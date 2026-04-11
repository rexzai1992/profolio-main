import { MOTION_OPTIONS, type MotionOption } from "@/components/app-visualizer/types";
import { ConfigLabel, OptionButton } from "@/components/app-visualizer/selector-ui";

type MotionSelectorProps = {
  selected: MotionOption;
  onChange: (value: MotionOption) => void;
};

export function MotionSelector({ selected, onChange }: MotionSelectorProps) {
  return (
    <section className="space-y-3">
      <ConfigLabel>Motion</ConfigLabel>
      <div className="grid grid-cols-1 gap-2">
        {MOTION_OPTIONS.map((option) => (
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
