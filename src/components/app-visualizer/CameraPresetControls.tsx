import { motion } from "framer-motion";

import { CAMERA_PRESETS, type CameraPreset } from "@/components/app-visualizer/types";
import { cn } from "@/lib/utils";

type CameraPresetControlsProps = {
  value: CameraPreset;
  onChange: (preset: CameraPreset) => void;
  theme?: "dark" | "light";
};

export function CameraPresetControls({
  value,
  onChange,
  theme = "dark",
}: CameraPresetControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {CAMERA_PRESETS.map((preset) => (
        <button
          key={preset}
          type="button"
          onClick={() => onChange(preset)}
          className={cn(
            "relative overflow-hidden rounded-full border px-3 py-1.5 text-xs font-semibold transition duration-300",
            value === preset
              ? theme === "dark"
                ? "border-cobalt/60 text-white"
                : "border-blue-300 text-slate-900"
              : theme === "dark"
                ? "border-white/20 text-steel/85 hover:border-white/50"
                : "border-slate-300 bg-white/70 text-slate-600 hover:border-slate-400",
          )}
        >
          {value === preset ? (
            <motion.span
              layoutId="camera-pill"
              className={cn(
                "absolute inset-0 -z-10",
                theme === "dark" ? "bg-cobalt/20" : "bg-blue-200/55",
              )}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
            />
          ) : null}
          {preset}
        </button>
      ))}
    </div>
  );
}
