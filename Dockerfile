# Official image with Chromium/Firefox/WebKit + deps preinstalled
FROM mcr.microsoft.com/playwright:v1.56.0-jammy

# Use root while preparing the image (create folders, install deps)
WORKDIR /app

# Create result dirs with open perms (copied into named volumes on first run)
RUN mkdir -p /app/allure-results /app/playwright-report \
 && chmod -R 777 /app/allure-results /app/playwright-report

# Install deps first for layer caching; copy package manifest as root and install
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy rest of the project and ensure files owned by pwuser for Playwright runtime
COPY . .
RUN chown -R pwuser:pwuser /app || true

# Switch to the dedicated non-root user provided by the Playwright image
USER pwuser

# CI-friendly
ENV CI=true

# Default test command (overridden in docker-compose if needed)
CMD ["npx", "playwright", "test"]
