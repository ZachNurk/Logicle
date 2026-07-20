import { Router } from "express";
import { pool } from "../../db/db.ts";

const router = Router();

/**
 * Vercel Cron hits this daily. A trivial query is enough to count as
 * activity and stop Supabase from pausing the project for inactivity.
 * Protected by CRON_SECRET so it can't be triggered by randoms hitting
 * the URL (Vercel sends `Authorization: Bearer <CRON_SECRET>` automatically
 * for scheduled invocations when that env var is set).
 */
router.get("/keepalive", async (req, res) => {
  const secret = process.env.CRON_SECRET;
  if (secret && req.header("authorization") !== `Bearer ${secret}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Cron keepalive error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
