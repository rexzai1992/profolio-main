"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

type BrandLogoKey =
  | "anthropic"
  | "amazon"
  | "shopify"
  | "google"
  | "notion"
  | "microsoft"
  | "github"
  | "vercel"
  | "twilio"
  | "airbnb"
  | "zoom"
  | "substack";

type BrandItem = {
  id: BrandLogoKey;
  label: string;
};

const brandItems: BrandItem[] = [
  { id: "anthropic", label: "Anthropic" },
  { id: "amazon", label: "Amazon" },
  { id: "shopify", label: "Shopify" },
  { id: "google", label: "Google" },
  { id: "notion", label: "Notion" },
  { id: "microsoft", label: "Microsoft" },
  { id: "github", label: "GitHub" },
  { id: "vercel", label: "Vercel" },
  { id: "twilio", label: "Twilio" },
  { id: "airbnb", label: "Airbnb" },
  { id: "zoom", label: "Zoom" },
  { id: "substack", label: "Substack" },
];

function BrandLogo({ brand, isDark }: { brand: BrandItem; isDark: boolean }) {
  const neutral = isDark ? "#E6EAF3" : "#1A1A2E";

  if (brand.id === "amazon") {
    return (
      <svg viewBox="0 0 100 30" className="h-[26px] w-auto" aria-label="Amazon">
        <text x="0" y="21" fontFamily="Arial, sans-serif" fontSize="17" fill={neutral}>
          amazon
        </text>
        <path
          d="M8 25 Q30 31 56 25"
          stroke="#FF9900"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        <polygon points="54,22 58,25 54,27" fill="#FF9900" />
      </svg>
    );
  }

  if (brand.id === "shopify") {
    return (
      <svg viewBox="0 0 90 28" className="h-[26px] w-auto" aria-label="Shopify">
        <path
          d="M18 4C16 2 13 2 12 4L11 6C10 6 8 7 7 8L6 22L20 24L24 8C22 7 20 7 19 6ZM15 5C16 5 17 6 17 7L13 7C13 6 14 5 15 5ZM14 19C12.3 19 11 17.7 11 16C11 14.3 12.3 13 14 13C15.7 13 17 14.3 17 16C17 17.7 15.7 19 14 19Z"
          fill="#96BF48"
        />
        <text x="27" y="20" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="600" fill={neutral}>
          Shopify
        </text>
      </svg>
    );
  }

  if (brand.id === "google") {
    return (
      <svg viewBox="0 0 84 24" className="h-[26px] w-auto" aria-label="Google">
        <text x="0" y="18" fontFamily="Arial, sans-serif" fontSize="17" fill="#4285F4">
          G
        </text>
        <text x="12" y="18" fontFamily="Arial, sans-serif" fontSize="17" fill="#EA4335">
          o
        </text>
        <text x="22" y="18" fontFamily="Arial, sans-serif" fontSize="17" fill="#FBBC05">
          o
        </text>
        <text x="32" y="18" fontFamily="Arial, sans-serif" fontSize="17" fill="#4285F4">
          g
        </text>
        <text x="43" y="18" fontFamily="Arial, sans-serif" fontSize="17" fill="#34A853">
          l
        </text>
        <text x="48" y="18" fontFamily="Arial, sans-serif" fontSize="17" fill="#EA4335">
          e
        </text>
      </svg>
    );
  }

  if (brand.id === "notion") {
    return (
      <svg viewBox="0 0 90 28" className="h-[26px] w-auto" aria-label="Notion">
        <rect x="1" y="3" width="18" height="22" rx="3" fill={neutral} />
        <path d="M5 7L5 19L8 19L14 11L14 19L17 19L17 7L14 7L8 15L8 7Z" fill="white" />
        <text x="24" y="20" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="600" fill={neutral}>
          Notion
        </text>
      </svg>
    );
  }

  if (brand.id === "microsoft") {
    return (
      <svg viewBox="0 0 112 28" className="h-[26px] w-auto" aria-label="Microsoft">
        <rect x="0" y="3" width="10" height="10" fill="#F25022" />
        <rect x="11" y="3" width="10" height="10" fill="#7FBA00" />
        <rect x="0" y="14" width="10" height="10" fill="#00A4EF" />
        <rect x="11" y="14" width="10" height="10" fill="#FFB900" />
        <text x="26" y="20" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600" fill={neutral}>
          Microsoft
        </text>
      </svg>
    );
  }

  if (brand.id === "github") {
    return (
      <svg viewBox="0 0 84 26" className="h-[26px] w-auto" aria-label="GitHub">
        <path
          d="M12 3C7.03 3 3 7.03 3 12C3 15.97 5.56 19.35 9.14 20.53C9.59 20.61 9.75 20.34 9.75 20.1V18.52C7.28 19.06 6.75 17.33 6.75 17.33C6.34 16.31 5.75 16.04 5.75 16.04C4.94 15.49 5.81 15.5 5.81 15.5C6.7 15.56 7.17 16.41 7.17 16.41C7.96 17.77 9.24 17.38 9.78 17.13C9.86 16.56 10.09 16.17 10.34 15.95C8.33 15.73 6.22 14.96 6.22 11.58C6.22 10.61 6.57 9.82 7.19 9.2C7.1 8.98 6.78 8.07 7.28 6.83C7.28 6.83 8.03 6.59 9.75 7.75C10.47 7.55 11.24 7.45 12 7.45C12.76 7.45 13.53 7.55 14.25 7.75C15.97 6.59 16.72 6.83 16.72 6.83C17.22 8.07 16.9 8.98 16.81 9.2C17.43 9.82 17.78 10.61 17.78 11.58C17.78 14.97 15.67 15.73 13.66 15.95C13.98 16.23 14.25 16.77 14.25 17.61V20.1C14.25 20.34 14.41 20.62 14.87 20.53C18.44 19.35 21 15.97 21 12C21 7.03 16.97 3 12 3Z"
          fill={neutral}
        />
        <text x="27" y="20" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="600" fill={neutral}>
          GitHub
        </text>
      </svg>
    );
  }

  if (brand.id === "vercel") {
    return (
      <svg viewBox="0 0 76 24" className="h-[26px] w-auto" aria-label="Vercel">
        <polygon points="11,3 21,21 1,21" fill={neutral} />
        <text x="26" y="19" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="600" fill={neutral}>
          Vercel
        </text>
      </svg>
    );
  }

  if (brand.id === "twilio") {
    return (
      <svg viewBox="0 0 76 24" className="h-[26px] w-auto" aria-label="Twilio">
        <circle cx="11" cy="12" r="9" fill="#F22F46" />
        <circle cx="8" cy="9" r="2" fill="white" />
        <circle cx="14" cy="9" r="2" fill="white" />
        <circle cx="8" cy="15" r="2" fill="white" />
        <circle cx="14" cy="15" r="2" fill="white" />
        <text x="25" y="18" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="600" fill={neutral}>
          Twilio
        </text>
      </svg>
    );
  }

  if (brand.id === "airbnb") {
    return (
      <svg viewBox="0 0 82 24" className="h-[26px] w-auto" aria-label="Airbnb">
        <path
          d="M14 4C11 4 7 8 7 13C7 17 10 20 14 23C18 20 21 17 21 13C21 8 17 4 14 4ZM14 16C12.3 16 11 14.7 11 13C11 11.3 12.3 10 14 10C15.7 10 17 11.3 17 13C17 14.7 15.7 16 14 16Z"
          fill="#FF5A5F"
        />
        <text x="27" y="19" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="600" fill={neutral}>
          airbnb
        </text>
      </svg>
    );
  }

  if (brand.id === "zoom") {
    return (
      <svg viewBox="0 0 72 24" className="h-[26px] w-auto" aria-label="Zoom">
        <rect x="0" y="5" width="24" height="14" rx="4" fill="#2D8CFF" />
        <polygon points="24,9 32,5 32,19 24,15" fill="#2D8CFF" />
        <text x="36" y="18" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="600" fill={neutral}>
          Zoom
        </text>
      </svg>
    );
  }

  if (brand.id === "substack") {
    return (
      <svg viewBox="0 0 90 24" className="h-[26px] w-auto" aria-label="Substack">
        <rect x="1" y="4" width="20" height="3" rx="1" fill="#FF6719" />
        <rect x="1" y="9" width="20" height="3" rx="1" fill="#FF6719" />
        <polygon points="1,14 21,14 11,23" fill="#FF6719" />
        <text x="26" y="18" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600" fill={neutral}>
          Substack
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 130 24" className="h-[26px] w-auto" aria-label={brand.label}>
      <text
        x="0"
        y="18"
        fontFamily="Arial, sans-serif"
        fontSize="17"
        fontWeight="700"
        letterSpacing="-0.4"
        fill={neutral}
      >
        {brand.label.toUpperCase()}
      </text>
    </svg>
  );
}

type BrandMarqueeProps = {
  className?: string;
  animate?: boolean;
  durationSeconds?: number;
};

export function BrandMarquee({
  className,
  animate = true,
  durationSeconds = 46,
}: BrandMarqueeProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const marqueeItems = brandItems;
  const listRef = useRef<HTMLUListElement | null>(null);
  const [marqueeShift, setMarqueeShift] = useState(0);
  const clampedDuration = Math.max(18, durationSeconds);

  useEffect(() => {
    if (!animate) {
      return;
    }

    const listElement = listRef.current;
    if (!listElement) {
      return;
    }

    const measure = () => {
      const width = Math.ceil(listElement.getBoundingClientRect().width);
      if (width > 0) {
        setMarqueeShift(width);
      }
    };

    // Keep loop distance exact, so marquee remains seamless on resize/font load.
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(listElement);
    window.addEventListener("resize", measure);

    const fonts = document.fonts;
    const fontReadyPromise = fonts?.ready;
    if (fontReadyPromise) {
      void fontReadyPromise.then(measure).catch(() => undefined);
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [animate]);

  const railStyle = useMemo(
    () =>
      ({
        "--marquee-duration": animate ? `${clampedDuration}s` : "0s",
        "--marquee-gap": "0px",
        "--marquee-shift": animate ? (marqueeShift > 0 ? `${marqueeShift}px` : "50%") : "0px",
      }) as CSSProperties,
    [animate, clampedDuration, marqueeShift],
  );

  return (
    <div className={cn("group relative w-full", className)}>
      <div
        className={cn(
          "relative border-y py-1",
          isDark ? "border-white/12" : "border-slate-300/80",
          animate ? "overflow-hidden" : "overflow-x-auto",
        )}
      >
        {animate ? (
          <>
            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 left-0 z-20 w-24 sm:w-28",
                isDark
                  ? "bg-[linear-gradient(90deg,rgba(9,24,47,1),rgba(9,24,47,0))]"
                  : "bg-[linear-gradient(90deg,rgba(247,249,255,1),rgba(247,249,255,0))]",
              )}
            />
            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 right-0 z-20 w-24 sm:w-28",
                isDark
                  ? "bg-[linear-gradient(270deg,rgba(9,24,47,1),rgba(9,24,47,0))]"
                  : "bg-[linear-gradient(270deg,rgba(247,249,255,1),rgba(247,249,255,0))]",
              )}
            />
          </>
        ) : null}

        <div
          className={cn(
            animate
              ? "brand-marquee-rail"
              : "flex flex-wrap gap-0",
          )}
          style={railStyle}
        >
          {(animate ? [0, 1] : [0]).map((copyIndex) => (
            <ul
              key={copyIndex}
              ref={copyIndex === 0 ? listRef : undefined}
              className={cn("brand-marquee-list", !animate && "flex-wrap")}
              aria-hidden={animate && copyIndex === 1}
            >
              {marqueeItems.map((brand, index) => (
                <li
                  key={`${brand.id}-${copyIndex}-${index}`}
                  className={cn(
                    "flex h-14 shrink-0 items-center justify-center border-r px-7 opacity-80 transition duration-300 hover:opacity-100",
                    isDark ? "border-white/10" : "border-slate-300/65",
                    !animate && "border-b",
                  )}
                >
                  <BrandLogo brand={brand} isDark={isDark} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
