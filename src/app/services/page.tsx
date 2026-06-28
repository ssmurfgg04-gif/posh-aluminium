import { db } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Seven specialised aluminium and glass systems: curtain walling, sliding doors, office partitions, shower cubicles, sky screening, railings and cabinets.",
  alternates: { canonical: "/services" },
};

export const dynamic = "force-dynamic";

async function getServices() {
  const services = await db.service.findMany({ orderBy: { order: "asc" } });
  return services.map((s) => ({ id: s.id, slug: s.slug, title: s.title, tagline: s.tagline, description: s.description, benefits: s.benefits, specifications: s.specifications, icon: s.icon, coverImage: s.coverImage, gallery: s.gallery }));
}

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content" className="flex-1 pt-20">
        <Services services={services} />
        <Process />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
