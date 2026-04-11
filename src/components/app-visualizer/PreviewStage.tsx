"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { CameraPresetControls } from "@/components/app-visualizer/CameraPresetControls";
import { DeviceScene } from "@/components/app-visualizer/DeviceScene";
import { FloatingFeatureCards } from "@/components/app-visualizer/FloatingFeatureCards";
import { PremiumPreviewBackdrop } from "@/components/app-visualizer/premium-preview-backdrop";
import type { VisualizerState } from "@/components/app-visualizer/types";
import { cn } from "@/lib/utils";

type PreviewStageProps = {
  state: VisualizerState;
  onCameraChange: (preset: VisualizerState["cameraPreset"]) => void;
  previewTheme: "dark" | "light";
  onThemeChange: (theme: "dark" | "light") => void;
  className?: string;
};

export function PreviewStage({
  state,
  onCameraChange,
  previewTheme,
  onThemeChange,
  className,
}: PreviewStageProps) {
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const transform = reduceMotion
    ? "none"
    : `perspective(1300px) rotateX(${tilt.y * -2.4}deg) rotateY(${tilt.x * 2.8}deg)`;

  return (
    <section
      aria-label="Build preview stage"
      className={cn(
        "flex h-full flex-col rounded-3xl border p-4 sm:p-5",
        previewTheme === "dark"
          ? "border-white/10 bg-[#090d15] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
          : "border-slate-300/70 bg-[#f7f8fa] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.18em]",
              previewTheme === "dark" ? "text-cobalt" : "text-slate-700",
            )}
          >
            Live Preview Stage
          </p>
          <p
            className={cn(
              "mt-1 text-sm",
              previewTheme === "dark" ? "text-steel/85" : "text-slate-600",
            )}
          >
            Device ecosystem updates instantly as you configure scope.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <div
            role="group"
            aria-label="Preview theme"
            className={cn(
              "inline-flex items-center rounded-full border p-1",
              previewTheme === "dark"
                ? "border-white/20 bg-black/30"
                : "border-slate-300 bg-white/90",
            )}
          >
            <button
              type="button"
              onClick={() => onThemeChange("dark")}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition",
                previewTheme === "dark"
                  ? "bg-[#0b1222] text-white"
                  : "text-slate-600 hover:text-slate-900",
              )}
            >
              Dark
            </button>
            <button
              type="button"
              onClick={() => onThemeChange("light")}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition",
                previewTheme === "light"
                  ? "bg-white text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                  : "text-slate-500 hover:text-slate-800",
              )}
            >
              White
            </button>
          </div>
          <CameraPresetControls
            value={state.cameraPreset}
            onChange={onCameraChange}
            theme={previewTheme}
          />
        </div>
      </div>

      <motion.div
        className={cn(
          "relative mt-4 flex-1 overflow-hidden rounded-2xl border",
          previewTheme === "dark"
            ? "border-white/10 bg-[#0b111b] shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_18px_30px_-28px_rgba(0,0,0,0.75)]"
            : "border-slate-300/80 bg-[#eef2f6] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_14px_28px_-24px_rgba(15,23,42,0.2)]",
        )}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: [0.2, 0.75, 0.2, 1] }}
      >
        <PremiumPreviewBackdrop
          previewTheme={previewTheme}
          motionMode={state.motion}
          tilt={tilt}
        />

        <div
          className="relative z-10"
          style={{ transform, transformStyle: "preserve-3d", transition: "transform 220ms ease-out" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <DeviceScene
            platforms={state.platforms}
            designStyle={state.designStyle}
            motion={state.motion}
            adminSystem={state.adminSystem}
            deliveryScope={state.deliveryScope}
            features={state.features}
            cameraPreset={state.cameraPreset}
            previewTheme={previewTheme}
          />
          <FloatingFeatureCards
            features={state.features}
            motion={state.motion}
            adminSystem={state.adminSystem}
            deliveryScope={state.deliveryScope}
            previewTheme={previewTheme}
          />
        </div>
      </motion.div>
    </section>
  );
}
