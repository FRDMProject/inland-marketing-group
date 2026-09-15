import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile, writeFile } from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const manifest = JSON.parse(await readFile(".next/prerender-manifest.json", "utf8"));
const links = new Set();
for (const path of Object.keys(manifest.routes)) {
  if (path.includes(".") || path === "/opengraph-image") continue;
  const html = await (await fetch(base + path)).text();
  for (const match of html.matchAll(/href="([^"#]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (href.startsWith("/") && !href.startsWith("//")) links.add(href.split("#")[0]);
  }
}
const badLinks = [];
for (const link of links) {
  const response = await fetch(base + link);
  if (!response.ok) badLinks.push({ link, status: response.status });
}
const missing = await fetch(base + "/web-design/not-a-supported-city");
const redirect = await fetch(base + "/website-design", { redirect: "manual" });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const templateResults = [];
for (const path of [
  "/about",
  "/services",
  "/services/local-seo",
  "/services/google-ads",
  "/services/ai-search",
  "/work",
  "/work/forma",
  "/service-areas",
  "/privacy",
  "/terms",
  "/not-found-example",
]) {
  await page.goto(base + path);
  await page.evaluate(() => document.fonts.ready);
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"])
    .analyze();
  templateResults.push({
    path,
    violations: result.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
  });
}
await page.goto(base);
for (const selector of [".design-lab", ".process-section", ".contact-section"])
  await page.locator(selector).screenshot({ path: `.cache/screenshots/${selector.slice(1)}.png` });
await browser.close();
const report = {
  date: new Date().toISOString(),
  checkedLinks: links.size,
  badLinks,
  unknownCityStatus: missing.status,
  aliasStatus: redirect.status,
  aliasLocation: redirect.headers.get("location"),
  templateResults,
};
await writeFile(".cache/route-audit.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (
  badLinks.length ||
  missing.status !== 404 ||
  redirect.status !== 308 ||
  templateResults.some((r) => r.violations.length)
)
  process.exitCode = 1;
