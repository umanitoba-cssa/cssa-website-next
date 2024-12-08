FROM oven/bun

# Copy the lock and package file
COPY bun.lockb .
COPY package.json .

# Install dependencies
RUN bun install --frozen-lockfile

# Copy your source code
# If only files in the src folder changed, this is the only step that gets executed!
#COPY src ./src
#COPY public ./public


COPY ./ ./

ENV NODE_ENV=production
ARG CANTEEN_SHEEET_ID=${CANTEEN_SHEEET_ID}
ENV CANTEEN_SHEEET_ID=${CANTEEN_SHEEET_ID}
ARG GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ARG GOOGLE_PRIVATE_KEY=${GOOGLE_PRIVATE_KEY}
ENV GOOGLE_PRIVATE_KEY=${GOOGLE_PRIVATE_KEY}
ARG YOUTUBE_API_KEY=${YOUTUBE_API_KEY}
ENV YOUTUBE_API_KEY=${YOUTUBE_API_KEY}
ARG GOOGLE_SERVICE_ACCOUNT_EMAIL=${GOOGLE_SERVICE_ACCOUNT_EMAIL}
ENV GOOGLE_SERVICE_ACCOUNT_EMAIL=${GOOGLE_SERVICE_ACCOUNT_EMAIL}

RUN bun run build

#COPY index.ts build/index.ts


CMD ["bun", "run", "start"]
#CMD ["python", "-m", "http.server", "8000"]
