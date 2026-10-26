export const dynamic = "force-static";
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://gudasriram.github.io/maintenance-control-plane";
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: site + "/sitemap.xml",
  };
}
