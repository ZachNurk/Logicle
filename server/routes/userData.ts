import { Router } from "express";
import {
  recordDayProgress,
  getUserDays,
  type ProgressStatus,
} from "../../db/userProgress";
import { requireAuth, type AuthedRequest } from "../middleware/requireAuth";

const router = Router();

/** Match `users.email` (register lowercases); avoids FK misses from casing. */
function normalizeEmailParam(raw: string): string {
  return decodeURIComponent(raw).trim().toLowerCase();
}

router.use(requireAuth);

/** Blocks a valid session from reading/writing another account's data. */
router.use("/:email", (req, res, next) => {
  const email = normalizeEmailParam(req.params.email);
  if ((req as unknown as AuthedRequest).user.email !== email) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  next();
});

/**
 * Get all completed day IDs for a user
 * GET /api/users/:email/progress
 */
router.get("/:email/progress", async (req, res) => {
  const email = normalizeEmailParam(req.params.email);

  try {
    const days = await getUserDays(email);
    const completedDayIds = days
      .filter((d) => d.status === "completed")
      .map((d) => d.dayId);
    const givenUpDayIds = days
      .filter((d) => d.status === "given_up")
      .map((d) => d.dayId);
    res.status(200).json({ completedDayIds, givenUpDayIds });
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Record a day's outcome (win or give-up) for a user
 * POST /api/users/:email/progress
 */
router.post("/:email/progress", async (req, res) => {
  const email = normalizeEmailParam(req.params.email);
  const { dayId, status } = req.body ?? {};

  if (typeof dayId !== "string" || !dayId.trim()) {
    res.status(400).json({ error: "dayId is required" });
    return;
  }
  const resolvedStatus: ProgressStatus =
    status === "given_up" ? "given_up" : "completed";

  try {
    const result = await recordDayProgress(email, dayId.trim(), resolvedStatus);
    if (!result.ok) {
      // Expected when a stale session points at an email no longer in `users`
      // (e.g. after a dev DB reset). Not logged as an error.
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(201).json({ ok: true });
  } catch (error: unknown) {
    console.error("Add progress error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
