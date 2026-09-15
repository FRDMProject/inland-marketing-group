import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const origin = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
await mkdir(".cache/screenshots", { recursive: true });
const manifest = JSON.parse(await readFile(".next/prerender-manifest.json", "utf8"));
const routes = Object.keys(manifest.routes).filter(
  (path) => !path.includes(".") && !["/opengraph-image", "/_not-found"].includes(path),
);
const routeResults = [];
for (const path of routes) {
  const response = await fetch(origin + path);
  const html = await response.text();
  routeResults.push({
    path,
    status: response.status,
    h1Count: (html.match(/<h1[\s>]/g) || []).length,
    legacyBrand: /Inland Marketing Group|555-0123|inlandmarketinggroup\.com/.test(html),
  });
}
const browser = await chromium.launch();
const visualResults = [];
for (const [name, viewport] of [
  ["desktop", { width: 1440, height: 1000 }],
  ["mobile", { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(origin);
  await page.evaluate(() => document.fonts.ready);
  if (name === "desktop")
    await page
      .locator('.sculpture[data-ready="true"]')
      .waitFor({ timeout: 15000 })
      .catch(() => {});
  if (name === "desktop")
    await page
      .waitForFunction(
        () => getComputedStyle(document.querySelector(".sculpture-fallback")).opacity === "0",
      )
      .catch(() => {});
  await page.screenshot({ path: `.cache/screenshots/${name}-hero.png` });
  const overflow = await page.evaluate(() =>
    [...document.querySelectorAll("main *")]
      .filter((el) => {
        const box = el.getBoundingClientRect();
        return (
          box.right > document.documentElement.clientWidth + 1 &&
          getComputedStyle(el).position !== "absolute"
        );
      })
      .map((el) => ({
        tag: el.tagName,
        class: String(el.className).slice(0, 100),
        right: Math.round(el.getBoundingClientRect().right),
      }))
      .slice(0, 15),
  );
  const dimensions = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
    inner: innerWidth,
  }));
  visualResults.push({
    name,
    dimensions,
    overflow,
    errors,
    webgl: await page.locator(".sculpture canvas").count(),
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.screenshot({ path: `.cache/screenshots/${name}-full.png`, fullPage: true });
  await page.goto(`${origin}/web-design/riverside`);
  await page.screenshot({ path: `.cache/screenshots/${name}-riverside.png` });
  await page.close();
}
const nojs = await browser.newPage({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 844 },
});
await nojs.goto(origin);
const noJsResult = {
  h1: await nojs.locator("h1").innerText(),
  formMethod: await nojs.locator("form").getAttribute("method"),
  noJsNotice: await nojs.locator("noscript p").innerText(),
};
await browser.close();
const report = { date: new Date().toISOString(), routeResults, visualResults, noJsResult };
await writeFile(".cache/site-inspection.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (
  routeResults.some((r) => r.status !== 200 || r.h1Count !== 1 || r.legacyBrand) ||
  visualResults.some((r) => r.errors.length || r.dimensions.scroll > r.dimensions.client + 1)
)
  process.exitCode = 1;
