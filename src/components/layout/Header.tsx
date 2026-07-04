"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { Logo } from "@/components/ui/logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const pathname = usePathname();

  const isHomepage = pathname === "/";
  const showSolid = scrolled || !isHomepage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolid ? "glass-nav py-2.5 shadow-premium" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center group" aria-label="Posh Aluminium home">
            <Logo
              variant={showSolid ? "default" : "light"}
              size="sm"
              className="transition-all"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${
                    showSolid
                      ? "text-navy/80 dark:text-white/80 hover:text-royal dark:hover:text-royal-bright"
                      : "text-white/85 hover:text-white"
                  } ${isActive ? "text-royal dark:text-royal-bright" : ""}`}
                >
                  {link.label}
                  <span className={`absolute left-3 right-3 -bottom-0.5 h-0.5 bg-accent-red transition-transform origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={TEL_LINK}
              className={`hidden xl:flex items-center gap-2 text-sm font-semibold transition-colors ${
                showSolid ? "text-navy dark:text-white hover:text-royal" : "text-white hover:text-white"
              }`}
            >
              <span className="h-8 w-8 rounded-full bg-accent-red/10 dark:bg-accent-red/20 flex items-center justify-center">
                <Phone className="h-3.5 w-3.5 text-accent-red" />
              </span>
              {COMPANY.phone}
            </a>

            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className={`h-10 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                showSolid
                  ? "bg-secondary hover:bg-secondary/70 text-navy dark:text-white"
                  : "bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              {lang.toUpperCase()}
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors ${
                showSolid
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

            <Button
              asChild
              size="sm"
              className="hidden sm:flex bg-accent-red hover:bg-accent-red/90 text-white font-semibold shadow-red px-5"
            >
              <Link href="/#quote">Get Quote</Link>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className={`lg:hidden h-10 w-10 rounded-lg flex items-center justify-center transition-colors ${
                    showSolid
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
                  <div className="flex items-center justify-between p-5 border-b border-border">
                    <Logo variant="default" size="sm" />
                    <button
                      onClick={() => setMobileOpen(false)}
                      aria-label="Close menu"
                      className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

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
                            {link.label}
                          </span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-royal group-hover:translate-x-1 transition-all" />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

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
                      <Link href="/#quote">Get Quote</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
