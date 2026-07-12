/**
 * Sets up database connection and exports 
 * @file db.ts
 */
import { readFileSync } from "node:fs";
import "dotenv/config";
import pg from "pg";

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

export const pool = new Pool({
  connectionString,
  ssl: isLoopback
    ? undefined
    : {
        rejectUnauthorized: true,
        ca: process.env.DB_SSL_CA ? readFileSync(process.env.DB_SSL_CA, "utf8") : undefined,
      },
});