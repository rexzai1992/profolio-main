"use client";

import { useMemo, useState } from "react";

import { ConfigPanel } from "@/components/app-visualizer/ConfigPanel";
import { CTAFooter } from "@/components/app-visualizer/CTAFooter";
import { PreviewStage } from "@/components/app-visualizer/PreviewStage";
import { ScopePreviewCard } from "@/components/app-visualizer/ScopePreviewCard";
import { SelectionSummary } from "@/components/app-visualizer/SelectionSummary";
import {
  DEFAULT_VISUALIZER_STATE,
  type VisualizerState,
} from "@/components/app-visualizer/types";
import {
  ensureAtLeastOnePlatform,
  estimateComplexity,
  summarizeSelection,
  toggleInArray,
} from "@/components/app-visualizer/utils";
import { Container } from "@/components/ui/container";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeading } from "@/components/ui/section-heading";

function cloneDefaultState(): VisualizerState {
  return {
    ...DEFAULT_VISUALIZER_STATE,
    platforms: [...DEFAULT_VISUALIZER_STATE.platforms],
    features: [...DEFAULT_VISUALIZER_STATE.features],
  };
}

export function AppVisualizerSection() {
  const [state, setState] = useState<VisualizerState>(() => cloneDefaultState());
  const [previewTheme, setPreviewTheme] = useState<"dark" | "light">("dark");

  const summary = useMemo(() => summarizeSelection(state), [state]);
  const complexity = useMemo(() => estimateComplexity(state), [state]);

  const applyPreviewChange = (updater: (current: VisualizerState) => VisualizerState) => {
    setState((current) => updater(current));
  };

  const handleReset = () => {
    applyPreviewChange(() => cloneDefaultState());
  };

  return (
    <PageSection id="app-visualizer" tone="muted" ariaLabel="App visualizer">
      <Container>
        <SectionHeading
          animate
          eyebrow="App Visualizer"
          title="Your Product, Visualized"
          description="Configure the product you need and instantly preview how the final ecosystem could look across web, mobile, and admin experiences."
        />

        <div className="mt-10 space-y-4 overflow-x-auto pb-1">
          <div className="grid h-[680px] min-w-[1080px] grid-cols-[360px_minmax(0,1fr)] gap-5">
            <ConfigPanel
              className="h-full"
              platforms={state.platforms}
              designStyle={state.designStyle}
              motion={state.motion}
              adminSystem={state.adminSystem}
              features={state.features}
              deliveryScope={state.deliveryScope}
              onPlatformToggle={(platform) => {
                applyPreviewChange((current) => {
                  const toggled = toggleInArray(current.platforms, platform);

                  return {
                    ...current,
                    platforms: ensureAtLeastOnePlatform(toggled, platform),
                  };
                });
              }}
              onDesignStyleChange={(designStyle) => {
                applyPreviewChange((current) => ({ ...current, designStyle }));
              }}
              onMotionChange={(motion) => {
                applyPreviewChange((current) => ({ ...current, motion }));
              }}
              onAdminChange={(adminSystem) => {
                applyPreviewChange((current) => ({ ...current, adminSystem }));
              }}
              onFeaturesToggle={(feature) => {
                applyPreviewChange((current) => ({
                  ...current,
                  features: toggleInArray(current.features, feature),
                }));
              }}
              onDeliveryScopeChange={(deliveryScope) => {
                applyPreviewChange((current) => ({ ...current, deliveryScope }));
              }}
              onReset={handleReset}
            />

            <PreviewStage
              className="h-full"
              state={state}
              previewTheme={previewTheme}
              onThemeChange={setPreviewTheme}
              onCameraChange={(cameraPreset) => {
                applyPreviewChange((current) => ({ ...current, cameraPreset }));
              }}
            />
          </div>

          <div className="grid min-w-[1080px] gap-4 grid-cols-2">
            <SelectionSummary state={state} summary={summary} complexity={complexity} />
            <ScopePreviewCard state={state} />
          </div>

          <div className="min-w-[1080px]">
            <CTAFooter complexityLabel={complexity.label} onReset={handleReset} />
          </div>
        </div>
      </Container>
    </PageSection>
  );
}
