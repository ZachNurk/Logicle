import cors from "cors";
import express from "express";
import { getDayById, getDays } from "../db/days.ts";

const port = Number(process.env.PORT ?? 3001);
const app = express();

app.use(cors());
app.use(express.json());

/**
 * Gets all days from the DB
 */
app.get("/api/days", async (_req, res) => {
  try {
    const days = await getDays();
    res.status(200).json(days);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Gets a specific day from the DB
 */
app.get("/api/days/:id", async (req, res) => {
  try {
    const day = await getDayById(req.params.id);
    if (!day) {
      res.status(404).json({ error: "Day not found" });
      return;
    }
    res.status(200).json(day);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * All other requests are 404
 */
app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
