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
