"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SectionLabel({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "inline-flex items-center gap-2.5 rounded border border-phosphor/30 bg-phosphor/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-phosphor-200 backdrop-blur",
        className
      )}
    >
      <span className="text-[9px] text-phosphor/70">[{index}]</span>
      <span className="h-2.5 w-px bg-phosphor/40" />
      <span className="phosphor-glow">{label}</span>
      <span className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-phosphor shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
    </motion.div>
  );
}
