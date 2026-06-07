"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDeviceCapability } from "@/lib/useDeviceCapability";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const { tier, mounted } = useDeviceCapability();

  useEffect(() => {
    // Smooth scroll only on capable, fine-pointer, motion-OK devices. On
    // phones / low-end / reduced-motion we use native scroll — it's smoother
    // there and doesn't fight touch momentum. GSAP ScrollTrigger still works
    // with native scroll, so scroll-linked animations are unaffected.
    if (!mounted || tier !== "full") return;

    type LenisInstance = {
      destroy: () => void;
      raf: (t: number) => void;
      on: (event: string, cb: () => void) => void;
    };
    let lenis: LenisInstance | undefined;
    let cancelled = false;
    let tickerFn: ((time: number) => void) | undefined;

    (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;

      const instance = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      });
      lenis = instance as unknown as LenisInstance;

      // Drive Lenis through GSAP's ticker so ScrollTrigger stays in sync
      tickerFn = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      instance.on("scroll", ScrollTrigger.update);
    })();

    return () => {
      cancelled = true;
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy?.();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [mounted, tier]);

  // One switch makes every framer-motion animation honor the OS reduce-motion
  // preference (parallax, entrances, hovers across the whole app).
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
