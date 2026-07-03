"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A file-tab chip: cream paper, typed uppercase label, case number prefix and
 * a red wax dot — pinned slightly crooked like everything on the board.
 */
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
        "paper inline-flex -rotate-1 items-center gap-2.5 rounded-sm border border-line px-3 py-1.5",
        className
      )}
    >
      <span className="typed-label !text-[9px] text-ink-dimmer">
        CASE NO. {index}
      </span>
      <span className="h-2.5 w-px bg-line-strong" />
      <span className="typed-label text-ink-dim">{label}</span>
      <span className="ml-1 h-2 w-2 rounded-full bg-stamp/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.3)]" />
    </motion.div>
  );
}
