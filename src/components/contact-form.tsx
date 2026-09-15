"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { track } from "./tracking";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const path = usePathname();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const feedback = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "sent") return;
    const values = new FormData(event.currentTarget);
    const params = new URLSearchParams(location.search);
    const attribution: Record<string, string> = {};
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "gclid",
      "gbraid",
      "wbraid",
    ]) {
      const value = params.get(key);
      if (value) attribution[key] = value.slice(0, 200);
    }
    const payload = {
      ...Object.fromEntries(values),
      consent: values.get("consent") === "on",
      path,
      attribution,
    };
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.ok)
        throw new Error(result.error || "Your inquiry could not be delivered. Please try again.");
      setStatus("sent");
      track("lead_delivered", { path, event_id: result.id });
    } catch (failure) {
      setStatus("error");
      setError(
        failure instanceof Error
          ? failure.message
          : "We could not confirm delivery. Please try again later.",
      );
      track("lead_error", { path });
    }
    requestAnimationFrame(() => feedback.current?.focus());
  }
  if (status === "sent")
    return (
      <div ref={feedback} className="form-success" tabIndex={-1} role="status">
        <span className="success-icon">
          <Check />
        </span>
        <p className="eyebrow">Message delivered</p>
        <h3>
          Good things
          <br />
          start here.
        </h3>
        <p>
          Thanks for telling us about your project. We’ll review your details and follow up using
          the contact information you shared.
        </p>
        <Link href="/web-design" className="text-link">
          Explore our approach <ArrowUpRight size={16} />
        </Link>
      </div>
    );
  return (
    <form
      id="start"
      method="post"
      action="/api/leads"
      className={`contact-form ${compact ? "compact" : ""}`}
      onSubmit={submit}
      onFocus={() => {
        if (!started.current) {
          track("form_start", { path });
          started.current = true;
        }
      }}
    >
      <noscript>
        <p className="form-no-js">Please enable JavaScript to send an online inquiry.</p>
      </noscript>
      <div className="form-heading">
        <span className="eyebrow">A new beginning</span>
        <h3>Tell us a little about it.</h3>
        <p>No pressure. Just a conversation about what’s possible.</p>
      </div>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Alex Morgan"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="alex@yourbusiness.com"
          />
        </label>
      </div>
      <label>
        Business name
        <input
          name="business"
          autoComplete="organization"
          required
          minLength={2}
          maxLength={150}
          placeholder="What’s your business called?"
        />
      </label>
      <label>
        What are you thinking?
        <select name="service" defaultValue="Web design">
          <option>Web design</option>
          <option>Website redesign</option>
          <option>Google Ads</option>
          <option>Local SEO</option>
          <option>Something else</option>
        </select>
      </label>
      <label>
        A little about your project
        <textarea
          name="message"
          rows={3}
          required
          minLength={10}
          maxLength={3000}
          placeholder="Where are you now, and where do you want to go?"
        />
      </label>
      <details className="optional-fields">
        <summary>
          Add a phone number or website <span>Optional +</span>
        </summary>
        <div className="form-row">
          <label>
            Phone <span className="field-note">Optional</span>
            <input type="tel" name="phone" autoComplete="tel" maxLength={40} />
          </label>
          <label>
            Current website <span className="field-note">Optional</span>
            <input
              type="url"
              name="website"
              autoComplete="url"
              maxLength={300}
              placeholder="https://"
            />
          </label>
        </div>
      </details>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this blank
          <input name="companyUrl" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent-field">
        <input type="checkbox" name="consent" required />
        <span>
          I agree to be contacted about my inquiry and have read the{" "}
          <Link href="/privacy">privacy notice</Link>.
        </span>
      </label>
      {status === "error" && (
        <div ref={feedback} role="alert" tabIndex={-1} className="form-error">
          {error}
        </div>
      )}
      <button type="submit" className="button button-dark" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            Sending <LoaderCircle className="spin" size={18} />
          </>
        ) : (
          <>
            Let’s start something <ArrowUpRight size={18} />
          </>
        )}
      </button>
      <p className="form-footnote">Your details stay with your inquiry. No mailing list signup.</p>
    </form>
  );
}
