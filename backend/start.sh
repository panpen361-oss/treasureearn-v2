#!/bin/bash

# Exit on error
set -e

echo "Starting Backend initialization..."

# Run database migrations
echo "Applying database migrations..."
bun run src/db-migrate.ts

# Start the main server
echo "Starting Elysia server..."
exec bun run src/index.ts
