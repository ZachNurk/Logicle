CREATE TABLE IF NOT EXISTS days (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  nodes JSONB NOT NULL DEFAULT '[]'::jsonb,
  solution JSONB NOT NULL DEFAULT '{}'::jsonb
);
