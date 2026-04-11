import {
  DELIVERY_SCOPE_OPTIONS,
  type DeliveryScopeOption,
} from "@/components/app-visualizer/types";
import { ConfigLabel, OptionButton } from "@/components/app-visualizer/selector-ui";

type DeliverySelectorProps = {
  selected: DeliveryScopeOption;
  onChange: (value: DeliveryScopeOption) => void;
};

export function DeliverySelector({ selected, onChange }: DeliverySelectorProps) {
  return (
    <section className="space-y-3">
      <ConfigLabel>Delivery Scope</ConfigLabel>
      <div className="grid grid-cols-1 gap-2">
        {DELIVERY_SCOPE_OPTIONS.map((option) => (
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
