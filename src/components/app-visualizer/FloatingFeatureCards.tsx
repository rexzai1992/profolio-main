"use client";

import { motion as Motion } from "framer-motion";

import {
  type AdminOption,
  type DeliveryScopeOption,
  type FeatureOption,
  type MotionOption,
} from "@/components/app-visualizer/types";
import { featureToShortLabel } from "@/components/app-visualizer/utils";

type FloatingFeatureCardsProps = {
  features: FeatureOption[];
  motion: MotionOption;
  adminSystem: AdminOption;
  deliveryScope: DeliveryScopeOption;
  previewTheme: "dark" | "light";
};

const LOOP_SECONDS = 3;

const slots = [
  "left-3 top-3 md:left-6 md:top-6",
  "right-3 top-3 md:right-6 md:top-6",
  "right-3 bottom-6 md:right-8 md:bottom-10",
];

function motionRange(motion: MotionOption) {
  if (motion === "Static UI") {
    return { distance: 0, duration: LOOP_SECONDS };
  }

  if (motion === "Light Animation") {
    return { distance: 6, duration: LOOP_SECONDS };
  }

  return { distance: 10, duration: LOOP_SECONDS };
}

export function FloatingFeatureCards({
  features,
  motion,
  adminSystem,
  previewTheme,
}: FloatingFeatureCardsProps) {
  const visible = features.slice(0, slots.length);
  const drift = motionRange(motion);

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {visible.map((feature, index) => (
        <Motion.div
          key={feature}
          className={"absolute " + slots[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: 1,
            y: [0, -drift.distance, 0],
          }}
          transition={{
            delay: 0.08 * index,
            duration: drift.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className={
              "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide " +
              (previewTheme === "dark"
                ? "border border-white/14 bg-black/38 text-steel/95"
                : "border border-slate-300/80 bg-white/90 text-slate-700")
            }
          >
            {featureToShortLabel(feature)}
          </div>
        </Motion.div>
      ))}

      {adminSystem !== "No Admin Panel" ? (
        <Motion.div
          className="absolute right-4 top-1/2 hidden -translate-y-1/2 md:block"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0, y: [0, -drift.distance, 0] }}
          transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className={
              "rounded-xl px-2.5 py-1.5 text-[10px] font-semibold " +
              (previewTheme === "dark"
                ? "border border-white/14 bg-black/38 text-white/95"
                : "border border-slate-300 bg-white/92 text-slate-800")
            }
          >
            Admin Live
          </div>
        </Motion.div>
      ) : null}
    </div>
  );
}
