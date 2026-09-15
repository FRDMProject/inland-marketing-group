import {
  BuildDetails,
  CapabilitiesStrip,
  ContactSection,
  DesignLab,
  FAQ,
  Hero,
  Intro,
  LocalSection,
  Process,
} from "./sections";
import type { City } from "@/lib/content";
import { site } from "@/lib/site";
export function WebDesignPage({ city, paid = false }: { city?: City; paid?: boolean }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${city?.name || "Southern California"} web design`,
    serviceType: "Website design and development",
    provider: { "@type": "Organization", name: site.name },
    areaServed: {
      "@type": city?.slug === "inland-empire" || !city ? "AdministrativeArea" : "City",
      name: city?.name || "Southern California",
    },
  };
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <Hero city={city} webDesign paid={paid} />
      <CapabilitiesStrip />
      <Intro />
      <DesignLab />
      <BuildDetails />
      <Process />
      <LocalSection city={city} />
      <ContactSection />
      <FAQ />
    </main>
  );
}
