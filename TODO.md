TODOs:

Puzzle generator that uses a DFS search with randomization
Secure DB
Ship to vercel 
Make daily puzzles better

DB security:

Done:
- App connects as a least-privileged `logicle_app` role (SELECT on days; SELECT/INSERT/UPDATE on users; SELECT/INSERT on user_progress). See db/init/002_create_app_role.sh.
- Postgres port bound to 127.0.0.1 in docker-compose.yml so it's not reachable from other hosts.
- All DB queries are parameterized — no SQL injection surface from app inputs.
- TLS on the DB connection: pg Pool enables `ssl: { rejectUnauthorized: true, ca: DB_SSL_CA }` for any non-loopback DATABASE_URL host, no-op on localhost/127.0.0.1. See db/db.ts.
- Real secrets rotated for both the dev `postgres` superuser and the `logicle_app` role; docker-compose.yml now requires `POSTGRES_SUPERUSER_PASSWORD`/`APP_DB_PASSWORD` from `.env` (no committed defaults, `${VAR:?...}` fails the compose file otherwise). `logicle_app` had actually never been created on the existing Docker volume (init scripts only run on a fresh volume) — created it manually with the correct grants against the live container. `.env` untracked from git going forward (`git rm --cached`, already gitignored).

Still need:
- `.env` was committed with real secrets in git history (commit 589fb74) before being untracked — `SMTP_PASS` and `JWT_SECRET` are exposed in history regardless of push status. Rotate the SMTP app password and re-sign a new JWT_SECRET; decide separately whether to rewrite history to purge the old values (destructive, needs explicit go-ahead).
- Host firewall on whatever node ships this: default-deny inbound, open only the API port (and SSH). Repo can't enforce this — checklist item for the deploy.
- If/when the API moves into the same docker network as the DB, drop the `ports:` block from docker-compose so Postgres isn't published to the host at all.
- Real migration runner instead of relying on idempotent ALTERs in docker-entrypoint-initdb.d.

App-layer hardening (not strictly "DB security" but caught while auditing):
Done:
- Session/JWT middleware added: httpOnly cookie issued on login/register, verified by `requireAuth`, plus a per-email ownership check on /api/users/:email/* so identity comes from the session, not the URL. See api/auth/session.ts, api/middleware/requireAuth.ts, api/routes/userData.ts.
- Rate limiting added on auth endpoints (see "feat: rate limiting" / "feat: OTP" commits).
- CORS pinned to a credentialed origin allowlist (`FRONTEND_ORIGIN` env var) instead of `cors()` wide open.
- Request body size capped via `express.json({ limit: "10kb" })`.
- HTTPS enforced in prod (helmet() + HSTS + x-forwarded-proto redirect behind trust proxy).

Still need:
- Confirm OTP entropy/brute-force throttling is sufficient now that rate limiting exists (revisit if OTP is still only 4 digits).