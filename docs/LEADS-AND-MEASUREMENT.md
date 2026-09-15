# Lead delivery and measurement

## Visitor journey

Search intent → matching city page → clear web-design offer → CTA → inquiry form → server validation → acknowledged downstream receipt → confirmation. `#start` targets the actual form, including on mobile. FAQs use native details. Mobile navigation closes on selection and Escape.

Required fields: name, email, business, service, project message and contact consent. Phone and website are optional. Labels, autocomplete and suitable types are present. During submission the button is disabled. Errors retain entered fields and receive focus. Success is shown only after the downstream endpoint responds with 2xx. With JavaScript disabled, a notice is visible and the form uses POST, preventing contact data from being placed in a GET query string.

## API contract

POST `/api/leads` with `Content-Type: application/json`:

```json
{
  "name": "Example Person",
  "email": "person@example.com",
  "business": "Example Business",
  "service": "Web design",
  "message": "A description of the project.",
  "consent": true,
  "path": "/lp/web-design/riverside",
  "companyUrl": "",
  "attribution": { "utm_source": "google", "utm_campaign": "riverside-web-design" }
}
```

The server rejects wrong origins when an Origin header is present, wrong media type, malformed JSON, payloads over 16KB, invalid fields and populated honeypots. It reads the stream with a byte cap. A per-instance five-attempts/ten-minute backstop is present; this is not a distributed anti-abuse solution. Configure an appropriate managed rate limit before public ad traffic.

Valid leads receive a UUID, timestamp and idempotency header and are POSTed to `LEAD_WEBHOOK_URL`. The optional token stays server-side. HTTPS is required except an explicit loopback test setting. Redirects are rejected and delivery times out after ten seconds. No contact details are logged by application code.

| Status | Meaning                                |
| ------ | -------------------------------------- |
| 200    | Recipient acknowledged the inquiry     |
| 400    | Validation/spam/malformed request      |
| 403    | Origin mismatch                        |
| 413    | Payload too large                      |
| 415    | Wrong media type                       |
| 429    | Local rate backstop                    |
| 503    | Delivery not configured/available      |
| 502    | Downstream failed or receipt uncertain |

A timeout can occur after a downstream service received the request; avoid automatically retrying and duplicating messages. The UUID supports receiver-side deduplication for the same transport request, but separate manual submissions create new IDs. A receiver must acknowledge durable storage/queueing, not silently discard the lead. No actual CRM/email inbox was configured or tested.

## Measurement

`NEXT_PUBLIC_GA_ID` is optional and absent by default. When configured, analytics loads only after consent; Cookie choices reopens the preference. Consent is stored locally. Ads storage/user data/personalization are denied in the supplied initialization. This is an analytics implementation foundation, not a completed Google Ads consent-mode deployment.

| Event            | Trigger                  | Use                                    |
| ---------------- | ------------------------ | -------------------------------------- |
| `page_view`      | Consented route view     | Sanitized path/origin, no query string |
| `cta_click`      | Link with `data-cta`     | Observational micro-event              |
| `form_start`     | First form interaction   | Observational micro-event              |
| `lead_error`     | Submission failure       | Diagnostic                             |
| `lead_delivered` | Acknowledged API success | Submission event, not a qualified lead |

Application events never pass contact fields/message text. Configure GA4 enhanced measurement carefully: disable automatic form data collection and review URL/referrer handling before enabling production analytics. Do not designate button clicks as primary Ads conversions. No conversion tag IDs or click-to-call tracking are active.

Only the current page's allowlisted attribution is sent with the inquiry. Cross-session/first-touch persistence is intentionally not implemented. If that is required, add consent-aware persistence and document retention. A direct thank-you URL cannot fabricate a success event; confirmation is in the form state after delivery.

## Launch verification

Use an intentional test identity and a local/staging recipient first. Verify the exact payload, downstream record, deduplication, timeout/failure handling and recipient notifications. Then verify GA events with consent granted/declined, accurate campaign attribution, qualified-lead stages and offline-conversion policy. Tests in this repository mock downstream delivery and browser success; they do not prove a real inbox received anything.
