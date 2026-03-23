# Logicle — Architecture

## Frontend

- **React + Vite** — SPA; dev server and production build.
- **Inline styles** — most UI uses React `style` objects; shared colors in `src/constants/theme.ts`; global keyframes only where needed (e.g. `index.html` for `@keyframes`).
- **Hook layers**
  - **`useAppSession`** (`src/hooks/useAppSession.ts`) — single composition: `{ auth, progress, proof }` so state ownership is obvious.
  - **`auth`** (`useAuth`) — login/register, `currentUser`, `refreshUserProgress`, `logout`.
  - **`progress`** (`useUserProgress`) — `completedDayIds`, `markDayCompleted` (persists to API).
  - **`proof`** (`useProofSession`, `useProofNodes`, `useAxioms`) — puzzle nodes, axioms, `applyAxiom`, victory, invalid-axiom feedback.
- **`App.tsx`** — routing only (which screen to show), no domain logic.
- **Screens vs components** — `src/screens/*` for full flows; `src/components/*` for reusable panels and modals.

## Backend

- **Express** — HTTP API under `api/` with routers split by area (`auth`, `days`, `userData`).
- **PostgreSQL** — schema/migrations in `db/init/`; Docker Compose for local DB.
- **Node data layer** — small TS modules (e.g. `db/userProgress.ts`, `db/days.ts`) using `pg`.

## Data & security

- **Passwords** — hashed (e.g. bcrypt); not stored in plain text.
- **`user_progress`** — ties completions to **user email** (simplicity over `user_id` FK); `day_id` is a calendar string and is **not** required to exist in the `days` table.
- **Victory / “won today”** — driven from **server-backed** `completedDayIds` after login/refresh, not from a dedicated victory key in `localStorage`.

## Client persistence

- **Derived proof nodes** — `localStorage` keys `logicle_nodes_<dayId>`; keys for other days are purged when loading the current puzzle.
- **Logout** — `localStorage.clear()` so session and scratch data are wiped client-side.

## Game logic vs UI

- **Core rules** — `src/logic/Axiom.ts`, `ProofNode.ts` (and related); kept separate from React.
- **Proof panel** — layered rows from derivation depth; SVG overlay for parent→child edges; optional `rule` on nodes (axiom id) for edge labels.

## Tradeoffs

- Email as progress key — simpler wiring; less ideal than `users.id` for normalization.
- No React Context yet — session is composed in one hook and passed down; fine at current app size.

## Optional local notes

Git ignores `docs/ARCHITECTURE.local.md`. Copy this file or add bullets there for private/design drafts without committing them.
