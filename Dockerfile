# Build stage
FROM oven/bun:1.4.0 AS builder
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

# Mount individual secrets and load them during build.
# BuildKit mounts each secret as a file under /run/secrets/<id>.
RUN --mount=type=secret,id=YOUTUBE_API_KEY \
    --mount=type=secret,id=SMTP_USERNAME \
    --mount=type=secret,id=SMTP_PASSWORD \
    --mount=type=secret,id=GOOGLE_CLIENT_ID \
    --mount=type=secret,id=GOOGLE_SERVICE_ACCOUNT_EMAIL \
    --mount=type=secret,id=GOOGLE_PRIVATE_KEY \
    --mount=type=secret,id=CANTEEN_SHEEET_ID \
    --mount=type=secret,id=GITHUB_APP_ID \
    --mount=type=secret,id=GITHUB_PRIVATE_KEY \
    --mount=type=secret,id=GOOGLE_CALENDAR_ID \
    --mount=type=secret,id=RECAPTCHA_SECRET_KEY \
    export YOUTUBE_API_KEY="$(cat /run/secrets/YOUTUBE_API_KEY)" && \
    export SMTP_USERNAME="$(cat /run/secrets/SMTP_USERNAME)" && \
    export SMTP_PASSWORD="$(cat /run/secrets/SMTP_PASSWORD)" && \
    export GOOGLE_CLIENT_ID="$(cat /run/secrets/GOOGLE_CLIENT_ID)" && \
    export GOOGLE_SERVICE_ACCOUNT_EMAIL="$(cat /run/secrets/GOOGLE_SERVICE_ACCOUNT_EMAIL)" && \
    export GOOGLE_PRIVATE_KEY="$(cat /run/secrets/GOOGLE_PRIVATE_KEY)" && \
    export CANTEEN_SHEEET_ID="$(cat /run/secrets/CANTEEN_SHEEET_ID)" && \
    export GITHUB_APP_ID="$(cat /run/secrets/GITHUB_APP_ID)" && \
    export GITHUB_PRIVATE_KEY="$(cat /run/secrets/GITHUB_PRIVATE_KEY)" && \
    export GOOGLE_CALENDAR_ID="$(cat /run/secrets/GOOGLE_CALENDAR_ID)" && \
    export RECAPTCHA_SECRET_KEY="$(cat /run/secrets/RECAPTCHA_SECRET_KEY)" && \
    bun run build

# Production stage
FROM oven/bun:1.4.0-slim AS production
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