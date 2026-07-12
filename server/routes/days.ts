import { Router, type Response } from "express";
import { getDayById, getDays, getRandomDay } from "../../db/days.ts";

const router = Router();

async function sendRandomDay(res: Response) {
  try {
    const day = await getRandomDay();
    if (!day) {
      res.status(404).json({ error: "No puzzles in database" });
      return;
    }
    res.status(200).json(day);
  } catch (error) {
    console.error("Get random day error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/** Dedicated route; also handle `/:id` === "random" for older servers / routing quirks */
router.get("/random", async (_req, res) => {
  await sendRandomDay(res);
});

router.get("/", async (_req, res) => {
  try {
    const days = await getDays();
    res.status(200).json(days);
  } catch (error) {
    console.error("Get days error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  if (req.params.id === "random") {
    await sendRandomDay(res);
    return;
  }
  try {
    const day = await getDayById(req.params.id);
    if (!day) {
      res.status(404).json({ error: "Day not found" });
      return;
    }
    res.status(200).json(day);
  } catch (error) {
    console.error("Get day error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
