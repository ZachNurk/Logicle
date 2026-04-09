import { Router } from "express";
import { addCompletedDay, getUserDays } from "../../db/userProgress.ts";
import {
  getBestEndlessScore,
  updateBestEndlessScoreIfHigher,
} from "../../db/users.ts";

const router = Router();

/** Match `users.email` (register lowercases); avoids FK misses from casing. */
function normalizeEmailParam(raw: string): string {
  return decodeURIComponent(raw).trim().toLowerCase();
}

/**
 * Get all completed day IDs for a user
 * GET /api/users/:email/progress
 */
router.get("/:email/progress", async (req, res) => {
  const email = normalizeEmailParam(req.params.email);

  try {
    const [completedDayIds, bestEndlessScore] = await Promise.all([
      getUserDays(email),
      getBestEndlessScore(email),
    ]);
    res.status(200).json({ completedDayIds, bestEndlessScore });
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
    await addCompletedDay(email, dayId.trim());
    res.status(201).json({ ok: true });
  } catch (error: unknown) {
    console.error("Add progress error:", error);
    // PostgreSQL: 23503 = foreign key violation (e.g. email not in users)
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code: string }).code)
        : "";
    if (code === "23503") {
      res.status(400).json({
        error:
          "No user with this email in the database. Register or log in again after resetting the DB.",
      });
      return;
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Update best endless run score (only increases)
 * POST /api/users/:email/best-endless
 */
router.post("/:email/best-endless", async (req, res) => {
  const email = normalizeEmailParam(req.params.email);
  const raw = req.body?.score;
  const score =
    typeof raw === "number" && Number.isFinite(raw)
      ? Math.floor(raw)
      : typeof raw === "string" && raw.trim() !== ""
        ? Math.floor(Number(raw))
        : NaN;

  if (!Number.isFinite(score) || score < 0) {
    res.status(400).json({ error: "score must be a non-negative integer" });
    return;
  }

  try {
    const bestEndlessScore = await updateBestEndlessScoreIfHigher(email, score);
    if (bestEndlessScore === null) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json({ ok: true, bestEndlessScore });
  } catch (error: unknown) {
    console.error("Best endless score error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
