import type { NextFunction, Request, Response } from "express";
import { SESSION_COOKIE, verifySessionToken, type SessionPayload } from "../auth/session";

export type AuthedRequest = Request & { user: SessionPayload };

/** Verifies the session cookie and attaches the identity to `req.user`. */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.[SESSION_COOKIE];
  if (typeof token !== "string") {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const session = verifySessionToken(token);
  if (!session) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  (req as AuthedRequest).user = session;
  next();
}
