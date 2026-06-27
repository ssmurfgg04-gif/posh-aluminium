"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { COMPANY, TEL_LINK } from "@/lib/constants";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax + zoom
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy"
    >
      {/* Background image */}
      <motion.div
        style={{ scale: imageScale, y: imageY }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80"
          alt="Premium aluminium and glass commercial tower in Nairobi"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-navy"
      />
      {/* Subtle premium grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Floating glass accents */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="hidden md:block absolute top-[28%] left-[5%] w-56 glass-card rounded-2xl p-4 shadow-premium"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-accent-red/15 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-accent-red" />
          </div>
          <span className="text-xs font-semibold text-navy dark:text-white">Schüco Certified</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Officially approved installer for premium German aluminium systems.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="hidden lg:block absolute top-[35%] right-[5%] w-60 glass-card rounded-2xl p-4 shadow-premium"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-navy dark:text-white">Recent Project</span>
          <span className="text-[10px] text-royal font-medium">2024</span>
        </div>
        <p className="text-sm font-semibold text-navy dark:text-white mb-1">
          Westlands Tower
        </p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          22-storey unitized curtain wall — completed ahead of schedule.
        </p>
      </motion.div>

      {/* Center content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="absolute inset-0 flex items-center justify-center px-4"
      >
        <div className="text-center max-w-5xl mx-auto pt-20">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass border border-white/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-red" />
            </span>
            <span className="text-xs sm:text-sm font-medium tracking-wide text-white">
              {t("hero.eyebrow")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-white text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight"
          >
            {t("hero.title")}
            <br />
            <span className="text-gradient-silver italic font-medium">
              {t("hero.subtitle")}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-6 text-white/85 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Kenya&apos;s premier aluminium &amp; glass specialist — engineering, fabricating
            and installing the country&apos;s most ambitious façades, windows and doors.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent-red hover:bg-accent-red/90 text-white font-semibold shadow-red group"
            >
              <Link href="#quote" className="px-7 py-6 text-base">
                {t("hero.ctaPrimary")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white font-semibold"
            >
              <Link href="#projects" className="px-7 py-6 text-base">
                {t("hero.ctaSecondary")}
              </Link>
            </Button>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.8 }}
            className="mt-8 flex items-center justify-center gap-3 text-white/80"
          >
            <span className="text-xs uppercase tracking-widest">Or call us directly</span>
            <a
              href={TEL_LINK}
              className="flex items-center gap-2 text-sm font-semibold text-white hover:text-accent-red transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              {COMPANY.phoneDisplay}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium">
          {t("hero.scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="h-9 w-5 rounded-full border-2 border-white/40 flex items-start justify-center p-1"
        >
          <span className="h-2 w-1 rounded-full bg-white/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
