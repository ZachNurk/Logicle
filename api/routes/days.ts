import { Router } from "express";
import { getDayById, getDays } from "../../db/days.ts";

const router = Router();

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
