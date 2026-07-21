import { useCallback, useEffect, useState } from "react";
import { normalizeDayId } from "../../utils/dateKeys";

/** Signed-out users have no server record, so day outcomes are kept here across reloads. */
const ANON_PROGRESS_STORAGE_KEY = "logicle_anon_completed_days";

type DayStatus = "completed" | "given_up";
/**
 * A day can be both given up on AND later completed — finishing the proof
 * using the revealed steps shouldn't erase the give-up record. So each flag
 * is independent and sticky (once true, stays true).
 */
type DayRecord = { dayId: string; completed: boolean; givenUp: boolean };

function mergeDayRecords(...lists: DayRecord[][]): DayRecord[] {
  const merged = new Map<string, DayRecord>();
  for (const list of lists) {
    for (const { dayId, completed, givenUp } of list) {
      const id = normalizeDayId(dayId);
      const existing = merged.get(id);
      merged.set(id, {
        dayId: id,
        completed: (existing?.completed ?? false) || completed,
        givenUp: (existing?.givenUp ?? false) || givenUp,
      });
    }
  }
  return Array.from(merged.values()).sort((a, b) => a.dayId.localeCompare(b.dayId));
}

function readAnonProgress(): DayRecord[] {
  try {
    const raw = localStorage.getItem(ANON_PROGRESS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    // Back-compat: older builds stored a plain string[] of completed day IDs,
    // or a single-status {dayId, status} shape.
    return parsed.map((entry) => {
      if (typeof entry === "string") {
        return { dayId: entry, completed: true, givenUp: false };
      }
      if ("status" in entry) {
        return {
          dayId: entry.dayId,
          completed: entry.status === "completed",
          givenUp: entry.status === "given_up",
        };
      }
      return {
        dayId: entry.dayId,
        completed: Boolean(entry.completed),
        givenUp: Boolean(entry.givenUp),
      };
    });
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
        completed: true,
        givenUp: false,
      })),
      ...(initialGivenUpDayIds ?? []).map((dayId) => ({
        dayId,
        completed: false,
        givenUp: true,
      })),
    ],
    [initialCompletedDayIds, initialGivenUpDayIds],
  );

  const [records, setRecords] = useState<DayRecord[]>(() =>
    userEmail
      ? mergeDayRecords(initialServerRecords())
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

  const completedDayIds = records.filter((r) => r.completed).map((r) => r.dayId);
  const givenUpDayIds = records.filter((r) => r.givenUp).map((r) => r.dayId);

  const isDayCompleted = useCallback(
    (dayId: string) =>
      records.some((r) => r.dayId === normalizeDayId(dayId) && r.completed),
    [records],
  );

  const isDayGivenUp = useCallback(
    (dayId: string) =>
      records.some((r) => r.dayId === normalizeDayId(dayId) && r.givenUp),
    [records],
  );

  const recordDay = useCallback(
    async (dayId: string, status: DayStatus) => {
      const normalized = normalizeDayId(dayId);
      setRecords((prev) =>
        mergeDayRecords(prev, [
          {
            dayId: normalized,
            completed: status === "completed",
            givenUp: status === "given_up",
          },
        ]),
      );

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
            setRecords((prev) => prev.filter((r) => r.dayId !== normalized));
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
