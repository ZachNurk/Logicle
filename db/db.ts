/**
 * Sets up database connection and exports 
 * @file db.ts
 */
import "dotenv/config";
import pg from "pg";

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL in environment");
}

export const pool = new Pool({
  connectionString,
});