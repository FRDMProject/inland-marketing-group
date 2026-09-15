import { writeFileSync } from "node:fs";
// Explicit allowlist: never dump the build environment or developer MCP keys.
const keys = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_CONTACT_EMAIL",
  "NEXT_PUBLIC_CONTACT_PHONE",
  "NEXT_PUBLIC_ALLOW_INDEXING",
  "NEXT_PUBLIC_GA_ID",
  "LEAD_WEBHOOK_URL",
  "LEAD_WEBHOOK_TOKEN",
];
writeFileSync(
  ".env.production",
  keys
    .filter((key) => process.env[key])
    .map((key) => `${key}=${JSON.stringify(process.env[key])}`)
    .join("\n") + "\n",
  { mode: 0o600 },
);
console.log("Prepared allowlisted Amplify runtime configuration.");
