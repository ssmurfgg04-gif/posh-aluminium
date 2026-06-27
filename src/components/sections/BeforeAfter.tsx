"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal, Sparkles } from "lucide-react";

export function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current && e.touches[0]) updatePosition(e.touches[0].clientX);
  };

  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-navy dark:bg-card relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[800px] bg-royal/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-royal-bright"
          >
            <Sparkles className="h-3.5 w-3.5" />
            The Posh Difference
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight"
          >
            Before &amp; After
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-white/70"
          >
            Drag the slider to see how Posh Aluminium transforms ordinary buildings into architectural statements.
          </motion.p>
        </div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className="relative aspect-[16/9] sm:aspect-[2/1] w-full rounded-3xl overflow-hidden shadow-premium cursor-ew-resize select-none"
        >
          {/* After (full image) */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="After Posh Aluminium installation — premium residential villa with frameless glass"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-accent-red text-white text-xs font-bold uppercase tracking-wider shadow-red z-10">
            After
          </div>

          {/* Before (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80"
              alt="Before Posh Aluminium installation — dated building façade"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ width: `${100 / (position / 100)}%` }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-navy/30" />
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-navy text-white text-xs font-bold uppercase tracking-wider shadow-premium z-10">
              Before
            </div>
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 z-20 pointer-events-none"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          >
            <div className="h-full w-0.5 bg-white shadow-lg" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-premium flex items-center justify-center pointer-events-auto cursor-ew-resize"
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              <MoveHorizontal className="h-5 w-5 text-navy" />
            </div>
          </div>
        </motion.div>

        {/* Helper text */}
        <p className="text-center text-sm text-white/50 mt-4">
          ← Drag to compare →
        </p>
      </div>
    </section>
  );
}
