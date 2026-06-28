import { db } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Faq } from "@/components/sections/Faq";
import { CTA } from "@/components/sections/CTA";
import type { Metadata } from "next";
import { COMPANY, TEL_LINK, WHATSAPP_LINK } from "@/lib/constants";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Posh Aluminium. Call, email or WhatsApp us for a free site survey and quote within 24 hours.",
  alternates: { canonical: "/contact" },
};

export const dynamic = "force-dynamic";

async function getFaqs() {
  const faqs = await db.faqItem.findMany({ orderBy: { order: "asc" } });
  return faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer, category: f.category, order: f.order }));
}

export default async function ContactPage() {
  const faqs = await getFaqs();
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content" className="flex-1 pt-20">
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="container mx-auto max-w-4xl">
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight leading-[1.05]">
              Let&apos;s talk about
              <br />
              <span className="font-light text-muted-foreground">your project.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[65ch]">
              Call us, email us, or send a WhatsApp message. We respond to every enquiry
              within 24 hours and offer free site surveys across Nairobi.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              <a href={TEL_LINK} className="group p-6 bg-background border border-border rounded-2xl hover:border-navy/30 hover:shadow-premium transition-all">
                <Phone className="h-6 w-6 text-royal mb-3" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Call us</p>
                <p className="font-display font-bold text-lg text-navy dark:text-white group-hover:text-royal transition-colors">{COMPANY.phoneDisplay}</p>
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="group p-6 bg-background border border-border rounded-2xl hover:border-navy/30 hover:shadow-premium transition-all">
                <MessageCircle className="h-6 w-6 text-royal mb-3" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">WhatsApp</p>
                <p className="font-display font-bold text-lg text-navy dark:text-white group-hover:text-royal transition-colors">Chat now</p>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="group p-6 bg-background border border-border rounded-2xl hover:border-navy/30 hover:shadow-premium transition-all">
                <Mail className="h-6 w-6 text-royal mb-3" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Email</p>
                <p className="font-display font-bold text-lg text-navy dark:text-white group-hover:text-royal transition-colors break-all">{COMPANY.email}</p>
              </a>
              <div className="p-6 bg-background border border-border rounded-2xl">
                <MapPin className="h-6 w-6 text-royal mb-3" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Location</p>
                <p className="font-display font-bold text-lg text-navy dark:text-white">{COMPANY.address}</p>
              </div>
            </div>
            <div className="mt-6 p-6 bg-mist/40 dark:bg-card/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-royal" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-royal">Working Hours</h2>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Monday to Friday</span><span className="font-semibold text-navy dark:text-white">8:00 AM to 6:00 PM</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Saturday</span><span className="font-semibold text-navy dark:text-white">9:00 AM to 4:00 PM</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Sunday</span><span className="font-semibold text-muted-foreground">Closed</span></div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">Prefer to send details first?</p>
              <Button asChild size="lg" className="bg-accent-red hover:bg-accent-red/90 text-white shadow-red">
                <a href="/#quote">Start a quote request</a>
              </Button>
            </div>
          </div>
        </section>
        <Faq faqs={faqs} />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
