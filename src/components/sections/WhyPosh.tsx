"use client";

import { motion } from "framer-motion";
import {
  Gem,
  Wrench,
  Palette,
  Truck,
  HeadphonesIcon,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const FEATURES = [
  {
    icon: Gem,
    title: "Premium Materials",
    desc: "We work exclusively with Saint Gobain glass, Schüco & Reynaers aluminium systems, and Dormakaba hardware — no shortcuts, no compromises.",
    accent: "from-royal/15 to-royal/5",
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    desc: "Our site teams are full-time employees, trained to international standards and certified by our system partners. No sub-contracted labour.",
    accent: "from-royal/15 to-royal/5",
  },
  {
    icon: Palette,
    title: "Custom Design",
    desc: "Every project starts with detailed shop drawings and 3D visualizations. You see exactly what you'll get — before fabrication begins.",
    accent: "from-royal/15 to-royal/5",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "With an in-house fabrication facility in Industrial Area, we control lead times. Most residential orders ship in 3–5 weeks.",
    accent: "from-royal/15 to-royal/5",
  },
  {
    icon: HeadphonesIcon,
    title: "After-Sales Support",
    desc: "A 2-year workmanship warranty on every install, plus optional annual maintenance contracts for commercial clients.",
    accent: "from-royal/15 to-royal/5",
  },
  {
    icon: ShieldCheck,
    title: "10-Year Profile Warranty",
    desc: "All aluminium profiles carry a 10-year warranty against peeling, fading and structural failure — backed by our system partners.",
    accent: "from-royal/15 to-royal/5",
  },
];

export function WhyPosh() {
  const { t } = useLanguage();

  return (
    <section id="about" className="scroll-mt-nav py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-royal"
          >
            <span className="h-px w-8 bg-royal" />
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight leading-[1.05]"
          >
            {t("why.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg text-muted-foreground leading-relaxed"
          >
            {t("why.subtitle")}
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative glass-card rounded-2xl p-7 shadow-premium hover:shadow-royal transition-all duration-300 overflow-hidden glass-sweep"
            >
              {/* Background accent */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-royal to-navy flex items-center justify-center shadow-royal mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>

                {/* Number watermark */}
                <span className="absolute top-0 right-0 font-display font-black text-7xl text-navy/5 dark:text-white/5 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
