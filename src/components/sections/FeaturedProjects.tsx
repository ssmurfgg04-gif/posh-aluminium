"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ArrowUpRight, X, Building2, Check } from "lucide-react";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  year: number;
  client: string | null;
  coverImage: string;
  gallery: string;
  summary: string;
  description: string;
  scope: string;
  duration: string | null;
  value: string | null;
  featured: boolean;
}

interface FeaturedProjectsProps {
  projects: ProjectData[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<ProjectData | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  return (
    <section id="projects" className="scroll-mt-nav py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-mist/50 dark:bg-card/30 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-royal"
            >
              <span className="h-px w-8 bg-royal" />
              Featured Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl text-navy dark:text-white tracking-tight leading-[1.05]"
            >
              Recent Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-lg text-muted-foreground"
            >
              A selection of recent commercial, residential and institutional projects across Kenya.
            </motion.p>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === cat.id
                  ? "bg-navy text-white dark:bg-royal dark:text-white shadow-premium"
                  : "bg-white dark:bg-card text-muted-foreground hover:text-navy dark:hover:text-white border border-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              // Mix up card sizes for visual rhythm
              const big = i % 5 === 0 || i % 5 === 3;

              return (
                <motion.button
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActive(project)}
                  className={`group relative overflow-hidden rounded-3xl shadow-premium hover:shadow-royal transition-shadow duration-500 text-left ${
                    big ? "sm:col-span-2 sm:row-span-1" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${big ? "aspect-[16/10] sm:aspect-[2/1]" : "aspect-[4/5] sm:aspect-[4/3]"}`}>
                    <img
                      src={project.coverImage}
                      alt={`${project.title} — ${project.summary}`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                    <div className="absolute inset-0 glass-sweep" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-full bg-accent-red text-white text-[10px] font-bold uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-[11px] text-white/70 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.year}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-1 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/70 flex items-center gap-1.5 mb-3">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </p>
                    <p className="text-sm text-white/85 line-clamp-2 mb-3">
                      {project.summary}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      View case study
                      <span className="h-7 w-7 rounded-full bg-accent-red flex items-center justify-center group-hover:rotate-45 transition-transform">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-3 opacity-40" />
            No projects in this category yet.
          </div>
        )}
      </div>

      {/* Case study modal */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-4xl p-0 max-h-[90vh] overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>{active?.title}</DialogTitle>
            <DialogDescription>{active?.summary}</DialogDescription>
          </DialogHeader>
          {active && (
            <div className="flex flex-col max-h-[90vh]">
              {/* Hero image */}
              <div className="relative aspect-[16/9] sm:aspect-[2/1] flex-shrink-0">
                <img
                  src={active.coverImage}
                  alt={active.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-full bg-accent-red text-white text-[10px] font-bold uppercase tracking-wider">
                      {active.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-medium uppercase tracking-wider">
                      {active.value ?? "Value on request"}
                    </span>
                  </div>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                    {active.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-white/80">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {active.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {active.year}
                    </span>
                    {active.duration && (
                      <span className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5" />
                        {active.duration}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-7 overflow-y-auto nice-scroll bg-background">
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {active.description}
                </p>

                {/* Scope */}
                {(() => {
                  const scope: string[] = JSON.parse(active.scope);
                  return (
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-royal mb-3">
                        Scope of Work
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {scope.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm">
                            <span className="h-5 w-5 rounded-full bg-royal/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-royal" />
                            </span>
                            <span className="text-foreground">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })()}

                {/* Gallery */}
                {(() => {
                  const gallery: string[] = JSON.parse(active.gallery);
                  if (gallery.length === 0) return null;
                  return (
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-royal mb-3">
                        Project Gallery
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {gallery.map((img, i) => (
                          <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                            <img
                              src={img}
                              alt={`${active.title} gallery image ${i + 1}`}
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* CTA */}
                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-royal/10 to-accent-red/10 dark:from-royal/15 dark:to-accent-red/15 border border-royal/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-display font-bold text-navy dark:text-white text-lg">
                      Want results like this?
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Get a free consultation and quote within 24 hours.
                    </p>
                  </div>
                  <Button asChild className="bg-accent-red hover:bg-accent-red/90 text-white shadow-red">
                    <a href="#quote">Get a Quote</a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
