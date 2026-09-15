import {
  BuildDetails,
  ContactSection,
  LocalSection,
  PageIntro,
  Process,
} from "@/components/sections";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "The Studio",
  "Meet the thinking behind Inland Digital Group: independent ideas, distinctive web design, and a thoughtful approach to digital growth.",
  "/about",
);
export default function Page() {
  return (
    <main id="main">
      <PageIntro
        label="Inland Digital Group / The studio"
        title="Independent thinking."
        accent="Inland ambition."
        description="We help businesses turn what makes them different into a digital presence that feels unmistakably their own."
      />
      <section className="section">
        <div className="container editorial-grid">
          <h2>
            Good design
            <br />
            starts with
            <br />
            <em>paying attention.</em>
          </h2>
          <div className="prose">
            <p>
              To your business. To your customers. To the small details that make something feel
              right.
            </p>
            <p>
              Inland Digital Group brings together website strategy, visual design, development, and
              digital growth. We approach each project as a connected experience, from the first
              impression to the moment someone gets in touch.
            </p>
            <p>
              We believe in clear scope, direct conversations, and work that has a reason behind it.
              The aim is simple: help your business show up with confidence.
            </p>
          </div>
        </div>
      </section>
      <LocalSection />
      <BuildDetails />
      <Process />
      <ContactSection />
    </main>
  );
}
