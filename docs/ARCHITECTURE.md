# Architecture and maintenance

## Stack

Next.js 15.5.25 App Router, React 19.3, TypeScript, plain CSS, Motion 12, Three.js, Lucide and Zod. The lockfile is authoritative. Node 22 is the Amplify target and `.nvmrc` version; development/build also works on the installed Node 24.13.

PostCSS is overridden to 8.5.28 to remove inherited advisories. Keep that override until a compatible Next version resolves patched PostCSS. Review major framework upgrades against Amplify support before applying them.

## Source map

| Path                                 | Responsibility                                   |
| ------------------------------------ | ------------------------------------------------ |
| `src/app`                            | Route modules, layout, metadata and global CSS   |
| `src/app/api/leads`                  | Node POST entry point                            |
| `src/components/sections.tsx`        | Reusable marketing sections and concept previews |
| `src/components/web-design-page.tsx` | Shared regional/paid page composition            |
| `src/components/ui`                  | Adapted animation components                     |
| `src/components/contact-form.tsx`    | Inquiry UI, validation, delivery feedback        |
| `src/components/tracking.tsx`        | Optional consent-gated GA4 and events            |
| `src/lib/content.ts`                 | Cities, services, concepts and FAQ data          |
| `src/lib/site.ts`                    | Brand settings and metadata helper               |
| `src/lib/leads.ts`                   | Server validation, rate backstop and transport   |
| `tests`                              | Server unit and Chromium browser tests           |
| `scripts/amplify-env.mjs`            | Explicit runtime environment allowlist           |
| `docs/legacy/index.html`             | Original source; never served by Next.js         |

## Rendering

Pages/sections are server components. City, service and concept routes use `generateStaticParams`; unknown slugs return 404. Navigation, forms and motion are client islands. Passing server-rendered children through `MotionProvider` does not turn all page content into client components.

Three.js loads asynchronously at desktop widths with motion enabled. Rendering pauses offscreen and when the tab is hidden. Geometry, materials, renderer, observers and listeners are disposed on unmount. A CSS sculpture remains for mobile/reduced motion/WebGL failure. The pointer grid has a bounded decay loop and does not animate indefinitely while idle.

The lead endpoint uses Node. No edge runtime, ISR, streaming dependency or Amplify frontend SDK is required. Deployment artifact is `.next`; do not use static export while the server endpoint is part of the app.

## Configuration

| Variable                     | Boundary        | Purpose                                                   |
| ---------------------------- | --------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | Build/public    | Actual canonical origin                                   |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Build/public    | `true` plus configured origin enables organic indexing    |
| `NEXT_PUBLIC_CONTACT_EMAIL`  | Build/public    | Verified email; hidden if empty                           |
| `NEXT_PUBLIC_CONTACT_PHONE`  | Build/public    | Verified phone; hidden if empty                           |
| `NEXT_PUBLIC_GA_ID`          | Build/public    | Optional GA4 ID, loaded after consent                     |
| `LEAD_WEBHOOK_URL`           | Server          | HTTPS JSON recipient                                      |
| `LEAD_WEBHOOK_TOKEN`         | Server          | Optional bearer authentication                            |
| `ALLOW_LOCAL_WEBHOOK`        | Local test only | Explicit loopback HTTP exception; not exported to Amplify |

Public settings require a rebuild. Never put lead tokens or the developer MCP key in `NEXT_PUBLIC_` variables. `.env*`, generated builds, `.cache`, `.firecrawl` and browser reports are ignored.

## Editing and validation

Edit data in `src/lib/content.ts`; route-specific copy in the route file; shared visuals in `globals.css`. Keep one H1, semantic headings, visible labels and credible content. Add city data only with unique content and confirmed coverage. Run `npm run check`, `npm run build`, and affected browser checks; update relevant documentation.

`next/font` downloads/self-hosts Manrope and Space Grotesk during builds, so CI needs outbound access then. Production does not call Google Fonts. Automated browser QA uses Chromium desktop/mobile emulation; it does not establish Safari, real iOS or Firefox behavior.
