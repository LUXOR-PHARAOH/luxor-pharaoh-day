# LUXOR PHARAOH DAY — Advanced Repository and Production Isolation Audit

**Audit date:** 2026-10-23  
**Scope:** Read-only comparison plus a reviewable branch-only validation hardening change. No production settings, secrets, databases, or `main` branches were changed.

## Executive summary

The user-owned repository currently contains the more complete release-verification setup observed during this review. This is a technical assessment, not a final ownership/canonical-repository decision.

- User repository: `youssfalaa296-hash/luxor-pharaoh-day-9831bee9`
- Organization repository: `LUXOR-PHARAOH/luxor-pharaoh-day`
- Existing cross-repository PR: [#41](https://github.com/LUXOR-PHARAOH/luxor-pharaoh-day/pull/41), open and not merged at the time inspected.
- Proposed audit branch: `audit/production-isolation-2026-10-23`

## Repository comparison

### User-owned repository

Observed on `main`:
- `package.json` version `5.3.1`, Node.js `24.x`, npm `>=11 <12`, package manager `npm@11.19.0`.
- Project verification, lockfile verification, data freshness, lint, typecheck, production build, and Playwright browser QA workflows/scripts are present.
- README release gate is `READY_FOR_RELEASE`, explicitly not `VERIFIED` until final real-browser visual and interaction QA.
- The official data freshness workflow runs daily and the freshness script enforces a 14-day review limit.

### Organization repository

Observed on `main`:
- `package.json` version `5.2.1`, Node.js pinned to `24.21.0`, npm `>=11 <12`.
- `package-lock.json` was not found at the root (GitHub Contents API returned 404).
- The current Node.js CI matrix uses Node.js 18, 20, and 22 and invokes `npm ci`; this conflicts with the runtime requirements documented in the package.
- Its main commit has a failing Vercel status in the inspected status response.

### Decision

Do not designate either repository as the canonical source solely from its name or ownership. The user-owned repository has the stronger visible release gates, but ownership, intended repository destination, and the existing PR #41 must be reviewed before any source consolidation. Do not create a duplicate PR that attempts to merge the same main branch changes.

## Data integrity finding

The inspected official-site data records show `lastReviewed: 2026-10-08`. On the audit date, these records exceed the repository's 14-day freshness policy. The review date must not be changed just to make CI pass: an authorized person must re-check the official source pages and update a date only after the information was actually reviewed.

This branch strengthens `scripts/check-freshness.mjs` to validate required fields, unique IDs, HTTPS source URLs, valid non-future ISO review dates, and canonical statuses in addition to the existing stale-data gate. It deliberately does not alter any prices, opening hours, sources, or review dates. Therefore, a freshness check may still correctly fail until the data is reviewed.

## Vercel production ambiguity

The connected Vercel team contains numerous similarly named Luxor projects, including:
- `luxor-pharaoh-day-q3rd`
- `luxor-pharaoh-day-9831bee9-4qlm`
- `luxor-pharaoh-day-9831bee9`
- `luxor-pharaoh-day-t23y`
- `luxor-pharaoh-day-9831bee9-gxaz`
- older `luxor-quest` project references

The inspected project details report recent deployments in `READY` state but also SSO protection enabled for non-custom domains (`all_except_custom_domains`). A Vercel READY status does not prove that a tourist can open the site without signing in. The reviewed GitHub status for the user-owned main commit also includes a Vercel failure with a build-rate-limit/upgrade URL and a pending aggregate deployment status.

**No production project is selected by this report.** Confirm the intended project, its connected repository and branch, the public custom domain, and the public logged-out response before changing any deployment protection or environment setting. Do not disable security controls on a guess, expose bypass secrets, delete duplicate projects, or promote a preview.

## RefAI isolation checks

- The Luxor package manifest inspected here contains Next.js/React and Vercel analytics/speed-insights packages; it does not declare Supabase or RefAI-specific packages directly.
- This is not proof of complete infrastructure isolation. Environment-variable names, connected integrations, team/project access, domains, and deployment settings still require owner-side review. Secret values must never be printed or committed.
- Keep RefAI repositories, Supabase projects, credentials, storage, deployment settings, and domains separate from Luxor. Do not copy secrets or database configuration between projects.

## Safe acceptance plan

1. Review this branch and run CI; treat any stale-data failure as a real blocker, not something to suppress.
2. Verify each data item against its cited official page before changing its review date or status.
3. Resolve the canonical repository and the intent/status of existing PR #41.
4. Select one Vercel production project only after checking the repository link, production branch, current deployment commit, domains, and protection policy.
5. Set `NEXT_PUBLIC_SITE_URL` only after the public canonical domain is verified; do not paste secret values into issues, logs, or reports.
6. Test the actual public domain in a logged-out/private browser and test Arabic/English, mobile navigation, planner, local save/clear, offline shell, SEO routes, and console/network errors.
7. Mark the release `VERIFIED` only when the required checks pass on the same commit that is actually deployed and publicly accessible.

## Changes made in this branch

- Hardened `scripts/check-freshness.mjs` to validate source metadata and review-date integrity while preserving the existing 14-day stale-data failure.
- No prices or review dates changed.
- No secrets, environment settings, databases, production deployment settings, or `main` branches changed.
- Build/test results for this branch are pending until GitHub Actions completes.
