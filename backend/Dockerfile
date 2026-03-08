FROM oven/bun:latest

WORKDIR /app

# Copy package and lock files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Ensure start.sh is executable
RUN chmod +x start.sh

# Expose the API port
EXPOSE 3001

# Use startup script
CMD ["./start.sh"]
