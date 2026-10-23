# Production Runbook

1. GitHub main is the source of truth.
2. CI must pass with Node 24.21.0 and npm 11.19.0.
3. Production install uses the committed lockfile with npm ci.
4. Vercel must deploy the merged main commit.
5. Verify every public route and static asset over HTTPS.
6. Check mobile layout, Arabic RTL, English copy, console errors, links, sitemap, robots, manifest, PWA icon, and social metadata.
7. Confirm security headers and production dependency audit.
8. Confirm no secrets or unsupported commercial/legal claims.
9. Execute real browser QA on Android Chrome and desktop Chrome.
10. Only then set RELEASE_STATUS: VERIFIED.

## Current state

Production is deployed and operational at:
https://luxor-pharaoh-day-q3rd.vercel.app

Current release status: READY_FOR_RELEASE.

The automated production gate has passed. The only remaining acceptance gate is human-browser visual/interaction QA. Do not mark VERIFIED without evidence for that final gate.
