/**
 * Signs and verifies the session JWT carried in the `session` httpOnly cookie.
 */
import jwt from "jsonwebtoken";
import type { CookieOptions, Response } from "express";

const SESSION_COOKIE = "session";
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

const jwtSecret: string = (() => {
  const value = process.env.JWT_SECRET;
  if (!value) {
    throw new Error("Missing JWT_SECRET in environment");
  }
  return value;
})();

export type SessionPayload = {
  userId: string;
  email: string;
};

export function signSessionToken(payload: SessionPayload): string {
  return jwt.sign(payload, jwtSecret, { expiresIn: SESSION_TTL_SECONDS });
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      typeof decoded.userId === "string" &&
      typeof decoded.email === "string"
    ) {
      return { userId: decoded.userId, email: decoded.email };
    }
    return null;
  } catch {
    return null;
  }
}

function cookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_TTL_SECONDS * 1000,
    path: "/",
  };
}

export function setSessionCookie(res: Response, payload: SessionPayload): void {
  res.cookie(SESSION_COOKIE, signSessionToken(payload), cookieOptions());
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(SESSION_COOKIE, { ...cookieOptions(), maxAge: undefined });
}

export { SESSION_COOKIE };
