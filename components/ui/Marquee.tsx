"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function Marquee({
  children,
  reverse = false,
  speed = 40,
  pauseOnHover = true,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden mask-fade-edges",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-6 pr-6 whitespace-nowrap",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
