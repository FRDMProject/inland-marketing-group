import {
  CapabilitiesStrip,
  ContactSection,
  DesignLab,
  FAQ,
  Hero,
  Intro,
  LocalSection,
  Process,
  ServicesSection,
} from "@/components/sections";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "Websites with a point of view",
  "Distinctive web design, thoughtful development, and digital growth for businesses in the Inland Empire and Southern California.",
  "/",
);
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <CapabilitiesStrip />
      <Intro />
      <DesignLab />
      <ServicesSection />
      <Process />
      <LocalSection />
      <ContactSection />
      <FAQ />
    </main>
  );
}
