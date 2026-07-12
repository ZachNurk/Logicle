import bcrypt from "bcrypt";
import { randomInt, timingSafeEqual } from "node:crypto";
import { Router } from "express";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import {
  clearOtpByUserId,
  createUser,
  getUserByEmail,
  incrementOtpAttempts,
  setUserOtpByEmail,
  updatePasswordAndClearOtp,
} from "../../db/users.ts";
import { clearSessionCookie, setSessionCookie } from "../auth/session.ts";

const router = Router();

/** Max wrong OTP submissions before the current code self-destructs. */
const OTP_MAX_ATTEMPTS = 5;

/** In-memory rate limiters. Single-process only; swap for a Redis store
 * when the API runs on more than one node. */
const loginLimiter = rateLimit({
  windowMs: 60_000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many login attempts. Try again in a minute." },
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many account creations from this address." },
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many reset requests. Try again later." },
});

const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many reset attempts. Try again later." },
});

/** Length-aware constant-time string compare so OTP guesses can't be timed. */
function safeStringEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendOtpEmail(email: string, otp: string): Promise<void> {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM ?? smtpUser;

  if (!smtpUser || !smtpPass || !smtpFrom) {
    throw new Error("SMTP config missing. Set SMTP_USER, SMTP_PASS, SMTP_FROM.");
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: smtpFrom,
    to: email,
    subject: "Password reset OTP",
    text: `Your OTP (expires in 10 minutes): ${otp}`,
  });
}



router.post("/login", loginLimiter, async (req, res) => {
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

    setSessionCookie(res, { userId: user.id, email: user.email });
    res.status(200).json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register", registerLimiter, async (req, res) => {
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
    setSessionCookie(res, { userId: user.id, email: user.email });
    res.status(201).json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Password reset endpoints (wire up email + DB token storage before using).
router.post("/forgotPassword", forgotPasswordLimiter, async (req, res) => {
  const { email } = req.body ?? {};
  if (typeof email !== "string" || !email.trim()) {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!validateEmail(normalizedEmail)) {
    res.status(400).json({ error: "Invalid email" });
    return;
  }

  try {
    const user = await getUserByEmail(normalizedEmail);
    if (!user) {
      res.status(400).json({ error: "Email is not registered" });
      return;
    }

    // 6 digits from a CSPRNG (~20 bits). Pad so leading-zero codes (e.g.
    // "012345") aren't dropped to 5 digits when stringified.
    const otp = randomInt(0, 1_000_000).toString().padStart(6, "0");
    const otpExpire = new Date(Date.now() + 10 * 60_000);
    await setUserOtpByEmail(normalizedEmail, otp, otpExpire);
    await sendOtpEmail(normalizedEmail, otp);

    res.status(200).json({ data: "Your OTP sent to the email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/resetPassword", resetPasswordLimiter, async (req, res) => {
  const { email, otp, password, confirmPassword } = req.body ?? {};
  if (
    typeof email !== "string" ||
    typeof otp !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    res
      .status(400)
      .json({ error: "Email, OTP, password, and confirmPassword are required" });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const trimmedOtp = otp.trim();
  const trimmedPassword = password.trim();
  const trimmedConfirm = confirmPassword.trim();
  if (!normalizedEmail || !trimmedOtp || !trimmedPassword || !trimmedConfirm) {
    res.status(400).json({ error: "Email, OTP, and passwords cannot be empty" });
    return;
  }
  if (trimmedPassword !== trimmedConfirm) {
    res.status(400).json({ error: "passwords are not equal" });
    return;
  }

  try {
    const user = await getUserByEmail(normalizedEmail);

    // Treat every "can't proceed" branch with the same generic error so the
    // caller can't tell whether the email exists, the OTP is unknown, or it
    // expired. Locking, increments, etc. happen silently in the DB.
    const genericFailure = () =>
      res.status(400).json({ error: "Invalid or expired OTP" });

    if (
      !user ||
      !user.otp ||
      !user.otp_expire ||
      new Date(user.otp_expire).getTime() <= Date.now()
    ) {
      if (user?.id && user.otp) {
        // Expired OTP — clear it so it can't be reused or further guessed.
        await clearOtpByUserId(user.id);
      }
      genericFailure();
      return;
    }

    if ((user.otp_attempts ?? 0) >= OTP_MAX_ATTEMPTS) {
      // Defensive: if attempts ever exceed the cap without being cleared,
      // clear now and bail.
      await clearOtpByUserId(user.id);
      genericFailure();
      return;
    }

    if (!safeStringEqual(user.otp, trimmedOtp)) {
      const newAttempts = await incrementOtpAttempts(user.id);
      if (newAttempts >= OTP_MAX_ATTEMPTS) {
        await clearOtpByUserId(user.id);
      }
      genericFailure();
      return;
    }

    const hashedPassword = await hashPassword(trimmedPassword);
    const updated = await updatePasswordAndClearOtp(user.id, hashedPassword);
    if (!updated) {
      res.status(500).json({ error: "Could not reset password" });
      return;
    }

    res.status(200).json({ data: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/logout", (_req, res) => {
  clearSessionCookie(res);
  res.status(200).json({ ok: true });
});

export default router;
