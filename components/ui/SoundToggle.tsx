"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/components/SoundProvider";
import { cn } from "@/lib/utils";

export default function SoundToggle({ className }: { className?: string }) {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      data-sound-skip="true"
      aria-label={enabled ? "Mute interface sounds" : "Enable interface sounds"}
      title={enabled ? "Mute sounds" : "Enable sounds"}
      className={cn(
        "group relative grid h-9 w-9 place-items-center rounded border transition-all",
        enabled
          ? "border-phosphor/40 bg-phosphor/10 text-phosphor-200 hover:bg-phosphor/20 hover:shadow-phosphor"
          : "border-line text-ink-dim hover:border-phosphor/30 hover:text-phosphor-200",
        className,
      )}
    >
      {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
      {enabled && (
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-phosphor shadow-[0_0_6px_rgba(74,222,128,0.9)]" />
      )}
    </button>
  );
}
