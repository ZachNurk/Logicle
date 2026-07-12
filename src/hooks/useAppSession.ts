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

import { useEffect, useRef } from "react";
import { useAuth } from "./user/useAuth";
import { useUserProgress } from "./user/useUserProgress";
import { useProofSession } from "./proof/useProofSession";
import { formatLocalDateKey, normalizeDayId } from "../utils/dateKeys";

export function useAppSession(puzzleSource: "daily" | "endless" = "daily") {
  const auth = useAuth();
  const progress = useUserProgress(
    auth.currentUser?.email ?? null,
    auth.currentUser?.completedDayIds,
    auth.logout,
  );

  /** Syncs any day completed while signed out to the account once the user signs in. */
  const wasLoggedIn = useRef(false);
  useEffect(() => {
    if (auth.authStatus === "loggedIn" && !wasLoggedIn.current) {
      const serverDayIds = new Set(
        (auth.currentUser?.completedDayIds ?? []).map(normalizeDayId),
      );
      const localOnlyDayIds = progress.completedDayIds.filter(
        (id) => !serverDayIds.has(normalizeDayId(id)),
      );
      for (const dayId of localOnlyDayIds) {
        void progress.markDayCompleted(dayId);
      }
    }
    wasLoggedIn.current = auth.authStatus === "loggedIn";
  }, [auth.authStatus, auth.currentUser, progress.completedDayIds, progress.markDayCompleted]);

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
