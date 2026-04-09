-- Best single-run endless score per user (max puzzles solved before leaving endless)
ALTER TABLE users
ADD COLUMN IF NOT EXISTS best_endless_score INTEGER NOT NULL DEFAULT 0;
