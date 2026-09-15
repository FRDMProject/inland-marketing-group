# Amplify deployment and later domain setup

## Current boundary

The owner will manually connect GitHub to AWS Amplify. This build prepares the repository but does not push it, create cloud resources or edit DNS. After the pipeline exists, the intended workflow is reviewed local changes → GitHub push → Amplify build/deploy. Domain work can then be performed with the AWS CLI against the confirmed account/app.

## Framework compatibility

AWS currently documents Amplify Hosting compute support for Next.js 12–15, including App Router, static pages, API routes and dynamic routes. This app pins 15.5.25. It does not depend on unsupported streaming or edge API features. Recheck support before a future Next major upgrade. [AWS feature support](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html)

## Manual hosting setup

1. Connect `FRDMProject/inland-marketing-group` and the intended branch in Amplify Hosting. Confirm account and region.
2. Use the Amazon Linux 2023 build environment with Node 22 available. The included `amplify.yml` uses Node 22, `npm ci`, `npm run check`, then `npm run build`.
3. Keep artifact directory `.next`. Do not change to `out` or add a catch-all SPA rewrite; Next manages its own routes and 404s.
4. Set the public site URL, verified contacts and any optional analytics configuration. Keep indexing false on preview branches.
5. Set server-only `LEAD_WEBHOOK_URL` and optional token securely in Amplify. `scripts/amplify-env.mjs` exports only an explicit allowlist to `.env.production` for runtime bundling; it does not print values. Never export the entire build environment or `API_KEY_21ST`.
6. Review runtime secret access and IAM scope. The generated environment file must remain ignored and absent from client bundles; audit deployed artifacts and logs. Use a secret manager and runtime retrieval instead if organizational policy requires it.
7. Deploy to the default Amplify hostname first. Verify every route, 404s, metadata, real lead receipt, runtime logs, security headers and mobile behavior.

## Required before domain actions

Confirm actual domain, apex/www preference, DNS provider/hosted-zone ID, Amplify app ID, target branch, region, AWS profile and current DNS records. The website name alone is not evidence of domain ownership. Preserve existing email MX/TXT and unrelated records.

Read-only inventory examples, with placeholders replaced by verified values:

```sh
aws sts get-caller-identity --profile PROFILE
aws amplify get-app --app-id APP_ID --region REGION --profile PROFILE
aws amplify list-branches --app-id APP_ID --region REGION --profile PROFILE
aws amplify list-domain-associations --app-id APP_ID --region REGION --profile PROFILE
aws route53 list-hosted-zones-by-name --dns-name DOMAIN --profile PROFILE
```

Next, prepare the exact apex/www domain association and DNS change records for the verified app. Use Amplify-managed certificates and the service-provided validation/CNAME records. Wait for association/certificate verification, then test HTTPS, redirect policy and canonical URLs. Only enable public indexing after the production domain, lead delivery, business details and policies are verified.

## Rollback and operations

Retain the preceding successful Amplify deployment and a Git commit reference. If a deploy breaks routing or lead delivery, redeploy that known-good build, stop sending paid traffic to broken destinations, and inspect server logs without exposing lead data. Track 5xx rates and verified delivery, not only build status.

No AWS CLI profile, credentials, domain or app ID was assumed or accessed during this rebuild.
