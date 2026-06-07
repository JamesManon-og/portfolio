"use client";

import dynamic from "next/dynamic";
import { useDeviceCapability } from "@/lib/useDeviceCapability";

const LanyardClient = dynamic(() => import("@/components/ui/LanyardClient"), {
  ssr: false,
  loading: () => null,
});

/**
 * Site-wide hanging ID-card lanyard.
 *
 * Full-viewport canvas with `pointer-events: none` so page content stays
 * fully interactive. The R3F Canvas uses `eventSource={document.body}` to
 * receive pointer events from anywhere on screen — raycasting only triggers
 * handlers when the cursor is actually over the card mesh.
 *
 * - Fixed full-viewport wrapper is `pointer-events-none` — never blocks
 *   clicks, scrolling, or any other page interaction.
 * - Hidden below `lg` because the 3D scene needs real estate to read.
 * - Only mounted on the `full` capability tier, so low-end devices and
 *   reduced-motion users never pay for Three.js + physics.
 */
export default function FloatingLanyard() {
  const { tier, mounted } = useDeviceCapability();

  if (!mounted || tier !== "full") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 hidden lg:block"
    >
      <LanyardClient />
    </div>
  );
}
