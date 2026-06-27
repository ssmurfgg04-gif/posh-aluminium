"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ClipboardList, PencilRuler, Factory, HardHat, LifeBuoy } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Consultation",
    desc: "We meet you on-site or via video call to understand your vision, scope and budget. A senior engineer attends every consultation — no salespeople.",
    duration: "Day 1 – 3",
  },
  {
    icon: PencilRuler,
    title: "Design",
    desc: "Our in-house engineers produce detailed shop drawings, 3D visualisations and a transparent BOQ. You sign off before fabrication begins.",
    duration: "Week 1 – 2",
  },
  {
    icon: Factory,
    title: "Fabrication",
    desc: "Profiles are cut, machined and powder-coated at our Industrial Area facility under ISO-grade quality control. Glass is tempered and laminated in-house.",
    duration: "Week 3 – 6",
  },
  {
    icon: HardHat,
    title: "Installation",
    desc: "Certified site teams install to international standards. Daily progress reports, weekly QC walks, and zero-defect handover.",
    duration: "Week 7 – 10",
  },
  {
    icon: LifeBuoy,
    title: "After-Sales",
    desc: "2-year workmanship warranty, optional AMC, and a 10-year spare-parts guarantee. We don't disappear after handover.",
    duration: "Ongoing",
  },
];

export function Process() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="scroll-mt-nav py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-royal"
          >
            <span className="h-px w-8 bg-royal" />
            How We Work
            <span className="h-px w-8 bg-royal" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight"
          >
            {t("process.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            {t("process.subtitle")}
          </motion.p>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Vertical line (mobile) / Horizontal line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-border">
            <motion.div
              style={{ scaleX: lineScale }}
              className="h-full origin-left bg-gradient-to-r from-royal via-royal-bright to-accent-red"
            />
          </div>
          <div className="lg:hidden absolute top-0 bottom-0 left-7 w-0.5 bg-border">
            <motion.div
              style={{ scaleY: lineScale }}
              className="w-full origin-top bg-gradient-to-b from-royal via-royal-bright to-accent-red"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex lg:block gap-5 lg:gap-0 lg:text-center pl-20 lg:pl-0"
              >
                {/* Icon circle */}
                <div className="absolute lg:relative left-0 lg:left-auto top-0 lg:top-auto lg:mx-auto h-14 w-14 lg:mb-5 rounded-2xl bg-white dark:bg-card border-2 border-royal/20 flex items-center justify-center shadow-premium z-10">
                  <step.icon className="h-6 w-6 text-royal" />
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-accent-red text-white text-xs font-bold flex items-center justify-center shadow-red">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="lg:px-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-royal">
                    {step.duration}
                  </span>
                  <h3 className="font-display font-bold text-xl text-navy dark:text-white mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
