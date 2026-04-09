import { useCallback, useEffect, useState } from "react";

export function useUserProgress(
  userEmail: string | null,
  initialCompletedDayIds?: string[],
  /** Called when progress save fails (e.g. user not in DB after a DB reset). */
  onProgressSaveFailed?: () => void,
) {
  const [completedDayIds, setCompletedDayIds] = useState<string[]>(
    initialCompletedDayIds ?? [],
  );

  useEffect(() => {
    if (!userEmail) {
      setCompletedDayIds([]);
      return;
    }
    setCompletedDayIds(initialCompletedDayIds ?? []);
  }, [userEmail, initialCompletedDayIds]);

  const isDayCompleted = useCallback(
    (dayId: string) => completedDayIds.includes(dayId),
    [completedDayIds],
  );

  const markDayCompleted = useCallback(
    async (dayId: string) => {
      setCompletedDayIds((prev) =>
        prev.includes(dayId) ? prev : [...prev, dayId],
      );

      if (!userEmail) return;

      try {
        const res = await fetch(
          `/api/users/${encodeURIComponent(userEmail)}/progress`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dayId }),
          },
        );
        if (!res.ok) {
          setCompletedDayIds((prev) => prev.filter((d) => d !== dayId));
          if (res.status === 400) {
            onProgressSaveFailed?.();
          } else {
            console.error("Failed to save progress:", res.status, await res.text());
          }
        }
      } catch (err) {
        setCompletedDayIds((prev) => prev.filter((d) => d !== dayId));
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
