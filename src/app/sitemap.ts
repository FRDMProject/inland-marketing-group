import type { MetadataRoute } from "next";
import { cities, projects, services } from "@/lib/content";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  const paths = [
    "",
    "/web-design",
    "/services",
    "/work",
    "/about",
    "/service-areas",
    "/contact",
    "/privacy",
    "/terms",
    ...cities.map((c) => `/web-design/${c.slug}`),
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/work/${p.slug}`),
  ];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" || path === "/web-design" ? 1 : 0.7,
  }));
}
