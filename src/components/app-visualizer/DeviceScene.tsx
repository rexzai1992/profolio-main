"use client";

import { motion as Motion } from "framer-motion";

import type {
  AdminOption,
  CameraPreset,
  DeliveryScopeOption,
  DesignStyleOption,
  FeatureOption,
  MotionOption,
  PlatformOption,
} from "@/components/app-visualizer/types";
import { cn } from "@/lib/utils";

type DeviceSceneProps = {
  platforms: PlatformOption[];
  designStyle: DesignStyleOption;
  motion: MotionOption;
  adminSystem: AdminOption;
  deliveryScope: DeliveryScopeOption;
  features: FeatureOption[];
  cameraPreset: CameraPreset;
  previewTheme: "dark" | "light";
};

const LOOP_SECONDS = 3;

const styleTone: Record<
  DesignStyleOption,
  {
    accent: string;
    soft: string;
    chip: string;
    shell: string;
    screen: string;
  }
> = {
  Minimal: {
    accent: "bg-slate-200/80",
    soft: "bg-slate-100/10",
    chip: "bg-slate-100/10",
    shell: "from-[#181c26] to-[#0f141d]",
    screen: "from-[#151a25] to-[#101620]",
  },
  Modern: {
    accent: "bg-blue-200/75",
    soft: "bg-blue-200/16",
    chip: "bg-blue-200/16",
    shell: "from-[#192034] to-[#101827]",
    screen: "from-[#161f33] to-[#101a29]",
  },
  Premium: {
    accent: "bg-gradient-to-r from-blue-200/75 to-indigo-200/65",
    soft: "bg-indigo-100/16",
    chip: "bg-indigo-100/16",
    shell: "from-[#1a1f33] to-[#101626]",
    screen: "from-[#182038] to-[#10192b]",
  },
  Corporate: {
    accent: "bg-slate-200/72",
    soft: "bg-slate-100/14",
    chip: "bg-slate-100/14",
    shell: "from-[#181d28] to-[#101620]",
    screen: "from-[#151c2a] to-[#101827]",
  },
};

function includesFeature(features: FeatureOption[], value: FeatureOption) {
  return features.includes(value);
}

function motionSettings(motion: MotionOption) {
  if (motion === "Static UI") {
    return {
      distance: 0,
      pulse: [1, 1, 1] as number[],
      duration: LOOP_SECONDS,
    };
  }

  if (motion === "Light Animation") {
    return {
      distance: 5,
      pulse: [1, 1.008, 1] as number[],
      duration: LOOP_SECONDS,
    };
  }

  return {
    distance: 9,
    pulse: [1, 1.016, 1] as number[],
    duration: LOOP_SECONDS,
  };
}

function desktopPose(cameraPreset: CameraPreset) {
  switch (cameraPreset) {
    case "Desktop Focus":
      return { x: 0, y: -6, scale: 1.08, rotateX: -1, rotateY: -2 };
    case "Mobile Focus":
      return { x: -12, y: 10, scale: 0.9, rotateX: -2, rotateY: -4 };
    case "Full View":
      return { x: 0, y: 0, scale: 0.98, rotateX: -1, rotateY: -3 };
    default:
      return { x: 0, y: 2, scale: 1, rotateX: -1, rotateY: -3 };
  }
}

function mobilePose(cameraPreset: CameraPreset, side: "left" | "right") {
  const dir = side === "left" ? -1 : 1;

  switch (cameraPreset) {
    case "Mobile Focus":
      return { x: 0, y: -2, scale: 1.1, rotateY: dir * 5, rotateX: 2 };
    case "Desktop Focus":
      return { x: dir * 24, y: 12, scale: 0.88, rotateY: dir * 11, rotateX: 4 };
    case "Full View":
      return { x: dir * 12, y: 8, scale: 0.95, rotateY: dir * 8, rotateX: 3 };
    default:
      return { x: dir * 14, y: 4, scale: 0.98, rotateY: dir * 8, rotateX: 3 };
  }
}

function ScreenChip({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-semibold text-steel",
        className,
      )}
    >
      {text}
    </span>
  );
}

function scopeBadgeText(deliveryScope: DeliveryScopeOption) {
  const map: Record<DeliveryScopeOption, string> = {
    "UI/UX Design Only": "Design Deliverables",
    "Frontend Only": "Frontend Build",
    "Full System": "Frontend + Backend",
    "Full System + Admin": "Full Product Ecosystem",
  };

  return map[deliveryScope];
}

function DesktopScreen({
  adminSystem,
  features,
  designStyle,
  deliveryScope,
  motion,
}: {
  adminSystem: AdminOption;
  features: FeatureOption[];
  designStyle: DesignStyleOption;
  deliveryScope: DeliveryScopeOption;
  motion: MotionOption;
}) {
  const tone = styleTone[designStyle];
  const active = motionSettings(motion);
  const hasAnalytics = includesFeature(features, "Analytics");
  const hasChat = includesFeature(features, "Chat / Inbox");
  const hasBooking = includesFeature(features, "Booking");
  const hasPayment = includesFeature(features, "Payment");
  const hasAuth = includesFeature(features, "Authentication");

  if (adminSystem === "No Admin Panel") {
    return (
      <div
        className={cn(
          "h-full w-full rounded-[16px] border border-white/10 bg-gradient-to-b p-3",
          tone.screen,
        )}
      >
        <div className="mb-2 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-steel/85">
            Product Frontend
          </p>
          <span className="rounded-full border border-blue-200/35 bg-blue-200/14 px-2 py-0.5 text-[9px] font-semibold uppercase text-blue-100">
            Web Experience
          </span>
        </div>

        <Motion.div
          className={cn("rounded-xl border border-white/10 p-3", tone.soft)}
          animate={{ y: [0, -active.distance * 0.3, 0] }}
          transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-[11px] font-semibold text-white">AI Photobooth Event Landing</p>
          <p className="mt-1 text-[10px] leading-relaxed text-steel/85">
            Capture moments, generate branded outputs, and deliver instantly to guests.
          </p>
          <div className="mt-2 inline-flex rounded-full border border-white/15 bg-white/[0.08] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-white">
            Start Session
          </div>
        </Motion.div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <p className="text-[9px] uppercase tracking-wide text-steel/70">Sessions</p>
            <p className="mt-1 text-sm font-semibold text-white">284</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <p className="text-[9px] uppercase tracking-wide text-steel/70">Conversion</p>
            <p className="mt-1 text-sm font-semibold text-white">38%</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <p className="text-[9px] uppercase tracking-wide text-steel/70">Satisfaction</p>
            <p className="mt-1 text-sm font-semibold text-white">4.9/5</p>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <p className="text-[9px] uppercase tracking-wide text-steel/70">Trust signals</p>
            <ul className="mt-1 space-y-1 text-[10px] text-steel/90">
              <li>Secure checkout ready</li>
              <li>Fast launch timeline</li>
              <li>Business-first product scope</li>
            </ul>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <p className="text-[9px] uppercase tracking-wide text-steel/70">Flow</p>
            <ul className="mt-1 space-y-1 text-[10px] text-steel/90">
              <li>Discover</li>
              <li>Book / Pay</li>
              <li>Receive output</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const isCms = adminSystem === "CMS / Editable Content System";
  const isBasic = adminSystem === "Basic Admin";

  return (
    <div
      className={cn(
        "relative h-full w-full rounded-[16px] border border-white/10 bg-gradient-to-b p-3",
        tone.screen,
      )}
    >
      <div className="grid h-full grid-cols-[76px_1fr] gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2">
          <div className={cn("h-6 rounded-md", tone.accent)} />
          <div className="mt-2 space-y-1.5 text-[9px] font-semibold uppercase tracking-wide text-steel/75">
            <p>Overview</p>
            <p>Orders</p>
            <p>Bookings</p>
            <p>Inbox</p>
            <p>Settings</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
            <div>
              <p className="text-[9px] uppercase tracking-wide text-steel/70">
                {isBasic ? "Basic Admin" : isCms ? "CMS Dashboard" : "Operations Command"}
              </p>
              <p className="text-[10px] font-semibold text-white">Good morning, Izzul</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-200/80" />
              <span className="h-2 w-2 rounded-full bg-blue-200/70" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
            </div>
          </div>

          <div className={cn("grid gap-2", isBasic ? "grid-cols-2" : "grid-cols-3")}>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
              <p className="text-[9px] uppercase tracking-wide text-steel/70">Revenue</p>
              <p className="mt-1 text-sm font-semibold text-white">$42,380</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
              <p className="text-[9px] uppercase tracking-wide text-steel/70">Active Users</p>
              <p className="mt-1 text-sm font-semibold text-white">1,204</p>
            </div>
            {isBasic ? null : (
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
                <p className="text-[9px] uppercase tracking-wide text-steel/70">Tickets</p>
                <p className="mt-1 text-sm font-semibold text-white">18 Open</p>
              </div>
            )}
          </div>

          <div className={cn("grid gap-2", isBasic ? "grid-cols-1" : "grid-cols-[1.2fr_1fr]")}>
            {hasAnalytics ? (
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
                <p className="text-[9px] uppercase tracking-wide text-steel/70">Analytics</p>
                <p className="text-[10px] font-semibold text-white">Weekly performance</p>
                <div className="mt-2 flex items-end gap-1">
                  <Motion.div
                    className="h-4 w-2 rounded bg-blue-200/55"
                    animate={{ height: [10, 14, 10] }}
                    transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <Motion.div
                    className="h-6 w-2 rounded bg-blue-200/75"
                    animate={{ height: [16, 24, 16] }}
                    transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <Motion.div
                    className="h-3 w-2 rounded bg-blue-200/45"
                    animate={{ height: [9, 14, 9] }}
                    transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <Motion.div
                    className="h-7 w-2 rounded bg-blue-200/85"
                    animate={{ height: [18, 26, 18] }}
                    transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
                <p className="text-[9px] uppercase tracking-wide text-steel/70">Activity</p>
                <div className="mt-2 space-y-1 text-[10px] text-steel/90">
                  <p>New customer onboarded</p>
                  <p>Proposal accepted</p>
                  <p>App version deployed</p>
                </div>
              </div>
            )}

            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
              <p className="text-[9px] uppercase tracking-wide text-steel/70">Enabled modules</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {hasChat ? (
                  <ScreenChip text="Inbox" className={tone.chip} />
                ) : null}
                {hasBooking ? (
                  <ScreenChip text="Calendar" className={tone.chip} />
                ) : null}
                {hasPayment ? (
                  <ScreenChip text="Checkout" className={tone.chip} />
                ) : null}
                {includesFeature(features, "E-commerce") ? (
                  <ScreenChip text="Catalog" className={tone.chip} />
                ) : null}
                {includesFeature(features, "File Upload") ? (
                  <ScreenChip text="Upload" className={tone.chip} />
                ) : null}
                {hasAuth ? (
                  <ScreenChip text="Auth" className={tone.chip} />
                ) : null}
              </div>

              <div className="mt-2 space-y-1 text-[10px] leading-relaxed text-steel/90">
                {hasChat ? <p>Inbox SLA within 2h for new leads.</p> : null}
                {hasBooking ? <p>Today: 14 confirmed booking slots.</p> : null}
                {hasPayment ? <p>Latest payment settled successfully.</p> : null}
                {!hasChat && !hasBooking && !hasPayment ? (
                  <p>Select modules to expand the workflow view.</p>
                ) : null}
              </div>
            </div>
          </div>

          {includesFeature(features, "Multi-user Roles") ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5">
              <span className="h-5 w-5 rounded-full bg-blue-200/40" />
              <span className="h-5 w-5 rounded-full bg-slate-300/35" />
              <span className="h-5 w-5 rounded-full bg-zinc-300/30" />
              <span className="text-[10px] font-semibold uppercase tracking-wide text-steel/90">
                Roles & Team Access
              </span>
            </div>
          ) : null}

          {includesFeature(features, "Push Notifications") ? (
            <Motion.div
              className="rounded-lg border border-blue-200/30 bg-blue-100/10 px-2 py-1.5 text-[10px] font-semibold text-blue-100"
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
            >
              Live notification workflow enabled
            </Motion.div>
          ) : null}

          {includesFeature(features, "File Upload") ? (
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
              <div className="h-1.5 rounded-full bg-white/15">
                <Motion.div
                  className="h-full rounded-full bg-blue-200/80"
                  animate={{ width: ["18%", "84%", "18%"] }}
                  transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          ) : null}

          {isCms ? (
            <div className="flex gap-2 rounded-lg border border-blue-200/32 bg-blue-100/10 p-2 text-[10px] font-semibold text-blue-100">
              <span className="rounded-full bg-blue-200/22 px-2 py-0.5">Editable Block</span>
              <span className="rounded-full bg-blue-200/22 px-2 py-0.5">Content Slot</span>
            </div>
          ) : null}

          {includesFeature(features, "AI Assistant") ? (
            <Motion.div
              className="rounded-lg border border-blue-200/35 bg-blue-100/10 px-2 py-1.5 text-[10px] font-semibold text-slate-100"
              animate={{ opacity: [0.88, 1, 0.88] }}
              transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
            >
              AI assistant suggestions active
            </Motion.div>
          ) : null}

          <div className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-steel/85">
              {scopeBadgeText(deliveryScope)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileScreen({
  platform,
  features,
  designStyle,
  motion,
}: {
  platform: "iOS" | "Android";
  features: FeatureOption[];
  designStyle: DesignStyleOption;
  motion: MotionOption;
}) {
  const tone = styleTone[designStyle];
  const active = motionSettings(motion);
  const isIOS = platform === "iOS";
  const hasAnalytics = includesFeature(features, "Analytics");
  const hasChat = includesFeature(features, "Chat / Inbox");
  const hasBooking = includesFeature(features, "Booking");
  const hasPayment = includesFeature(features, "Payment");
  const hasAuth = includesFeature(features, "Authentication");

  return (
    <div className={cn("relative h-full w-full", isIOS ? "px-1 py-1" : "p-0") }>
      <div
        className={cn(
          "relative h-full w-full overflow-hidden border bg-gradient-to-b p-2",
          isIOS
            ? "rounded-[38px] border-white/28 from-[#1a1f31] to-[#0d111b] shadow-[0_26px_60px_-40px_rgba(0,0,0,0.72)]"
            : "rounded-[24px] border-white/18 from-[#151c2a] to-[#0b111c] shadow-[0_22px_54px_-38px_rgba(0,0,0,0.66)]",
        )}
      >
        {isIOS ? (
          <>
            <Motion.div
              className="absolute left-1/2 top-1.5 h-5 -translate-x-1/2 rounded-full border border-white/20 bg-black/90"
              animate={{ width: motion === "Advanced Motion" ? [74, 94, 74] : [78, 86, 78] }}
              transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="absolute right-1 top-10 h-9 w-[2px] rounded-full bg-white/25" />
            <span className="absolute right-1 top-20 h-12 w-[2px] rounded-full bg-white/20" />
          </>
        ) : (
          <>
            <span className="absolute left-1/2 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-white/20 bg-black/90" />
            <span className="absolute right-0.5 top-16 h-12 w-[2px] rounded-full bg-white/18" />
          </>
        )}

        <div
          className={cn(
            "relative h-full overflow-hidden border border-white/10 bg-gradient-to-b p-2.5",
            isIOS ? "rounded-[30px]" : "rounded-[18px]",
            tone.screen,
          )}
        >
          <div className="mb-1 flex items-center justify-between text-[9px] text-steel/80">
            <span>9:41</span>
            <span>{platform === "iOS" ? "5G" : "LTE"} 100%</span>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-wide text-steel/70">Client App</p>
              <p className="text-[11px] font-semibold text-white">Event Companion</p>
            </div>
            <span className="h-6 w-6 rounded-full bg-blue-200/35" />
          </div>

          <Motion.div
            className={cn("rounded-xl border border-white/10 p-2.5", tone.soft)}
            animate={{ y: [0, -active.distance * 0.25, 0], scale: active.pulse }}
            transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-[10px] font-semibold text-white">
              {platform === "iOS" ? "Premium iOS Experience" : "Android Field Experience"}
            </p>
            <p className="mt-1 text-[9px] leading-relaxed text-steel/85">
              Real-time flows for bookings, payments, and team operations.
            </p>
          </Motion.div>

          <div className="mt-2 space-y-1.5">
            {hasAuth ? (
              <ScreenChip text="Secure Auth" className={tone.chip} />
            ) : null}

            {hasChat ? (
              <div className="rounded-lg border border-white/10 bg-white/6 p-2">
                <p className="text-[9px] uppercase tracking-wide text-steel/70">Inbox</p>
                <p className="mt-1 text-[10px] text-steel/90">2 unread client conversations</p>
              </div>
            ) : null}

            {hasBooking ? (
              <div className="rounded-lg border border-white/10 bg-white/6 p-2">
                <p className="text-[9px] uppercase tracking-wide text-steel/70">Booking</p>
                <p className="mt-1 text-[10px] text-steel/90">Next slot: 3:30 PM - Studio A</p>
              </div>
            ) : null}

            {hasPayment ? (
              <div className="rounded-lg border border-white/10 bg-white/6 p-2">
                <p className="text-[9px] uppercase tracking-wide text-steel/70">Payment</p>
                <p className="mt-1 text-[10px] font-semibold text-white">$120 paid - Order #3182</p>
              </div>
            ) : null}

            {hasAnalytics ? (
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
                <p className="text-[9px] uppercase tracking-wide text-steel/70">Performance</p>
                <div className="mt-1 flex items-end gap-1">
                  <Motion.div
                    className="h-3 w-1.5 rounded bg-blue-200/65"
                    animate={{ height: [8, 14, 8] }}
                    transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <Motion.div
                    className="h-5 w-1.5 rounded bg-blue-200/82"
                    animate={{ height: [10, 20, 10] }}
                    transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <Motion.div
                    className="h-4 w-1.5 rounded bg-blue-200/58"
                    animate={{ height: [9, 16, 9] }}
                    transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <Motion.div
                    className="h-6 w-1.5 rounded bg-blue-200/88"
                    animate={{ height: [11, 22, 11] }}
                    transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            ) : null}

            {includesFeature(features, "Multi-user Roles") ? (
              <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-2 py-1.5">
                <span className="h-4 w-4 rounded-full bg-blue-200/45" />
                <span className="h-4 w-4 rounded-full bg-slate-300/40" />
                <span className="h-4 w-4 rounded-full bg-zinc-300/35" />
              </div>
            ) : null}

            {includesFeature(features, "File Upload") ? (
              <div className="rounded-lg bg-white/[0.04] p-2">
                <div className="h-1.5 rounded-full bg-white/15">
                  <Motion.div
                    className="h-full rounded-full bg-blue-200/80"
                    animate={{ width: ["20%", "88%", "20%"] }}
                    transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            ) : null}
          </div>

          {includesFeature(features, "Push Notifications") ? (
            <Motion.div
              className="absolute right-2 top-11 rounded-lg border border-slate-300/40 bg-slate-200/12 px-2 py-1 text-[9px] font-semibold text-slate-100"
              animate={{ y: [0, -6, 0], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
            >
              New alert
            </Motion.div>
          ) : null}

          {includesFeature(features, "AI Assistant") ? (
            <Motion.div
              className="absolute bottom-2 right-2 h-8 w-8 rounded-full border border-blue-200/45 bg-blue-100/20"
              animate={{ scale: [1, 1.16, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}

          <div className="absolute bottom-2 left-2 right-2 grid grid-cols-4 rounded-lg border border-white/10 bg-black/35 px-2 py-1.5 text-[8px] font-semibold uppercase tracking-wide text-steel/70">
            <span className="text-center text-white">Home</span>
            <span className="text-center">Inbox</span>
            <span className="text-center">Cal</span>
            <span className="text-center">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeviceScene({
  platforms,
  designStyle,
  motion,
  adminSystem,
  deliveryScope,
  features,
  cameraPreset,
  previewTheme,
}: DeviceSceneProps) {
  const showDesktop =
    platforms.includes("Web App") ||
    platforms.includes("PWA") ||
    adminSystem !== "No Admin Panel";
  const showIOS = platforms.includes("iOS App");
  const showAndroid = platforms.includes("Android App");

  const desktopTarget = desktopPose(cameraPreset);
  const iosTarget = mobilePose(cameraPreset, "right");
  const androidTarget = mobilePose(cameraPreset, "left");
  const tone = styleTone[designStyle];
  const active = motionSettings(motion);

  return (
    <div className="relative h-full min-h-[420px] w-full">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(120deg,rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px]",
          previewTheme === "dark" ? "opacity-[0.06]" : "opacity-[0.04]",
        )}
      />

      {showDesktop ? (
        <Motion.div
          className="absolute left-[16%] top-[18%] w-[58%]"
          animate={desktopTarget}
          transition={{ type: "spring", stiffness: 170, damping: 26 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Motion.div
            animate={{ y: [0, -active.distance * 0.35, 0], scale: active.pulse }}
            transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className={cn(
                "rounded-[24px] border border-white/15 bg-gradient-to-b p-2 shadow-[0_30px_64px_-44px_rgba(0,0,0,0.78)]",
                tone.shell,
              )}
            >
              <DesktopScreen
                adminSystem={adminSystem}
                features={features}
                designStyle={designStyle}
                deliveryScope={deliveryScope}
                motion={motion}
              />
            </div>
            <div className="mx-auto mt-2 h-2 w-28 rounded-full bg-white/20" />
          </Motion.div>
        </Motion.div>
      ) : null}

      {showAndroid ? (
        <Motion.div
          className={cn(
            "absolute top-[36%] h-[43%] max-h-[280px] min-h-[205px] aspect-[9/18] w-auto",
            showDesktop ? "left-[7%]" : "left-[21%]",
          )}
          animate={androidTarget}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Motion.div
            animate={{ y: [0, -active.distance, 0], scale: active.pulse }}
            transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
          >
            <MobileScreen
              platform="Android"
              features={features}
              designStyle={designStyle}
              motion={motion}
            />
          </Motion.div>
        </Motion.div>
      ) : null}

      {showIOS ? (
        <Motion.div
          className={cn(
            "absolute top-[31%] h-[44%] max-h-[288px] min-h-[210px] aspect-[9/18] w-auto",
            showDesktop ? "right-[9%]" : "right-[21%]",
          )}
          animate={iosTarget}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Motion.div
            animate={{ y: [0, -active.distance * 1.05, 0], scale: active.pulse }}
            transition={{ duration: LOOP_SECONDS, repeat: Infinity, ease: "easeInOut" }}
          >
            <MobileScreen
              platform="iOS"
              features={features}
              designStyle={designStyle}
              motion={motion}
            />
          </Motion.div>
        </Motion.div>
      ) : null}
    </div>
  );
}
