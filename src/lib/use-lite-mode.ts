"use client";

import { useEffect, useState } from "react";

type NavigatorPerformanceHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

export type LiteModeProfile = {
  width: number;
  liteMode: boolean;
  saveData: boolean;
  lowHardware: boolean;
};

const DEFAULT_PROFILE: LiteModeProfile = {
  width: 0,
  liteMode: true,
  saveData: false,
  lowHardware: false,
};

export function useLiteMode(minFullWidth = 1280): LiteModeProfile {
  const [profile, setProfile] = useState<LiteModeProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    const updateProfile = () => {
      const nav = window.navigator as NavigatorPerformanceHints;
      const width = window.innerWidth;
      const saveData = Boolean(nav.connection?.saveData);
      const lowHardware =
        (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
      const liteMode = saveData || lowHardware || width < minFullWidth;

      setProfile({
        width,
        liteMode,
        saveData,
        lowHardware,
      });
    };

    updateProfile();
    window.addEventListener("resize", updateProfile);

    return () => {
      window.removeEventListener("resize", updateProfile);
    };
  }, [minFullWidth]);

  return profile;
}
