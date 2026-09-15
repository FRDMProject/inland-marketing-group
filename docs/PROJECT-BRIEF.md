# Project brief

Rebuild the original single-file Inland Marketing Group website as **Inland Digital Group** on Next.js. Prioritize custom web design, memorable interactions and city-specific Google Ads destinations. Carry the theme across the whole site and document the handoff.

## Reference and original identity

Reviewed `D:\River City Ads\rivercity-digital\src\app\website-design` for pacing, service depth and the inquiry journey. The user explicitly requested inspiration with independent character. No River City client projects, testimonials, images, contact details or brand identity were imported.

IDG uses ivory, charcoal and coral, a custom 3D sculpture, forward-leaning brand mark, expressive type, and original illustrated design studies. Five effects were retrieved through the 21st.dev API and adapted. See the source register.

## Completed implementation scope

- Next.js App Router, TypeScript, static service/city pages and a Node lead route.
- Homepage, web design, services/detail pages, studio, design lab/concept pages, service areas, contact, privacy, terms, 404/error handling.
- Seven organic city/region pages and seven noindex paid landing pages.
- Responsive navigation, motion controls, native FAQs, labeled forms and acknowledged delivery states.
- Metadata, social image, icons, robots, sitemap and redirect aliases.
- Tests, developer configuration, Amplify build specification and documentation.

## Decisions

Next.js 15.5.25 was the newest 15.x returned by npm during implementation. AWS currently documents SSR support through 15, so the project uses that compatible branch rather than River City's Next 16 configuration. Public pages are generated at build time; lead delivery uses a server route. PostCSS is overridden to a patched release.

The design lab contains clearly labeled fictional design concepts. There are no invented client results, testimonials, prices, offices or guaranteed delivery timelines. Lead delivery is an HTTPS webhook boundary awaiting a real destination.

No GitHub push, AWS resource changes, domain purchase, DNS changes or Google Ads changes occurred during the rebuild. The owner plans to configure the Amplify GitHub pipeline first.

## Business inputs required before public launch

1. Verified contact details, business/legal identity and privacy contact.
2. Production domain, Amplify app/region/branch, DNS provider and ownership.
3. Lead destination with durable-receipt behavior, provider names and retention policy.
4. Authorized real work/testimonials if concepts should become a client portfolio.
5. Ad budget, minimum project value, capacity, target industries and confirmed service coverage.
6. Analytics/Ads identifiers and final privacy/consent configuration.

These do not block local design review. They are required before the preview becomes an operational public lead-generation site.
