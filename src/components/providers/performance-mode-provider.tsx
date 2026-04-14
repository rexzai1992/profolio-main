"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type NavigatorPerformanceHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

export type PerformanceMode = "balanced" | "eco";

const PERFORMANCE_STORAGE_KEY = "izzul-fitree-performance-mode-v1";

type PerformanceModeContextValue = {
  mode: PerformanceMode;
  isEcoMode: boolean;
  setMode: (nextMode: PerformanceMode) => void;
  toggleMode: () => void;
};

const PerformanceModeContext = createContext<PerformanceModeContextValue | undefined>(undefined);

function resolveDefaultMode(): PerformanceMode {
  if (typeof window === "undefined") {
    return "balanced";
  }

  try {
    const stored = window.localStorage.getItem(PERFORMANCE_STORAGE_KEY);
    if (stored === "eco" || stored === "balanced") {
      return stored;
    }
  } catch {
    return "balanced";
  }

  const nav = window.navigator as NavigatorPerformanceHints;
  const saveData = Boolean(nav.connection?.saveData);
  const lowHardware =
    (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;

  return saveData || lowHardware ? "eco" : "balanced";
}

export function PerformanceModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PerformanceMode>("balanced");

  useEffect(() => {
    const initialMode = resolveDefaultMode();
    const rafId = window.requestAnimationFrame(() => {
      setModeState(initialMode);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  const setMode = useCallback((nextMode: PerformanceMode) => {
    setModeState(nextMode);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(PERFORMANCE_STORAGE_KEY, nextMode);
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === "eco" ? "balanced" : "eco");
  }, [mode, setMode]);

  const value = useMemo(
    () => ({
      mode,
      isEcoMode: mode === "eco",
      setMode,
      toggleMode,
    }),
    [mode, setMode, toggleMode],
  );

  return (
    <PerformanceModeContext.Provider value={value}>
      {children}
    </PerformanceModeContext.Provider>
  );
}

export function usePerformanceMode() {
  const context = useContext(PerformanceModeContext);

  if (!context) {
    throw new Error("usePerformanceMode must be used inside PerformanceModeProvider");
  }

  return context;
}
