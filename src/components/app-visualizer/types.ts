export const PLATFORM_OPTIONS = ["Web App", "PWA", "Android App", "iOS App"] as const;
export const DESIGN_STYLE_OPTIONS = ["Minimal", "Modern", "Premium", "Corporate"] as const;
export const MOTION_OPTIONS = ["Static UI", "Light Animation", "Advanced Motion"] as const;
export const ADMIN_OPTIONS = [
  "No Admin Panel",
  "Basic Admin",
  "Full Admin Dashboard",
  "CMS / Editable Content System",
] as const;
export const FEATURE_OPTIONS = [
  "Authentication",
  "Chat / Inbox",
  "Booking",
  "Payment",
  "Analytics",
  "Push Notifications",
  "Multi-user Roles",
  "AI Assistant",
  "File Upload",
  "E-commerce",
] as const;
export const DELIVERY_SCOPE_OPTIONS = [
  "UI/UX Design Only",
  "Frontend Only",
  "Full System",
  "Full System + Admin",
] as const;
export const CAMERA_PRESETS = [
  "Full View",
  "Mobile Focus",
  "Desktop Focus",
  "Ecosystem View",
] as const;

export type PlatformOption = (typeof PLATFORM_OPTIONS)[number];
export type DesignStyleOption = (typeof DESIGN_STYLE_OPTIONS)[number];
export type MotionOption = (typeof MOTION_OPTIONS)[number];
export type AdminOption = (typeof ADMIN_OPTIONS)[number];
export type FeatureOption = (typeof FEATURE_OPTIONS)[number];
export type DeliveryScopeOption = (typeof DELIVERY_SCOPE_OPTIONS)[number];
export type CameraPreset = (typeof CAMERA_PRESETS)[number];

export type VisualizerState = {
  platforms: PlatformOption[];
  designStyle: DesignStyleOption;
  motion: MotionOption;
  adminSystem: AdminOption;
  features: FeatureOption[];
  deliveryScope: DeliveryScopeOption;
  cameraPreset: CameraPreset;
};

export const DEFAULT_VISUALIZER_STATE: VisualizerState = {
  platforms: ["Web App", "iOS App"],
  designStyle: "Premium",
  motion: "Light Animation",
  adminSystem: "Full Admin Dashboard",
  features: ["Authentication", "Booking", "Payment", "Analytics"],
  deliveryScope: "Full System + Admin",
  cameraPreset: "Ecosystem View",
};
