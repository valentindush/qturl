#!/bin/sh

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL..."
until nc -z -v -w30 postgres 5432; do
  echo "Waiting for database connection..."
  sleep 2
done

echo "PostgreSQL is up!"

# Run Prisma migrations
echo "Running Prisma Migrations..."
npx prisma db push

# Run the seed script


# Start the application
echo "Starting the application..."
exec npm run start:prod
