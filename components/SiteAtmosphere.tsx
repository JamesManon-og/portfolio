"use client";

import { useEffect } from "react";
import { useDeviceCapability } from "@/lib/useDeviceCapability";

/**
 * Owns the full-viewport background and the paper overlays, gated by device
 * capability:
 *
 * - Always: the kraft evidence-board gradient + warm vignette (static, cheap).
 * - `full` tier only: the viewport-wide mix-blend-mode layers — paper-fiber
 *   grain and board damage — which force full-screen recompositing on scroll.
 *
 * Also stamps a `tier-lite` class on <html> so pure-CSS costs elsewhere
 * (torn-edge drop-shadows, navbar backdrop blur) can be switched off in
 * globals.css without threading the hook through every component.
 *
 * Lives in a client component so the root layout can stay a server component.
 */
export default function SiteAtmosphere() {
  const { tier, mounted } = useDeviceCapability();

  const showBlendLayers = mounted && tier === "full";

  useEffect(() => {
    document.documentElement.classList.toggle(
      "tier-lite",
      mounted && tier === "lite",
    );
  }, [mounted, tier]);

  return (
    <>
      {/* Kraft board — always present, behind everything */}
      <div
        aria-hidden
        className="kraft-bg pointer-events-none fixed inset-0 z-0"
      />

      {/* Stains, scratches, scuffed corners — full tier only (mix-blend-mode
          layer recomposites the whole viewport on scroll) */}
      {showBlendLayers && <div className="board-damage" aria-hidden />}

      {/* Warm vignette — static gradient, cheap, keep it everywhere */}
      <div className="vignette" aria-hidden />

      {/* Paper-fiber grain — full tier only (viewport-wide blend mode) */}
      {showBlendLayers && <div className="grain" aria-hidden />}
    </>
  );
}
