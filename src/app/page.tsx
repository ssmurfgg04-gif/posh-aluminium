import { db } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { HomeContent } from "@/components/HomeContent";
import { StructuredData } from "@/components/seo/StructuredData";

export const dynamic = "force-dynamic";

async function getData() {
  const [services, projects, testimonials, faqs] = await Promise.all([
    db.service.findMany({ orderBy: { order: "asc" } }),
    db.project.findMany({ orderBy: { createdAt: "desc" } }),
    db.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
    db.faqItem.findMany({ orderBy: { order: "asc" } }),
  ]);

  return {
    services: services.map((s) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      tagline: s.tagline,
      description: s.description,
      benefits: s.benefits,
      specifications: s.specifications,
      icon: s.icon,
      coverImage: s.coverImage,
      gallery: s.gallery,
      faqs: s.faqs,
    })),
    projects: projects.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category,
      location: p.location,
      year: p.year,
      client: p.client,
      coverImage: p.coverImage,
      gallery: p.gallery,
      summary: p.summary,
      description: p.description,
      scope: p.scope,
      duration: p.duration,
      value: p.value,
      featured: p.featured,
    })),
    testimonials: testimonials.map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      company: t.company,
      rating: t.rating,
      quote: t.quote,
      avatar: t.avatar,
      videoUrl: t.videoUrl,
    })),
    faqs: faqs.map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category,
      order: f.order,
    })),
  };
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <StructuredData />
      <ScrollProgress />
      <Header />
      <HomeContent
        services={data.services}
        projects={data.projects}
        testimonials={data.testimonials}
        faqs={data.faqs}
      />
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
