import { notFound } from "next/navigation";
import { cities, getCity } from "@/lib/content";
import { pageMeta } from "@/lib/site";
import { WebDesignPage } from "@/components/web-design-page";
export const dynamicParams = false;
export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const city = getCity((await params).city);
  if (!city) notFound();
  return pageMeta(
    `${city.name.replace(/^the /, "")} Web Design`,
    city.description,
    `/web-design/${city.slug}`,
  );
}
export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const city = getCity((await params).city);
  if (!city) notFound();
  return <WebDesignPage city={city} />;
}
