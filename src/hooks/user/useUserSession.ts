import { useAuth } from "./useAuth";
import { useUserProgress } from "./useUserProgress";

export function useUserSession() {
  const auth = useAuth();
  const progress = useUserProgress(
    auth.currentUser?.email ?? null,
    auth.currentUser?.completedDayIds,
  );

  return {
    ...auth,
    ...progress,
  };
}
