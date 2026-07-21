-- 'given_up' lets the daily Give Up button record a loss without deleting
-- the row; a later win (shouldn't normally happen) is never downgraded back
-- to given_up because the app only calls this path once per day per status.
ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'completed';

ALTER TABLE user_progress
DROP CONSTRAINT IF EXISTS user_progress_status_check;

ALTER TABLE user_progress
ADD CONSTRAINT user_progress_status_check CHECK (status IN ('completed', 'given_up'));
