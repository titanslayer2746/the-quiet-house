import Image from "next/image";

const TONES = {
  clay: "from-[#8a5a4a] via-[#5e3a35] to-[#2b171b]",
  moss: "from-[#5c6650] via-[#3c4432] to-[#1e211a]",
  wine: "from-[#6b3540] via-[#3d1f26] to-[#1a0d10]",
  sand: "from-[#c9a892] via-[#a37f68] to-[#5c4436]",
} as const;

export function ImageBlock({
  tone = "clay",
  className = "",
  label,
  src,
  alt = "",
  sizes = "100vw",
  priority = false,
  position = "center",
}: {
  tone?: keyof typeof TONES;
  className?: string;
  label?: string;
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  /** CSS object-position for the cropped image, e.g. "50% 30%" */
  position?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${TONES[tone]} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      ) : null}
      {label ? (
        <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wide text-white/40">
          {label}
        </span>
      ) : null}
    </div>
  );
}
