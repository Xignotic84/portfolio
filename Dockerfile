# ==========================
# 1. Base image
# ==========================
FROM node:24-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# ==========================
# 2. Dependencies
# ==========================
FROM base AS deps
COPY package*.json yarn.lock* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ==========================
# 3. Build stage
# ==========================
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js in standalone mode
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ==========================
# 4. Production image
# ==========================
FROM node:24-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 -G nodejs nextjs

# Environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone build from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone/ ./

# Copy public folder (optional)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Expose port and use non-root user
EXPOSE 3000
USER nextjs

# Run standalone server.js
CMD ["node", "server.js"]
