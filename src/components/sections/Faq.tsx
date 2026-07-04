"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FaqData {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

interface FaqProps {
  faqs: FaqData[];
}

export function Faq({ faqs }: FaqProps) {
  // Sort by order
  const sorted = [...faqs].sort((a, b) => a.order - b.order);

  return (
    <section id="faq" className="scroll-mt-nav py-14 sm:py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-royal"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Questions &amp; Answers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Everything you need to know about working with Posh Aluminium &amp; Glass.
          </motion.p>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-3 sm:p-5 shadow-premium"
        >
          <Accordion type="single" collapsible className="w-full">
            {sorted.map((faq, i) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className={`border-border ${
                  i === sorted.length - 1 ? "border-b-0" : ""
                }`}
              >
                <AccordionTrigger className="text-left hover:no-underline px-4 sm:px-5 py-5 group">
                  <span className="flex items-start gap-3 flex-1">
                    <span className="font-display font-black text-royal text-sm flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display font-semibold text-base sm:text-lg text-navy dark:text-white group-hover:text-royal transition-colors">
                      {faq.question}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 pb-5 pl-12 sm:pl-14">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground mb-3">
            Still have questions? We&apos;re here to help.
          </p>
          <Button asChild variant="outline" className="border-royal/30 text-royal hover:bg-royal hover:text-white">
            <Link href="#contact">Contact our team</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
