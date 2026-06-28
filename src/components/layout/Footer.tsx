"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { COMPANY, TEL_LINK, WHATSAPP_LINK } from "@/lib/constants";

const SERVICES_LINKS = [
  "Curtain Walling",
  "Sliding Doors",
  "Office Partitions",
  "Shower Cubicles",
  "Sky Screening",
  "Railings",
  "Aluminium Cabinets",
];

const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Get Quote", href: "#quote" },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: COMPANY.social.facebook, label: "Facebook" },
  { icon: Instagram, href: COMPANY.social.instagram, label: "Instagram" },
  { icon: Linkedin, href: COMPANY.social.linkedin, label: "LinkedIn" },
  { icon: Youtube, href: COMPANY.social.youtube, label: "YouTube" },
];

export function Footer() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const onSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast({
          title: "Subscribed!",
          description: "You'll receive our next project showcase in your inbox.",
        });
        setEmail("");
      } else {
        toast({
          title: "Already subscribed",
          description: "This email is already on our newsletter list.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer id="contact" className="scroll-mt-nav mt-auto bg-navy dark:bg-[#040813] text-white relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[900px] bg-royal/15 blur-[140px] pointer-events-none" />

      {/* Top CTA strip */}
      <div className="relative border-b border-white/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-royal-bright font-bold mb-1">
                Visit our showroom
              </p>
              <p className="font-display font-bold text-xl sm:text-2xl">
                {COMPANY.address}
              </p>
              <p className="text-sm text-white/60 mt-1">{COMPANY.addressLine2}</p>
            </div>
            <div className="flex gap-3">
              <Button asChild className="bg-accent-red hover:bg-accent-red/90 text-white shadow-red">
                <a href={TEL_LINK}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
              <Button asChild variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/15 hover:text-white">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative border-b border-white/10">
        <iframe
          title="Posh Aluminium location"
          src={`https://www.google.com/maps?q=${COMPANY.mapsQuery}&output=embed`}
          className="w-full h-[280px] grayscale invert dark:invert-0 opacity-90"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Main footer */}
      <div className="relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Brand block */}
            <div className="lg:col-span-4">
              <Link href="#home" className="inline-flex items-center gap-2.5 mb-4" aria-label="Posh Aluminium home">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-royal to-royal-bright flex items-center justify-center shadow-royal">
                  <span className="font-display font-black text-xl text-white">P</span>
                </div>
                <div className="leading-none">
                  <span className="font-display font-bold text-xl text-white">
                    Posh<span className="text-accent-red">.</span>
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/60 mt-0.5">
                    Aluminium & Glass
                  </p>
                </div>
              </Link>
              <p className="text-sm text-white/70 leading-relaxed mb-5 max-w-sm">
                {t("footer.tagline")} From curtain walling on 22-storey towers to frameless shower
                cubicles in private homes — we engineer, fabricate and install to international standards.
              </p>

              {/* Socials */}
              <div className="flex gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="h-9 w-9 rounded-lg bg-white/5 hover:bg-royal text-white/70 hover:text-white flex items-center justify-center transition-all"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-white">
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 hover:text-royal-bright transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-3">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-white">
                {t("footer.services")}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {SERVICES_LINKS.map((s) => (
                  <li key={s}>
                    <Link
                      href="#services"
                      className="text-sm text-white/65 hover:text-royal-bright transition-colors"
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + hours */}
            <div className="lg:col-span-3">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-white">
                {t("footer.contact")}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href={TEL_LINK} className="flex items-start gap-3 text-sm text-white/70 hover:text-white group">
                    <Phone className="h-4 w-4 text-royal-bright flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="block text-xs text-white/50">Phone</span>
                      <span className="group-hover:text-royal-bright transition-colors">{COMPANY.phoneDisplay}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-3 text-sm text-white/70 hover:text-white group">
                    <Mail className="h-4 w-4 text-royal-bright flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="block text-xs text-white/50">Email</span>
                      <span className="group-hover:text-royal-bright transition-colors break-all">{COMPANY.email}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="h-4 w-4 text-royal-bright flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-xs text-white/50">Showroom</span>
                    {COMPANY.address}
                    <br />
                    {COMPANY.addressLine2}
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <Clock className="h-4 w-4 text-royal-bright flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-xs text-white/50">{t("footer.hours")}</span>
                    {COMPANY.hoursWeek}
                    <br />
                    {COMPANY.hoursSat}
                    <br />
                    <span className="text-white/40">{COMPANY.hoursSun}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-10 border-t border-white/10 grid md:grid-cols-2 gap-6 items-center"
          >
            <div>
              <h4 className="font-display font-bold text-lg text-white mb-1">
                {t("footer.newsletter")}
              </h4>
              <p className="text-sm text-white/60">{t("footer.newsletterText")}</p>
            </div>
            <form onSubmit={onSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-royal-bright"
              />
              <Button type="submit" className="bg-accent-red hover:bg-accent-red/90 text-white shadow-red">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <p>
              © {new Date().getFullYear()} {COMPANY.fullName}. {t("footer.rights")}
            </p>
            <div className="flex items-center gap-4">
              <span>Designed in Nairobi</span>
              <span className="hidden sm:inline">·</span>
              <span>Built with Next.js + Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
