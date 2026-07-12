# Shipping Logicle

Current stack: Vite/React frontend, Express API (`api/server.ts`, run via `tsx`), Postgres in Docker. Locally these run as three separate pieces (`vite`, `npm run server`, `docker compose`), wired together by `scripts/dev.sh`. Going live means each of those gets a real host instead of localhost.

## 1. Pick hosts

- **Frontend**: static build (`npm run build` → `dist/`). Vercel is the easiest fit (already the plan per TODO.md) — it's a Vite app, zero-config.
- **API**: Vercel can host it too (as serverless functions) or as a small always-on Node service (Render, Fly.io, Railway). Serverless is fine here since there's no websocket/long-poll requirement, but note the API currently runs as one long-lived Express app (`api/server.ts`) — either adapt it to Vercel's serverless function shape or deploy it as a standalone Node service on Render/Fly instead of forcing it into Vercel functions.
- **Database**: a managed Postgres instance — Neon, Supabase, or Render Postgres all work. Don't run Postgres yourself; you'd be re-solving the TLS/firewall/backup problems this project's TODO.md already flags as unfinished.

## 2. Provision the database

1. Create the managed Postgres instance, get its connection string (it will **not** be a loopback host, so `db/db.ts`'s TLS path activates automatically).
2. Run the schema: adapt `db/init/001_*.sql` (and any other `db/init/*.sql`) against the new instance — there's no migration runner yet (tracked in TODO.md), so this is a manual `psql` run for now.
3. Run `db/init/002_create_app_role.sh`'s SQL manually (same pattern used to create `logicle_app` on the local dev volume) to create the least-privileged `logicle_app` role on the new instance. Do **not** connect the app as the managed DB's superuser.
4. Grab the CA cert if the provider requires explicit verification (Neon/Supabase usually don't — they use publicly trusted certs) and set `DB_SSL_CA` only if needed.

## 3. Set environment variables on the hosting provider

These come from `.env.example` — set real values in the provider's env var UI (Vercel/Render dashboard), not in a committed file:

| Var | Notes |
|---|---|
| `DATABASE_URL` | Points at the managed Postgres, using the `logicle_app` role, not superuser. |
| `APP_DB_PASSWORD` | Only needed if you re-run the init scripts against this DB via docker-compose; otherwise irrelevant in prod hosting. |
| `JWT_SECRET` | **Generate a new one** — don't reuse the dev value, which is already exposed in git history (see below). `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `FRONTEND_ORIGIN` | The deployed frontend's exact origin (e.g. `https://logicle.vercel.app`), for CORS. |
| `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` | **Rotate `SMTP_PASS`** before going live — the current one is also exposed in git history. |
| `DB_SSL_CA` | Only if the DB provider needs an explicit CA file. |
| `PORT` | Only relevant if deploying the API as a standalone Node service; Vercel functions ignore it. |

## 4. Rotate the historically-exposed secrets first

`.env` was committed to git in the past (commit `589fb74`) before being untracked. That means the old `SMTP_PASS` and `JWT_SECRET` values are visible in git history regardless of whether this repo is ever pushed publicly. Before shipping:
- Generate a new `JWT_SECRET` and use only the new one in prod.
- Rotate the Gmail app password behind `SMTP_PASS` (regenerate it in Google Account → App Passwords) and use only the new one in prod.
- The old values in history are effectively burned — don't reuse them anywhere, including local dev, once rotated.

## 5. Build and deploy

1. `npm run build` locally once to confirm `dist/` builds clean and `tsc -b` has no errors.
2. Point Vercel at the repo, set the build command to `npm run build` and output directory to `dist`.
3. Deploy the API to wherever it lands (Vercel functions or a standalone service) with the env vars from step 3.
4. Update `FRONTEND_ORIGIN` (API side) and whatever `VITE_API_URL`-equivalent the frontend uses to point at the live API's URL — confirm the frontend isn't hardcoded to `localhost:3001` anywhere.

## 6. Post-deploy checks

- Hit the deployed API directly (`curl https://<api-host>/api/days`) to confirm it's serving over HTTPS and not erroring on cold start.
- Confirm HTTPS redirect/HSTS behavior works (already implemented in `api/server.ts`, but only takes effect in prod — verify `NODE_ENV=production` is set on the host).
- Sign up, log in, complete a puzzle end-to-end against prod to confirm cookies/CORS/JWT all work across the real frontend and API origins (this is the first time they won't share `localhost`, so CORS/cookie `SameSite`/`Secure` settings are the most likely thing to break).
- Confirm rate limiting and OTP flows work against the live SMTP credentials.

## Not yet done (tracked in TODO.md, doesn't block a first deploy but should follow soon after)

- Real migration runner instead of manual SQL against the DB.
- Host firewall / network hardening if the API ever runs on a VM instead of a managed platform.
- Confirm OTP entropy/throttling is adequate for a public-facing deploy.
