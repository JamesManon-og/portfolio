import { cn } from "@/lib/utils";

/**
 * A decorative ink fingerprint: concentric elliptical arcs with broken
 * segments and a core whorl, like a print lifted onto the file. Colored via
 * currentColor — set opacity/tone with text utilities (e.g. text-ink/15).
 */
export default function FingerprintMark({
  size = 56,
  rotate = 0,
  className,
}: {
  size?: number;
  /** degrees */
  rotate?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size * 1.2}
      viewBox="0 0 100 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      className={cn("pointer-events-none select-none", className)}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      {/* outer ridges (broken) */}
      <path d="M50 8 C 22 8, 10 34, 10 62 C 10 88, 24 108, 44 114" />
      <path d="M62 10 C 82 18, 90 40, 90 62 C 90 82, 84 98, 70 108" />
      <path d="M50 18 C 28 18, 19 38, 19 62 C 19 82, 28 98, 42 105" />
      <path d="M60 20 C 76 26, 81 44, 81 62 C 81 78, 76 92, 66 100" />
      {/* mid ridges */}
      <path d="M50 28 C 34 28, 28 44, 28 62 C 28 76, 34 88, 44 94" />
      <path d="M58 30 C 68 36, 72 48, 72 62 C 72 74, 68 84, 60 90" />
      <path d="M50 38 C 40 38, 37 48, 37 62 C 37 72, 41 80, 48 84" />
      <path d="M56 40 C 62 46, 63 52, 63 62 C 63 70, 61 76, 56 80" />
      {/* core whorl */}
      <path d="M50 48 C 45 48, 46 54, 46 60 C 46 66, 48 70, 52 72" />
      <path d="M54 50 C 56 54, 56 60, 54 64" />
      <ellipse cx="51" cy="58" rx="2.5" ry="4" />
      {/* stray broken segments */}
      <path d="M24 40 C 21 46, 20 52, 20 56" opacity="0.7" />
      <path d="M78 84 C 75 90, 71 95, 67 98" opacity="0.7" />
    </svg>
  );
}
