import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A polaroid-style photo: white frame, thick bottom border holding a
 * handwritten caption, optional tape strip and rotation.
 */
export default function Polaroid({
  src,
  alt,
  caption,
  rotate = 0,
  taped = false,
  priority = false,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  caption?: string;
  /** degrees */
  rotate?: number;
  taped?: boolean;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure
      className={cn("polaroid relative inline-block", taped && "tape-x", className)}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <div className="relative overflow-hidden bg-ink/10">
        <Image
          src={src}
          alt={alt}
          width={480}
          height={480}
          priority={priority}
          className={cn("block h-auto w-full object-cover sepia-[0.35] contrast-[0.95]", imgClassName)}
        />
      </div>
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-2 text-center font-hand text-2xl leading-none text-ink-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
