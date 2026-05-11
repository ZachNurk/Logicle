CREATE TABLE IF NOT EXISTS days (
  id TEXT PRIMARY KEY,
  nodes JSONB NOT NULL DEFAULT '[]'::jsonb,
  solution JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  otp TEXT,
  otp_expire TIMESTAMPTZ
);

ALTER TABLE users
ADD COLUMN IF NOT EXISTS otp TEXT;

ALTER TABLE users
ADD COLUMN IF NOT EXISTS otp_expire TIMESTAMPTZ;

-- Failed-attempt counter on the current OTP. Reset to 0 whenever a fresh OTP
-- is minted; the route layer locks the OTP (clears it) once it reaches the
-- configured threshold.
ALTER TABLE users
ADD COLUMN IF NOT EXISTS otp_attempts SMALLINT NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS user_progress (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  day_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(email, day_id)
);


