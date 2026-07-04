"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services, type ServiceData } from "@/components/sections/Services";
import { FeaturedProjects, type ProjectData } from "@/components/sections/FeaturedProjects";
import { Testimonials, type TestimonialData } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

interface HomeContentProps {
  services: ServiceData[];
  projects: ProjectData[];
  testimonials: TestimonialData[];
  faqs: any[];
}

export function HomeContent({
  services,
  projects,
  testimonials,
}: HomeContentProps) {
  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <TrustBar />
      <Services services={services} />
      <div className="text-center -mt-6 mb-6">
        <Button asChild variant="link" className="text-royal hover:text-accent-red font-semibold">
          <Link href="/services">
            View all seven services <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <FeaturedProjects projects={projects} />
      <div className="text-center -mt-6 mb-6">
        <Button asChild variant="link" className="text-royal hover:text-accent-red font-semibold">
          <Link href="/projects">
            View all projects <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Testimonials testimonials={testimonials} />
      <CTA />
    </main>
  );
}
