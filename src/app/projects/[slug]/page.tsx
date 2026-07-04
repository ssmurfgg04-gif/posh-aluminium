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
import { ArrowLeft, ArrowUpRight, MapPin, Calendar, Building2, Check, Clock, DollarSign } from "lucide-react";
import { COMPANY, TEL_LINK } from "@/lib/constants";
import type { Metadata } from "next";

// Pre-generate all project pages at build time for SEO + speed
export async function generateStaticParams() {
  const projects = await db.project.findMany({ select: { slug: true } });
  return projects.map((p) => ({ slug: p.slug }));
}

// Dynamic metadata for each project page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await db.project.findUnique({ where: { slug } });
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Posh Aluminium Case Study`,
      description: project.summary,
      type: "article",
      images: [{ url: project.coverImage, width: 1200, height: 630, alt: project.title }],
    },
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export const dynamic = "force-dynamic";

async function getProject(slug: string) {
  const project = await db.project.findUnique({ where: { slug } });
  if (!project) return null;
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    category: project.category,
    location: project.location,
    year: project.year,
    client: project.client,
    coverImage: project.coverImage,
    gallery: project.gallery,
    summary: project.summary,
    description: project.description,
    scope: project.scope,
    duration: project.duration,
    value: project.value,
    featured: project.featured,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const scope: string[] = JSON.parse(project.scope);
  const gallery: string[] = JSON.parse(project.gallery);

  // Fetch related projects (same category, exclude current)
  const related = await db.project.findMany({
    where: {
      category: project.category,
      slug: { not: project.slug },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `https://poshaluminium.co.ke/projects/${project.slug}`,
    image: project.coverImage,
    dateCreated: String(project.year),
    locationCreated: project.location,
    creator: {
      "@type": "Organization",
      name: COMPANY.fullName,
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
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>
        </div>

        {/* Hero image */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="relative aspect-[16/9] sm:aspect-[2/1] rounded-3xl overflow-hidden shadow-premium">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
            </div>
          </div>
        </section>

        {/* Title block */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="px-2.5 py-1 rounded-full bg-accent-red text-white text-[10px] font-bold uppercase tracking-wider">
                {project.category}
              </span>
              {project.value && (
                <span className="px-2.5 py-1 rounded-full bg-navy/5 dark:bg-white/10 text-navy dark:text-white text-[10px] font-bold uppercase tracking-wider">
                  {project.value}
                </span>
              )}
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight leading-[1.05]">
              {project.title}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-[65ch]">
              {project.summary}
            </p>

            {/* Meta strip */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 pt-6 border-t border-border">
              <MetaItem icon={MapPin} label="Location" value={project.location} />
              <MetaItem icon={Calendar} label="Year" value={String(project.year)} />
              {project.duration && (
                <MetaItem icon={Clock} label="Duration" value={project.duration} />
              )}
              {project.client && (
                <MetaItem icon={Building2} label="Client" value={project.client} />
              )}
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        </section>

        {/* Scope of work */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 bg-mist/40 dark:bg-card/20">
          <div className="container mx-auto max-w-4xl py-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-royal mb-6">
              Scope of Work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {scope.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-5 bg-background border border-border rounded-xl"
                >
                  <span className="h-6 w-6 rounded-full bg-royal/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-royal" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm text-navy dark:text-white font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="container mx-auto max-w-5xl py-16">
              <h2 className="text-xs font-bold uppercase tracking-widest text-royal mb-6">
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {gallery.map((img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-2xl group ${
                      i === 0 ? "sm:col-span-2 aspect-[2/1]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} gallery image ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      quality={80}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="container mx-auto max-w-5xl">
            <div className="rounded-3xl bg-navy dark:bg-card p-8 sm:p-12 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Want results like this on your next project?
                </p>
                <p className="text-white/70 mt-2">
                  Get a free site survey and quote within 24 hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Button asChild className="bg-accent-red hover:bg-accent-red/90 text-white shadow-red">
                  <Link href="/#quote">
                    Get a Quote
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/15 hover:text-white"
                >
                  <a href={TEL_LINK}>
                    Call {COMPANY.phoneDisplay}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related projects */}
        {related.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 pb-20 bg-mist/40 dark:bg-card/20">
            <div className="container mx-auto max-w-7xl py-16">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy dark:text-white mb-8">
                More {project.category} projects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p) => (
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
        )}
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 text-royal flex-shrink-0" />
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
          {label}
        </div>
        <div className="text-sm text-navy dark:text-white font-medium">{value}</div>
      </div>
    </div>
  );
}
