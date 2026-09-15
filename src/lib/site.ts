import type { Metadata } from "next";

export const site = {
  name: "Inland Digital Group",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  indexable:
    process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" && !!process.env.NEXT_PUBLIC_SITE_URL,
};

export function pageMeta(
  title: string,
  description: string,
  path: string,
  noindex = false,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: site.indexable && !noindex, follow: !noindex },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      type: "website",
      siteName: site.name,
    },
  };
}
