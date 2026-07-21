import { pool } from "./db";

/** PostgreSQL error code for foreign-key violation. */
const PG_FK_VIOLATION = "23503";

export type ProgressStatus = "completed" | "given_up";

/**
 * A day can be both given up on AND later completed — finishing the proof
 * using the revealed steps shouldn't erase the give-up record. So each flag
 * is independent and sticky (once true, stays true).
 */
export type DayProgress = { dayId: string; completed: boolean; givenUp: boolean };

export type AddProgressResult = { ok: true } | { ok: false; reason: "no-user" };

export async function getUserDays(email: string): Promise<DayProgress[]> {
  const result = await pool.query<{ day_id: string; completed: boolean; given_up: boolean }>(
    "SELECT day_id, completed, given_up FROM user_progress WHERE email = $1",
    [email],
  );
  return result.rows.map((row) => ({
    dayId: row.day_id,
    completed: row.completed,
    givenUp: row.given_up,
  }));
}

/**
 * Records a day's outcome for the given user. Each flag is sticky and
 * independent — recording 'given_up' after 'completed' (or vice versa)
 * never clears the other one.
 * Returns a typed result so callers don't have to introspect PG error codes;
 * a missing user is an expected outcome (e.g. stale dev session after a DB
 * reset) and is reported as { ok: false, reason: "no-user" }.
 */
export async function recordDayProgress(
  email: string,
  dayId: string,
  status: ProgressStatus,
): Promise<AddProgressResult> {
  const completed = status === "completed";
  const givenUp = status === "given_up";
  try {
    await pool.query(
      `
      INSERT INTO user_progress (email, day_id, completed, given_up)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email, day_id) DO UPDATE
        SET completed = user_progress.completed OR EXCLUDED.completed,
            given_up = user_progress.given_up OR EXCLUDED.given_up
      `,
      [email, dayId, completed, givenUp],
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
