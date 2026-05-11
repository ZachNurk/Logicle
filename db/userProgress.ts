import { pool } from "./db";

/** PostgreSQL error code for foreign-key violation. */
const PG_FK_VIOLATION = "23503";

export type AddProgressResult = { ok: true } | { ok: false; reason: "no-user" };

export async function getUserDays(email: string): Promise<string[]> {
  const result = await pool.query<{ day_id: string }>(
    "SELECT day_id FROM user_progress WHERE email = $1",
    [email],
  );
  return result.rows.map((row) => row.day_id);
}

/**
 * Inserts a completed day for the given user.
 * Returns a typed result so callers don't have to introspect PG error codes;
 * a missing user is an expected outcome (e.g. stale dev session after a DB
 * reset) and is reported as { ok: false, reason: "no-user" }.
 */
export async function addCompletedDay(
  email: string,
  dayId: string,
): Promise<AddProgressResult> {
  try {
    await pool.query(
      `
      INSERT INTO user_progress (email, day_id)
      VALUES ($1, $2)
      ON CONFLICT (email, day_id) DO NOTHING
      `,
      [email, dayId],
    );
    return { ok: true };
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      String((err as { code: string }).code) === PG_FK_VIOLATION
    ) {
      return { ok: false, reason: "no-user" };
    }
    throw err;
  }
}
