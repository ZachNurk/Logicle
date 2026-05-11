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

Still need:
- TLS on the DB connection before any non-loopback deploy. Add `?sslmode=require` to DATABASE_URL and `ssl: { rejectUnauthorized: true, ca: ... }` to the pg Pool. Skipping it on loopback in dev is fine.
- Rotate the placeholder `app_password_change_me` and the dev `postgres` superuser password to real secrets before this stack runs anywhere but localhost. Pull both from env, not committed strings.
- Host firewall on whatever node ships this: default-deny inbound, open only the API port (and SSH). Repo can't enforce this — checklist item for the deploy.
- If/when the API moves into the same docker network as the DB, drop the `ports:` block from docker-compose so Postgres isn't published to the host at all.

App-layer hardening (not strictly "DB security" but caught while auditing):
- API has no auth check on /api/users/:email/* — anyone who knows an email can read/write that user's progress. Add session/JWT middleware so identity comes from the request, not the URL.
- No rate limiting on /login, /register, /forgotPassword, /resetPassword. The 4-digit OTP is brute-forceable in ~10k requests; add per-IP + per-email throttling and bump OTP entropy (6+ digits or a random token).
- CORS is wide open (`app.use(cors())`). Pin an origin allowlist before deploying.
- No length caps on request bodies; consider `express.json({ limit: "1kb" })` and per-field max lengths.