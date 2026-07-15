"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useDeviceCapability } from "@/lib/useDeviceCapability";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "p" | "li";
  once?: boolean;
  amount?: number;
  y?: number;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BlurReveal({
  children,
  delay = 0,
  className,
  as = "div",
  once = true,
  amount = 0.3,
  y = 20,
}: Props) {
  const MotionTag = motion[as] as typeof motion.div;
  const { tier } = useDeviceCapability();
  // Animating filter: blur() is a worst-case op on weak GPUs — lite devices
  // keep the fade/slide entrance but skip the blur rasterization.
  const withBlur = tier === "full";
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {
          opacity: 0,
          y,
          ...(withBlur && { filter: "blur(12px)" }),
        },
        visible: {
          opacity: 1,
          y: 0,
          ...(withBlur && { filter: "blur(0px)" }),
          transition: {
            duration: 0.9,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const item: Variants = variants;
