"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";

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
}

export function Services({ services }: ServicesProps) {
  const [featured, ...rest] = services;

  return (
    <section id="services" className="scroll-mt-nav py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-mist/40 dark:bg-card/20">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-3xl mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight leading-[1.05]"
          >
            Seven specialised systems,
            <br />
            <span className="font-light text-muted-foreground">one accountable contractor.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[65ch]"
          >
            Most facade contractors in Kenya handle one or two systems. We engineer, fabricate
            and install seven, which means one point of accountability for the entire building envelope.
          </motion.p>
        </div>

        {featured && <FeaturedServiceCard service={featured} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {rest.map((service, i) => {
            const benefits: string[] = JSON.parse(service.benefits);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-border bg-background hover:border-navy/30 hover:shadow-premium transition-all duration-300 h-full"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                    <Image
                      src={service.coverImage}
                      alt={service.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                    <div className="absolute top-4 left-4 h-10 w-10 rounded-lg bg-white/95 flex items-center justify-center shadow-premium">
                      <DynamicIcon name={service.icon} className="h-5 w-5 text-navy" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {service.tagline}
                    </p>
                    <ul className="space-y-1.5 mb-5">
                      {benefits.slice(0, 2).map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="h-3 w-3 text-royal flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-navy dark:text-white group-hover:text-royal transition-colors">
                      Explore service
                      <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Need something not listed? We also handle bespoke facade engineering.
          </p>
          <Button asChild variant="link" className="text-royal hover:text-accent-red font-semibold">
            <Link href="/contact">
              Talk to an engineer
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedServiceCard({ service }: { service: ServiceData }) {
  const benefits: string[] = JSON.parse(service.benefits);
  const specifications: { label: string; value: string }[] = JSON.parse(service.specifications);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group relative w-full block overflow-hidden rounded-3xl border border-border bg-navy grid lg:grid-cols-2 hover:border-navy transition-colors"
      >
        <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
          <Image
            src={service.coverImage}
            alt={service.title}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/30 via-transparent to-navy/30" />
        </div>

        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center text-white">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-11 w-11 rounded-lg bg-white/10 flex items-center justify-center">
              <DynamicIcon name={service.icon} className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Featured
            </span>
          </div>
          <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 leading-[1.05]">
            {service.title}
          </h3>
          <p className="text-white/70 text-base leading-relaxed mb-6 max-w-md">
            {service.description}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {benefits.slice(0, 4).map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-white/85">
                <Check className="h-4 w-4 text-accent-red flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-7 pt-5 border-t border-white/15">
            {specifications.slice(0, 3).map((spec) => (
              <div key={spec.label} className="text-xs">
                <span className="text-white/45 uppercase tracking-wider">{spec.label}</span>
                <span className="block text-white font-semibold text-sm mt-0.5">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-accent-red transition-colors">
            Read full service brief
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
