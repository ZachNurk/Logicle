/**
 * Db queries for user info
 * 
 */

import { pool } from "./db";

export type DbUser = {
  id: string;
  email: string;
  password: string;
  otp?: string | null;
  otp_expire?: Date | null;
  otp_attempts?: number | null;
};

export async function getUserByEmail(email: string): Promise<DbUser | null> {
  const result = await pool.query<DbUser>(
    `
    SELECT id, email, password, otp, otp_expire, otp_attempts
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  return result.rows[0] ?? null;
}

export async function createUser(email: string, password: string): Promise<DbUser> {
  const result = await pool.query<DbUser>(
    `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email, password
    `,
    [email, password],
  );
  return result.rows[0];
}

export async function setUserOtpByEmail(
  email: string,
  otp: string,
  otpExpire: Date,
): Promise<boolean> {
  const result = await pool.query(
    `
    UPDATE users
    SET otp = $1, otp_expire = $2, otp_attempts = 0
    WHERE email = $3
    `,
    [otp, otpExpire, email],
  );
  return (result.rowCount ?? 0) > 0;
}

/**
 * Increments otp_attempts on the user and returns the new value.
 * Used by the reset-password route to lock the OTP after N failed guesses.
 */
export async function incrementOtpAttempts(userId: string): Promise<number> {
  const result = await pool.query<{ otp_attempts: number }>(
    `
    UPDATE users
    SET otp_attempts = otp_attempts + 1
    WHERE id = $1
    RETURNING otp_attempts
    `,
    [userId],
  );
  return result.rows[0]?.otp_attempts ?? 0;
}

/** Clears the OTP without touching the password (used when attempts maxed). */
export async function clearOtpByUserId(userId: string): Promise<void> {
  await pool.query(
    `
    UPDATE users
    SET otp = NULL, otp_expire = NULL, otp_attempts = 0
    WHERE id = $1
    `,
    [userId],
  );
}

export async function updatePasswordAndClearOtp(
  userId: string,
  password: string,
): Promise<boolean> {
  const result = await pool.query(
    `
    UPDATE users
    SET password = $1, otp = NULL, otp_expire = NULL, otp_attempts = 0
    WHERE id = $2
    `,
    [password, userId],
  );
  return (result.rowCount ?? 0) > 0;
}
