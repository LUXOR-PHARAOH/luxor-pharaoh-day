# Contributing / Operating Contract

1. Use Node 24.21.0 and npm 11.19.0.
2. Keep `package-lock.json` synchronized with `package.json`.
3. Run `npm ci`.
4. Run `npm run preflight`.
5. Run `npm run verify`.
6. Run `npm run build`.
7. Never commit secrets, payment credentials, OTP/PIN, private customer data or fabricated business contacts.
8. Do not mark a deployment Production-Verified until CI, Vercel and browser QA succeed on the same commit.
