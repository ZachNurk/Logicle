import bcrypt from "bcrypt";
import { Router } from "express";
import { createUser, getUserByEmail } from "../../db/users.ts";

const router = Router();

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

router.post("/login", async (req, res) => {
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
    const normalizedEmail = email.trim().toLowerCase();
    const user = await getUserByEmail(normalizedEmail);

    if (!user || !(await comparePassword(password, user.password))) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    res.status(200).json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
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

    const hashedPassword = await hashPassword(trimmedPassword);
    const user = await createUser(normalizedEmail, hashedPassword);
    res.status(201).json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
