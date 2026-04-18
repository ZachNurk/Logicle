import { useCallback, useEffect, useState } from "react";
import { normalizeDayId } from "../../utils/dateKeys";

function mergeDayIds(
  local: string[],
  server: string[] | undefined,
): string[] {
  const merged = new Set<string>();
  for (const id of local) merged.add(normalizeDayId(id));
  for (const id of server ?? []) merged.add(normalizeDayId(id));
  return Array.from(merged).sort();
}

export function useUserProgress(
  userEmail: string | null,
  initialCompletedDayIds?: string[],
  /** Called when progress save fails (e.g. user not in DB after a DB reset). */
  onProgressSaveFailed?: () => void,
) {
  const [completedDayIds, setCompletedDayIds] = useState<string[]>(() =>
    mergeDayIds([], initialCompletedDayIds ?? []),
  );

  useEffect(() => {
    if (!userEmail) {
      setCompletedDayIds([]);
      return;
    }
    /** Union with previous so optimistic `markDayCompleted` is not wiped if auth lags or GET races. */
    setCompletedDayIds((prev) =>
      mergeDayIds(prev, initialCompletedDayIds ?? []),
    );
  }, [userEmail, initialCompletedDayIds]);

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
            body: JSON.stringify({ dayId: normalized }),
          },
        );
        if (!res.ok) {
          setCompletedDayIds((prev) =>
            prev.filter((d) => normalizeDayId(d) !== normalized),
          );
          if (res.status === 400) {
            onProgressSaveFailed?.();
          } else {
            console.error("Failed to save progress:", res.status, await res.text());
          }
        }
      } catch (err) {
        setCompletedDayIds((prev) =>
          prev.filter((d) => normalizeDayId(d) !== normalized),
        );
        console.error("Failed to save progress:", err);
      }
      console.log(completedDayIds)
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
