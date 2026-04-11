import type {
  AdminOption,
  FeatureOption,
  PlatformOption,
  VisualizerState,
} from "@/components/app-visualizer/types";

export function toggleInArray<T extends string>(values: T[], value: T): T[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function ensureAtLeastOnePlatform(
  nextPlatforms: PlatformOption[],
  fallback: PlatformOption,
): PlatformOption[] {
  return nextPlatforms.length === 0 ? [fallback] : nextPlatforms;
}

export function summarizeSelection(state: VisualizerState): string {
  const platforms = state.platforms.join(" + ");
  const featureSummary = state.features.length
    ? state.features.join(", ")
    : "no extra modules";

  return (
    "You selected a " +
    state.designStyle +
    " " +
    platforms +
    " experience with " +
    state.adminSystem +
    ", " +
    state.motion +
    ", " +
    featureSummary +
    "."
  );
}

export function estimateComplexity(state: VisualizerState): {
  label: "Simple" | "Medium" | "Advanced" | "Enterprise";
  score: number;
} {
  let score = 0;

  score += state.platforms.length * 2;
  score += state.features.length;

  const adminScore: Record<AdminOption, number> = {
    "No Admin Panel": 0,
    "Basic Admin": 1,
    "Full Admin Dashboard": 2,
    "CMS / Editable Content System": 3,
  };

  score += adminScore[state.adminSystem];

  if (state.motion === "Light Animation") {
    score += 1;
  }

  if (state.motion === "Advanced Motion") {
    score += 2;
  }

  if (state.deliveryScope === "Full System") {
    score += 2;
  }

  if (state.deliveryScope === "Full System + Admin") {
    score += 3;
  }

  if (score <= 6) {
    return { label: "Simple", score };
  }

  if (score <= 10) {
    return { label: "Medium", score };
  }

  if (score <= 14) {
    return { label: "Advanced", score };
  }

  return { label: "Enterprise", score };
}

export function featureToShortLabel(feature: FeatureOption): string {
  const map: Record<FeatureOption, string> = {
    Authentication: "Auth",
    "Chat / Inbox": "Inbox",
    Booking: "Booking",
    Payment: "Payments",
    Analytics: "Analytics",
    "Push Notifications": "Push",
    "Multi-user Roles": "Roles",
    "AI Assistant": "AI",
    "File Upload": "Upload",
    "E-commerce": "Store",
  };

  return map[feature];
}
