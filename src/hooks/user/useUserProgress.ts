import { useCallback, useEffect, useState } from "react";
import { normalizeDayId } from "../../utils/dateKeys";

/** Signed-out users have no server record, so day outcomes are kept here across reloads. */
const ANON_PROGRESS_STORAGE_KEY = "logicle_anon_completed_days";

type DayStatus = "completed" | "given_up";
type DayRecord = { dayId: string; status: DayStatus };

function mergeDayRecords(local: DayRecord[], server: DayRecord[]): DayRecord[] {
  const merged = new Map<string, DayStatus>();
  for (const { dayId, status } of [...local, ...server]) {
    const id = normalizeDayId(dayId);
    const existing = merged.get(id);
    // A win is sticky — a give-up record never downgrades it.
    if (existing !== "completed") merged.set(id, status);
  }
  return Array.from(merged, ([dayId, status]) => ({ dayId, status })).sort(
    (a, b) => a.dayId.localeCompare(b.dayId),
  );
}

function readAnonProgress(): DayRecord[] {
  try {
    const raw = localStorage.getItem(ANON_PROGRESS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    // Back-compat: older builds stored a plain string[] of completed day IDs.
    return parsed.map((entry) =>
      typeof entry === "string"
        ? { dayId: entry, status: "completed" as const }
        : { dayId: entry.dayId, status: entry.status as DayStatus },
    );
  } catch {
    return [];
  }
}

function writeAnonProgress(records: DayRecord[]) {
  try {
    localStorage.setItem(ANON_PROGRESS_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Ignore quota/private-mode errors; anon progress just won't persist.
  }
}

export function useUserProgress(
  userEmail: string | null,
  initialCompletedDayIds?: string[],
  /** Called when progress save fails (e.g. user not in DB after a DB reset). */
  onProgressSaveFailed?: () => void,
  initialGivenUpDayIds?: string[],
) {
  const initialServerRecords = useCallback(
    (): DayRecord[] => [
      ...(initialCompletedDayIds ?? []).map((dayId) => ({
        dayId,
        status: "completed" as const,
      })),
      ...(initialGivenUpDayIds ?? []).map((dayId) => ({
        dayId,
        status: "given_up" as const,
      })),
    ],
    [initialCompletedDayIds, initialGivenUpDayIds],
  );

  const [records, setRecords] = useState<DayRecord[]>(() =>
    userEmail
      ? mergeDayRecords([], initialServerRecords())
      : mergeDayRecords(readAnonProgress(), initialServerRecords()),
  );

  useEffect(() => {
    if (!userEmail) {
      setRecords(readAnonProgress());
      return;
    }
    /** Union with previous so optimistic marks aren't wiped if auth lags or GET races. */
    setRecords((prev) => mergeDayRecords(prev, initialServerRecords()));
  }, [userEmail, initialServerRecords]);

  /** Mirror anon progress to localStorage so a solved/given-up puzzle still shows after a reload. */
  useEffect(() => {
    if (!userEmail) writeAnonProgress(records);
  }, [userEmail, records]);

  const completedDayIds = records
    .filter((r) => r.status === "completed")
    .map((r) => r.dayId);
  const givenUpDayIds = records
    .filter((r) => r.status === "given_up")
    .map((r) => r.dayId);

  const isDayCompleted = useCallback(
    (dayId: string) =>
      records.some(
        (r) => normalizeDayId(r.dayId) === normalizeDayId(dayId) && r.status === "completed",
      ),
    [records],
  );

  const isDayGivenUp = useCallback(
    (dayId: string) =>
      records.some(
        (r) => normalizeDayId(r.dayId) === normalizeDayId(dayId) && r.status === "given_up",
      ),
    [records],
  );

  const recordDay = useCallback(
    async (dayId: string, status: DayStatus) => {
      const normalized = normalizeDayId(dayId);
      setRecords((prev) => mergeDayRecords(prev, [{ dayId: normalized, status }]));

      if (!userEmail) return;

      try {
        const res = await fetch(
          `/api/users/${encodeURIComponent(userEmail)}/progress`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ dayId: normalized, status }),
          },
        );
        if (!res.ok) {
          if (res.status === 404) {
            // Stale session pointing at an email no longer in `users` — the
            // day genuinely can't be saved for this session, so undo the
            // optimistic local record and let the caller handle re-auth.
            setRecords((prev) =>
              prev.filter((r) => normalizeDayId(r.dayId) !== normalized),
            );
            onProgressSaveFailed?.();
          } else {
            // Transient failure (network blip, 500, etc). Keep the local
            // outcome showing rather than silently reverting it; just log.
            console.error("Failed to save progress:", res.status, await res.text());
          }
        }
      } catch (err) {
        console.error("Failed to save progress:", err);
      }
    },
    [userEmail, onProgressSaveFailed],
  );

  const markDayCompleted = useCallback(
    (dayId: string) => recordDay(dayId, "completed"),
    [recordDay],
  );

  const markDayGivenUp = useCallback(
    (dayId: string) => recordDay(dayId, "given_up"),
    [recordDay],
  );

  const clearProgress = useCallback(() => {
    setRecords([]);
  }, []);

  return {
    completedDayIds,
    givenUpDayIds,
    isDayCompleted,
    isDayGivenUp,
    markDayCompleted,
    markDayGivenUp,
    clearProgress,
  };
}
