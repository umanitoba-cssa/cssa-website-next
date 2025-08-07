# Build stage
FROM oven/bun:1 AS builder
WORKDIR /usr/src/app

# Define build arguments
ARG YOUTUBE_API_KEY
ARG SMTP_USERNAME
ARG SMTP_PASSWORD
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_SERVICE_ACCOUNT_EMAIL
ARG GOOGLE_PRIVATE_KEY
ARG CANTEEN_SHEEET_ID

# Set environment variables from build args
ENV YOUTUBE_API_KEY=${YOUTUBE_API_KEY}
ENV SMTP_USERNAME=${SMTP_USERNAME}
ENV SMTP_PASSWORD=${SMTP_PASSWORD}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_SERVICE_ACCOUNT_EMAIL=${GOOGLE_SERVICE_ACCOUNT_EMAIL}
ENV GOOGLE_PRIVATE_KEY=${GOOGLE_PRIVATE_KEY}
ENV CANTEEN_SHEEET_ID=${CANTEEN_SHEEET_ID}

# Copy only package files first to leverage caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy only necessary files for build
COPY tsconfig.json next.config.mjs ./
COPY scripts ./scripts/
COPY src/ ./src/
COPY public/ ./public/

# Set environment to production and build
ENV NODE_ENV=production
RUN YOUTUBE_API_KEY="${YOUTUBE_API_KEY}" \
    SMTP_USERNAME="${SMTP_USERNAME}" \
    SMTP_PASSWORD="${SMTP_PASSWORD}" \
    GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID}" \
    GOOGLE_SERVICE_ACCOUNT_EMAIL="${GOOGLE_SERVICE_ACCOUNT_EMAIL}" \
    GOOGLE_PRIVATE_KEY="${GOOGLE_PRIVATE_KEY}" \
    CANTEEN_SHEEET_ID="${CANTEEN_SHEEET_ID}" \
    bun run sync-guides && \
    YOUTUBE_API_KEY="${YOUTUBE_API_KEY}" \
    SMTP_USERNAME="${SMTP_USERNAME}" \
    SMTP_PASSWORD="${SMTP_PASSWORD}" \
    GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID}" \
    GOOGLE_SERVICE_ACCOUNT_EMAIL="${GOOGLE_SERVICE_ACCOUNT_EMAIL}" \
    GOOGLE_PRIVATE_KEY="${GOOGLE_PRIVATE_KEY}" \
    CANTEEN_SHEEET_ID="${CANTEEN_SHEEET_ID}" \
    bun run build

# Production stage
FROM oven/bun:1-slim AS production
WORKDIR /usr/src/app

# Define runtime arguments (these need to be passed when running the container)
ARG YOUTUBE_API_KEY
ARG SMTP_USERNAME
ARG SMTP_PASSWORD
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_SERVICE_ACCOUNT_EMAIL
ARG GOOGLE_PRIVATE_KEY
ARG CANTEEN_SHEEET_ID

# Set environment variables for runtime
ENV YOUTUBE_API_KEY=${YOUTUBE_API_KEY}
ENV SMTP_USERNAME=${SMTP_USERNAME}
ENV SMTP_PASSWORD=${SMTP_PASSWORD}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_SERVICE_ACCOUNT_EMAIL=${GOOGLE_SERVICE_ACCOUNT_EMAIL}
ENV GOOGLE_PRIVATE_KEY=${GOOGLE_PRIVATE_KEY}
ENV CANTEEN_SHEEET_ID=${CANTEEN_SHEEET_ID}

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