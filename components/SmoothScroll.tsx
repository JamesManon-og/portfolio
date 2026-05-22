"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
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
  }, []);

  return <>{children}</>;
}
