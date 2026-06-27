"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Star } from "lucide-react";
import { STATS } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplay(Math.floor(latest).toLocaleString());
      },
    });
    return () => controls.stop();
  }, [inView, value, count]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-royal">{suffix}</span>
    </span>
  );
}

export function TrustBar() {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 -mt-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl shadow-premium overflow-hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`p-6 sm:p-8 text-center group ${
                  i !== STATS.length - 1
                    ? "md:border-r border-border"
                    : ""
                } ${i % 2 === 0 ? "border-r md:border-r border-border" : ""} ${
                  i < STATS.length - 2 ? "border-b md:border-b-0 border-border" : ""
                }`}
              >
                <div className="font-display font-black text-4xl sm:text-5xl text-navy dark:text-white tracking-tight">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  {t(stat.labelKey)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rating strip */}
          <div className="border-t border-border bg-gradient-to-r from-royal/5 via-transparent to-accent-red/5 dark:from-royal/15 dark:via-transparent dark:to-accent-red/15 px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08, type: "spring" }}
                >
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                </motion.div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-navy dark:text-white">4.9 / 5</span>
              {" "}from 200+ verified reviews on Google &amp; Instagram
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
