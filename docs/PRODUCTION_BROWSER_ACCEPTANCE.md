# LUXOR PHARAOH DAY — Production Browser Acceptance

## Purpose

This is the final human-in-the-loop browser acceptance gate for the real production website.

The acceptance page is available at \`/production-qa\`. It stores the operator checklist locally in the browser and can export a plain-text acceptance report.

It **does not** automatically set \`RELEASE_STATUS=VERIFIED\`.

## Final acceptance sequence

1. Open Production
2. Touch Navigation
3. Planner
4. Generate
5. Save
6. Clear
7. Sound ON/OFF
8. RTL
9. LTR
10. Reduced Motion
11. Console
12. Responsive Desktop/Mobile
13. Final Production Check

## Browser evidence

Use current Chrome DevTools for the manual inspection. Device Mode can emulate modern mobile and desktop form factors, while Console and Performance/Lighthouse provide runtime, accessibility, SEO and performance evidence.

Recommended evidence:
- production URL and deployment ID
- browser version and device/form factor
- date/time of test
- screenshots for important states
- Console showing no unexpected red errors
- Lighthouse/DevTools findings
- mobile and desktop observations
- any failed step and its resolution

## Additional production gates

Before \`VERIFIED\`, also confirm:

- latest intended Git commit is the source of the Production deployment
- GitHub CI is green: install, lockfile, preflight, typecheck, lint and build
- Browser QA is green
- Production routes/assets return expected responses
- HTTPS and security headers are present
- no secrets are exposed in source, HTML or client bundles
- robots and sitemap are correct
- manifest and icons load
- Arabic RTL and English LTR remain usable
- reduced-motion preference does not remove functionality
- no unexpected console/page errors
- forms do not collect passwords, OTPs, PINs or card credentials
- analytics/observability contain only necessary data
- paid/regulated tourism, booking, transport or payment claims are not enabled unless the required legal/operational readiness has been verified
- rollback path is known before release

## VERIFIED rule

Set \`RELEASE_STATUS=VERIFIED\` only when all required automated and human gates have evidence.

If any required gate is incomplete, keep \`READY_FOR_RELEASE\` or use \`BLOCKED\` as appropriate.

## Reference standards

- Chrome DevTools for device, console, performance and accessibility inspection
- OWASP Web Security Testing Guide for security-testing coverage
- OWASP Secure Headers guidance for response-header hardening
- Vercel production/security/observability capabilities
