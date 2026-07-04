"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Building2,
  Hospital,
  Briefcase,
  Building,
  Check,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Send,
  Calculator,
  Sparkles,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { COMPANY } from "@/lib/constants";

const PROJECT_TYPES = [
  { id: "residential", label: "Residential", desc: "Villa, house, bungalow", icon: Home },
  { id: "commercial", label: "Commercial", desc: "Office tower, mall, retail", icon: Building2 },
  { id: "hospital", label: "Hospital", desc: "Healthcare facility", icon: Hospital },
  { id: "office", label: "Office Fit-out", desc: "Interior partitions, doors", icon: Briefcase },
  { id: "apartment", label: "Apartment", desc: "Multi-unit residential", icon: Building },
];

const PRODUCTS = [
  { id: "curtain-walling", label: "Curtain Walling", desc: "Façade systems" },
  { id: "sliding-doors", label: "Sliding Doors", desc: "Slimline systems" },
  { id: "windows", label: "Aluminium Windows", desc: "Casement, awning, fixed" },
  { id: "office-partitions", label: "Office Partitions", desc: "Acoustic, demountable" },
  { id: "shower-cubicles", label: "Shower Cubicles", desc: "Frameless glass" },
  { id: "railings", label: "Railings", desc: "Glass & aluminium balustrades" },
  { id: "sky-screening", label: "Sky Screening", desc: "Louvres & skylights" },
  { id: "cabinets", label: "Cabinets", desc: "Kitchen & wardrobe" },
];

const BUDGET_OPTIONS = [
  { id: "under-500k", label: "Under KSh 500K", desc: "Small project / single room" },
  { id: "500k-2m", label: "KSh 500K – 2M", desc: "Mid-size residential" },
  { id: "2m-10m", label: "KSh 2M – 10M", desc: "Full home or office floor" },
  { id: "10m-50m", label: "KSh 10M – 50M", desc: "Commercial / multi-storey" },
  { id: "50m-plus", label: "KSh 50M+", desc: "Major project" },
  { id: "unsure", label: "Not sure yet", desc: "Help me estimate" },
];

export function QuoteCalculator() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [measurements, setMeasurements] = useState("");
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const STEPS = ["Project Type", "Products", "Details", "Contact"];

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    if (step === 0) return !!projectType;
    if (step === 1) return selectedProducts.length > 0;
    if (step === 2) return !!budget;
    if (step === 3) return details.name && details.phone && details.email;
    return false;
  };

  const buildWhatsAppMessage = () => {
    const pt = PROJECT_TYPES.find((p) => p.id === projectType)?.label ?? projectType;
    const prods = selectedProducts
      .map((id) => PRODUCTS.find((p) => p.id === id)?.label)
      .filter(Boolean)
      .join(", ");
    const bd = BUDGET_OPTIONS.find((b) => b.id === budget)?.label ?? budget;
    return encodeURIComponent(
      `Hello Posh Aluminium, I'd like to request a quote.\n\n` +
        `*Project Type:* ${pt}\n` +
        `*Products:* ${prods}\n` +
        `*Budget:* ${bd}\n` +
        (measurements ? `*Measurements:* ${measurements}\n` : "") +
        `*Name:* ${details.name}\n` +
        `*Phone:* ${details.phone}\n` +
        `*Email:* ${details.email}\n` +
        (details.location ? `*Location:* ${details.location}\n` : "") +
        (details.message ? `*Notes:* ${details.message}\n` : "")
    );
  };

  const handleSubmit = async (viaWhatsApp: boolean = false) => {
    if (!canProceed()) return;
    setSubmitting(true);

    try {
      // Save to database
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: details.name,
          email: details.email,
          phone: details.phone,
          projectType,
          products: JSON.stringify(selectedProducts),
          budget,
          measurements,
          message: details.message + (details.location ? `\nLocation: ${details.location}` : ""),
        }),
      });

      if (viaWhatsApp) {
        window.open(
          `https://wa.me/${COMPANY.whatsapp}?text=${buildWhatsAppMessage()}`,
          "_blank"
        );
      }

      toast({
        title: "Quote request sent!",
        description: viaWhatsApp
          ? "We've opened WhatsApp with your details pre-filled. Our team will respond within 24 hours."
          : "Our team will contact you within 24 hours with a detailed quotation.",
      });

      // Reset
      setStep(0);
      setProjectType("");
      setSelectedProducts([]);
      setBudget("");
      setMeasurements("");
      setDetails({ name: "", email: "", phone: "", location: "", message: "" });
    } catch {
      toast({
        title: "Submission failed",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="quote"
      className="scroll-mt-nav py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-mist/40 to-background dark:via-card/20 relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-20 right-10 h-72 w-72 bg-royal/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-10 h-72 w-72 bg-accent-red/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left intro */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-royal"
            >
              <Calculator className="h-3.5 w-3.5" />
              Instant Quote
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mt-4 font-display font-black text-4xl sm:text-5xl text-navy dark:text-white tracking-tight leading-[1.05]"
            >
              {t("quote.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-base text-muted-foreground leading-relaxed"
            >
              {t("quote.subtitle")}
            </motion.p>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-7 space-y-3"
            >
              {[
                { icon: Clock, text: "Response within 24 hours, guaranteed" },
                { icon: Shield, text: "Free site survey in Nairobi metro" },
                { icon: Sparkles, text: "Detailed BOQ with transparent pricing" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm">
                  <div className="h-8 w-8 rounded-lg bg-royal/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-4 w-4 text-royal" />
                  </div>
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Phone CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-7 p-4 rounded-2xl glass-card shadow-premium"
            >
              <p className="text-xs text-muted-foreground mb-1">Prefer to talk?</p>
              <a
                href={`tel:${COMPANY.phoneIntl}`}
                className="font-display font-bold text-xl text-navy dark:text-white hover:text-royal transition-colors"
              >
                {COMPANY.phoneDisplay}
              </a>
            </motion.div>
          </div>

          {/* Right: Multi-step form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 glass-card rounded-3xl shadow-premium p-6 sm:p-8"
          >
            {/* Step progress */}
            <div className="flex items-center gap-2 mb-7">
              {STEPS.map((s, i) => (
                <div key={s} className="flex-1 flex items-center gap-2">
                  <div className="flex-1">
                    <div
                      className={`h-1.5 rounded-full transition-colors ${
                        i <= step ? "bg-royal" : "bg-border"
                      }`}
                    />
                    <span
                      className={`text-[10px] font-medium uppercase tracking-wider mt-1.5 block transition-colors ${
                        i <= step ? "text-royal" : "text-muted-foreground"
                      }`}
                    >
                      {i + 1}. {s}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <div>
                    <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-1">
                      What type of project is this?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5">
                      Select the option that best describes your project.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {PROJECT_TYPES.map((pt) => (
                        <button
                          key={pt.id}
                          onClick={() => setProjectType(pt.id)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${
                            projectType === pt.id
                              ? "border-royal bg-royal/5 dark:bg-royal/15 shadow-royal"
                              : "border-border hover:border-royal/40 bg-background"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <pt.icon
                              className={`h-6 w-6 ${
                                projectType === pt.id ? "text-royal" : "text-muted-foreground"
                              }`}
                            />
                            {projectType === pt.id && (
                              <Check className="h-5 w-5 text-royal" />
                            )}
                          </div>
                          <p className="font-semibold text-navy dark:text-white mt-2">
                            {pt.label}
                          </p>
                          <p className="text-xs text-muted-foreground">{pt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-1">
                      What do you need?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5">
                      Select all products and systems you need for this project.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {PRODUCTS.map((prod) => {
                        const selected = selectedProducts.includes(prod.id);
                        return (
                          <button
                            key={prod.id}
                            onClick={() => toggleProduct(prod.id)}
                            className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
                              selected
                                ? "border-royal bg-royal/5 dark:bg-royal/15"
                                : "border-border hover:border-royal/40 bg-background"
                            }`}
                          >
                            <div
                              className={`h-5 w-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                selected
                                  ? "bg-royal border-royal"
                                  : "border-border"
                              }`}
                            >
                              {selected && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <div>
                              <p className="font-semibold text-navy dark:text-white text-sm">
                                {prod.label}
                              </p>
                              <p className="text-xs text-muted-foreground">{prod.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-1">
                      Budget &amp; measurements
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5">
                      Help us scope your project accurately.
                    </p>

                    <Label className="text-xs font-bold uppercase tracking-wider text-royal mb-2 block">
                      Estimated Budget
                    </Label>
                    <div className="grid sm:grid-cols-2 gap-3 mb-5">
                      {BUDGET_OPTIONS.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setBudget(b.id)}
                          className={`p-3 rounded-xl border-2 text-left transition-all ${
                            budget === b.id
                              ? "border-royal bg-royal/5 dark:bg-royal/15"
                              : "border-border hover:border-royal/40 bg-background"
                          }`}
                        >
                          <p className="font-semibold text-navy dark:text-white text-sm">
                            {b.label}
                          </p>
                          <p className="text-xs text-muted-foreground">{b.desc}</p>
                        </button>
                      ))}
                    </div>

                    <Label htmlFor="measurements" className="text-xs font-bold uppercase tracking-wider text-royal mb-2 block">
                      Measurements / Quantities <span className="text-muted-foreground normal-case font-normal">(optional)</span>
                    </Label>
                    <Textarea
                      id="measurements"
                      placeholder="e.g. 4 sliding doors 2.4m x 2.4m, 8 windows, 12m of railing..."
                      value={measurements}
                      onChange={(e) => setMeasurements(e.target.value)}
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-1">
                      Your contact details
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5">
                      We&apos;ll send your quote within 24 hours.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-royal mb-1.5 block">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={details.name}
                          onChange={(e) => setDetails({ ...details, name: e.target.value })}
                          placeholder="John Mwangi"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-royal mb-1.5 block">
                          Phone *
                        </Label>
                        <Input
                          id="phone"
                          value={details.phone}
                          onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                          placeholder="07XX XXX XXX"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-royal mb-1.5 block">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={details.email}
                          onChange={(e) => setDetails({ ...details, email: e.target.value })}
                          placeholder="you@email.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-royal mb-1.5 block">
                          Project Location
                        </Label>
                        <Input
                          id="location"
                          value={details.location}
                          onChange={(e) => setDetails({ ...details, location: e.target.value })}
                          placeholder="Nairobi / Mombasa / ..."
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-royal mb-1.5 block">
                        Additional Notes
                      </Label>
                      <Textarea
                        id="message"
                        value={details.message}
                        onChange={(e) => setDetails({ ...details, message: e.target.value })}
                        placeholder="Tell us anything else about your project..."
                        className="resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-7 flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                onClick={() => setStep((p) => Math.max(0, p - 1))}
                disabled={step === 0 || submitting}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>

              {step < 3 ? (
                <Button
                  onClick={() => setStep((p) => p + 1)}
                  disabled={!canProceed()}
                  className="bg-royal hover:bg-royal/90 text-white shadow-royal"
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleSubmit(true)}
                    disabled={!canProceed() || submitting}
                    className="bg-[#25D366] hover:bg-[#1FB855] text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={() => handleSubmit(false)}
                    disabled={!canProceed() || submitting}
                    className="bg-accent-red hover:bg-accent-red/90 text-white shadow-red"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
