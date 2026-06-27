"use client";

import { useState } from "react";
import { Services, type ServiceData } from "@/components/sections/Services";
import { ServiceModal } from "@/components/sections/ServiceModal";
import { FeaturedProjects, type ProjectData } from "@/components/sections/FeaturedProjects";
import { Testimonials, type TestimonialData } from "@/components/sections/Testimonials";
import { Faq, type FaqData } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyPosh } from "@/components/sections/WhyPosh";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Process } from "@/components/sections/Process";
import { Brands } from "@/components/sections/Brands";
import { CTA } from "@/components/sections/CTA";
import { QuoteCalculator } from "@/components/sections/QuoteCalculator";

interface HomeContentProps {
  services: ServiceData[];
  projects: ProjectData[];
  testimonials: TestimonialData[];
  faqs: FaqData[];
}

export function HomeContent({
  services,
  projects,
  testimonials,
  faqs,
}: HomeContentProps) {
  const [activeService, setActiveService] = useState<ServiceData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectService = (s: ServiceData) => {
    setActiveService(s);
    setModalOpen(true);
  };

  return (
    <main className="flex-1">
      <Hero />
      <TrustBar />
      <WhyPosh />
      <Services services={services} onSelect={handleSelectService} />
      <FeaturedProjects projects={projects} />
      <BeforeAfter />
      <Process />
      <Testimonials testimonials={testimonials} />
      <Brands />
      <Faq faqs={faqs} />
      <QuoteCalculator />
      <CTA />

      <ServiceModal
        service={activeService}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </main>
  );
}
