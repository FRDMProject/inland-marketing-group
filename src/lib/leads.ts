import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.email("Enter a valid email address.").max(254),
  business: z.string().trim().min(2, "Enter your business name.").max(150),
  phone: z.string().trim().max(40).optional().default(""),
  website: z.string().trim().max(300).optional().default(""),
  service: z.enum(["Web design", "Website redesign", "Google Ads", "Local SEO", "Something else"]),
  message: z.string().trim().min(10, "Tell us a little more about your project.").max(3000),
  consent: z.literal(true, { error: "Please agree to be contacted about your inquiry." }),
  companyUrl: z.string().max(300).optional().default(""),
  path: z.string().startsWith("/").max(200),
  attribution: z
    .record(
      z.enum([
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "gclid",
        "gbraid",
        "wbraid",
      ]),
      z.string().max(200),
    )
    .optional(),
});

const attempts = new Map<string, { count: number; expires: number }>();
export function rateLimited(key: string) {
  const now = Date.now();
  for (const [id, bucket] of attempts) if (bucket.expires < now) attempts.delete(id);
  const bucket = attempts.get(key);
  if (bucket && bucket.expires > now) {
    bucket.count += 1;
    return bucket.count > 5;
  }
  // Per-instance backstop only; managed edge rate limiting belongs in deployment.
  if (attempts.size > 10000) return true;
  attempts.set(key, { count: 1, expires: now + 10 * 60 * 1000 });
  return false;
}

export async function handleLead(request: Request) {
  const json = (body: Record<string, unknown>, status: number) =>
    Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
  const origin = request.headers.get("origin");
  const allowed = new Set(
    [new URL(request.url).origin, process.env.NEXT_PUBLIC_SITE_URL].filter(Boolean),
  );
  if (origin && !allowed.has(origin))
    return json(
      { error: "This request could not be verified. Refresh the page and try again." },
      403,
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json({ error: "Expected a JSON request." }, 415);
  if (Number(request.headers.get("content-length")) > 16384)
    return json({ error: "Your message is too long." }, 413);
  const reader = request.body?.getReader();
  if (!reader) return json({ error: "The request is empty." }, 400);
  let bytes = 0,
    text = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 16384) {
        await reader.cancel();
        return json({ error: "Your message is too long." }, 413);
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
  } catch {
    return json({ error: "The request could not be read." }, 400);
  }
  let input: unknown;
  try {
    input = JSON.parse(text);
  } catch {
    return json({ error: "The request could not be read." }, 400);
  }
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) return json({ error: parsed.error.issues[0].message }, 400);
  if (parsed.data.companyUrl) return json({ error: "This request could not be verified." }, 400);
  const key = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (rateLimited(key))
    return json({ error: "Too many attempts. Please try again in a few minutes." }, 429);
  const endpoint = process.env.LEAD_WEBHOOK_URL;
  if (!endpoint)
    return json(
      {
        error:
          "Online inquiries are temporarily unavailable. Your message has not been sent. Please keep a copy and try again later.",
      },
      503,
    );
  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    return json({ error: "Online inquiries are temporarily unavailable." }, 503);
  }
  const localAllowed =
    process.env.ALLOW_LOCAL_WEBHOOK === "true" && ["127.0.0.1", "localhost"].includes(url.hostname);
  if (url.protocol !== "https:" && !localAllowed)
    return json({ error: "Online inquiries are temporarily unavailable." }, 503);
  const id = crypto.randomUUID();
  const { companyUrl: _honeypot, ...lead } = parsed.data;
  void _honeypot;
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": id,
        ...(process.env.LEAD_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ id, receivedAt: new Date().toISOString(), ...lead }),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
      cache: "no-store",
    });
    if (!result.ok)
      return json(
        {
          error:
            "Your inquiry could not be delivered. Your details are still here; please try again later.",
        },
        502,
      );
    return json({ ok: true, id }, 200);
  } catch {
    return json(
      { error: "We could not confirm delivery. Please keep your details and try again later." },
      502,
    );
  }
}
