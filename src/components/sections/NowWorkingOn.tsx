"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const ACTIVE_PROJECTS = [
  { title: "Upper Hill Office Tower", location: "Upper Hill, Nairobi", progress: 68, stage: "Curtain wall installation", detail: "Floors 12-18 of 24. On track for Q3 handover." },
  { title: "Lavington Family Home", location: "Lavington, Nairobi", progress: 85, stage: "Sliding doors & shower cubicles", detail: "Final fit-out. Handover scheduled for next month." },
  { title: "Mombasa Road Retail Complex", location: "Mombasa Road, Nairobi", progress: 32, stage: "Fabrication in workshop", detail: "Aluminium profiles being cut and assembled. Site mobilisation in 4 weeks." },
];

export function NowWorkingOn() {
  return (
    <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-border bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-3xl mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-navy dark:text-white tracking-tight leading-[1.05]"
          >
            Currently on the bench.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[65ch]"
          >
            Three projects in active fabrication or installation right now.
            We are not a company that finished working in 2019 and left the website up.
          </motion.p>
        </div>

        <div className="space-y-px bg-border border border-border rounded-2xl overflow-hidden">
          {ACTIVE_PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-background p-6 sm:p-7 hover:bg-mist/40 dark:hover:bg-card/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0 flex items-center sm:items-start">
                  <div className="relative h-16 w-16">
                    <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-border" />
                      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-royal transition-all duration-1000" strokeDasharray={`${2 * Math.PI * 28}`} strokeDashoffset={`${2 * Math.PI * 28 * (1 - project.progress / 100)}`} />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-sm text-navy dark:text-white">
                      {project.progress}%
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                    <h3 className="font-display font-bold text-lg text-navy dark:text-white">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-royal mb-1">
                    {project.stage}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-sm text-muted-foreground"
        >
          Want to see finished work?{" "}
          <Link href="/projects" className="font-semibold text-royal hover:text-accent-red transition-colors inline-flex items-center gap-1">
            Browse completed projects
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
