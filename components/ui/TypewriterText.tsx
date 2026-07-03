"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useDeviceCapability } from "@/lib/useDeviceCapability";
import { cn } from "@/lib/utils";

/**
 * Types text out character-by-character with a blinking block caret, like a
 * report being typed on an old machine. Starts when scrolled into view.
 *
 * Layout is reserved with an invisible copy of the full text so nothing
 * reflows while typing. With OS reduced-motion, the full text renders
 * immediately.
 */
export default function TypewriterText({
  text,
  speed = 45,
  delay = 0,
  as: Tag = "span",
  className,
  showCaret = true,
}: {
  text: string;
  /** ms per character */
  speed?: number;
  /** ms before typing starts once in view */
  delay?: number;
  as?: React.ElementType;
  className?: string;
  showCaret?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { reducedMotion } = useDeviceCapability();
  const [count, setCount] = useState(0);

  const done = count >= text.length;

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let i = 0;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length && interval) window.clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };
  }, [inView, reducedMotion, text, speed, delay]);

  const visible = reducedMotion ? text : text.slice(0, count);

  return (
    <Tag className={cn("relative inline-block", className)}>
      {/* Invisible full text reserves the final layout */}
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span ref={ref} className="absolute inset-0" aria-label={text}>
        {visible}
        {showCaret && !reducedMotion && !done && (
          <span aria-hidden className="animate-blink-caret">
            ▌
          </span>
        )}
      </span>
    </Tag>
  );
}
