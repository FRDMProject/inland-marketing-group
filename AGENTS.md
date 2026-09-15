# Inland Digital Group

Read README.md and the relevant docs before changing the site. This is an existing Next.js project; maintain it directly.

- Brand: Inland Digital Group. Preserve its independent coral/ivory/ink identity.
- Next.js is pinned to a patched 15.x release for documented Amplify compatibility. Check AWS support before a major upgrade; preserve the PostCSS security override until no longer needed.
- City/service/concept data lives in `src/lib/content.ts`. Shared sections live in `src/components/sections.tsx`.
- Keep paid `/lp/` routes noindex and outside the sitemap. Do not enable production indexing or invent a domain.
- Do not fabricate testimonials, client work, performance metrics, offices, prices or guarantees. Design studies are labeled concepts.
- Keep API credentials server-side; the 21st.dev developer key must never enter website source, public variables or build artifacts.
- Form success requires acknowledged delivery. Never replace the lead transport with simulated success.
- Preserve keyboard access, mobile anchor positions, reduced-motion behavior and no-JavaScript content visibility.
- Update the source register when adding 21st.dev components and document substantive changes.
- Run relevant checks: lint, types, lead tests, production build, browser tests for affected journeys. Browser tests require a local server. Never send test leads to a real recipient unintentionally.
- AWS/DNS and the initial GitHub/Amplify pipeline are a later owner-coordinated phase. Do not infer account IDs or domain ownership.
