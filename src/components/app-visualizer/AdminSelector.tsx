import { ADMIN_OPTIONS, type AdminOption } from "@/components/app-visualizer/types";
import { ConfigLabel, OptionButton } from "@/components/app-visualizer/selector-ui";

type AdminSelectorProps = {
  selected: AdminOption;
  onChange: (value: AdminOption) => void;
};

export function AdminSelector({ selected, onChange }: AdminSelectorProps) {
  return (
    <section className="space-y-3">
      <ConfigLabel>Admin System</ConfigLabel>
      <div className="grid grid-cols-1 gap-2">
        {ADMIN_OPTIONS.map((option) => (
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
