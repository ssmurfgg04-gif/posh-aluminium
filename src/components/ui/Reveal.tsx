"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Direction the content reveals from */
  from?: "bottom" | "left" | "right" | "none";
}

/**
 * Motivated scroll-reveal wrapper.
 * - Respects prefers-reduced-motion (no animation for accessibility users)
 * - Fires once per element (viewport enter)
 * - Used to draw attention to section content as it enters view
 * Per taste-skill: motion must be motivated (hierarchy/storytelling), not decorative.
 */
export function Reveal({ children, delay = 0, className, from = "bottom" }: RevealProps) {
  const reduce = useReducedMotion();

  const offset =
    from === "bottom" ? { y: 24 } : from === "left" ? { x: -24 } : from === "right" ? { x: 24 } : {};

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
