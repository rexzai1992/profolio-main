"use client";

import { SystemDebugPanel } from "@/components/admin/system-debug-panel";
import { useTheme } from "@/components/providers/theme-provider";

export function GlobalSystemDebug() {
  const { theme } = useTheme();

  return <SystemDebugPanel isDark={theme === "dark"} />;
}
