"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.88]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-navy"
    >
      {/* Background image — striking architectural facade */}
      <motion.div style={{ scale: imageScale, y: imageY }} className="absolute inset-0">
        <Image
          src="https://sfile.chatglm.cn/images-ppt/52795de92048.jpg"
          alt="Modern aluminium-and-glass curtain wall facade. Posh Aluminium fabrication"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
      </motion.div>

      {/* Layered overlays */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/65 to-navy/20"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/30" />

      {/* Content — left-aligned, single composition */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-0 flex items-end pb-16 sm:pb-20 lg:pb-24"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Headline — 2 lines max per taste-skill */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-white text-[clamp(2.25rem,6.5vw,5rem)] leading-[0.98] tracking-[-0.025em]"
            >
              Aluminium &amp; glass
              <br />
              <span className="font-light text-white/70">on Kenya&apos;s skyline.</span>
            </motion.h1>

            {/* Subtext — specific metrics */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.75 }}
              className="mt-6 text-white/75 text-base sm:text-lg max-w-xl leading-relaxed"
            >
              500+ projects across Kenya since 2010. Curtain walls, sliding systems
              and architectural glazing, fabricated in our Nairobi workshop.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.75 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-accent-red hover:bg-accent-red/90 text-white font-semibold shadow-red group"
              >
                <Link href="/#quote" className="px-7 py-6 text-base">
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white font-semibold border border-white/20"
              >
                <Link href="/projects" className="px-6 py-6 text-base">
                  {t("hero.ctaSecondary")}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
