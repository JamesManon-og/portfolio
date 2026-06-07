"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "full" | "lite";

export interface DeviceCapability {
  /** "full" = capable desktop (full effect stack); "lite" = mobile / low-end / reduced-motion. */
  tier: DeviceTier;
  /** OS-level "reduce motion" preference. */
  reducedMotion: boolean;
  /** Touch / coarse pointer (phones, tablets). */
  coarsePointer: boolean;
  /** False during SSR and the first client render; true after mount. */
  mounted: boolean;
}

// Devices at/below these thresholds are treated as low-end.
const WEAK_CORE_COUNT = 4; // logical CPU cores
const WEAK_MEMORY_GB = 4; // navigator.deviceMemory (Chromium only)

// Allow the heavy WebGL background on touch devices that look capable.
// Off by default: a full-screen fluid sim on phones is rarely worth the
// battery/jank, and mobile lag is the exact problem we're solving here.
// Flip to true to let high-end phones/tablets opt back in.
const ALLOW_FULL_ON_TOUCH = false;

type NavigatorWithCapabilities = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

function readOverride(): DeviceTier | null {
  try {
    const value = new URLSearchParams(window.location.search).get("perf");
    return value === "lite" || value === "full" ? value : null;
  } catch {
    return null;
  }
}

function detect(): Omit<DeviceCapability, "mounted"> {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return { tier: "lite", reducedMotion: false, coarsePointer: false };
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  // Dev/testing escape hatch: ?perf=lite / ?perf=full
  const override = readOverride();
  if (override) return { tier: override, reducedMotion, coarsePointer };

  const nav = navigator as NavigatorWithCapabilities;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory; // undefined on Safari/Firefox
  const saveData = nav.connection?.saveData === true;

  let tier: DeviceTier = "full";
  if (reducedMotion || saveData) tier = "lite";
  else if (coarsePointer && !ALLOW_FULL_ON_TOUCH) tier = "lite";
  else if (cores <= WEAK_CORE_COUNT) tier = "lite";
  else if (typeof memory === "number" && memory < WEAK_MEMORY_GB) tier = "lite";

  return { tier, reducedMotion, coarsePointer };
}

/**
 * Single source of truth for "how much can this device handle?".
 *
 * SSR-safe: returns a conservative `lite` / `mounted:false` snapshot on the
 * server and the first client render (so hydration matches), then upgrades to
 * the real result after mount. Re-evaluates live when the reduced-motion or
 * pointer media queries change (e.g. the user toggles the OS setting).
 *
 * Append `?perf=lite` or `?perf=full` to the URL to force a tier — handy for
 * verifying both paths on one machine.
 */
export function useDeviceCapability(): DeviceCapability {
  const [state, setState] = useState<DeviceCapability>({
    tier: "lite",
    reducedMotion: false,
    coarsePointer: false,
    mounted: false,
  });

  useEffect(() => {
    const update = () => setState({ ...detect(), mounted: true });
    update();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    motionQuery.addEventListener("change", update);
    pointerQuery.addEventListener("change", update);
    return () => {
      motionQuery.removeEventListener("change", update);
      pointerQuery.removeEventListener("change", update);
    };
  }, []);

  return state;
}
