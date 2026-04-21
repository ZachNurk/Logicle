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
};

export async function getUserByEmail(email: string): Promise<DbUser | null> {
  const result = await pool.query<DbUser>(
    `
    SELECT id, email, password
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
    SET otp = $1, otp_expire = $2
    WHERE email = $3
    `,
    [otp, otpExpire, email],
  );
  return (result.rowCount ?? 0) > 0;
}

export async function getUserByValidOtp(otp: string): Promise<DbUser | null> {
  const result = await pool.query<DbUser>(
    `
    SELECT id, email, password, otp, otp_expire
    FROM users
    WHERE otp = $1 AND otp_expire > NOW()
    `,
    [otp],
  );
  return result.rows[0] ?? null;
}

export async function updatePasswordAndClearOtp(
  userId: string,
  password: string,
): Promise<boolean> {
  const result = await pool.query(
    `
    UPDATE users
    SET password = $1, otp = NULL, otp_expire = NULL
    WHERE id = $2
    `,
    [password, userId],
  );
  return (result.rowCount ?? 0) > 0;
}
