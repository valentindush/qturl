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
npx prisma migrate deploy

# Run the seed script
echo "Seeding the database..."
npm run seed

# Start the application
echo "Starting the application..."
exec npm run start:prod
