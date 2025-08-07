# Build stage
FROM oven/bun:1 AS builder
WORKDIR /usr/src/app

# Copy only package files first to leverage caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy only necessary files for build
COPY tsconfig.json next.config.mjs ./
COPY .env ./.env
COPY scripts ./scripts/
COPY src/ ./src/
COPY public/ ./public/

# Set environment to production and build
ENV NODE_ENV=production
RUN bun run sync-guides && bun run build

# Production stage
FROM oven/bun:1-slim AS production
WORKDIR /usr/src/app

# Copy only runtime dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy built app from builder stage
COPY --from=builder /usr/src/app/scripts ./scripts
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/next.config.mjs ./

# Expose port and run
EXPOSE 3000
USER bun
ENV NODE_ENV=production
ENTRYPOINT ["bun", "run", "start"]