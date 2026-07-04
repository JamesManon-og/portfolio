"use client";

import { motion } from "framer-motion";
import { useDeviceCapability } from "@/lib/useDeviceCapability";
import { cn } from "@/lib/utils";

/**
 * A manila shipping tag hanging from a twine string, like the evidence tag
 * in the reference photo. The string is anchored at the component's top;
 * position the whole thing absolutely off a card corner. Hovering makes the
 * tag sway gently on its string (disabled under reduced motion).
 */
export default function EvidenceTag({
  lines,
  rotate = -6,
  className,
}: {
  /** typed rows, e.g. ["EVIDENCE TAG: 001-A", "FILED BY: J.M."] */
  lines: string[];
  /** resting angle of the tag, degrees */
  rotate?: number;
  className?: string;
}) {
  const { reducedMotion } = useDeviceCapability();

  return (
    <div className={cn("pointer-events-none select-none", className)}>
      {/* twine — two slightly offset strands for a braided feel */}
      <svg
        aria-hidden
        width="60"
        height="54"
        viewBox="0 0 60 54"
        className="mx-auto block"
      >
        <path
          d="M30 0 C 22 14, 40 26, 31 52"
          fill="none"
          stroke="#8a6f4d"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M30 0 C 24 15, 38 27, 32 52"
          fill="none"
          stroke="#a98d66"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>

      {/* tag body, swinging from the string end */}
      <motion.div
        style={{ transformOrigin: "50% -6px", rotate }}
        whileHover={
          reducedMotion
            ? undefined
            : {
                rotate: [rotate, rotate - 4, rotate + 3, rotate],
                transition: { duration: 1.4, ease: "easeInOut" },
              }
        }
        className="pointer-events-auto relative -mt-1 border border-paper-edge bg-paper-dark px-4 py-3 shadow-paper"
        // subtle notched-corner tag silhouette
        // (clip small corners off the top edge)
      >
        <span
          aria-hidden
          className="absolute left-1/2 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#8a6f4d]/60 bg-bg"
        />
        <div className="mt-3 space-y-1">
          {lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                "whitespace-nowrap font-mono uppercase tracking-[0.12em] text-ink-dim",
                i === 0 ? "text-[11px] font-bold text-ink" : "text-[9px]"
              )}
            >
              {line}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
