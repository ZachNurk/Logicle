#!/bin/bash
# Creates a least-privileged role for the API to use at runtime.
#
# Runs once on a fresh data volume (via postgres-image's
# /docker-entrypoint-initdb.d hook). For an existing volume, run the SQL
# inside the heredoc manually as the postgres superuser, e.g.:
#
#   docker exec -i logicle-postgres psql -U postgres -d logicle < <(envsubst < db/init/002_create_app_role.sh | sed -n '/<<-EOSQL/,/EOSQL/p' | sed '1d;$d')
#
# or just `docker compose down -v && docker compose up -d` if you're OK
# losing local data.

set -e

: "${APP_DB_USER:=logicle_app}"
: "${APP_DB_PASSWORD:?APP_DB_PASSWORD must be set on the db service env}"

psql -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname "$POSTGRES_DB" <<-EOSQL
  DO \$\$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '${APP_DB_USER}') THEN
      CREATE ROLE ${APP_DB_USER} LOGIN PASSWORD '${APP_DB_PASSWORD}';
    ELSE
      ALTER ROLE ${APP_DB_USER} WITH LOGIN PASSWORD '${APP_DB_PASSWORD}';
    END IF;
  END
  \$\$;

  -- Connect + see objects in public; no CREATE.
  GRANT CONNECT ON DATABASE ${POSTGRES_DB} TO ${APP_DB_USER};
  GRANT USAGE ON SCHEMA public TO ${APP_DB_USER};

  -- days: read-only puzzle bank.
  GRANT SELECT ON TABLE days TO ${APP_DB_USER};

  -- users: register, look up, rotate OTP / password. No DELETE.
  GRANT SELECT, INSERT, UPDATE ON TABLE users TO ${APP_DB_USER};

  -- user_progress: read and append-only. Row deletes happen via the
  -- ON DELETE CASCADE from users(email), which runs with the table
  -- owner's privileges, so the app role doesn't need DELETE here.
  GRANT SELECT, INSERT ON TABLE user_progress TO ${APP_DB_USER};

  -- Future-proof: tables created later by the postgres superuser get
  -- SELECT to the app role by default. INSERT/UPDATE/DELETE must still
  -- be granted explicitly to avoid silent privilege expansion.
  ALTER DEFAULT PRIVILEGES FOR ROLE ${POSTGRES_USER} IN SCHEMA public
    GRANT SELECT ON TABLES TO ${APP_DB_USER};
EOSQL
