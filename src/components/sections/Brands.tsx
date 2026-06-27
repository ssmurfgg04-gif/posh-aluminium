"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { BRANDS } from "@/lib/constants";

export function Brands() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-border bg-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-royal">
            <ShieldCheck className="h-3.5 w-3.5" />
            Premium System Partners
          </span>
          <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto">
            We are certified installers for the world&apos;s leading aluminium, glass and hardware brands.
            Your project gets the same quality specified on Burj Khalifa, Apple Park and The Shard.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative aspect-[3/2] rounded-2xl bg-mist/50 dark:bg-card/60 border border-border flex flex-col items-center justify-center p-4 hover:border-royal/30 hover:shadow-premium transition-all"
            >
              <span className="font-display font-bold text-lg sm:text-xl text-navy/70 dark:text-white/70 group-hover:text-navy dark:group-hover:text-white transition-colors tracking-tight">
                {brand.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                {brand.country}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
