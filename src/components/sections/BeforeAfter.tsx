"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function BeforeAfter() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-navy dark:bg-card relative overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[800px] bg-royal/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]"
          >
            The difference
            <br />
            <span className="font-light text-white/60 italic">is in the detail.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-base sm:text-lg text-white/65 leading-relaxed max-w-[65ch] mx-auto"
          >
            A real renovation project: same building, same angle. The left shows the
            dilapidated structure we surveyed. The right shows the completed transformation
            after 14 weeks of fabrication and installation.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[16/9] sm:aspect-[2/1] w-full rounded-3xl overflow-hidden shadow-premium"
        >
          <Image
            src="https://sfile.chatglm.cn/images-ppt/dc59cdc0d708.jpg"
            alt="Real before and after renovation: same building shown dilapidated on the left, restored and modern on the right"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            quality={85}
          />
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-navy text-white text-xs font-bold uppercase tracking-wider shadow-premium z-10">
            Before
          </div>
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-accent-red text-white text-xs font-bold uppercase tracking-wider shadow-red z-10">
            After
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {[
            { value: "14 weeks", label: "From survey to handover" },
            { value: "260 m²", label: "Glazing replaced" },
            { value: "STC 38", label: "Acoustic upgrade" },
            { value: "U-value 1.4", label: "Thermal performance" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="bg-navy dark:bg-card p-5 sm:p-6 text-center"
            >
              <div className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-white/55 mt-1.5 leading-snug">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
