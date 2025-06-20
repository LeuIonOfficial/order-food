# Install dependencies only when needed
FROM node:20-alpine AS deps
WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile || npm install

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Generate Prisma client (without database connection)
RUN npx prisma generate

# Build the application (skip API routes that need database)
RUN npm run build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Don't run as root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Ensure Prisma client is properly generated in production
RUN npx prisma generate

USER nextjs

EXPOSE 3000
CMD ["npm", "start"] 