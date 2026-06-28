import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, Check, MapPin, Building2 } from "lucide-react";
import { COMPANY, TEL_LINK } from "@/lib/constants";
import type { Metadata } from "next";

interface LocationPage {
  slug: string;
  city: string;
  service: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  areas: string[];
}

// Location-service combinations for SEO
const LOCATION_PAGES: LocationPage[] = [
  {
    slug: "curtain-walling-nairobi",
    city: "Nairobi",
    service: "Curtain Walling",
    title: "Curtain Walling Nairobi",
    description: "Premium curtain walling systems in Nairobi. Unitized and stick-built facades for commercial towers, designed and installed by Posh Aluminium. Certified Schüco and Reynaers installer.",
    h1: "Curtain Walling in Nairobi",
    intro: "Posh Aluminium designs, fabricates and installs curtain wall systems for commercial towers across Nairobi. From Westlands to Upper Hill, our facades stand on the city's most recognisable buildings.",
    areas: ["Westlands", "Upper Hill", "Kilimani", "Karen", "Lavington", "Industrial Area"],
  },
  {
    slug: "sliding-doors-nairobi",
    city: "Nairobi",
    service: "Sliding Doors",
    title: "Sliding Doors Nairobi",
    description: "Slimline aluminium sliding doors in Nairobi. Lift-and-slide systems, multi-track configurations, and premium hardware. Installed by Posh Aluminium across Nairobi.",
    h1: "Sliding Doors in Nairobi",
    intro: "Slimline sliding doors engineered for Nairobi's climate. Our lift-and-slide systems open homes to gardens with ultra-narrow sightlines and marine-grade hardware rated for coastal and highland conditions.",
    areas: ["Karen", "Lavington", "Runda", "Muthaiga", "Kilimani", "Westlands"],
  },
  {
    slug: "office-partitions-nairobi",
    city: "Nairobi",
    service: "Office Partitions",
    title: "Office Partitions Nairobi",
    description: "Acoustic aluminium and glass office partitions in Nairobi. Demountable, reconfigurable systems with STC 35 to STC 48 ratings. Installed by Posh Aluminium for offices across Nairobi.",
    h1: "Office Partitions in Nairobi",
    intro: "Demountable glass and aluminium partitions for Nairobi offices. Engineered for acoustic isolation (STC 35 to 48), full reconfigurability, and integration with ceiling and floor systems.",
    areas: ["Westlands", "Upper Hill", "CBD", "Kilimani", "Ngong Road", "Mombasa Road"],
  },
  {
    slug: "curtain-walling-mombasa",
    city: "Mombasa",
    service: "Curtain Walling",
    title: "Curtain Walling Mombasa",
    description: "Curtain walling systems in Mombasa. Marine-grade aluminium and hardware for coastal conditions. Designed and installed by Posh Aluminium across Kenya's coast.",
    h1: "Curtain Walling in Mombasa",
    intro: "Coastal environments demand marine-grade materials. Our Mombasa curtain wall projects use 316 stainless steel hardware and PVDF finishes rated for 25+ years in salt-laden air.",
    areas: ["Nyali", "Bamburi", "Shanzu", "Mombasa Island", "Likoni", "Diani"],
  },
  {
    slug: "sliding-doors-mombasa",
    city: "Mombasa",
    service: "Sliding Doors",
    title: "Sliding Doors Mombasa",
    description: "Aluminium sliding doors in Mombasa. Marine-grade hardware, salt-resistant finishes, and thermal-break profiles for coastal homes. Installed by Posh Aluminium.",
    h1: "Sliding Doors in Mombasa",
    intro: "Sliding doors built for Mombasa's coastal climate. Marine-grade 316 stainless hardware, salt-resistant PVDF finishes, and thermal-break profiles that handle humidity without corrosion.",
    areas: ["Nyali", "Bamburi", "Shanzu", "Diani", "Mombasa Island", "Tiwi"],
  },
  {
    slug: "aluminium-windows-nairobi",
    city: "Nairobi",
    service: "Aluminium Windows",
    title: "Aluminium Windows Nairobi",
    description: "Premium aluminium windows in Nairobi. Casement, awning, and fixed windows with thermal-break profiles and Low-E glazing. Installed by Posh Aluminium across Nairobi.",
    h1: "Aluminium Windows in Nairobi",
    intro: "Thermal-break aluminium windows for Nairobi homes and commercial buildings. Low-E double glazing, weather-tight seals, and hardware from Dormakaba and Roto.",
    areas: ["Karen", "Lavington", "Runda", "Muthaiga", "Kilimani", "Westlands"],
  },
  {
    slug: "glass-railings-nairobi",
    city: "Nairobi",
    service: "Glass Railings",
    title: "Glass Railings Nairobi",
    description: "Frameless glass and aluminium railings in Nairobi. Balustrades for balconies, staircases, and terraces. Engineered to KEBS loading standards. Installed by Posh Aluminium.",
    h1: "Glass Railings in Nairobi",
    intro: "Frameless glass balustrades and aluminium railings for Nairobi balconies, staircases, and terraces. Engineered to 1.5 kN/m loading with toughened and laminated glass.",
    areas: ["Karen", "Lavington", "Kilimani", "Westlands", "Muthaiga", "Runda"],
  },
  {
    slug: "shower-cubicles-nairobi",
    city: "Nairobi",
    service: "Shower Cubicles",
    title: "Shower Cubicles Nairobi",
    description: "Frameless glass shower cubicles in Nairobi. 10mm and 12mm toughened glass, premium brass hardware, and anti-lime coatings. Custom-built by Posh Aluminium.",
    h1: "Shower Cubicles in Nairobi",
    intro: "Custom frameless glass shower enclosures for Nairobi homes. 10mm or 12mm toughened safety glass, premium brass hardware, and optional anti-lime hydrophobic coating.",
    areas: ["Karen", "Lavington", "Runda", "Muthaiga", "Kilimani", "Westlands"],
  },
];

export async function generateStaticParams() {
  return LOCATION_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = LOCATION_PAGES.find((p) => p.slug === slug);
  if (!page) return { title: "Location Not Found" };

  return {
    title: `${page.title} | Posh Aluminium`,
    description: page.description,
    alternates: { canonical: `/locations/${page.slug}` },
    openGraph: {
      title: `${page.title} | Posh Aluminium`,
      description: page.description,
      type: "article",
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = LOCATION_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  // Fetch related projects (same service keyword)
  const projects = await db.project.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.description,
    provider: {
      "@type": "Organization",
      name: COMPANY.fullName,
      url: "https://poshaluminium.co.ke",
    },
    areaServed: {
      "@type": "City",
      name: page.city,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Header />
      <main id="main-content" className="flex-1 pt-20">
        {/* Back link */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-accent-red" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent-red">
                {page.city}, Kenya
              </span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight leading-[1.05]">
              {page.h1}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[65ch]">
              {page.intro}
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-accent-red hover:bg-accent-red/90 text-white shadow-red">
                <Link href="/#quote">Get a free quote</Link>
              </Button>
              <Button asChild variant="outline" className="border-royal/30 text-royal hover:bg-royal hover:text-white">
                <a href={TEL_LINK}>Call {COMPANY.phoneDisplay}</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Why choose us in this city */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-mist/40 dark:bg-card/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-royal mb-6">
              Why Posh Aluminium in {page.city}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                `Based in Nairobi, we mobilise site teams for ${page.city} projects with full fabrication and installation capability.`,
                "15+ years of experience across Kenya, with certified Schüco and Reynaers system partnerships.",
                "In-house fabrication means we control lead times, quality, and the schedule, not a third party.",
                "Every system is tested to international standards (ASTM, EN, KEBS) with documented QC packs.",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3 p-5 bg-background border border-border rounded-xl">
                  <span className="h-6 w-6 rounded-full bg-royal/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-royal" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm text-navy dark:text-white">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas served */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-royal mb-6">
              Areas we serve in {page.city}
            </h2>
            <div className="flex flex-wrap gap-2">
              {page.areas.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 rounded-full bg-mist dark:bg-card text-sm font-medium text-navy dark:text-white border border-border"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Recent projects */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-mist/40 dark:bg-card/20">
          <div className="container mx-auto max-w-7xl">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy dark:text-white mb-8">
              Recent work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background hover:shadow-premium transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display font-bold text-lg text-white">
                        {p.title}
                      </h3>
                      <p className="text-xs text-white/70 mt-1">{p.location}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="rounded-3xl bg-navy dark:bg-card p-8 sm:p-12 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Ready to start your {page.service.toLowerCase()} project in {page.city}?
                </p>
                <p className="text-white/70 mt-2">
                  Get a free site survey and quote within 24 hours.
                </p>
              </div>
              <Button asChild className="bg-accent-red hover:bg-accent-red/90 text-white shadow-red flex-shrink-0">
                <Link href="/#quote">
                  Get a Quote
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
