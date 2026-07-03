"use client";

import { useDeviceCapability } from "@/lib/useDeviceCapability";

/**
 * Owns the full-viewport background and the paper overlays, gated by device
 * capability:
 *
 * - Always: the kraft evidence-board gradient + warm vignette (static, cheap).
 * - `full` tier only: the paper-fiber grain overlay (a viewport-wide
 *   mix-blend-mode layer — the one non-free effect left).
 *
 * Lives in a client component so the root layout can stay a server component.
 */
export default function SiteAtmosphere() {
  const { tier, mounted } = useDeviceCapability();

  const showGrain = mounted && tier === "full";

  return (
    <>
      {/* Kraft board — always present, behind everything */}
      <div
        aria-hidden
        className="kraft-bg pointer-events-none fixed inset-0 z-0"
      />

      {/* Warm vignette — static gradient, cheap, keep it everywhere */}
      <div className="vignette" aria-hidden />

      {/* Paper-fiber grain — full tier only (viewport-wide blend mode) */}
      {showGrain && <div className="grain" aria-hidden />}
    </>
  );
}
