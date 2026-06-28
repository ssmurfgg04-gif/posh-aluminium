"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Menu,
  X,
  Moon,
  Sun,
  Globe,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { COMPANY, TEL_LINK } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "#home", labelKey: "nav.home" as const },
  { href: "#services", labelKey: "nav.services" as const },
  { href: "#projects", labelKey: "nav.projects" as const },
  { href: "#process", labelKey: "nav.industries" as const },
  { href: "#about", labelKey: "nav.about" as const },
  { href: "#testimonials", labelKey: "nav.gallery" as const },
  { href: "#faq", labelKey: "nav.blog" as const },
  { href: "#contact", labelKey: "nav.contact" as const },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav py-2.5 shadow-premium" : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="#home" className="flex items-center gap-2.5 group" aria-label="Posh Aluminium home">
              <div className="relative">
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    scrolled
                      ? "bg-gradient-to-br from-royal to-navy"
                      : "bg-gradient-to-br from-royal-bright to-royal"
                  } shadow-royal`}
                >
                  <span className="font-display font-black text-xl text-white">P</span>
                </div>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-accent-red ring-2 ring-background" />
              </div>
              <div className="flex flex-col leading-none">
                <span className={`font-display font-bold text-lg sm:text-xl tracking-tight transition-colors ${
                  scrolled ? "text-navy dark:text-white" : "text-white"
                }`}>
                  Posh<span className="text-accent-red">.</span>
                </span>
                <span className={`text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-medium transition-colors ${
                  scrolled ? "text-muted-foreground" : "text-white/80"
                }`}>
                  Aluminium & Glass
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${
                    scrolled
                      ? "text-navy/80 dark:text-white/80 hover:text-royal dark:hover:text-royal-bright"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {t(link.labelKey)}
                  <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-accent-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Phone (desktop only) */}
              <a
                href={TEL_LINK}
                className={`hidden xl:flex items-center gap-2 text-sm font-semibold transition-colors ${
                  scrolled ? "text-navy dark:text-white hover:text-royal" : "text-white hover:text-white"
                }`}
              >
                <span className="h-8 w-8 rounded-full bg-accent-red/10 dark:bg-accent-red/20 flex items-center justify-center">
                  <Phone className="h-3.5 w-3.5 text-accent-red" />
                </span>
                {COMPANY.phone}
              </a>

              {/* Language toggle */}
              <button
                onClick={toggleLang}
                aria-label="Toggle language"
                className={`h-9 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                  scrolled
                    ? "bg-secondary hover:bg-secondary/70 text-navy dark:text-white"
                    : "bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm"
                }`}
              >
                <Globe className="h-3.5 w-3.5" />
                {lang.toUpperCase()}
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className={`h-9 w-9 rounded-lg flex items-center justify-center transition-colors ${
                  scrolled
                    ? "bg-secondary hover:bg-secondary/70 text-navy dark:text-white"
                    : "bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Get Quote (desktop) */}
              <Button
                asChild
                size="sm"
                className="hidden sm:flex bg-accent-red hover:bg-accent-red/90 text-white font-semibold shadow-red px-5"
              >
                <Link href="#quote">{t("nav.getQuote")}</Link>
              </Button>

              {/* Mobile menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button
                    aria-label="Open menu"
                    className={`lg:hidden h-10 w-10 rounded-lg flex items-center justify-center transition-colors ${
                      scrolled
                        ? "bg-secondary text-navy dark:text-white"
                        : "bg-white/15 text-white backdrop-blur-sm"
                    }`}
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-sm p-0">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full bg-background">
                    {/* Mobile header */}
                    <div className="flex items-center justify-between p-5 border-b border-border">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-royal to-navy flex items-center justify-center shadow-royal">
                          <span className="font-display font-black text-lg text-white">P</span>
                        </div>
                        <div className="leading-none">
                          <span className="font-display font-bold text-lg text-navy dark:text-white">
                            Posh<span className="text-accent-red">.</span>
                          </span>
                          <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
                            Aluminium & Glass
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                        className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Mobile nav */}
                    <nav className="flex-1 overflow-y-auto p-5 space-y-1" aria-label="Mobile">
                      {NAV_LINKS.map((link, i) => (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between p-3.5 rounded-xl hover:bg-secondary group"
                          >
                            <span className="font-medium text-navy dark:text-white">
                              {t(link.labelKey)}
                            </span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-royal group-hover:translate-x-1 transition-all" />
                          </Link>
                        </motion.div>
                      ))}
                    </nav>

                    {/* Mobile CTA */}
                    <div className="p-5 border-t border-border space-y-3">
                      <a
                        href={TEL_LINK}
                        className="flex items-center justify-center gap-2 w-full p-3.5 rounded-xl bg-secondary text-navy dark:text-white font-semibold"
                      >
                        <Phone className="h-4 w-4 text-accent-red" />
                        {COMPANY.phone}
                      </a>
                      <Button
                        asChild
                        className="w-full bg-accent-red hover:bg-accent-red/90 text-white font-semibold shadow-red"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Link href="#quote">{t("nav.getQuote")}</Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
