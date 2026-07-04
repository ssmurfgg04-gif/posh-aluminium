import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://poshaluminium.co.ke/sitemap.xml",
    host: "https://poshaluminium.co.ke",
  };
}
