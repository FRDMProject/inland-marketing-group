import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactSection, PageIntro } from "@/components/sections";
import { cities } from "@/lib/content";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "Southern California Service Areas",
  "Website design for Riverside, Anaheim, Pomona, Corona, Ontario, Rancho Cucamonga, and businesses across the Inland Empire.",
  "/service-areas",
);
export default function Page() {
  return (
    <main id="main">
      <PageIntro
        label="Inland & beyond"
        title="Local perspective."
        accent="Wider possibilities."
        description="Web design and digital growth for businesses across the Inland Empire and nearby Southern California communities."
      />
      <section className="section">
        <div className="container area-list">
          {cities.map((city, index) => (
            <Link href={`/web-design/${city.slug}`} key={city.slug}>
              <span className="eyebrow">
                0{index + 1} / {city.region}
              </span>
              <h2>
                {city.name.replace(/^the /, "")} <ArrowUpRight />
              </h2>
              <p>{city.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
