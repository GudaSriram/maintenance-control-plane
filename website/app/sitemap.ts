export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { services, projects } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://gudasriram.github.io/maintenance-control-plane";
  return [
    "",
    "/about",
    "/services",
    "/solutions",
    "/implementation",
    "/work",
    "/pricing",
    "/contact",
    "/privacy",
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/work/${p.slug}`),
  ].map((path) => ({
    url: base + path,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
