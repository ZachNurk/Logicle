import { useAuth } from "./useAuth";
import { useUserProgress } from "./useUserProgress";

export function useUserSession() {
  const auth = useAuth();
  const progress = useUserProgress(
    auth.currentUser?.id ?? null,
    auth.currentUser?.completedDayIds,
  );

  return {
    ...auth,
    ...progress,
  };
}
