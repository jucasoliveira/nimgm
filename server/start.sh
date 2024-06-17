#!/bin/sh

# Debug: List files in the /app directory to ensure migrations exist
echo "Listing /app directory"
ls -la /app

# Debug: List files in the /app/migrations directory to ensure migrations exist
echo "Listing /app/migrations directory"
ls -la /app/migrations

# Run migrations
echo "Running migrations"
diesel migration run --database-url=$DATABASE_URL --migration-dir=/app/migrations

# Start the server
echo "Starting server"
/usr/local/bin/server
