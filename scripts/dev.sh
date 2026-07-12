#!/usr/bin/env bash
set -e

docker compose up -d
trap 'docker compose down' EXIT

concurrently "vite" "npm run server"
