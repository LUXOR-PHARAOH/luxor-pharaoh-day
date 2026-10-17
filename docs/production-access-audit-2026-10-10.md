# LUXOR PHARAOH DAY — production source and public-access audit (2026-10-10)

## Source and release evidence

- GitHub repository reviewed: `youssfalaa296-hash/luxor-pharaoh-day-9831bee9`.
- Current `main` commit reviewed: `9194aa6c1558b0a47f4d33ec177ba4ef568d01de`.
- `package.json` and `package-lock.json` both identify `luxor-pharaoh-day@5.3.1`; lockfileVersion is 3.
- Node.js CI for this exact main commit completed successfully: https://github.com/youssfalaa296-hash/luxor-pharaoh-day-9831bee9/actions/runs/38036588272
- Browser QA for this exact main commit completed successfully: https://github.com/youssfalaa296-hash/luxor-pharaoh-day-9831bee9/actions/runs/38036588256
- Data Freshness completed successfully for this exact main commit: https://github.com/youssfalaa296-hash/luxor-pharaoh-day-9831bee9/actions/runs/38045468005

These are genuine CI records, but they do not prove third-party API credentials, payments, booking providers, or every production feature are configured.

## Deployment/source mismatch and access blocker

Vercel currently has multiple projects attached to the same repository:
- `luxor-pharaoh-day-9831bee9-4qlm` — latest deployment from `main`, target `production`, state `READY`.
- `luxor-pharaoh-day-9831bee9-gxaz` — deployment from branch `chore/project-isolation-charter`, target `production`, state `READY`.
- `luxor-pharaoh-day-t23y` — separate project, latest deployment not marked production.
- The old `luxor-quest` project still exists.

The reviewed Vercel settings report SSO protection enabled with deployment type `all_except_custom_domains` on the projects above. No verified custom domain was listed on the selected main/production project. Therefore, the Vercel `READY` state does **not** establish that the site is publicly accessible without team sign-in.

This repository change cannot safely alter Vercel's deployment-protection setting: the connected Vercel action available in this workflow does not expose a supported setting to disable SSO protection. An owner must change the setting in the Vercel dashboard, then verify the site in a logged-out/private browser session. Do not share a protection-bypass secret as a workaround.

## Canonical origin

The previous example origin, `https://luxor-pharaoh-day-q3rd.vercel.app`, did not match the reviewed current project names. The example now points to the stable project domain for the current `main` production project. This is only an example configuration; it does not modify the already-deployed production environment.

## Remaining release checks

1. Resolve which single Vercel project is the official production project; archive/retire duplicates only after owner confirmation.
2. Disable SSO protection for the intended public project if public access is intended; verify from a logged-out browser.
3. Set `NEXT_PUBLIC_SITE_URL` in the actual Vercel Production environment to the verified public canonical domain.
4. Verify all third-party services, booking/payment flows, data freshness and legal contact details with real configured credentials.
5. Re-run production build/Browser QA after any environment or protection change.
6. Only mark `RELEASE_STATUS: VERIFIED` when the actual public deployment and required user flows pass acceptance tests.
