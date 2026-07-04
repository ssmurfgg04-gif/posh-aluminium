"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { COMPANY, WHATSAPP_LINK, TEL_LINK } from "@/lib/constants";

export function CTA() {
  const { t } = useLanguage();

  return (
    <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-red via-[#B91C1C] to-[#7F1D1D] shadow-red noise-overlay"
        >
          {/* Decorative shapes */}
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 bg-grid opacity-20" />

          <div className="relative px-6 sm:px-12 py-14 sm:py-20 text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              Available Now
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]"
            >
              {t("cta.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg text-white/85 max-w-2xl mx-auto"
            >
              {t("cta.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-accent-red hover:bg-white/90 font-semibold shadow-premium group"
              >
                <a href={TEL_LINK} className="px-7 py-6 text-base flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {t("cta.call")} · {COMPANY.phone}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white font-semibold"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-7 py-6 text-base flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  {t("cta.whatsapp")}
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-7"
            >
              <Button
                asChild
                variant="link"
                className="text-white hover:text-white/80 font-medium underline-offset-4 group"
              >
                <Link href="#quote">
                  Or get a detailed quote online
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
