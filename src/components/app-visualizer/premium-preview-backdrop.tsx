"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { MotionOption } from "@/components/app-visualizer/types";
import { cn } from "@/lib/utils";

type PremiumPreviewBackdropProps = {
  previewTheme: "dark" | "light";
  motionMode: MotionOption;
  tilt: { x: number; y: number };
};

const particles = [
  { left: "9%", top: "20%", size: 1.5, duration: 22, delay: 0.3 },
  { left: "19%", top: "66%", size: 1.2, duration: 26, delay: 1.1 },
  { left: "31%", top: "33%", size: 1.4, duration: 24, delay: 2.4 },
  { left: "45%", top: "56%", size: 1.2, duration: 21, delay: 0.8 },
  { left: "58%", top: "26%", size: 1.4, duration: 27, delay: 1.7 },
  { left: "71%", top: "72%", size: 1.2, duration: 23, delay: 0.6 },
  { left: "84%", top: "38%", size: 1.4, duration: 25, delay: 1.3 },
  { left: "92%", top: "58%", size: 1.2, duration: 22, delay: 2.1 },
];

function motionAmplitude(motionMode: MotionOption) {
  if (motionMode === "Static UI") {
    return 0.35;
  }

  if (motionMode === "Light Animation") {
    return 1.1;
  }

  return 1.6;
}

export function PremiumPreviewBackdrop({
  previewTheme,
  motionMode,
  tilt,
}: PremiumPreviewBackdropProps) {
  const reduceMotion = useReducedMotion();
  const amp = reduceMotion ? 0 : motionAmplitude(motionMode);
  const backdropTransform =
    amp === 0 ? "none" : `translate3d(${tilt.x * 3.5 * amp}px, ${tilt.y * 2.8 * amp}px, 0)`;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl"
      style={{ transform: backdropTransform, transition: "transform 260ms ease-out" }}
    >
      <div
        className={cn(
          "absolute inset-0",
          previewTheme === "dark"
            ? "bg-[linear-gradient(160deg,#090d15_0%,#0b111c_52%,#0a1018_100%)]"
            : "bg-[linear-gradient(160deg,#f3f6fa_0%,#edf2f7_56%,#e8eef4_100%)]",
        )}
      />

      <motion.div
        className={cn(
          "absolute inset-0",
          previewTheme === "dark"
            ? "bg-[linear-gradient(124deg,transparent_0%,rgba(124,143,185,0.12)_34%,transparent_70%)]"
            : "bg-[linear-gradient(124deg,transparent_0%,rgba(100,116,139,0.1)_34%,transparent_70%)]",
        )}
        animate={amp === 0 ? undefined : { x: [0, 18 * amp, 0], y: [0, -7 * amp, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className={cn(
          "absolute inset-0",
          previewTheme === "dark"
            ? "bg-[linear-gradient(-128deg,transparent_2%,rgba(143,157,188,0.1)_38%,transparent_72%)]"
            : "bg-[linear-gradient(-128deg,transparent_2%,rgba(100,116,139,0.09)_38%,transparent_72%)]",
        )}
        animate={amp === 0 ? undefined : { x: [0, -15 * amp, 0], y: [0, 8 * amp, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className={cn(
          "absolute inset-0",
          previewTheme === "dark"
            ? "bg-[radial-gradient(72%_60%_at_78%_18%,rgba(112,130,172,0.12),transparent_72%)]"
            : "bg-[radial-gradient(72%_60%_at_78%_18%,rgba(100,116,139,0.11),transparent_72%)]",
        )}
        animate={amp === 0 ? undefined : { x: [0, -10 * amp, 0], y: [0, 6 * amp, 0] }}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className={cn(
          "absolute -left-[16%] top-[26%] h-[130%] w-[4%] rotate-[22deg]",
          previewTheme === "dark"
            ? "bg-gradient-to-b from-transparent via-white/[0.035] to-transparent"
            : "bg-gradient-to-b from-transparent via-slate-500/[0.06] to-transparent",
        )}
        animate={amp === 0 ? undefined : { x: [0, 12 * amp, 0], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 31, repeat: Infinity, ease: "easeInOut" }}
      />

      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className={cn(
            "absolute rounded-full",
            previewTheme === "dark" ? "bg-white/18" : "bg-slate-700/18",
          )}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={
            amp === 0
              ? undefined
              : {
                  y: [0, -8.5 * amp, 0],
                  opacity: previewTheme === "dark" ? [0.06, 0.17, 0.06] : [0.06, 0.14, 0.06],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div
        className={cn(
          "absolute inset-0 opacity-[0.045]",
          previewTheme === "dark"
            ? "bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.55)_1px,transparent_0)] [background-size:2px_2px]"
            : "bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.3)_1px,transparent_0)] [background-size:2px_2px]",
        )}
      />

      <div
        className={cn(
          "absolute inset-0",
          previewTheme === "dark"
            ? "bg-[linear-gradient(180deg,rgba(3,8,20,0.04)_0%,rgba(3,8,20,0.2)_100%)]"
            : "bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(226,232,240,0.2)_100%)]",
        )}
      />
    </div>
  );
}
