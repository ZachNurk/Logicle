import { useCallback, useEffect, useState } from "react";
import { normalizeDayId } from "../../utils/dateKeys";

/** Signed-out users have no server record, so completed days are kept here across reloads. */
const ANON_COMPLETED_DAYS_STORAGE_KEY = "logicle_anon_completed_days";

function mergeDayIds(
  local: string[],
  server: string[] | undefined,
): string[] {
  const merged = new Set<string>();
  for (const id of local) merged.add(normalizeDayId(id));
  for (const id of server ?? []) merged.add(normalizeDayId(id));
  return Array.from(merged).sort();
}

function readAnonCompletedDayIds(): string[] {
  try {
    const raw = localStorage.getItem(ANON_COMPLETED_DAYS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAnonCompletedDayIds(ids: string[]) {
  try {
    localStorage.setItem(ANON_COMPLETED_DAYS_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore quota/private-mode errors; anon progress just won't persist.
  }
}

export function useUserProgress(
  userEmail: string | null,
  initialCompletedDayIds?: string[],
  /** Called when progress save fails (e.g. user not in DB after a DB reset). */
  onProgressSaveFailed?: () => void,
) {
  const [completedDayIds, setCompletedDayIds] = useState<string[]>(() =>
    userEmail
      ? mergeDayIds([], initialCompletedDayIds ?? [])
      : mergeDayIds(readAnonCompletedDayIds(), initialCompletedDayIds ?? []),
  );

  useEffect(() => {
    if (!userEmail) {
      setCompletedDayIds(readAnonCompletedDayIds());
      return;
    }
    /** Union with previous so optimistic `markDayCompleted` is not wiped if auth lags or GET races. */
    setCompletedDayIds((prev) =>
      mergeDayIds(prev, initialCompletedDayIds ?? []),
    );
  }, [userEmail, initialCompletedDayIds]);

  /** Mirror anon progress to localStorage so a solved puzzle still shows as solved after a reload. */
  useEffect(() => {
    if (!userEmail) writeAnonCompletedDayIds(completedDayIds);
  }, [userEmail, completedDayIds]);

  const isDayCompleted = useCallback(
    (dayId: string) =>
      completedDayIds.some((d) => normalizeDayId(d) === normalizeDayId(dayId)),
    [completedDayIds],
  );

  const markDayCompleted = useCallback(
    async (dayId: string) => {
      const normalized = normalizeDayId(dayId);
      setCompletedDayIds((prev) => mergeDayIds(prev, [normalized]));

      if (!userEmail) return;

      try {
        const res = await fetch(
          `/api/users/${encodeURIComponent(userEmail)}/progress`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ dayId: normalized }),
          },
        );
        if (!res.ok) {
          if (res.status === 404) {
            // Stale session pointing at an email no longer in `users` — the
            // day genuinely can't be saved for this session, so undo the
            // optimistic local win and let the caller handle re-auth.
            setCompletedDayIds((prev) =>
              prev.filter((d) => normalizeDayId(d) !== normalized),
            );
            onProgressSaveFailed?.();
          } else {
            // Transient failure (network blip, 500, etc). The user did solve
            // the puzzle, so keep showing the win locally rather than
            // silently un-completing it; just log for diagnostics.
            console.error("Failed to save progress:", res.status, await res.text());
          }
        }
      } catch (err) {
        console.error("Failed to save progress:", err);
      }
    },
    [userEmail, onProgressSaveFailed],
  );

  const clearProgress = useCallback(() => {
    setCompletedDayIds([]);
  }, []);

  return {
    completedDayIds,
    isDayCompleted,
    markDayCompleted,
    clearProgress,
  };
}
