import { Router } from "express";
import { addCompletedDay, getUserDays } from "../../db/userProgress";
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
    const completedDayIds = await getUserDays(email);
    res.status(200).json({ completedDayIds });
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Mark a day as completed for a user
 * POST /api/users/:email/progress
 */
router.post("/:email/progress", async (req, res) => {
  const email = normalizeEmailParam(req.params.email);
  const { dayId } = req.body ?? {};

  if (typeof dayId !== "string" || !dayId.trim()) {
    res.status(400).json({ error: "dayId is required" });
    return;
  }

  try {
    const result = await addCompletedDay(email, dayId.trim());
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
