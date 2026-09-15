import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: site.indexable
      ? { userAgent: "*", allow: "/", disallow: ["/api/", "/lp/"] }
      : { userAgent: "*", disallow: "/" },
    ...(site.indexable ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  };
}
