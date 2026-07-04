"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowColor?: "red" | "royal" | "royal-bright";
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * Shared section heading. Stacked vertically per taste-skill rule
 * (split-header pattern is banned as default).
 * Max-width 65ch on description for readability.
 */
export function SectionHeading({
  eyebrow,
  eyebrowColor = "red",
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const eyebrowColorClass =
    eyebrowColor === "royal"
      ? "text-royal"
      : eyebrowColor === "royal-bright"
      ? "text-royal-bright"
      : "text-accent-red";

  const eyebrowBarClass =
    eyebrowColor === "royal"
      ? "bg-royal"
      : eyebrowColor === "royal-bright"
      ? "bg-royal-bright"
      : "bg-accent-red";

  return (
    <div className={`${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"} ${className}`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] ${eyebrowColorClass} ${align === "center" ? "justify-center" : ""}`}
        >
          <span className={`h-px w-8 ${eyebrowBarClass}`} />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className={`mt-5 font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight leading-[1.05]`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[65ch]"
        >
          {description}
        </motion.div>
      )}
    </div>
  );
}
