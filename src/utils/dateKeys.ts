/**
 * Local calendar date as YYYY-MM-DD — matches `days.id` and `user_progress.day_id`
 * in the DB. Do not use `toLocaleDateString("en-CA")`; its output is not
 * guaranteed to be ISO-shaped across runtimes.
 */
export function formatLocalDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Normalize stored ids so `2026-3-9` and `2026-03-09` compare equal. */
export function normalizeDayId(s: string): string {
  const t = s.trim();
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t);
  if (m) {
    return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
  }
  return t;
}
