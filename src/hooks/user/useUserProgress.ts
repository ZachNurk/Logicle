import { useCallback, useEffect, useState } from "react";

export function useUserProgress(
  userEmail: string | null,
  initialCompletedDayIds?: string[],
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

  const markDayCompleted = useCallback((dayId: string) => {
    setCompletedDayIds((prev) =>
      prev.includes(dayId) ? prev : [...prev, dayId],
    );

    if (userEmail) {
      fetch(`/api/users/${encodeURIComponent(userEmail)}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dayId }),
      }).catch((err) => console.error("Failed to save progress:", err));
    }
  }, [userEmail]);

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
