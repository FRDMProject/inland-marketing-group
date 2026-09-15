# Rebuild audit and launch checklist

Audit date: September 15, 2026 UTC (September 14 locally in New York). Local production build at `http://127.0.0.1:3000`; no public deployment or Google Ads account was audited.

## Original-site findings and repairs

| Original issue                                             | Rebuilt behavior                                                                                         |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Single HTML file, inline CSS/JS, no framework              | Next.js App Router, typed content, reusable components and documented setup                              |
| Inland Marketing Group branding                            | Inland Digital Group across all served routes                                                            |
| Form changed button text to success without sending        | Server validates and requires acknowledged downstream receipt; absent delivery configuration returns 503 |
| Placeholder contacts, testimonials, metrics and turnaround | Unverified contacts hidden; fabricated proof removed; concepts explicitly labeled                        |
| One-page regional content                                  | Seven differentiated city/region pages plus matching paid routes                                         |
| No deployment handoff                                      | Amplify specification, Node version, lockfile and domain runbook                                         |
| No operational documentation                               | Architecture, design, content, sources, market research, leads and deployment docs                       |

## Checks completed

- `npm run check`: ESLint, strict TypeScript and six lead-handler tests pass.
- `npm run build`: production build succeeds; Next generates 37 entries including pages and metadata assets.
- `npm run test:e2e`: 12 Chromium desktop/mobile tests pass, covering navigation, form anchor, form failure/success with mocked delivery, city content, reduced motion, FAQ and accessibility.
- `node scripts/inspect-site.mjs`: all 29 content pages return 200 with one H1 and no old brand/contact placeholders. Desktop 1440px and mobile 390px have no page overflow or browser exceptions. WebGL renders on desktop; mobile uses the fallback. No-JavaScript heading/POST-method/notice verified.
- `npm audit` and `npm audit --omit=dev`: zero reported vulnerabilities after the PostCSS override.
- Desktop/mobile screenshots were visually inspected; long-heading wrapping, form-anchor landing, three contrast issues and a reduced-motion hydration mismatch were repaired.
- `node scripts/audit-routes.mjs`: 25 internal/asset links checked with no failures; unknown city returns 404; the legacy website-design alias returns 308; 11 additional page templates have no detected WCAG A/AA or best-practice accessibility violations.

The heading effect keeps the full accessible phrase and renders wrap opportunities outside its nonbreaking word spans. Motion preference uses a consistent server snapshot to avoid a hydration mismatch. The logo includes an explicit text separator so its visible name matches its accessible label.

## Performance lab

Lighthouse 13.4.1, Chromium headless, simulated mobile throttling, local production `/web-design/riverside`, September 15 at 03:48 UTC:

| Metric                   | Result                                |
| ------------------------ | ------------------------------------- |
| Performance              | 96/100                                |
| Accessibility            | 100/100                               |
| Best practices           | 100/100                               |
| SEO                      | 66/100; preview intentionally noindex |
| First contentful paint   | 1.4s                                  |
| Largest contentful paint | 2.7s                                  |
| Total blocking time      | 90ms                                  |
| Cumulative layout shift  | 0.001                                 |

The JSON report has no runtime error or run warnings. The CLI reported a Windows temporary-profile cleanup permission error after writing the completed report; the recorded audit itself completed. A small logo accessible-name improvement followed this run and is covered by the later template audit.

This is a single local lab observation, not real-user Core Web Vitals, a field INP result, production network performance or an SEO ranking claim. Recheck after Amplify, the production domain, integrations and real project assets are configured. LCP is still worth optimizing on the deployed site; the local 2.7s result does not establish the field 2.5s good threshold.

Reproduce while the local production server runs:

```sh
npx lighthouse@13.4.1 http://127.0.0.1:3000/web-design/riverside --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=.cache/lighthouse-mobile.json
```

## Evidence locations

- `.cache/site-inspection.json`: route counts, dimensions, browser errors, WebGL/no-JS checks.
- `.cache/screenshots/`: hero, mobile, city, full-page and section captures.
- `.cache/lighthouse-mobile.json`: full measured report.
- `.cache/route-audit.json`: internal links, redirects, 404 and additional template accessibility.
- `playwright-report/`: detailed browser test results.

Evidence caches are intentionally Git-ignored. The repeatable test/scripts and this summary are tracked source.

## Required before public launch

- [ ] Confirm the production domain, actual business identity, email/phone and service coverage.
- [ ] Configure the real lead endpoint; prove durable receipt, intended recipient notification, error recovery and spam controls with an intentional test identity.
- [ ] Finalize privacy contact, providers, retention schedule and policy/legal text.
- [ ] Set up the owner-managed GitHub/Amplify pipeline, verify Node 22 runtime and .next artifact.
- [ ] Configure DNS/certificate only for the verified domain/app; preserve email records.
- [ ] Confirm production canonical URLs, redirects, HTTP headers, social image and robots/sitemap.
- [ ] Enable indexing only after launch readiness; keep paid routes noindex.
- [ ] Verify analytics consent, event delivery, campaign attribution, conversion definitions and qualified-lead handling before ad traffic.
- [ ] Add real approved case studies/testimonials if desired; concepts must remain labeled otherwise.
- [ ] Test real iOS Safari, Android Chrome, Firefox, keyboard/zoom and assistive technology.
- [ ] Add managed rate limiting/anti-abuse suited to traffic. Current rate counter is process-local.
- [ ] Run production-domain mobile performance checks and collect field data after launch.

## Limits

No real lead was sent, no cloud deployment was made, and no campaign was changed. The browser tests mock delivery; server tests mock downstream fetch. Neither proves production inbox delivery. The optional analytics branch needs staging verification with actual account settings. Automated accessibility checks support, but do not replace, a manual accessibility review. Regional market priorities are hypotheses until account/keyword/lead-quality data is available.
