"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDeviceCapability } from "@/lib/useDeviceCapability";
import { probeFps } from "@/lib/fpsProbe";

// Heavy: ~the whole Three.js bundle. Code-split so `lite` devices never even
// download/parse it — a real JS-parse/TTI win on top of not rendering it.
const LiquidEther = dynamic(() => import("@/components/LiquidEther"), {
  ssr: false,
  loading: () => null,
});

/**
 * Owns the full-viewport background and the retro overlays, gated by device
 * capability so the heavy stuff only runs where it's wanted:
 *
 * - Always: a cheap, static, on-brand gradient fallback (zero GPU cost).
 * - `full` tier only: the WebGL fluid sim + scanlines / grain / scan-sweep.
 * - Runtime FPS probe: if a "capable" device still renders the fluid slowly,
 *   tear it down and keep the static fallback.
 *
 * Lives in a client component so the root layout can stay a server component.
 */
export default function SiteAtmosphere() {
  const { tier, mounted } = useDeviceCapability();
  const [probeFailed, setProbeFailed] = useState(false);

  const showFull = mounted && tier === "full" && !probeFailed;

  // Safety net for weak laptops that pass the static checks: let the fluid
  // spin up, measure real FPS, and downgrade to the static fallback if it's
  // struggling.
  useEffect(() => {
    if (!showFull) return;
    let active = true;
    const warmup = window.setTimeout(() => {
      probeFps(1000).then((fps) => {
        if (active && fps < 45) setProbeFailed(true);
      });
    }, 500);
    return () => {
      active = false;
      window.clearTimeout(warmup);
    };
  }, [showFull]);

  return (
    <>
      {/* Static gradient fallback — always present, behind everything */}
      <div
        aria-hidden
        className="site-bg-fallback pointer-events-none fixed inset-0 z-0"
      />

      {/* WebGL fluid — capable devices only, painted over the fallback */}
      {showFull && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <LiquidEther
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            colors={["#5227FF", "#FF9FFC", "#B497CF"]}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            isBounce={false}
            resolution={0.5}
          />
        </div>
      )}

      {/* Vignette is a static gradient — cheap, keep it everywhere */}
      <div className="vignette" aria-hidden />

      {/* Retro CRT overlays — full tier only (blend modes + a looping sweep) */}
      {showFull && (
        <>
          <div className="grain" aria-hidden />
          <div className="scan-sweep" aria-hidden />
          <div className="scanlines" aria-hidden />
        </>
      )}
    </>
  );
}
