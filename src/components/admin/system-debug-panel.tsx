"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type SystemMetrics = {
  updatedAt: string;
  cpu: {
    usagePercent: number;
    temperatureC: number | null;
  };
  ram: {
    usedBytes: number;
    totalBytes: number;
    usagePercent: number;
  };
  gpu: {
    name: string;
    vendor: string;
    usagePercent: number | null;
    temperatureC: number | null;
  } | null;
};

const POLL_INTERVAL_MS = 8000;

function formatPercent(value: number | null) {
  if (value === null) {
    return "N/A";
  }

  return `${value.toFixed(1)}%`;
}

function formatTemperature(value: number | null) {
  if (value === null) {
    return "N/A";
  }

  return `${value.toFixed(1)} C`;
}

function formatBytesToGb(value: number) {
  const gb = value / (1024 ** 3);

  if (gb >= 100) {
    return `${gb.toFixed(0)} GB`;
  }

  if (gb >= 10) {
    return `${gb.toFixed(1)} GB`;
  }

  return `${gb.toFixed(2)} GB`;
}

function MetricRow({
  label,
  value,
  mutedValue,
  isDark,
}: {
  label: string;
  value: string;
  mutedValue?: string;
  isDark: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border px-3 py-2 text-xs",
        isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-300 bg-slate-50",
      )}
    >
      <span className={cn("font-medium", isDark ? "text-steel/90" : "text-slate-600")}>{label}</span>
      <span className={cn("font-semibold", isDark ? "text-white" : "text-slate-900")}>
        {value}
        {mutedValue ? (
          <span className={cn("ml-1 font-medium", isDark ? "text-steel/80" : "text-slate-500")}>
            {mutedValue}
          </span>
        ) : null}
      </span>
    </div>
  );
}

export function SystemDebugPanel({ isDark }: { isDark: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMetrics = useCallback(async (): Promise<SystemMetrics> => {
    const response = await fetch("/api/debug/system", { cache: "no-store" });
    const payload = (await response.json()) as SystemMetrics & { error?: string };

    if (!response.ok || payload.error) {
      throw new Error(payload.error || `Request failed (${response.status})`);
    }

    return payload;
  }, []);

  const refreshNow = useCallback(async () => {
    setIsLoading(true);

    try {
      const nextMetrics = await loadMetrics();
      setMetrics(nextMetrics);
      setError(null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load system metrics.");
    } finally {
      setIsLoading(false);
    }
  }, [loadMetrics]);

  const refreshBackground = useCallback(async () => {
    try {
      const nextMetrics = await loadMetrics();
      setMetrics(nextMetrics);
      setError(null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load system metrics.");
    }
  }, [loadMetrics]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    void refreshNow();

    const intervalId = window.setInterval(() => {
      if (document.hidden) {
        return;
      }

      void refreshBackground();
    }, POLL_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isOpen, refreshBackground, refreshNow]);

  const updatedAtLabel = useMemo(() => {
    if (!metrics) {
      return "Waiting for first sample...";
    }

    return `Updated ${new Date(metrics.updatedAt).toLocaleTimeString()}`;
  }, [metrics]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Toggle debug metrics"
        className={cn(
          "fixed bottom-5 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full border shadow-xl backdrop-blur transition",
          isDark
            ? "border-white/20 bg-[#0a1220]/90 text-white hover:border-cobalt/60"
            : "border-slate-300 bg-white/95 text-slate-900 hover:border-blue-300",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 13h4l2-5 4 10 2-5h4" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </button>

      {isOpen ? (
        <div
          className={cn(
            "fixed bottom-24 right-5 z-[80] w-[min(92vw,380px)] rounded-2xl border p-4 shadow-2xl",
            isDark ? "border-white/10 bg-[#090d15]/95" : "border-slate-300/80 bg-white/95",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-slate-900")}>
                Debug System Metrics
              </p>
              <p className={cn("mt-1 text-xs", isDark ? "text-steel/80" : "text-slate-600")}>
                CPU, RAM, and GPU telemetry from this machine.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  void refreshNow();
                }}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-semibold transition",
                  isDark
                    ? "border-white/20 bg-white/[0.05] text-white hover:border-cobalt/60"
                    : "border-slate-300 bg-white text-slate-800 hover:border-blue-300",
                )}
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-semibold transition",
                  isDark
                    ? "border-white/20 bg-white/[0.05] text-white hover:border-red-400/70"
                    : "border-slate-300 bg-white text-slate-800 hover:border-red-300",
                )}
              >
                Close
              </button>
            </div>
          </div>

          <p className={cn("mt-3 text-[11px]", isDark ? "text-steel/80" : "text-slate-500")}>{updatedAtLabel}</p>

          {error ? (
            <div
              className={cn(
                "mt-3 rounded-lg border px-3 py-2 text-xs",
                isDark
                  ? "border-red-400/40 bg-red-500/10 text-red-200"
                  : "border-red-300 bg-red-50 text-red-700",
              )}
            >
              {error}
            </div>
          ) : null}

          <div className="mt-3 space-y-2">
            <MetricRow
              label="CPU Usage"
              value={metrics ? formatPercent(metrics.cpu.usagePercent) : isLoading ? "Loading..." : "N/A"}
              isDark={isDark}
            />
            <MetricRow
              label="CPU Temp"
              value={metrics ? formatTemperature(metrics.cpu.temperatureC) : isLoading ? "Loading..." : "N/A"}
              isDark={isDark}
            />
            <MetricRow
              label="RAM Usage"
              value={metrics ? formatPercent(metrics.ram.usagePercent) : isLoading ? "Loading..." : "N/A"}
              mutedValue={
                metrics
                  ? `(${formatBytesToGb(metrics.ram.usedBytes)} / ${formatBytesToGb(metrics.ram.totalBytes)})`
                  : undefined
              }
              isDark={isDark}
            />
            <MetricRow
              label="GPU"
              value={metrics?.gpu?.name ?? (isLoading ? "Loading..." : "N/A")}
              mutedValue={metrics?.gpu ? `(${metrics.gpu.vendor})` : undefined}
              isDark={isDark}
            />
            <MetricRow
              label="GPU Usage"
              value={metrics ? formatPercent(metrics.gpu?.usagePercent ?? null) : isLoading ? "Loading..." : "N/A"}
              isDark={isDark}
            />
            <MetricRow
              label="GPU Temp"
              value={metrics ? formatTemperature(metrics.gpu?.temperatureC ?? null) : isLoading ? "Loading..." : "N/A"}
              isDark={isDark}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
