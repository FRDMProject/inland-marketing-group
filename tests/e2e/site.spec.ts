import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home renders, no horizontal overflow, no browser exceptions", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(/Good business/);
  await expect(page.locator("h1")).toHaveCount(1);
  await page.locator("#start").scrollIntoViewIfNeeded();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({
    path: `.cache/screenshots/${testInfo.project.name}-full.png`,
    fullPage: true,
  });
});
test("navigation works with keyboard and touch", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  }
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Web design", exact: true })
    .click();
  await expect(page).toHaveURL(/\/web-design$/);
  await page.getByRole("link", { name: "Let’s build something" }).click();
  await expect(page.getByRole("heading", { name: "Tell us a little about it." })).toBeInViewport();
  const labelY = await page.getByLabel("Your name", { exact: true }).boundingBox();
  expect(labelY!.y).toBeGreaterThan(70);
});
test("form preserves entered details on failed delivery", async ({ page }) => {
  await page.goto("/lp/web-design/riverside?utm_source=google&utm_campaign=riverside");
  await page.getByLabel("Your name", { exact: true }).fill("Local Test");
  await page.getByLabel("Email address", { exact: true }).fill("test@example.com");
  await page.getByLabel("Business name", { exact: true }).fill("Test Business");
  await page
    .getByLabel("A little about your project")
    .fill("Automated local validation. Do not deliver.");
  await page.getByRole("checkbox").check();
  await page.route("**/api/leads", async (route) => {
    const body = route.request().postDataJSON();
    expect(body.path).toBe("/lp/web-design/riverside");
    expect(body.attribution.utm_source).toBe("google");
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Your message has not been sent." }),
    });
  });
  await page.getByRole("button", { name: "Let’s start something" }).click();
  await expect(page.locator(".form-error")).toHaveText("Your message has not been sent.");
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue("Local Test");
  await expect(page.getByRole("heading", { name: "Good things start here." })).toHaveCount(0);
});
test("form confirms only an acknowledged lead", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Your name", { exact: true }).fill("Local Test");
  await page.getByLabel("Email address", { exact: true }).fill("test@example.com");
  await page.getByLabel("Business name", { exact: true }).fill("Test Business");
  await page
    .getByLabel("A little about your project")
    .fill("Browser mock response only; no external delivery.");
  await page.getByRole("checkbox").check();
  await page.route("**/api/leads", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, id: "local-mock" }),
    }),
  );
  await page.getByRole("button", { name: "Let’s start something" }).click();
  await expect(page.getByRole("status")).toContainText("Message delivered");
});
test("city routes, metadata, reduced motion and FAQ", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/lp/web-design/rancho-cucamonga");
  await expect(page.locator("h1")).toContainText("Rancho Cucamonga");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator("[data-motion]")).toHaveAttribute("data-motion", "paused");
  await expect(page.locator(".sculpture canvas")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    ),
  ).toBe(true);
  await page.locator("summary").filter({ hasText: "What does a custom website cost?" }).click();
  await expect(page.locator("details[open]")).toContainText("written scope");
  expect(errors).toEqual([]);
});
test("home and inquiry have no serious accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/contact", "/web-design/riverside"]) {
    await page.goto(route);
    await page.locator("#start").scrollIntoViewIfNeeded();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
});
