"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceData {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string;
  specifications: string;
  icon: string;
  coverImage: string;
  gallery: string;
}

interface ServicesProps {
  services: ServiceData[];
  onSelect: (s: ServiceData) => void;
}

function getIcon(name: string) {
  const Icon = (Icons as Record<string, any>)[name] ?? Icons.Building2;
  return Icon;
}

export function Services({ services, onSelect }: ServicesProps) {
  return (
    <section id="services" className="scroll-mt-nav py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-mist/50 dark:bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-royal"
            >
              <span className="h-px w-8 bg-royal" />
              Our Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight leading-[1.05]"
            >
              Engineered systems,
              <br />
              <span className="text-gradient-royal italic">beautifully delivered.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed lg:max-w-md"
          >
            Seven specialised service lines, each backed by certified installers,
            premium hardware partners and a 10-year profile warranty.
          </motion.p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            const benefits: string[] = JSON.parse(service.benefits);

            return (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                onClick={() => onSelect(service)}
                className={`group relative text-left overflow-hidden rounded-3xl shadow-premium hover:shadow-royal transition-all duration-500 hover:-translate-y-2 ${
                  i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                }`}
              >
                {/* Image background */}
                <div className={`relative ${i === 0 ? "aspect-[16/10] lg:aspect-[20/9]" : "aspect-[4/3]"}`}>
                  <img
                    src={service.coverImage}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/10" />
                  {/* Glass sweep */}
                  <div className="absolute inset-0 glass-sweep" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end text-white">
                  {/* Icon top-right */}
                  <div className="absolute top-6 right-6 h-12 w-12 rounded-2xl glass border border-white/25 flex items-center justify-center backdrop-blur-md">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Number badge */}
                  <span className="absolute top-6 left-6 text-xs font-bold uppercase tracking-widest text-white/70">
                    {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </span>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/80 mb-4 leading-relaxed">
                    {service.tagline}
                  </p>

                  {/* Benefits (only for featured first card) */}
                  {i === 0 && (
                    <ul className="hidden sm:grid grid-cols-2 gap-2 mb-4">
                      {benefits.slice(0, 4).map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-white/85">
                          <Check className="h-3.5 w-3.5 text-accent-red flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    Explore service
                    <span className="h-7 w-7 rounded-full bg-accent-red flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Looking for something specific? We handle bespoke systems too.
          </p>
          <Button asChild variant="outline" className="border-royal/30 text-royal hover:bg-royal hover:text-white">
            <Link href="#quote">Request a custom quote</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
