export type Language = "en" | "sw";

export const translations = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.industries": "Industries",
    "nav.about": "About",
    "nav.gallery": "Gallery",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.getQuote": "Get Quote",

    // Hero
    "hero.eyebrow": "Premium Aluminium & Glass Solutions",
    "hero.title": "Built to Last.",
    "hero.subtitle": "Designed to Impress.",
    "hero.ctaPrimary": "Get Free Quote",
    "hero.ctaSecondary": "View Projects",
    "hero.scroll": "Scroll",

    // Trust
    "trust.projects": "Projects Completed",
    "trust.years": "Years Experience",
    "trust.satisfaction": "Satisfied Clients",
    "trust.response": "Quote Response",

    // Why Posh
    "why.title": "Why Posh Aluminium",
    "why.subtitle": "We are Kenya's premium aluminium and glass specialist — built for clients who refuse to compromise.",

    // Process
    "process.title": "Our Process",
    "process.subtitle": "A proven 5-step methodology refined over 15 years.",

    // CTA
    "cta.title": "Ready to Transform Your Space?",
    "cta.subtitle": "Get a free site survey and quotation within 24 hours.",
    "cta.call": "Call Now",
    "cta.whatsapp": "WhatsApp",
    "cta.quote": "Get Free Quote",

    // Footer
    "footer.tagline": "Premium aluminium & glass solutions across Kenya.",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.hours": "Working Hours",
    "footer.newsletter": "Newsletter",
    "footer.newsletterText": "Subscribe for project showcases and industry insights.",
    "footer.rights": "All rights reserved.",

    // Quote
    "quote.title": "Get an Instant Estimate",
    "quote.subtitle": "Tell us about your project and we'll send a detailed quotation.",

    // Common
    "common.learnMore": "Learn More",
    "common.viewAll": "View All",
    "common.viewProject": "View Case Study",
    "common.getStarted": "Get Started",
    "common.next": "Next",
    "common.back": "Back",
    "common.submit": "Submit",
    "common.sendWhatsApp": "Send via WhatsApp",
  },
  sw: {
    "nav.home": "Nyumbani",
    "nav.services": "Huduma",
    "nav.projects": "Miradi",
    "nav.industries": "Viwanda",
    "nav.about": "Kuhusu",
    "nav.gallery": "Picha",
    "nav.blog": "Blogu",
    "nav.contact": "Wasiliana",
    "nav.getQuote": "Omba Bei",

    "hero.eyebrow": "Suluhisho Bora za Alumini na Kioo",
    "hero.title": "Imejengwa Kudumu.",
    "hero.subtitle": "Imebuniwa Kukumbukwa.",
    "hero.ctaPrimary": "Omba Bei Bure",
    "hero.ctaSecondary": "Tazama Miradi",
    "hero.scroll": "Sogeza",

    "trust.projects": "Miradi Iliyokamilika",
    "trust.years": "Miaka ya Uzoefu",
    "trust.satisfaction": "Wateja Walioridhika",
    "trust.response": "Muda wa Kujibu",

    "why.title": "Kwa Nini Posh Aluminium",
    "why.subtitle": "Sisi ni wataalamu wa alumini na kioo nchini Kenya — tumejengwa kwa wateja wasiokubali kushuka kiwango.",

    "process.title": "Mchakato Wetu",
    "process.subtitle": "Njia ya hatua 5 iliyojaribiwa kwa miaka 15.",

    "cta.title": "Tayari Kubadilisha Nafasi Yako?",
    "cta.subtitle": "Pata uchunguzi wa bure na bei ndani ya saa 24.",
    "cta.call": "Piga Simu",
    "cta.whatsapp": "WhatsApp",
    "cta.quote": "Omba Bei Bure",

    "footer.tagline": "Suluhisho bora za alumini na kioo Kenya nzima.",
    "footer.quickLinks": "Viungo Haraka",
    "footer.services": "Huduma",
    "footer.contact": "Wasiliana",
    "footer.hours": "Masaa ya Kazi",
    "footer.newsletter": "Newsletter",
    "footer.newsletterText": "Jisajili kupata maonyesho ya miradi na maarifa ya sekta.",
    "footer.rights": "Haki zote zimehifadhiwa.",

    "quote.title": "Pata Makadirio ya Haraka",
    "quote.subtitle": "Tuambie kuhusu mradi wako na tutakutumia bei kamili.",

    "common.learnMore": "Jifunze Zaidi",
    "common.viewAll": "Tazama Zote",
    "common.viewProject": "Tazama Kesesi",
    "common.getStarted": "Anza",
    "common.next": "Inayofuata",
    "common.back": "Rudi",
    "common.submit": "Tuma",
    "common.sendWhatsApp": "Tuma kwa WhatsApp",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
