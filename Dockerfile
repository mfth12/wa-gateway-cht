# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Production stage
FROM node:22-alpine

# Set Timezone to WIB (Asia/Jakarta)
RUN apk add --no-cache tzdata
ENV TZ=Asia/Jakarta

# Add labels
LABEL maintainer="Miftahul Haq <ciftah12@gmail.com>"
LABEL description="Whatsapp Gateway Cht - Multi-session WhatsApp API with Baileys"
LABEL version="1.4.0"

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application files
COPY . .

# Create directories for sessions and media with proper permissions
RUN mkdir -p /app/sessions /app/public/media /app/store

# Expose port
EXPOSE 3033

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3033/ || exit 1

# Start the application
CMD ["node", "index.js"]
