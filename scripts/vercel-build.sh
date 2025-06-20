#!/bin/bash

# Vercel Build Script - Matches Dockerfile build process
set -e

echo "🚀 Starting Vercel build process..."

# Step 1: Install dependencies (handled by Vercel automatically)
echo "✅ Dependencies installed by Vercel"

# Step 2: Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Step 3: Push database schema
echo "🗄️ Pushing database schema..."
npx prisma db push

# Step 4: Seed database (optional - only if needed)
echo "🌱 Seeding database..."
npm run db:seed || echo "⚠️ Seeding failed or skipped"

# Step 5: Build Next.js app
echo "🏗️ Building Next.js application..."
next build

echo "✅ Vercel build completed successfully!" 