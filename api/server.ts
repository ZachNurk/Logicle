import cors from "cors";
import express from "express";
import { getDayById, getDays } from "../db/days.ts";
import { createUser, getUserByEmail } from "../db/users.ts";

const port = Number(process.env.PORT ?? 3001);
const app = express();

app.use(cors());
app.use(express.json());

/**
 * login endpoint
 */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  if (!email.trim() || !password.trim()) {
    res.status(400).json({ error: "Email and password cannot be empty" });
    return;
  }

  try {
    const user = await getUserByEmail(email.trim());
    if (!user || user.password !== password) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    res.status(200).json({
      ok: true,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Create account endpoint
 */
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();
  if (!normalizedEmail || !trimmedPassword) {
    res.status(400).json({ error: "Email and password cannot be empty" });
    return;
  }

  try {
    const existingUser = await getUserByEmail(normalizedEmail);
    if (existingUser) {
      res.status(409).json({ error: "An account with that email already exists" });
      return;
    }

    const user = await createUser(normalizedEmail, trimmedPassword);
    res.status(201).json({
      ok: true,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
