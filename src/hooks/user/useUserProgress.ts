import { useCallback, useEffect, useState } from "react";

export function useUserProgress(
  userEmail: string | null,
  initialCompletedDayIds?: string[],
  initialBestEndlessScore?: number,
  /** Called when progress save fails (e.g. user not in DB after a DB reset). */
  onProgressSaveFailed?: () => void,
  /** After best-endless POST, refetch progress into auth (optional). */
  refreshProgressFromServer?: () => Promise<void>,
) {
  const [completedDayIds, setCompletedDayIds] = useState<string[]>(
    initialCompletedDayIds ?? [],
  );
  const [bestEndlessScore, setBestEndlessScore] = useState(
    initialBestEndlessScore ?? 0,
  );

  useEffect(() => {
    if (!userEmail) {
      setCompletedDayIds([]);
      setBestEndlessScore(0);
      return;
    }
    setCompletedDayIds(initialCompletedDayIds ?? []);
    setBestEndlessScore(initialBestEndlessScore ?? 0);
  }, [userEmail, initialCompletedDayIds, initialBestEndlessScore]);

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
    setBestEndlessScore(0);
  }, []);

  /**
   * Call after each endless puzzle solve with the new run total (`endlessSolves` after that win).
   * Always POSTs so the server can apply GREATEST vs stored best (avoids stale client comparisons).
   */
  const updateBestEndlessIfHigher = useCallback(
    async (score: number) => {
      if (!userEmail || score < 1) return;
      try {
        const res = await fetch(
          `/api/users/${encodeURIComponent(userEmail)}/best-endless`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score }),
          },
        );
        if (!res.ok) {
          // Do not call onProgressSaveFailed (logout): missing route / transient errors
          // should not sign the user out; daily progress uses logout only for invalid user.
          console.error(
            "Failed to save best endless score:",
            res.status,
            await res.text(),
          );
          return;
        }
        const data = await res.json();
        if (typeof data.bestEndlessScore === "number") {
          setBestEndlessScore(data.bestEndlessScore);
        }
        await refreshProgressFromServer?.();
      } catch (err) {
        console.error("Failed to save best endless score:", err);
      }
    },
    [userEmail, refreshProgressFromServer],
  );

  return {
    completedDayIds,
    bestEndlessScore,
    isDayCompleted,
    markDayCompleted,
    updateBestEndlessIfHigher,
    clearProgress,
  };
}
