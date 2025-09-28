#!/bin/bash

# Steel Motion Production Deployment Script
# This script runs on the VPS to deploy the application

set -e  # Exit on any error

# Configuration
PROJECT_DIR="/root/steel-motion"
BACKUP_DIR="/root/backups"
LOG_FILE="/var/log/steel-motion-deploy.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1" | tee -a "$LOG_FILE"
}

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

log "Starting Steel Motion deployment..."

# Create backup of current version
BACKUP_NAME="steel-motion-$(date +%Y%m%d-%H%M%S)"
log "Creating backup: $BACKUP_NAME"
cp -r "$PROJECT_DIR" "$BACKUP_DIR/$BACKUP_NAME" || {
    warn "Failed to create backup, continuing anyway..."
}

# Navigate to project directory
cd "$PROJECT_DIR" || {
    error "Failed to navigate to project directory: $PROJECT_DIR"
    exit 1
}

# Pull latest changes
log "Pulling latest changes from GitHub..."
git fetch origin
git reset --hard origin/main

# Install dependencies
log "Installing dependencies..."
npm ci --production --silent

# Build the application
log "Building application..."
npm run build

# Check if PM2 process exists and restart or start it
log "Managing PM2 process..."
if pm2 list | grep -q "steel-motion"; then
    log "Restarting existing PM2 process..."
    pm2 restart steel-motion
else
    log "Starting new PM2 process..."
    pm2 start npm --name "steel-motion" -- start
fi

# Wait for application to start
log "Waiting for application to start..."
sleep 10

# Health check
log "Running health checks..."
if pm2 list | grep -q "steel-motion.*online"; then
    log "✓ PM2 process is running"
else
    error "✗ PM2 process is not running"
    exit 1
fi

# Check if site is responding
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    log "✓ Site is responding on port 3000"
else
    error "✗ Site is not responding on port 3000"
    exit 1
fi

# Save PM2 configuration
pm2 save

log "🚀 Deployment completed successfully!"
log "Website is now live at: https://steelmotionllc.com"

# Clean up old backups (keep last 5)
log "Cleaning up old backups..."
cd "$BACKUP_DIR"
ls -t steel-motion-* | tail -n +6 | xargs rm -rf 2>/dev/null || true

log "Deployment script finished."