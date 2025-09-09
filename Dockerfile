# syntax=docker/dockerfile:1
FROM node:23-alpine AS base

# Enable corepack for pnpm
RUN corepack enable

WORKDIR /usr/src/app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies (including dev deps for build)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Remove dev dependencies for production
RUN pnpm prune --prod

EXPOSE 3000

CMD ["node", "dist/app.js"]
