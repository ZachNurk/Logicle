INSERT INTO users (email, password)
VALUES ('test@example.com', '1234')
ON CONFLICT (email) DO UPDATE
SET password = EXCLUDED.password;
