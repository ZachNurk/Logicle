# Logicle

Daily logic puzzle: derive the goal statement using given facts and inference rules (axioms). React + TypeScript frontend, Express API, PostgreSQL.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Docker](https://docs.docker.com/get-docker/) (for PostgreSQL)

## Quick start

**1. Clone and install**

```bash
git clone https://github.com/ZachNurk/Logicle/
cd Logicle
npm install
```

**2. Database**

Start Postgres (matches `docker-compose.yml`):

```bash
docker compose up -d
```

**3. Environment**

Copy the example env and adjust if needed:

```bash
cp .env.example .env
```

`DATABASE_URL` must point at your Postgres instance. The default in `.env.example` matches the Docker Compose service above.

**4. Run app + API**

```bash
npm run dev
```

This runs the Vite dev server and the Express API together. Open the URL Vite prints (usually **http://localhost:5173**). API requests to `/api` are proxied to **http://localhost:3001**.

**5. Try it**

Create an account or sign in, then play the daily puzzle.

## Other commands

| Command | Description |
|--------|-------------|
| `npm run server` | API only (port `3001` by default) |
| `npm run build` | Production build |
| `npm run test` / `npm run test:run` | Vitest |
| `npm run test:endless -- [count]` | Stress-test the endless puzzle generator — samples `count` puzzles (default 2000) and forward-validates each solve trace against `src/logic/Axiom.ts`, failing if any puzzle turns out unsolvable |
| `npm run lint` | ESLint |

## Regenerating daily puzzles

`db/days.json` holds the daily puzzle schedule. Regenerate it with:

```bash
npx tsx scripts/generateDays.ts
```

Set `GEN_DAYS_COUNT` to change how many days are generated (default 730) and `GEN_DAYS_OUT` to write elsewhere instead of overwriting `db/days.json`:

```bash
GEN_DAYS_COUNT=1000 GEN_DAYS_OUT=/tmp/days.json npx tsx scripts/generateDays.ts
```

