# Dependencies stage, for improved caching
FROM oven/bun:1.4.2 AS deps
WORKDIR /usr/src/app

# Copy package files first to leverage caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

# Build stage
FROM oven/bun:1.4.2 AS builder
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Gets baked in at build time and so doesn't need to go into the production stage
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}

# Mount secrets and run the build
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
FROM oven/bun:1.4.2-slim AS production
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy minimal static assets and traced server bundle
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static

EXPOSE 3000

CMD ["server.js"]