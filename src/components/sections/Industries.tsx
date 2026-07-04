"use client";

import { motion } from "framer-motion";
import { Building2, Home, Hotel, Hospital, GraduationCap, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const INDUSTRIES = [
  { icon: Building2, name: "Commercial Towers", scope: "Curtain walling / Entrance systems / Sky-screening", pain: "Wind-loading on 20+ storeys, weather-tightness, fast-track installation programmes aligned with the main contractor.", example: "Westlands Commercial Tower: 22 storeys, 12,400 m² curtain wall", image: "https://sfile.chatglm.cn/images-ppt/c5bec2271c40.jpg" },
  { icon: Home, name: "Luxury Residential", scope: "Slimline sliding / Frameless glass / Shower cubicles", pain: "Slim sightlines without compromising weather performance. Integration with complex architectural geometries and bespoke finishes.", example: "Karen Luxury Villa: 260 m² frameless facade, 4-track lift-and-slide", image: "https://sfile.chatglm.cn/images-ppt/d72410164955.png" },
  { icon: Hotel, name: "Hospitality", scope: "Acoustic windows / Partitions / Pool-deck screening", pain: "Acoustic isolation for guest comfort (STC 38+), anti-lime coatings for wet areas, brand-standard finish quality across 100+ rooms.", example: "Radisson Blu Upper Hill: 180 rooms, STC 38 windows", image: "https://sfile.chatglm.cn/images-ppt/d19ee8949300.jpg" },
  { icon: Hospital, name: "Healthcare", scope: "Hermetic windows / Cleanroom partitions / Lead-lined glazing", pain: "Hygiene-grade finishes, hermetically sealed operable windows, lead-lined glazing for imaging suites. Zero tolerance for shortcuts.", example: "Aga Khan Hospital: cardiac wing, lead-lined imaging", image: "https://sfile.chatglm.cn/images-ppt/82c772291c30.jpg" },
  { icon: GraduationCap, name: "Education", scope: "Acoustic partitions / Security glazing / Atriums", pain: "Acoustic isolation between teaching spaces, security-rated glazing on ground floors, daylight-filled atriums for collaborative learning.", example: "Brookhouse School: science block, 380 m² atrium", image: "https://sfile.chatglm.cn/images-ppt/abbd01e6bf99.jpg" },
  { icon: ShoppingBag, name: "Retail & Malls", scope: "Atrium curtain wall / Skylights / Walk-on glazing", pain: "Large-span atrium glazing, integrated ETFE skylights, walk-on glass for circulation, tenant-fit coordination.", example: "Two Rivers Mall: 9,000 m² atrium, ETFE skylight", image: "https://sfile.chatglm.cn/images-ppt/2e24441f463c.jpg" },
];

export function Industries() {
  return (
    <section id="industries" className="scroll-mt-nav py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-mist/40 dark:bg-card/20">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-3xl mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight leading-[1.05]"
          >
            Six building typologies,
            <br />
            <span className="font-light text-muted-foreground">six different engineering problems.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[65ch]"
          >
            Each has its own code requirements, performance criteria and installation logistics.
            We have a shipped reference project in every one.
          </motion.p>
        </div>

        <div className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
          <div className="flex gap-5 pb-4 snap-x snap-mandatory">
            {INDUSTRIES.map((industry, i) => (
              <motion.article
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="snap-start flex-shrink-0 w-[300px] sm:w-[360px] bg-background border border-border rounded-2xl overflow-hidden hover:shadow-premium transition-shadow group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={`${industry.name} Posh Aluminium project example`}
                    fill
                    loading="lazy"
                    sizes="360px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 h-10 w-10 rounded-lg bg-white/95 flex items-center justify-center shadow-premium">
                    <industry.icon className="h-5 w-5 text-navy" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-royal mb-3">
                    {industry.scope}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {industry.pain}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                      Reference
                    </p>
                    <p className="text-xs text-navy dark:text-white font-medium leading-snug">
                      {industry.example}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <span>Scroll horizontally to see all six industries</span>
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </div>
    </section>
  );
}
