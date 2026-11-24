export const dynamic = "force-static";
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://gudasriram.github.io/maintenance-control-plane";
  return [
    "",
    "/pricing",
    "/about",
    "/contact",
    "/privacy",
  ].map((path) => ({
    url: base + path,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
