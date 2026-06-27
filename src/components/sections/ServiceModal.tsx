"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";

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
  faqs: string;
}

interface ServiceModalProps {
  service: ServiceData | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

function getIcon(name: string) {
  const Icon = (Icons as Record<string, any>)[name] ?? Icons.Building2;
  return Icon;
}

export function ServiceModal({ service, open, onOpenChange }: ServiceModalProps) {
  if (!service) return null;

  const Icon = getIcon(service.icon);
  const benefits: string[] = JSON.parse(service.benefits);
  const specifications: { label: string; value: string }[] = JSON.parse(service.specifications);
  const gallery: string[] = JSON.parse(service.gallery);
  const faqs: { q: string; a: string }[] = JSON.parse(service.faqs);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 max-h-[90vh] overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{service.title}</DialogTitle>
          <DialogDescription>{service.tagline}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col max-h-[90vh]">
          {/* Hero */}
          <div className="relative aspect-[16/9] sm:aspect-[2/1] flex-shrink-0">
            <img
              src={service.coverImage}
              alt={service.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/20" />
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="h-14 w-14 rounded-2xl glass border border-white/25 flex items-center justify-center backdrop-blur-md mb-3">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                {service.title}
              </h2>
              <p className="text-sm sm:text-base text-white/80 mt-1">{service.tagline}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto nice-scroll bg-background">
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              {service.description}
            </p>

            {/* Benefits + Specs grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Benefits */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-royal mb-3">
                  Key Benefits
                </h4>
                <ul className="space-y-2.5">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm">
                      <span className="h-5 w-5 rounded-full bg-royal/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-royal" />
                      </span>
                      <span className="text-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-royal mb-3">
                  Specifications
                </h4>
                <dl className="space-y-2">
                  {specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-mist/60 dark:bg-secondary/40 text-sm"
                    >
                      <dt className="text-muted-foreground">{spec.label}</dt>
                      <dd className="font-semibold text-navy dark:text-white">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Gallery */}
            {gallery.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-royal mb-3">
                  Gallery
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                      <img
                        src={img}
                        alt={`${service.title} gallery ${i + 1}`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {faqs.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-royal mb-3">
                  Service FAQs
                </h4>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div key={i} className="p-4 rounded-xl bg-mist/60 dark:bg-secondary/40">
                      <p className="font-semibold text-navy dark:text-white text-sm mb-1">{faq.q}</p>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-royal/10 to-accent-red/10 dark:from-royal/15 dark:to-accent-red/15 border border-royal/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-display font-bold text-navy dark:text-white text-lg">
                  Interested in {service.title.toLowerCase()}?
                </p>
                <p className="text-sm text-muted-foreground">
                  Get a free site survey and quote within 24 hours.
                </p>
              </div>
              <Button asChild className="bg-accent-red hover:bg-accent-red/90 text-white shadow-red">
                <a href="#quote" onClick={() => onOpenChange(false)}>
                  Get a Quote
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
