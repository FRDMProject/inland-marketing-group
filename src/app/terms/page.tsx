import { PageIntro } from "@/components/sections";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "Website Terms",
  "Terms for using the Inland Digital Group website and requesting project information.",
  "/terms",
);
export default function Page() {
  return (
    <main id="main">
      <PageIntro
        label="The practical details"
        title="A little clarity."
        accent="Before we begin."
        description="Website terms. Updated September 15, 2026."
      />
      <article className="container legal section">
        <h2>About this website</h2>
        <p>
          This website describes Inland Digital Group’s services and invites project inquiries.
          Information on the site is general and does not form a project agreement.
        </p>
        <h2>Project scope and fees</h2>
        <p>
          Deliverables, timelines, fees, payment arrangements, ownership, third-party licenses,
          hosting, and support are agreed separately in a written proposal or contract. An inquiry
          does not create an obligation to buy services.
        </p>
        <h2>Design studies</h2>
        <p>
          Items labeled as concepts or design studies are exploratory examples. They are not
          presented as commissioned client work, endorsements, or evidence of commercial results.
          Third-party component authors retain applicable rights in their work.
        </p>
        <h2>Results and availability</h2>
        <p>
          Search rankings, ad performance, AI recommendations, and business outcomes depend on many
          factors. No specific outcome is promised by the website. Features may be updated or
          temporarily unavailable.
        </p>
        <h2>Responsible use</h2>
        <p>
          Please use the inquiry form for relevant project communications. Do not submit unlawful
          content, private information about other people without permission, or automated spam.
        </p>
        <h2>Privacy and questions</h2>
        <p>
          See the privacy notice for information about inquiries and optional analytics.
          Business-specific contract and legal details will be confirmed before public launch.
        </p>
      </article>
    </main>
  );
}
