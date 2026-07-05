"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  playClickSound,
  playHoverSound,
  playToggleSound,
  unlockAudio,
} from "@/lib/sound";

type SoundContextType = {
  enabled: boolean;
  toggle: () => void;
};

const SoundContext = createContext<SoundContextType>({
  enabled: false,
  toggle: () => {},
});

export const useSound = () => useContext(SoundContext);

const INTERACTIVE_SELECTOR =
  'button, a, [role="button"], input, textarea, select, label[for]';

export default function SoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);
  const lastHoveredRef = useRef<HTMLElement | null>(null);
  const lastHoverTimeRef = useRef(0);

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("sound-enabled")
        : null;
    if (saved === "true") setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) {
      lastHoveredRef.current = null;
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        INTERACTIVE_SELECTOR,
      ) as HTMLElement | null;

      if (!target) {
        lastHoveredRef.current = null;
        return;
      }
      if (target === lastHoveredRef.current) return;

      const now = performance.now();
      if (now - lastHoverTimeRef.current < 40) {
        lastHoveredRef.current = target;
        return;
      }

      lastHoveredRef.current = target;
      lastHoverTimeRef.current = now;
      playHoverSound();
    };

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        INTERACTIVE_SELECTOR,
      ) as HTMLElement | null;
      if (!target) return;
      if (target.dataset.soundSkip === "true") return;
      playClickSound();
    };

    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("click", handleClick, true);
    };
  }, [enabled]);

  const toggle = useCallback(() => {
    unlockAudio();
    setEnabled((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("sound-enabled", String(next));
      }
      if (next) {
        setTimeout(() => playToggleSound(), 0);
      }
      return next;
    });
  }, []);

  return (
    <SoundContext.Provider value={{ enabled, toggle }}>
      {children}
    </SoundContext.Provider>
  );
}
