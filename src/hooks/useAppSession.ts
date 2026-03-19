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

export function useAppSession() {
  const auth = useAuth();
  const progress = useUserProgress(
    auth.currentUser?.email ?? null,
    auth.currentUser?.completedDayIds,
  );

  const today = new Date().toLocaleDateString("en-CA");
  const hasWonToday = progress.completedDayIds.includes(today);

  const proof = useProofSession(
    auth.currentUser?.id ?? null,
    hasWonToday,
    async (dayId) => {
      await progress.markDayCompleted(dayId);
      await auth.refreshUserProgress();
    },
  );

  return { auth, progress, proof };
}
