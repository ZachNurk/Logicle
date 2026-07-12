/**
 * Sets up database connection and exports 
 * @file db.ts
 */
import { readFileSync } from "node:fs";
import "dotenv/config";
import pg from "pg";
// Bundled into the module graph (not read from disk at runtime) so the
// deployed function has this CA available without relying on a file path
// or an env var that has to be pasted into every hosting provider's
// dashboard.
import { SUPABASE_CA as bundledSupabaseCa } from "./supabaseCa";

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL in environment");
}

// Loopback connections (local dev, docker compose on the same host) never
// leave the machine, so skip TLS there. Anything else must use it.
const isLoopback = /(?:\/\/|@)(?:localhost|127\.0\.0\.1)(?::|\/)/.test(
  connectionString,
);

/**
 * `DB_SSL_CA` can be either a raw PEM string (paste the cert content
 * directly into the env var — works anywhere, including serverless) or a
 * filesystem path (convenient for local dev). Falls back to the bundled
 * Supabase root CA if unset.
 */
function resolveCa(): string {
  const raw = process.env.DB_SSL_CA;
  if (!raw) return bundledSupabaseCa;
  return raw.includes("BEGIN CERTIFICATE") ? raw : readFileSync(raw, "utf8");
}

export const pool = new Pool({
  connectionString,
  ssl: isLoopback
    ? undefined
    : {
        rejectUnauthorized: true,
        ca: resolveCa(),
      },
});