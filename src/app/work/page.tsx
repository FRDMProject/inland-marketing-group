import { ContactSection, DesignLab, PageIntro } from "@/components/sections";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "The Design Lab",
  "Explore original web design concepts by Inland Digital Group. Different businesses, different directions, and a distinctive point of view.",
  "/work",
);
export default function Page() {
  return (
    <main id="main">
      <PageIntro
        label="The design lab / Explorations"
        title="Room for a"
        accent="different idea."
        description="A place to explore what a website can feel like. These are original design studies, not commissioned client projects or claims of business results."
      />
      <DesignLab stacked />
      <ContactSection />
    </main>
  );
}
