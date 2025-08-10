#!/bin/bash

# Run database migration script
# Usage: ./run-migration.sh

echo "Running database migration..."

# Check if drizzle-kit is installed
if ! command -v drizzle-kit &> /dev/null; then
    echo "drizzle-kit not found. Installing..."
    npm install -g drizzle-kit
fi

# Generate and run migration
echo "Generating migration..."
npx drizzle-kit generate:mysql

echo "Applying migration..."
npx drizzle-kit push:mysql

echo "Migration completed successfully!"
