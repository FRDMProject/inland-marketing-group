import { WebDesignPage } from "@/components/web-design-page";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "Custom Web Design in Southern California",
  "Distinctive custom website design and Next.js development for Inland Empire and Southern California businesses. Discuss your next website with Inland Digital Group.",
  "/web-design",
);
export default function Page() {
  return <WebDesignPage />;
}
