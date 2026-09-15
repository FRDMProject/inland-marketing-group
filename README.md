# Inland Digital Group

A custom Next.js website for Inland Digital Group, rebuilt from the original static site with a shared visual system, adapted 21st.dev interactions and city-specific landing pages.

## Local development

Use Node 22 LTS (Node 24 works locally too).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. If a preview already uses that port, stop it or run `npm run dev -- --port 3001`.

```sh
npm run check
npm run build
npm start
npx playwright install chromium
npm run test:e2e
npm audit
```

Browser tests expect a server already running on port 3000. Copy `.env.example` to `.env.local` for integrations; never commit credentials. The developer 21st.dev MCP key is not used by the deployed website.

## Documentation

- [Project brief](docs/PROJECT-BRIEF.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Design system](docs/DESIGN-SYSTEM.md)
- [Content and routes](docs/CONTENT-AND-ROUTES.md)
- [21st.dev component sources](docs/21ST-DEV-SOURCES.md)
- [City research and ads plan](docs/CITY-RESEARCH.md)
- [Lead delivery and measurement](docs/LEADS-AND-MEASUREMENT.md)
- [Amplify deployment](docs/AMPLIFY-DEPLOYMENT.md)
- [Audit and launch checklist](docs/AUDIT.md)

## Launch configuration

Lead delivery requires `LEAD_WEBHOOK_URL`; unconfigured delivery reports an error rather than success. The site stays noindex until the actual origin and `NEXT_PUBLIC_ALLOW_INDEXING=true` are configured. Contact links appear only for verified values. The design lab contains labeled concepts, not invented client work.

Original source: `docs/legacy/index.html`, not served by Next.js. No AWS resources or Google Ads campaigns are created by this repository.
