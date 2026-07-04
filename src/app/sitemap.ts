import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://poshaluminium.co.ke";
  const lastModified = new Date();

  // Main page sections (anchor links)
  const sections = [
    "#home",
    "#services",
    "#projects",
    "#story",
    "#industries",
    "#capabilities",
    "#process",
    "#testimonials",
    "#faq",
    "#quote",
    "#contact",
  ];

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...sections.map((s) => ({
      url: `${base}/${s}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
