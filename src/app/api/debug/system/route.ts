import { NextResponse } from "next/server";
import si from "systeminformation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type GpuController = {
  model?: string;
  vendor?: string;
  utilizationGpu?: number;
  temperatureGpu?: number;
};

function toOneDecimal(value: number): number {
  return Number(value.toFixed(1));
}

function normalizePercent(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return toOneDecimal(Math.min(Math.max(value, 0), 100));
}

function normalizeOptionalNumber(value: number | null | undefined): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return toOneDecimal(value);
}

function selectGpuController(controllers: GpuController[]): GpuController | null {
  if (controllers.length === 0) {
    return null;
  }

  const withTelemetry = controllers.find(
    (controller) =>
      typeof controller.utilizationGpu === "number" ||
      typeof controller.temperatureGpu === "number",
  );

  return withTelemetry ?? controllers[0];
}

export async function GET() {
  try {
    const [load, cpuTemperature, memory, graphics] = await Promise.all([
      si.currentLoad(),
      si.cpuTemperature(),
      si.mem(),
      si.graphics(),
    ]);

    const usedBytes = Math.max(memory.total - memory.available, 0);
    const usagePercent = memory.total > 0 ? (usedBytes / memory.total) * 100 : 0;
    const gpuController = selectGpuController(graphics.controllers as GpuController[]);

    return NextResponse.json(
      {
        updatedAt: new Date().toISOString(),
        cpu: {
          usagePercent: normalizePercent(load.currentLoad),
          temperatureC: normalizeOptionalNumber(cpuTemperature.main),
        },
        ram: {
          usedBytes,
          totalBytes: memory.total,
          usagePercent: normalizePercent(usagePercent),
        },
        gpu: gpuController
          ? {
              name: gpuController.model?.trim() || "Unknown GPU",
              vendor: gpuController.vendor?.trim() || "Unknown vendor",
              usagePercent: normalizeOptionalNumber(gpuController.utilizationGpu),
              temperatureC: normalizeOptionalNumber(gpuController.temperatureGpu),
            }
          : null,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("Failed to load system metrics", error);
    return NextResponse.json(
      {
        error: "Failed to read system metrics.",
        updatedAt: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      },
    );
  }
}
