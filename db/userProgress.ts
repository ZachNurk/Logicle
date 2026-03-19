import { pool } from "./db";

export async function getUserDays(email: string): Promise<string[]> {
  const result = await pool.query<{ day_id: string }>(
    "SELECT day_id FROM user_progress WHERE email = $1",
    [email],
  );
  return result.rows.map((row) => row.day_id);
}

export async function addCompletedDay(email: string, dayId: string): Promise<void> {
  await pool.query(
    `
    INSERT INTO user_progress (email, day_id)
    VALUES ($1, $2)
    ON CONFLICT (email, day_id) DO NOTHING
    `,
    [email, dayId],
  );
}
