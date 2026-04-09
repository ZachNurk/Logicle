/**
 * Db queries for user info
 * 
 */

import { pool } from "./db";

export type DbUser = {
  id: string;
  email: string;
  password: string;
};

export async function getUserByEmail(email: string): Promise<DbUser | null> {
  const result = await pool.query<DbUser>(
    `
    SELECT id, email, password
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  return result.rows[0] ?? null;
}

export async function createUser(email: string, password: string): Promise<DbUser> {
  const result = await pool.query<DbUser>(
    `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email, password
    `,
    [email, password],
  );
  return result.rows[0];
}

export async function getBestEndlessScore(email: string): Promise<number> {
  const result = await pool.query<{ best_endless_score: number }>(
    `SELECT best_endless_score FROM users WHERE email = $1`,
    [email],
  );
  return result.rows[0]?.best_endless_score ?? 0;
}

/** Persists max(existing, score). Returns the stored best, or null if user missing. */
export async function updateBestEndlessScoreIfHigher(
  email: string,
  score: number,
): Promise<number | null> {
  const result = await pool.query<{ best_endless_score: number }>(
    `
    UPDATE users
    SET best_endless_score = GREATEST(COALESCE(best_endless_score, 0), $2)
    WHERE email = $1
    RETURNING best_endless_score
    `,
    [email, score],
  );
  return result.rows[0]?.best_endless_score ?? null;
}
