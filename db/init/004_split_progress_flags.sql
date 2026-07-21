-- A day can be both given up on AND later completed (finishing the proof
-- using the revealed steps shouldn't erase the give-up record). The old
-- single `status` column couldn't represent both, so split it into two
-- independent, sticky booleans.
ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS completed BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS given_up BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE user_progress SET completed = TRUE WHERE status = 'completed';
UPDATE user_progress SET given_up = TRUE WHERE status = 'given_up';
