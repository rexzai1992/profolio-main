import { cn } from "@/lib/utils";

type KeyPointListProps = {
  items: string[];
  className?: string;
  itemClassName?: string;
};

export function KeyPointList({
  items,
  className,
  itemClassName,
}: KeyPointListProps) {
  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex gap-3 text-sm text-steel/85", itemClassName)}>
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt/80" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
