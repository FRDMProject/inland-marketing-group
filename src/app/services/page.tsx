import { ContactSection, PageIntro, ServicesSection } from "@/components/sections";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "Web Design & Digital Growth Services",
  "Custom websites, local SEO, Google Ads, and AI search visibility for Southern California businesses.",
  "/services",
);
export default function Page() {
  return (
    <main id="main">
      <PageIntro
        label="Strategy / Design / Development / Growth"
        title="One connected"
        accent="digital presence."
        description="A distinctive website and a practical plan to help the right people find it. Choose the services that fit where you are and where you want to go."
      />
      <ServicesSection />
      <ContactSection />
    </main>
  );
}
