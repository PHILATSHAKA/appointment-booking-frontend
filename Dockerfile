# Development Dockerfile
# FROM node:22-alpine
# WORKDIR /app

# COPY package*.json ./
# RUN npm install --frozen-lockfile

# COPY . .

# EXPOSE 3000

# CMD ["npm", "run", "dev"]


# -------- Stage 1: Builder --------
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

# Build Next.js app
RUN npm run build

# -------- Stage 2: Runner --------
FROM node:22-alpine AS runner
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy only what’s needed to run the app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the port used by Next.js
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "run", "start"]
