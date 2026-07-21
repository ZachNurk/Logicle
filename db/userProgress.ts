import { pool } from "./db";

/** PostgreSQL error code for foreign-key violation. */
const PG_FK_VIOLATION = "23503";

export type ProgressStatus = "completed" | "given_up";

export type DayProgress = { dayId: string; status: ProgressStatus };

export type AddProgressResult = { ok: true } | { ok: false; reason: "no-user" };

export async function getUserDays(email: string): Promise<DayProgress[]> {
  const result = await pool.query<{ day_id: string; status: ProgressStatus }>(
    "SELECT day_id, status FROM user_progress WHERE email = $1",
    [email],
  );
  return result.rows.map((row) => ({ dayId: row.day_id, status: row.status }));
}

/**
 * Records a day's outcome for the given user. A 'given_up' call never
 * downgrades an existing 'completed' row (a puzzle can't be un-won).
 * Returns a typed result so callers don't have to introspect PG error codes;
 * a missing user is an expected outcome (e.g. stale dev session after a DB
 * reset) and is reported as { ok: false, reason: "no-user" }.
 */
export async function recordDayProgress(
  email: string,
  dayId: string,
  status: ProgressStatus,
): Promise<AddProgressResult> {
  try {
    await pool.query(
      `
      INSERT INTO user_progress (email, day_id, status)
      VALUES ($1, $2, $3)
      ON CONFLICT (email, day_id) DO UPDATE
        SET status = CASE
          WHEN user_progress.status = 'completed' THEN user_progress.status
          ELSE EXCLUDED.status
        END
      `,
      [email, dayId, status],
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
