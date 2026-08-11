# Build stage
FROM oven/bun:1.3.14 AS builder
WORKDIR /usr/src/app

# Public / client-side variables
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}

# Copy package files first to leverage caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

# Copy necessary source files
COPY tsconfig.json next.config.mjs ./
COPY scripts ./scripts/
COPY src/ ./src/
COPY public/ ./public/
COPY tailwind.config.ts postcss.config.mjs ./

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Mount the secret file directly as .env so Next.js reads it
# Because the mount only lasts for this RUN command, .env will NOT be saved in the image layers.
RUN --mount=type=secret,id=build_env,target=/usr/src/app/.env \
    bun run build

# Production stage
FROM oven/bun:1.3.14-slim AS production
WORKDIR /usr/src/app

ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}

# Copy production runtime dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production --ignore-scripts

# Copy built app from builder stage
COPY --from=builder /usr/src/app/scripts ./scripts
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/next.config.mjs ./
COPY --from=builder /usr/src/app/tailwind.config.ts ./
COPY --from=builder /usr/src/app/postcss.config.mjs ./
COPY --from=builder /usr/src/app/src/content ./src/content

RUN mkdir -p /usr/src/app/.next/cache/images \
    && chown -R bun:bun /usr/src/app/.next

# Expose port and run
EXPOSE 3000
USER bun
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENTRYPOINT ["bun", "run", "start"]