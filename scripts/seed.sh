#!/bin/bash

echo "🌱 Starting database seeding..."

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
until npx prisma db push --accept-data-loss; do
  echo "Database not ready, retrying in 5 seconds..."
  sleep 5
done

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run seed script
echo "🌱 Running seed script..."
npx tsx prisma/seed.ts

echo "✅ Database seeding completed!" 