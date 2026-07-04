"use client";

import { motion } from "framer-motion";

export function AboutStory() {
  return (
    <section id="story" className="scroll-mt-nav py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-navy dark:bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative">
        <div className="max-w-3xl mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]"
          >
            Founded in 2010 on a refusal
            <br />
            <span className="font-light text-white/55">to cut corners.</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 space-y-5 text-white/75 text-base sm:text-lg leading-relaxed"
          >
            <p>
              Posh Aluminium started in a small Nairobi workshop with three
              fabricators and one stubborn idea: that Kenyan buildings deserved the same
              aluminium and glass quality specified on projects in Dubai, London and
              Johannesburg.
            </p>
            <p>
              Fifteen years later, we employ 48 people in a 1,200 m² fabrication
              facility, we are certified installers for Schüco and Reynaers, and our
              curtain walls stand on towers from Westlands to Upper Hill. We have never
              sub-contracted an installation, and we never will.
            </p>
            <p>
              We still turn down projects where the client wants to substitute down on
              materials. That is the only way we know how to protect the reputation we
              spent fifteen years building.
            </p>

            <div className="pt-6 mt-2 border-t border-white/10">
              <p className="font-display italic text-lg text-white">
                The Posh Aluminium team
              </p>
              <p className="text-sm text-white/50 mt-1">
                Nairobi, Kenya. Est. 2010
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-px bg-white/10 rounded-xl overflow-hidden"
          >
            {[
              { value: "1,200 m²", label: "Owned fabrication facility" },
              { value: "48", label: "Full-time employees" },
              { value: "6", label: "Certified system partnerships" },
              { value: "Est. 2010", label: "Nairobi, Kenya" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="bg-navy p-5 sm:p-6 flex items-baseline justify-between gap-4"
              >
                <span className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-white/55 text-right max-w-[60%]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
