"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function GradientBorder({
  children,
  className,
  innerClassName,
  rounded = "rounded-2xl",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        rounded,
        "bg-line",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02) 40%, rgba(139,92,246,0.18) 100%)",
        padding: "1px",
      }}
    >
      <div className={cn("relative h-full w-full bg-bg", rounded, innerClassName)}>
        {children}
      </div>
    </div>
  );
}
