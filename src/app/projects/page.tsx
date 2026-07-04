import { db } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Testimonials } from "@/components/sections/Testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work from 2022 to today. Commercial towers, luxury homes, hospitals and hotels across Kenya.",
  alternates: { canonical: "/projects" },
};

export const dynamic = "force-dynamic";

async function getData() {
  const [projects, testimonials] = await Promise.all([
    db.project.findMany({ orderBy: { createdAt: "desc" } }),
    db.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
  ]);
  return {
    projects: projects.map((p) => ({ id: p.id, title: p.title, slug: p.slug, category: p.category, location: p.location, year: p.year, client: p.client, coverImage: p.coverImage, gallery: p.gallery, summary: p.summary, description: p.description, scope: p.scope, duration: p.duration, value: p.value, featured: p.featured })),
    testimonials: testimonials.map((t) => ({ id: t.id, name: t.name, role: t.role, company: t.company, rating: t.rating, quote: t.quote, avatar: t.avatar, videoUrl: t.videoUrl })),
  };
}

export default async function ProjectsPage() {
  const data = await getData();
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content" className="flex-1 pt-20">
        <FeaturedProjects projects={data.projects} />
        <Testimonials testimonials={data.testimonials} />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
