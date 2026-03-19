import { Router } from "express";
import { addCompletedDay, getUserDays } from "../../db/userProgress.ts";

const router = Router();

/**
 * Get all completed day IDs for a user
 * GET /api/users/:email/progress
 */
router.get("/:email/progress", async (req, res) => {
  const { email } = req.params;

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
  const { email } = req.params;
  const { dayId } = req.body ?? {};

  if (typeof dayId !== "string" || !dayId.trim()) {
    res.status(400).json({ error: "dayId is required" });
    return;
  }

  try {
    await addCompletedDay(email, dayId.trim());
    res.status(201).json({ ok: true });
  } catch (error) {
    console.error("Add progress error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
