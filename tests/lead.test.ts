import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { handleLead, rateLimited } from "../src/lib/leads";

const originalFetch = globalThis.fetch;
const originalEndpoint = process.env.LEAD_WEBHOOK_URL;
const originalToken = process.env.LEAD_WEBHOOK_TOKEN;
afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalEndpoint === undefined) delete process.env.LEAD_WEBHOOK_URL;
  else process.env.LEAD_WEBHOOK_URL = originalEndpoint;
  if (originalToken === undefined) delete process.env.LEAD_WEBHOOK_TOKEN;
  else process.env.LEAD_WEBHOOK_TOKEN = originalToken;
});
const lead = {
  name: "Local Test",
  email: "test@example.com",
  business: "Test Business",
  service: "Web design",
  message: "Automated local test only.",
  consent: true,
  path: "/web-design/riverside",
  companyUrl: "",
};
const request = (payload: unknown = lead, origin = "http://localhost:3000") =>
  new Request("http://localhost:3000/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json", origin, "x-forwarded-for": crypto.randomUUID() },
    body: JSON.stringify(payload),
  });
test("invalid fields and missing consent never reach delivery", async () => {
  globalThis.fetch = async () => {
    throw new Error("Delivery must not run");
  };
  assert.equal((await handleLead(request({ ...lead, email: "bad" }))).status, 400);
  assert.equal((await handleLead(request({ ...lead, consent: false }))).status, 400);
});
test("cross-origin and spam requests are rejected", async () => {
  assert.equal((await handleLead(request(lead, "https://unrelated.example"))).status, 403);
  assert.equal((await handleLead(request({ ...lead, companyUrl: "spam" }))).status, 400);
});
test("unconfigured delivery does not claim success", async () => {
  delete process.env.LEAD_WEBHOOK_URL;
  const response = await handleLead(request());
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, undefined);
});
test("downstream failure keeps the inquiry unsuccessful", async () => {
  process.env.LEAD_WEBHOOK_URL = "https://leads.example.test/inquiry";
  globalThis.fetch = async () => new Response("Failed", { status: 500 });
  assert.equal((await handleLead(request())).status, 502);
});
test("verified downstream receipt succeeds and strips honeypot", async () => {
  process.env.LEAD_WEBHOOK_URL = "https://leads.example.test/inquiry";
  process.env.LEAD_WEBHOOK_TOKEN = "local-test-token";
  let called = false;
  globalThis.fetch = async (_url, options) => {
    called = true;
    const body = JSON.parse(String(options?.body));
    assert.equal(body.email, lead.email);
    assert.equal(body.companyUrl, undefined);
    assert.ok(body.id);
    assert.equal(new Headers(options?.headers).get("Authorization"), "Bearer local-test-token");
    return new Response(null, { status: 202 });
  };
  const response = await handleLead(request());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(called, true);
});
test("body size and attempt limits are bounded", async () => {
  assert.equal((await handleLead(request({ ...lead, message: "x".repeat(17000) }))).status, 413);
  const id = crypto.randomUUID();
  for (let i = 0; i < 5; i++) assert.equal(rateLimited(id), false);
  assert.equal(rateLimited(id), true);
});
