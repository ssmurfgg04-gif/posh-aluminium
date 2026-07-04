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
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { COMPANY, TEL_LINK } from "@/lib/constants";
import type { Metadata } from "next";

// Pre-generate all service pages at build time
export async function generateStaticParams() {
  const services = await db.service.findMany({ select: { slug: true } });
  return services.map((s) => ({ slug: s.slug }));
}

// Dynamic metadata per service
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await db.service.findUnique({ where: { slug } });
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Posh Aluminium`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Posh Aluminium`,
      description: service.tagline,
      type: "article",
      images: [{ url: service.coverImage, width: 1200, height: 630, alt: service.title }],
    },
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export const dynamic = "force-dynamic";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await db.service.findUnique({ where: { slug } });
  if (!service) notFound();

  const benefits: string[] = JSON.parse(service.benefits);
  const specifications: { label: string; value: string }[] = JSON.parse(service.specifications);
  const gallery: string[] = JSON.parse(service.gallery);
  const faqs: { q: string; a: string }[] = JSON.parse(service.faqs);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: COMPANY.fullName,
      url: "https://poshaluminium.co.ke",
    },
    areaServed: { "@type": "Country", name: "Kenya" },
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
            href="/#services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>
        </div>

        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-premium order-2 lg:order-1">
                <Image
                  src={service.coverImage}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  quality={85}
                />
              </div>
              {/* Text */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-12 w-12 rounded-xl bg-navy flex items-center justify-center">
                    <DynamicIcon name={service.icon} className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight leading-[1.05]">
                  {service.title}
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-[65ch]">
                  {service.tagline}
                </p>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-[65ch]">
                  {service.description}
                </p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-accent-red hover:bg-accent-red/90 text-white shadow-red">
                    <Link href="/#quote">Get a Quote</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-royal/30 text-royal hover:bg-royal hover:text-white">
                    <a href={TEL_LINK}>Call {COMPANY.phoneDisplay}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits + Specifications */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 mt-16 bg-mist/40 dark:bg-card/20">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Benefits */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-royal mb-6">
                  Key Benefits
                </h2>
                <ul className="space-y-4">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="h-6 w-6 rounded-full bg-royal/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-royal" strokeWidth={2.5} />
                      </span>
                      <span className="text-base text-navy dark:text-white">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-royal mb-6">
                  Specifications
                </h2>
                <div className="space-y-3">
                  {specifications.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-background border border-border rounded-xl"
                    >
                      <span className="text-sm text-muted-foreground">{spec.label}</span>
                      <span className="text-sm font-semibold text-navy dark:text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-xs font-bold uppercase tracking-widest text-royal mb-6">
                Gallery
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
                      alt={`${service.title} gallery image ${i + 1}`}
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

        {/* FAQs */}
        {faqs.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-mist/40 dark:bg-card/20">
            <div className="container mx-auto max-w-3xl">
              <h2 className="text-xs font-bold uppercase tracking-widest text-royal mb-6">
                Service FAQs
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-6 bg-background border border-border rounded-xl">
                    <p className="font-semibold text-navy dark:text-white text-base mb-2">{faq.q}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="rounded-3xl bg-navy dark:bg-card p-8 sm:p-12 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Interested in {service.title.toLowerCase()}?
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
