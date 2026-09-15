import { ContactSection, FAQ, PageIntro } from "@/components/sections";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "Let’s Talk About Your Project",
  "Tell Inland Digital Group about your website, redesign, or digital growth project. Let’s explore what comes next.",
  "/contact",
);
export default function Page() {
  return (
    <main id="main">
      <PageIntro
        label="Good things start with a conversation"
        title="An idea? A question?"
        accent="We’re listening."
        description="Tell us about your business, what you have in mind, and what you would like to change. We’ll take it from there."
      />
      <ContactSection />
      <FAQ />
    </main>
  );
}
