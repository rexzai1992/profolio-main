"use client";

import { useState } from "react";

import { AdminSelector } from "@/components/app-visualizer/AdminSelector";
import { DeliverySelector } from "@/components/app-visualizer/DeliverySelector";
import { FeaturesSelector } from "@/components/app-visualizer/FeaturesSelector";
import { MotionSelector } from "@/components/app-visualizer/MotionSelector";
import { PlatformSelector } from "@/components/app-visualizer/PlatformSelector";
import { StyleSelector } from "@/components/app-visualizer/StyleSelector";
import type {
  AdminOption,
  DeliveryScopeOption,
  DesignStyleOption,
  FeatureOption,
  MotionOption,
  PlatformOption,
} from "@/components/app-visualizer/types";
import { cn } from "@/lib/utils";

type ConfigPanelProps = {
  platforms: PlatformOption[];
  designStyle: DesignStyleOption;
  motion: MotionOption;
  adminSystem: AdminOption;
  features: FeatureOption[];
  deliveryScope: DeliveryScopeOption;
  onPlatformToggle: (value: PlatformOption) => void;
  onDesignStyleChange: (value: DesignStyleOption) => void;
  onMotionChange: (value: MotionOption) => void;
  onAdminChange: (value: AdminOption) => void;
  onFeaturesToggle: (value: FeatureOption) => void;
  onDeliveryScopeChange: (value: DeliveryScopeOption) => void;
  onReset: () => void;
  className?: string;
};

type PanelTab = "core" | "style" | "modules" | "scope";

const panelTabs: { id: PanelTab; label: string }[] = [
  { id: "core", label: "Core" },
  { id: "style", label: "Style" },
  { id: "modules", label: "Modules" },
  { id: "scope", label: "Scope" },
];

export function ConfigPanel({
  platforms,
  designStyle,
  motion,
  adminSystem,
  features,
  deliveryScope,
  onPlatformToggle,
  onDesignStyleChange,
  onMotionChange,
  onAdminChange,
  onFeaturesToggle,
  onDeliveryScopeChange,
  onReset,
  className,
}: ConfigPanelProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>("core");

  return (
    <aside
      className={cn(
        "flex h-full flex-col rounded-3xl border border-white/10 bg-[#060911]/90 p-4 sm:p-5",
        className,
      )}
      aria-label="Build configuration panel"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cobalt">Configuration Panel</p>
          <p className="mt-1 text-sm text-steel/85">Select your ideal product scope and watch the preview adapt in real time.</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition duration-300 hover:border-white/45"
        >
          Reset
        </button>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="sticky top-20 z-10 -mx-1 flex gap-2 overflow-x-auto rounded-xl bg-black/35 px-1 py-1 backdrop-blur-sm">
          {panelTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition duration-300",
                activeTab === tab.id
                  ? "border-cobalt/60 bg-cobalt/15 text-white"
                  : "border-white/15 bg-white/[0.03] text-steel/85",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex-1 space-y-6 overflow-y-auto rounded-2xl border border-white/10 bg-black/25 p-3">
          {activeTab === "core" ? (
            <>
              <p className="text-xs text-steel/75">Choose the main platforms.</p>
              <PlatformSelector selected={platforms} onToggle={onPlatformToggle} />
            </>
          ) : null}

          {activeTab === "style" ? (
            <>
              <p className="text-xs text-steel/75">Set the visual personality and motion level.</p>
              <StyleSelector selected={designStyle} onChange={onDesignStyleChange} />
              <MotionSelector selected={motion} onChange={onMotionChange} />
            </>
          ) : null}

          {activeTab === "modules" ? (
            <>
              <p className="text-xs text-steel/75">
                Configure backend depth and optional features ({features.length} selected).
              </p>
              <AdminSelector selected={adminSystem} onChange={onAdminChange} />
              <FeaturesSelector selected={features} onToggle={onFeaturesToggle} />
            </>
          ) : null}

          {activeTab === "scope" ? (
            <>
              <p className="text-xs text-steel/75">Choose your delivery scope.</p>
              <DeliverySelector selected={deliveryScope} onChange={onDeliveryScopeChange} />
            </>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
