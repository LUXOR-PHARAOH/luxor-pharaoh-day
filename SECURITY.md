# Security Controls

- Secrets live in Vercel environment variables or GitHub Actions secrets, never in source.
- `NEXT_PUBLIC_*` variables are public and must not contain secrets.
- `.env.local` is ignored and is the location for local-only values.
- Security headers are set in `next.config.ts`.
- The base UI does not process payments or collect private customer data.
- Public contact values remain empty until a real official contact is confirmed.
- Time-sensitive visitor data includes source URLs and review dates.
