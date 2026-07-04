import { cn } from "@/lib/utils";

/**
 * A metal foldback binder clip, drawn like the one gripping the polaroid in
 * the reference photo: dark trapezoid body with two raised wire handles.
 * Position it absolutely so it overlaps the top edge of what it "holds".
 */
export default function BinderClip({
  size = 52,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size * 0.9}
      viewBox="0 0 100 90"
      className={cn("pointer-events-none select-none", className)}
    >
      {/* wire handles (behind the body) */}
      <g
        fill="none"
        stroke="#6b6257"
        strokeWidth="5"
        strokeLinecap="round"
      >
        <path d="M30 42 C 14 30, 16 10, 34 8" />
        <path d="M70 42 C 86 30, 84 10, 66 8" />
      </g>
      <g
        fill="none"
        stroke="#8d8375"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      >
        <path d="M31 40 C 17 29, 19 12, 34 10" />
        <path d="M69 40 C 83 29, 81 12, 66 10" />
      </g>
      {/* clip body */}
      <path
        d="M18 40 L82 40 L74 84 L26 84 Z"
        fill="#3a352d"
        stroke="#241f18"
        strokeWidth="1.5"
      />
      {/* specular highlight */}
      <path d="M24 44 L38 44 L34 78 L28 78 Z" fill="#57503f" opacity="0.55" />
      {/* bottom lip */}
      <path d="M26 84 L74 84 L72 88 L28 88 Z" fill="#241f18" />
    </svg>
  );
}
