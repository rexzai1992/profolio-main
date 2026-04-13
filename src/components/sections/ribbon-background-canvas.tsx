"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type RibbonBackgroundCanvasProps = {
  theme: "dark" | "light";
  animate?: boolean;
  className?: string;
};

type Vec = {
  x: number;
  y: number;
};

type RibbonBand = {
  colorA: string;
  colorB: string;
  phase: number;
  width: number;
  twistFreq: number;
  twistAmp: number;
  depth: number;
  driftAmp: number;
  fiberCount: number;
  softness: number;
};

type RibbonRuntimeBand = {
  config: RibbonBand;
  rgbA: Rgb;
  rgbB: Rgb;
  glow: Rgb;
  fibers: FiberProfile[];
};

type FiberProfile = {
  frac: number;
  seedPhase: number;
  widthVariance: number;
  alphaVariance: number;
  offsetVariance: number;
  lineWidthBase: number;
};

type SegmentTable = {
  count: number;
  u: Float32Array;
  nextU: Float32Array;
  taper: Float32Array;
  wave: Float32Array;
};

type SpinePoint = {
  x: number;
  y: number;
  nx: number;
  ny: number;
  tx: number;
  ty: number;
  hw: number;
  u: number;
  twist: number;
};

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type SpineMeta = {
  p0x: number;
  p0y: number;
  p3x: number;
  p3y: number;
  midIndex: number;
};

type RenderQuality = {
  segments: number;
  pointStride: number;
  widthScale: number;
  fiberScale: number;
  dprCap: number;
};

const SEGMENT_TABLE_CACHE = new Map<number, SegmentTable>();

const LIGHT_BANDS: RibbonBand[] = [
  {
    colorA: "#8f7cff",
    colorB: "#6c57f7",
    phase: 0.78,
    width: 140,
    twistFreq: 1.05,
    twistAmp: 0.25,
    depth: 0.18,
    driftAmp: 0.032,
    fiberCount: 64,
    softness: 0.72,
  },
  {
    colorA: "#b56fff",
    colorB: "#7a2fde",
    phase: 0.56,
    width: 154,
    twistFreq: 1.18,
    twistAmp: 0.28,
    depth: 0.32,
    driftAmp: 0.035,
    fiberCount: 70,
    softness: 0.78,
  },
  {
    colorA: "#ef64ab",
    colorB: "#d72274",
    phase: 0.35,
    width: 172,
    twistFreq: 0.92,
    twistAmp: 0.31,
    depth: 0.48,
    driftAmp: 0.038,
    fiberCount: 76,
    softness: 0.86,
  },
  {
    colorA: "#f38f47",
    colorB: "#e45c08",
    phase: 0.16,
    width: 188,
    twistFreq: 1.12,
    twistAmp: 0.35,
    depth: 0.66,
    driftAmp: 0.041,
    fiberCount: 82,
    softness: 0.94,
  },
  {
    colorA: "#e9a93a",
    colorB: "#e98904",
    phase: 0,
    width: 202,
    twistFreq: 1,
    twistAmp: 0.39,
    depth: 0.84,
    driftAmp: 0.044,
    fiberCount: 88,
    softness: 1,
  },
];

const DARK_BANDS: RibbonBand[] = [
  {
    colorA: "#7d73ff",
    colorB: "#635bff",
    phase: 0.78,
    width: 136,
    twistFreq: 1.05,
    twistAmp: 0.24,
    depth: 0.18,
    driftAmp: 0.031,
    fiberCount: 58,
    softness: 0.72,
  },
  {
    colorA: "#9f73ff",
    colorB: "#7c3aed",
    phase: 0.56,
    width: 150,
    twistFreq: 1.18,
    twistAmp: 0.27,
    depth: 0.32,
    driftAmp: 0.034,
    fiberCount: 64,
    softness: 0.78,
  },
  {
    colorA: "#ef6bb2",
    colorB: "#db2777",
    phase: 0.35,
    width: 166,
    twistFreq: 0.92,
    twistAmp: 0.3,
    depth: 0.48,
    driftAmp: 0.037,
    fiberCount: 70,
    softness: 0.86,
  },
  {
    colorA: "#f39a56",
    colorB: "#ea580c",
    phase: 0.16,
    width: 182,
    twistFreq: 1.12,
    twistAmp: 0.34,
    depth: 0.66,
    driftAmp: 0.04,
    fiberCount: 76,
    softness: 0.94,
  },
  {
    colorA: "#eab34c",
    colorB: "#f59e0b",
    phase: 0,
    width: 196,
    twistFreq: 1,
    twistAmp: 0.38,
    depth: 0.84,
    driftAmp: 0.043,
    fiberCount: 82,
    softness: 1,
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function hexToRgb(hex: string): Rgb {
  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  };
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixColor(c1: Rgb, c2: Rgb, t: number): Rgb {
  return {
    r: mix(c1.r, c2.r, t),
    g: mix(c1.g, c2.g, t),
    b: mix(c1.b, c2.b, t),
  };
}

function cubicBezier(p0: Vec, p1: Vec, p2: Vec, p3: Vec, t: number): Vec {
  const mt = 1 - t;

  return {
    x:
      mt * mt * mt * p0.x +
      3 * mt * mt * t * p1.x +
      3 * mt * t * t * p2.x +
      t * t * t * p3.x,
    y:
      mt * mt * mt * p0.y +
      3 * mt * mt * t * p1.y +
      3 * mt * t * t * p2.y +
      t * t * t * p3.y,
  };
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function getSegmentTable(segments: number): SegmentTable {
  const cached = SEGMENT_TABLE_CACHE.get(segments);
  if (cached) {
    return cached;
  }

  const count = segments + 1;
  const u = new Float32Array(count);
  const nextU = new Float32Array(count);
  const taper = new Float32Array(count);
  const wave = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const ratio = i / segments;
    const nextRatio = Math.min(1, ratio + 1 / segments);
    const taperBody = Math.pow(Math.max(0.0001, Math.sin(ratio * Math.PI)), 0.5);
    const edgeStart = smoothstep(0, 0.1, ratio);
    const edgeEnd = 1 - smoothstep(0.9, 1, ratio);
    const edgeBlend = Math.min(edgeStart, edgeEnd);

    u[i] = ratio;
    nextU[i] = nextRatio;
    taper[i] = taperBody * Math.pow(Math.max(0.001, edgeBlend), 0.44);
    wave[i] = ratio * 4.4 * Math.PI;
  }

  const table = { count, u, nextU, taper, wave };
  SEGMENT_TABLE_CACHE.set(segments, table);

  return table;
}

function fiberSeed(i: number) {
  const x = Math.sin(i * 127.1) * 43758.5453123;
  return x - Math.floor(x);
}

function buildFiberProfiles(count: number, phase: number): FiberProfile[] {
  const profiles: FiberProfile[] = [];

  for (let index = 0; index < count; index += 1) {
    const seed = fiberSeed(index + phase * 1000);
    profiles.push({
      frac: count > 1 ? (index / (count - 1)) * 2 - 1 : 0,
      seedPhase: seed * 2 * Math.PI,
      widthVariance: mix(-0.12, 0.14, fiberSeed(index * 3.17 + 2.1)),
      alphaVariance: mix(-0.07, 0.07, fiberSeed(index * 5.31 + 9.2)),
      offsetVariance: mix(-0.02, 0.02, fiberSeed(index * 8.13 + 6.7)),
      lineWidthBase: Math.max(0.48, 0.72 + mix(-0.12, 0.12, fiberSeed(index * 2.9 + 7.4))),
    });
  }

  return profiles;
}

function buildRuntimeBands(
  source: RibbonBand[],
  width: number,
  quality: RenderQuality,
): RibbonRuntimeBand[] {
  return source.map((band) => {
    const scaledBand: RibbonBand = {
      ...band,
      width: band.width * quality.widthScale,
      fiberCount: Math.max(34, Math.round(band.fiberCount * quality.fiberScale)),
    };

    const rgbA = hexToRgb(scaledBand.colorA);
    const rgbB = hexToRgb(scaledBand.colorB);

    return {
      config: scaledBand,
      rgbA,
      rgbB,
      glow: mixColor(rgbA, rgbB, 0.5),
      fibers: buildFiberProfiles(scaledBand.fiberCount, scaledBand.phase + width * 0.0001),
    };
  });
}

function createSpineBuffer(count: number): SpinePoint[] {
  return Array.from({ length: count }, () => ({
    x: 0,
    y: 0,
    nx: 0,
    ny: 0,
    tx: 0,
    ty: 0,
    hw: 0,
    u: 0,
    twist: 0,
  }));
}

function resolveQuality(width: number): RenderQuality {
  if (width < 760) {
    return {
      segments: 56,
      pointStride: 3,
      widthScale: 0.7,
      fiberScale: 0.46,
      dprCap: 1.2,
    };
  }

  if (width < 1100) {
    return {
      segments: 74,
      pointStride: 2,
      widthScale: 0.84,
      fiberScale: 0.64,
      dprCap: 1.45,
    };
  }

  return {
    segments: 92,
    pointStride: 1,
    widthScale: 0.96,
    fiberScale: 0.82,
    dprCap: 1.65,
  };
}

function resolveFrameInterval(width: number) {
  if (width < 760) {
    return 42;
  }

  if (width < 1100) {
    return 28;
  }

  return 18;
}

function buildSpine(
  points: SpinePoint[],
  table: SegmentTable,
  width: number,
  height: number,
  band: RibbonBand,
  timeMs: number,
  meta: SpineMeta,
) {
  const slowT = timeMs * 0.000082;
  const drift1 = Math.sin(slowT * Math.PI * 2 + band.phase * 6.2) * band.driftAmp;
  const drift2 = Math.cos(slowT * Math.PI * 1.34 + band.phase * 4.1) * (band.driftAmp * 0.66);
  const drift3 = Math.sin(slowT * Math.PI * 1.1 + band.phase * 9.1) * (band.driftAmp * 0.5);

  const p0 = { x: width * (1.03 + drift1), y: height * (-0.1 + drift3 * 0.4) };
  const p1 = { x: width * (0.75 + drift2), y: height * (0.11 + band.phase * 0.24) };
  const p2 = { x: width * (0.4 + drift1 * 0.68), y: height * (0.53 + band.phase * 0.12) };
  const p3 = { x: width * (-0.07 + drift2 * 0.78), y: height * (0.99 + band.phase * 0.04) };

  const count = table.count;

  for (let i = 0; i < count; i += 1) {
    const u = table.u[i];
    const c = cubicBezier(p0, p1, p2, p3, u);
    const c2 = cubicBezier(p0, p1, p2, p3, table.nextU[i]);
    const dx = c2.x - c.x;
    const dy = c2.y - c.y;
    const len = Math.hypot(dx, dy) || 1;

    const twist = Math.sin(
      table.u[i] * Math.PI * 2 * band.twistFreq + slowT * Math.PI * 2 + band.phase * 3.1,
    );
    const twistCompression = 1 - band.twistAmp * (1 - Math.abs(twist));
    const point = points[i];

    point.x = c.x;
    point.y = c.y;
    point.nx = -dy / len;
    point.ny = dx / len;
    point.tx = dx / len;
    point.ty = dy / len;
    point.hw = band.width * 0.5 * table.taper[i] * twistCompression;
    point.u = u;
    point.twist = twist;
  }

  meta.p0x = p0.x;
  meta.p0y = p0.y;
  meta.p3x = p3.x;
  meta.p3y = p3.y;
  meta.midIndex = (count / 2) | 0;
}

function drawRibbonBody(
  ctx: CanvasRenderingContext2D,
  points: SpinePoint[],
  count: number,
  meta: SpineMeta,
  runtimeBand: RibbonRuntimeBand,
) {
  if (count === 0) {
    return;
  }

  const { config: band, rgbA, rgbB } = runtimeBand;

  ctx.save();
  ctx.globalAlpha = 0.44 + band.depth * 0.08;

  ctx.beginPath();
  ctx.moveTo(
    points[0].x + points[0].nx * points[0].hw,
    points[0].y + points[0].ny * points[0].hw,
  );
  for (let i = 1; i < count; i += 1) {
    const p = points[i];
    ctx.lineTo(p.x + p.nx * p.hw, p.y + p.ny * p.hw);
  }
  for (let i = count - 1; i >= 0; i -= 1) {
    const p = points[i];
    ctx.lineTo(p.x - p.nx * p.hw, p.y - p.ny * p.hw);
  }
  ctx.closePath();

  const gradient = ctx.createLinearGradient(meta.p0x, meta.p0y, meta.p3x, meta.p3y);
  gradient.addColorStop(0, `rgba(${rgbA.r},${rgbA.g},${rgbA.b},1)`);
  gradient.addColorStop(1, `rgba(${rgbB.r},${rgbB.g},${rgbB.b},1)`);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.restore();
}

function drawRibbonFibers(
  ctx: CanvasRenderingContext2D,
  points: SpinePoint[],
  count: number,
  table: SegmentTable,
  pointStride: number,
  meta: SpineMeta,
  runtimeBand: RibbonRuntimeBand,
) {
  if (count === 0) {
    return;
  }

  const { config: band, rgbA, rgbB, glow, fibers } = runtimeBand;
  const mid = points[meta.midIndex];
  const faceLight = Math.pow(Math.max(0, mid.twist), 0.85);
  const towardLight = 0.5 + 0.5 * Math.max(0, mid.tx * -0.2 + mid.ty * -0.94);
  const alongLight = 0.32 * faceLight + 0.18 * towardLight;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowBlur = Math.max(0.24, 0.44 + (1 - band.softness) * 0.68);
  ctx.shadowColor = `rgba(${glow.r},${glow.g},${glow.b},${0.04 + band.depth * 0.03})`;

  for (let fiberIndex = 0; fiberIndex < fibers.length; fiberIndex += 1) {
    const fiber = fibers[fiberIndex];
    ctx.beginPath();
    let started = false;

    for (let i = 0; i < count; i += pointStride) {
      const p = points[i];
      const organicOffset =
        fiber.offsetVariance *
        p.hw *
        (0.5 + 0.5 * Math.sin(table.wave[i] + fiber.seedPhase));
      const x = p.x + p.nx * (fiber.frac * p.hw + organicOffset);
      const y = p.y + p.ny * (fiber.frac * p.hw + organicOffset);

      if (!started) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
    }

    const acrossMix = Math.abs(fiber.frac) * 0.9;
    const base = mixColor(rgbA, rgbB, acrossMix);

    const sheenZone = Math.max(0, 1 - Math.abs(fiber.frac - 0.24) / 0.26);
    const centerFalloff = 1 - Math.min(1, Math.abs(fiber.frac));

    let r = base.r;
    let g = base.g;
    let b = base.b;

    const highlight = sheenZone * 0.45 + alongLight * 0.24 + centerFalloff * 0.07;
    r = Math.round(r + (255 - r) * highlight * 0.55);
    g = Math.round(g + (255 - g) * highlight * 0.55);
    b = Math.round(b + (255 - b) * highlight * 0.55);

    const alpha = clamp(
      (0.44 + centerFalloff * 0.17 + sheenZone * 0.12 + fiber.alphaVariance) *
        (0.88 + band.depth * 0.08),
      0.14,
      0.82,
    );

    ctx.lineWidth = fiber.lineWidthBase + band.depth * 0.07 + fiber.widthVariance * 0.5;
    ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.stroke();
  }

  ctx.shadowBlur = 0;
}

function drawBand(
  ctx: CanvasRenderingContext2D,
  points: SpinePoint[],
  table: SegmentTable,
  pointStride: number,
  width: number,
  height: number,
  timeMs: number,
  runtimeBand: RibbonRuntimeBand,
  meta: SpineMeta,
) {
  buildSpine(
    points,
    table,
    width,
    height,
    runtimeBand.config,
    timeMs * (0.9 + runtimeBand.config.depth * 0.08),
    meta,
  );

  drawRibbonBody(ctx, points, table.count, meta, runtimeBand);
  drawRibbonFibers(ctx, points, table.count, table, pointStride, meta, runtimeBand);
}

export function RibbonBackgroundCanvas({
  theme,
  animate = true,
  className,
}: RibbonBackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      return;
    }

    const sourceBands = theme === "dark" ? DARK_BANDS : LIGHT_BANDS;
    const spineMeta: SpineMeta = {
      p0x: 0,
      p0y: 0,
      p3x: 0,
      p3y: 0,
      midIndex: 0,
    };

    let cssWidth = 1;
    let cssHeight = 1;
    let dpr = 1;
    let rafId = 0;
    let resizeRafId = 0;
    let lastTimestamp = 0;
    let motionTime = 0;
    let pointStride = 1;
    let frameAccumulator = 0;
    let minFrameInterval = resolveFrameInterval(cssWidth);
    let isVisible = true;

    let quality = resolveQuality(cssWidth);
    let table = getSegmentTable(quality.segments);
    let points = createSpineBuffer(table.count);
    let runtimeBands = buildRuntimeBands(sourceBands, cssWidth, quality);

    const updateQuality = () => {
      quality = resolveQuality(cssWidth);
      pointStride = quality.pointStride;
      table = getSegmentTable(quality.segments);
      points = createSpineBuffer(table.count);
      runtimeBands = buildRuntimeBands(sourceBands, cssWidth, quality);
      minFrameInterval = resolveFrameInterval(cssWidth);
    };

    const drawFrame = (timeMs: number) => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      for (let i = 0; i < runtimeBands.length; i += 1) {
        drawBand(
          ctx,
          points,
          table,
          pointStride,
          cssWidth,
          cssHeight,
          timeMs,
          runtimeBands[i],
          spineMeta,
        );
      }
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width));
      const nextHeight = Math.max(1, Math.round(rect.height));
      const nextQuality = resolveQuality(nextWidth);
      const nextDpr = Math.min(window.devicePixelRatio || 1, nextQuality.dprCap);

      if (
        nextWidth === cssWidth &&
        nextHeight === cssHeight &&
        Math.abs(nextDpr - dpr) < 0.001
      ) {
        return;
      }

      cssWidth = nextWidth;
      cssHeight = nextHeight;
      dpr = nextDpr;

      canvas.width = Math.max(1, Math.round(cssWidth * dpr));
      canvas.height = Math.max(1, Math.round(cssHeight * dpr));
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      // Reset then re-apply transform so scaling stays exact after every resize.
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      updateQuality();
      frameAccumulator = 0;
      drawFrame(motionTime);
    };

    const scheduleResize = () => {
      if (resizeRafId) {
        return;
      }

      resizeRafId = window.requestAnimationFrame(() => {
        resizeRafId = 0;
        resizeCanvas();
      });
    };

    const render = (timestamp: number) => {
      if (document.hidden || !isVisible) {
        lastTimestamp = timestamp;
        rafId = window.requestAnimationFrame(render);
        return;
      }

      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }

      const delta = Math.min(timestamp - lastTimestamp, 40);
      lastTimestamp = timestamp;
      frameAccumulator += delta;

      if (frameAccumulator < minFrameInterval) {
        rafId = window.requestAnimationFrame(render);
        return;
      }

      // Slightly faster progression makes ribbon movement more noticeable.
      motionTime += frameAccumulator * 0.88;
      frameAccumulator = 0;
      drawFrame(motionTime);
      rafId = window.requestAnimationFrame(render);
    };

    resizeCanvas();

    if (animate) {
      rafId = window.requestAnimationFrame(render);
    } else {
      drawFrame(0);
    }

    const resizeObserver = new ResizeObserver(scheduleResize);
    resizeObserver.observe(canvas);
    window.addEventListener("resize", scheduleResize);
    const intersectionObserver =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              isVisible = entry ? entry.isIntersecting : true;
            },
            { threshold: 0.01 },
          )
        : null;
    intersectionObserver?.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleResize);
      intersectionObserver?.disconnect();
      if (resizeRafId) {
        window.cancelAnimationFrame(resizeRafId);
      }
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [animate, theme]);

  return <canvas ref={canvasRef} aria-hidden className={cn("pointer-events-none", className)} />;
}
