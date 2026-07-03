import { cn } from "@/lib/utils";

/**
 * The evidence-card "RISK LEVEL 1–5" box row: five numbered squares with the
 * active level filled in stamp red.
 */
export default function RiskLevel({
  label = "RISK LEVEL",
  level,
  className,
}: {
  label?: string;
  /** 1–5 */
  level: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="typed-label">{label}</div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={cn(
              "flex h-5 w-5 items-center justify-center border font-mono text-[11px] leading-none",
              n === level
                ? "border-stamp bg-stamp text-paper"
                : "border-line-strong bg-paper/60 text-ink-dim"
            )}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
