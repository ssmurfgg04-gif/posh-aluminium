"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string | null;
  rating: number;
  quote: string;
  avatar: string | null;
  videoUrl: string | null;
}

interface TestimonialsProps {
  testimonials: TestimonialData[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((p) => (p + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = () => {
    setDirection(-1);
    setIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [paused, next]);

  if (testimonials.length === 0) return null;
  const current = testimonials[index];

  return (
    <section
      id="testimonials"
      className="scroll-mt-nav py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-mist via-background to-mist dark:from-card/40 dark:via-background dark:to-card/40 relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-royal"
          >
            <span className="h-px w-8 bg-royal" />
            Client Stories
            <span className="h-px w-8 bg-royal" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight"
          >
            What our clients say
          </motion.h2>
        </div>

        {/* Main testimonial card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative glass-card rounded-3xl shadow-premium p-8 sm:p-12 overflow-hidden">
            {/* Big quote mark */}
            <Quote className="absolute top-6 right-6 h-20 w-20 text-royal/10 dark:text-royal/20" fill="currentColor" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < current.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-display text-xl sm:text-2xl lg:text-3xl text-navy dark:text-white leading-relaxed mb-7 italic font-medium">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {current.avatar ? (
                      <img
                        src={current.avatar}
                        alt={current.name}
                        className="h-14 w-14 rounded-full object-cover ring-2 ring-royal/20"
                      />
                    ) : (
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-royal to-navy flex items-center justify-center text-white font-bold text-lg">
                        {current.name.charAt(0)}
                      </div>
                    )}
                    {current.videoUrl && (
                      <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-accent-red flex items-center justify-center ring-2 ring-background">
                        <Play className="h-3 w-3 text-white" fill="currentColor" />
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-navy dark:text-white">{current.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {current.role}
                      {current.company ? ` · ${current.company}` : ""}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-8 bg-royal" : "w-1.5 bg-border hover:bg-royal/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prev}
                  className="h-9 w-9 rounded-full border-border"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={next}
                  className="h-9 w-9 rounded-full border-border"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Google reviews strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex items-center justify-center gap-4 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>
            <span className="font-semibold text-navy dark:text-white">4.9 out of 5</span>
            {" "}· Based on 200+ verified Google &amp; Instagram reviews
          </span>
        </motion.div>
      </div>
    </section>
  );
}
