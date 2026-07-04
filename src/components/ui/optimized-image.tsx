"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  /** Force a low-quality blur placeholder (data URL). If not provided, falls back to a CSS blur. */
  blurDataURL?: string;
  /** Background color while loading */
  loadingBg?: string;
}

/**
 * Optimized image wrapper around next/image.
 * - Auto-serves WebP/AVIF (configured in next.config.ts)
 * - Lazy-loads by default (priority prop opts into eager loading for hero)
 * - Shows a shimmer/blur placeholder while loading
 * - Fade-in once loaded
 */
export function OptimizedImage({
  src,
  alt,
  className,
  loadingBg = "#0B1F3A",
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ backgroundColor: loadingBg }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        {...(blurDataURL ? { placeholder: "blur", blurDataURL } : { placeholder: "empty" })}
        {...props}
      />
      {/* Shimmer while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.8s_infinite]" />
      )}
    </div>
  );
}

/** Tiny inline shimmer keyframe via a style tag (avoids polluting globals.css for one-off) */
export function ShimmerStyle() {
  return (
    <style>{`
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}</style>
  );
}
