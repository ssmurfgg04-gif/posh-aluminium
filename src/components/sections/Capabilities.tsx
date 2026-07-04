"use client";

import { motion } from "framer-motion";
import { Wind, Droplets, Volume2, Thermometer, Wrench, FileCheck } from "lucide-react";

const CAPABILITY_GROUPS = [
  {
    group: "Performance",
    items: [
      { icon: Wind, standard: "ASTM E330", label: "Wind-load resistance", value: "Up to 3.6 kPa", desc: "Mullion and transom sections engineered for Nairobi's 3-second gust, deflection limited to L/175." },
      { icon: Droplets, standard: "ASTM E331", label: "Water penetration", value: "Tested at 575 Pa", desc: "Pressure-equalised rain-screen with weep-hole drainage. No water ingress at tropical storm conditions." },
      { icon: Volume2, standard: "EN ISO 717-1", label: "Acoustic insulation", value: "STC 35 to STC 48", desc: "Acoustic partitions and double-glazed units for hospital, hotel and office environments." },
      { icon: Thermometer, standard: "EN ISO 10077", label: "Thermal performance", value: "U-value from 1.4 W/m²K", desc: "Thermal-break aluminium profiles with polyamide struts. Low-E double glazing for energy-efficient buildings." },
    ],
  },
  {
    group: "Systems & Quality",
    items: [
      { icon: Wrench, standard: "EN 13830", label: "Curtain walling", value: "Unitized & stick-built", desc: "Designed and fabricated to EN 13830. Drainage, ventilation and movement joints engineered per system." },
      { icon: FileCheck, standard: "KEBS + ISO 9001", label: "Quality management", value: "Documented QC", desc: "Every project ships with material certificates, test reports and a traceable QC pack. ISO 9001 processes." },
    ],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-nav py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-3xl mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight leading-[1.05]"
          >
            Tested. Documented.
            <br />
            <span className="font-light text-muted-foreground">Certified.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[65ch]"
          >
            Every system we install is engineered to recognised international standards. Test
            certificates, material specs and QC packs ship with every commercial project.
          </motion.p>
        </div>

        <div className="space-y-12">
          {CAPABILITY_GROUPS.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-royal mb-5 pb-3 border-b border-border">
                {group.group}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                {group.items.map((cap, i) => (
                  <motion.div
                    key={cap.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (gi * 0.1) + (i * 0.06) }}
                    className="flex gap-5"
                  >
                    <cap.icon className="h-7 w-7 text-royal flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-3 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {cap.label}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-royal/10 text-royal whitespace-nowrap">
                          {cap.standard}
                        </span>
                      </div>
                      <p className="font-display font-bold text-2xl text-navy dark:text-white mb-2 tracking-tight">
                        {cap.value}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 sm:p-8 rounded-2xl bg-navy dark:bg-card text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-royal-bright mb-1">
              Standards &amp; certifications
            </p>
            <p className="font-display font-bold text-xl sm:text-2xl text-white">
              We test. We document. We sign the paperwork.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-white/80">
            <span>KEBS</span><span className="h-3 w-px bg-white/20" />
            <span>ISO 9001</span><span className="h-3 w-px bg-white/20" />
            <span>ASTM E283</span><span className="h-3 w-px bg-white/20" />
            <span>ASTM E331</span><span className="h-3 w-px bg-white/20" />
            <span>ASTM E330</span><span className="h-3 w-px bg-white/20" />
            <span>EN 13830</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
