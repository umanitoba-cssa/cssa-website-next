FROM oven/bun

# Copy the lock and package file
COPY bun.lockb .
COPY package.json .

# Install dependencies
RUN bun install

# Copy your source code
# If only files in the src folder changed, this is the only step that gets executed!
#COPY src ./src
#COPY public ./public

COPY ./ ./

RUN bun run build

#COPY index.ts build/index.ts


CMD ["bun", "run", "start"]
#CMD ["python", "-m", "http.server", "8000"]
