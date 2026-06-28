import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Posh Aluminium serves Nairobi, Mombasa, and across Kenya. Find curtain walling, sliding doors, office partitions, and glass solutions in your area.",
  alternates: { canonical: "/locations" },
};

const LOCATIONS = [
  { slug: "curtain-walling-nairobi", city: "Nairobi", service: "Curtain Walling" },
  { slug: "sliding-doors-nairobi", city: "Nairobi", service: "Sliding Doors" },
  { slug: "office-partitions-nairobi", city: "Nairobi", service: "Office Partitions" },
  { slug: "aluminium-windows-nairobi", city: "Nairobi", service: "Aluminium Windows" },
  { slug: "glass-railings-nairobi", city: "Nairobi", service: "Glass Railings" },
  { slug: "shower-cubicles-nairobi", city: "Nairobi", service: "Shower Cubicles" },
  { slug: "curtain-walling-mombasa", city: "Mombasa", service: "Curtain Walling" },
  { slug: "sliding-doors-mombasa", city: "Mombasa", service: "Sliding Doors" },
];

export default function LocationsPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content" className="flex-1 pt-20">
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="container mx-auto max-w-5xl">
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight leading-[1.05]">
              Service areas
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[65ch]">
              We serve clients across Kenya from our Nairobi workshop. Find the service you need
              in your city below, or contact us about projects anywhere in the country.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LOCATIONS.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="group p-6 bg-background border border-border rounded-2xl hover:border-navy/30 hover:shadow-premium transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-accent-red" />
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-red">
                      {loc.city}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-lg text-navy dark:text-white mb-1">
                    {loc.service}
                  </h2>
                  <div className="flex items-center gap-1 text-sm font-semibold text-royal group-hover:text-accent-red transition-colors">
                    Learn more
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 p-6 bg-mist/40 dark:bg-card/20 rounded-2xl text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t see your city? We serve all 47 counties in Kenya.{" "}
                <Link href="/contact" className="font-semibold text-royal hover:text-accent-red transition-colors">
                  Contact us about your location
                </Link>
              </p>
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
