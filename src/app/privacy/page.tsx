import { PageIntro } from "@/components/sections";
import { pageMeta, site } from "@/lib/site";
export const metadata = pageMeta(
  "Privacy Notice",
  "How Inland Digital Group handles website inquiries and optional analytics.",
  "/privacy",
);
export default function Page() {
  return (
    <main id="main">
      <PageIntro
        label="The practical details"
        title="Your information."
        accent="Handled with care."
        description="This notice describes the website’s inquiry and optional analytics features. Updated September 15, 2026."
      />
      <article className="container legal section">
        <h2>Information you choose to share</h2>
        <p>
          The inquiry form asks for your name, email, business name, service interest, and project
          details. Phone and website are optional. We use these details to respond to your inquiry
          and discuss a potential project. Submitting the form does not subscribe you to a mailing
          list.
        </p>
        <h2>How inquiries are handled</h2>
        <p>
          When online inquiries are available, the form sends your information to our server and
          then to our configured lead-delivery service. The page displays a delivery confirmation
          only after that service acknowledges the request. If delivery is unavailable or fails, the
          page tells you.
        </p>
        <h2>Technical and campaign information</h2>
        <p>
          An inquiry can include the page path and campaign parameters present in its URL, including
          ad click identifiers. These help connect an inquiry with its source. Hosting services may
          process routine request information, such as an IP address. A temporary server-side
          attempt counter helps limit form abuse. Please do not include sensitive personal
          information in the message.
        </p>
        <h2>Optional analytics</h2>
        <p>
          If optional analytics is enabled, the site asks for your choice before loading it. You can
          decline and still use the inquiry form. The site saves that preference in your browser.
          You can change it using Cookie choices in the footer when analytics is configured. We do
          not send form contact details or message text to the site’s analytics events.
        </p>
        <h2>Retention and access</h2>
        <p>
          Inquiry information should be kept only as needed to respond, manage the relationship, and
          meet applicable obligations. Access should be limited to people and service providers
          supporting those purposes. The operating business will confirm its retention schedule and
          providers before the public launch.
        </p>
        <h2>Contact about privacy</h2>
        <p>
          {site.email ? (
            <>
              Contact <a href={`mailto:${site.email}`}>{site.email}</a> about access, correction,
              deletion, or other privacy questions.
            </>
          ) : (
            "The business’s verified privacy contact will be published before public launch."
          )}
        </p>
      </article>
    </main>
  );
}
