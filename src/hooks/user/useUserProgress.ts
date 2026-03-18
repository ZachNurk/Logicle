import { useCallback, useEffect, useState } from "react";

export function useUserProgress(
  userId: string | null,
  initialCompletedDayIds?: string[],
) {
  const [completedDayIds, setCompletedDayIds] = useState<string[]>(
    initialCompletedDayIds ?? [],
  );

  useEffect(() => {
    if (!userId) {
      setCompletedDayIds([]);
      return;
    }
    setCompletedDayIds(initialCompletedDayIds ?? []);
  }, [userId, initialCompletedDayIds]);

  const isDayCompleted = useCallback(
    (dayId: string) => completedDayIds.includes(dayId),
    [completedDayIds],
  );

  const markDayCompleted = useCallback((dayId: string) => {
    setCompletedDayIds((prev) =>
      prev.includes(dayId) ? prev : [...prev, dayId],
    );
  }, []);

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
