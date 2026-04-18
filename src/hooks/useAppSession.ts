/**
 * Top-level session hook. Composes user auth, user progress, and proof state
 * into namespaced objects so data ownership is always clear.
 *
 * - auth    → identity, login/logout flows (useAuth)
 * - progress → completed days, streaks (useUserProgress)
 * - proof   → puzzle nodes, axioms, victory (useProofSession)
 *
 * @file useAppSession.ts
 */

import { useAuth } from "./user/useAuth";
import { useUserProgress } from "./user/useUserProgress";
import { useProofSession } from "./proof/useProofSession";
import { formatLocalDateKey } from "../utils/dateKeys";

export function useAppSession(puzzleSource: "daily" | "endless" = "daily") {
  const auth = useAuth();
  const progress = useUserProgress(
    auth.currentUser?.email ?? null,
    auth.currentUser?.completedDayIds,
    auth.logout,
  );

  const today = formatLocalDateKey(new Date());
  const hasWonToday = progress.completedDayIds.includes(today);

  const proof = useProofSession(
    auth.currentUser?.id ?? null,
    hasWonToday,
    puzzleSource === "daily"
      ? async (dayId) => {
          await progress.markDayCompleted(dayId);
          await auth.refreshUserProgress();
        }
      : undefined,
    puzzleSource,
  );

  return { auth, progress, proof };
}
