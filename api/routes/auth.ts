import bcrypt from "bcrypt";
import { Router } from "express";
import nodemailer from "nodemailer";
import {
  createUser,
  getUserByEmail,
  getUserByValidOtp,
  setUserOtpByEmail,
  updatePasswordAndClearOtp,
} from "../../db/users.ts";

const router = Router();

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
    text: `Your OTP (expires in 1 minute): ${otp}`,
  });
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

// Password reset endpoints (wire up email + DB token storage before using).
router.post("/forgotPassword", async (req, res) => {
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
      res.status(400).json({ error: "Email is not registereds" });
      return;
    }

    const otp = String(Math.floor(1000 + Math.random() * 9000));
    const otpExpire = new Date(Date.now() + 60_000);
    await setUserOtpByEmail(normalizedEmail, otp, otpExpire);
    await sendOtpEmail(normalizedEmail, otp);

    res.status(200).json({ data: "Your OTP send to the email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/resetPassword", async (req, res) => {
  const { otp, password, confirmPassword } = req.body ?? {};
  if (
    typeof otp !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    res.status(400).json({ error: "OTP, password, and confirmPassword are required" });
    return;
  }

  const trimmedOtp = otp.trim();
  const trimmedPassword = password.trim();
  const trimmedConfirm = confirmPassword.trim();
  if (!trimmedOtp || !trimmedPassword || !trimmedConfirm) {
    res.status(400).json({ error: "OTP and passwords cannot be empty" });
    return;
  }
  if (trimmedPassword !== trimmedConfirm) {
    res.status(400).json({ error: "passwords are not equal" });
    return;
  }

  try {
    const user = await getUserByValidOtp(trimmedOtp);
    if (!user) {
      res.status(400).json({ error: "Invalid or expired OTP" });
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

export default router;
