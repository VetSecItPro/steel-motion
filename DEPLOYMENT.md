# Steel Motion LLC - Deployment Guide

## Overview

This project uses a hybrid deployment strategy:
- **Development/Staging**: Vercel (automatic deployments)
- **Production**: VPS with GitHub Actions CI/CD

## Deployment Environments

### 1. Development (Vercel)
- **URL**: https://steel-motion-landing-[hash]-REDACTED.vercel.app
- **Trigger**: Every push to any branch
- **Use Case**: Development, testing, preview deployments

### 2. Production (VPS)
- **URL**: https://steelmotionllc.com
- **Trigger**: Push to `main` branch or manual workflow dispatch
- **Use Case**: Live production website

## GitHub Actions Setup

### Required Secrets

Add these secrets in GitHub repository settings (Settings → Secrets and variables → Actions):

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `VPS_HOST` | VPS IP address | `REDACTED` |
| `VPS_USERNAME` | SSH username | `root` |
| `VPS_SSH_KEY` | Private SSH key | `-----BEGIN OPENSSH PRIVATE KEY-----...` |

### SSH Key Setup

1. **Generate SSH key pair** (if not already done):
   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/REDACTED -C "github-actions-deploy"
   ```

2. **Add public key to VPS**:
   ```bash
   ssh-copy-id -i ~/.ssh/REDACTED.pub root@REDACTED
   ```

3. **Add private key to GitHub Secrets**:
   - Copy the content of `~/.ssh/REDACTED`
   - Add as `VPS_SSH_KEY` secret in GitHub

## Deployment Process

### Automatic Deployment
- Push to `main` branch triggers automatic deployment
- GitHub Actions will:
  1. Checkout code
  2. Install dependencies
  3. Run tests (if any)
  4. Build application
  5. Deploy to VPS via SSH
  6. Restart PM2 process
  7. Run health checks

### Manual Deployment
- Go to GitHub → Actions → "Deploy to Production VPS"
- Click "Run workflow" → Select branch → "Run workflow"

## VPS Directory Structure

```
/root/
├── steel-motion/                 # Main project directory
│   ├── .git/                    # Git repository
│   ├── .next/                   # Built application
│   ├── node_modules/            # Dependencies
│   └── package.json             # Project configuration
├── backups/                     # Automatic backups
│   ├── steel-motion-20241201-120000/
│   └── steel-motion-20241201-140000/
└── /var/log/steel-motion-deploy.log  # Deployment logs
```

## Process Management (PM2)

### Common PM2 Commands
```bash
# Check process status
pm2 list

# View logs
pm2 logs steel-motion

# Restart application
pm2 restart steel-motion

# Stop application
pm2 stop steel-motion

# Delete process
pm2 delete steel-motion

# Save PM2 configuration
pm2 save
```

## Multi-Domain Support

This VPS is configured to support multiple domains:

### Current Setup
- **steelmotionllc.com**: Port 3000 (Steel Motion website)

### Adding New Domains
1. **Create new project directory**:
   ```bash
   mkdir /root/new-project
   cd /root/new-project
   git clone https://github.com/username/new-project.git .
   ```

2. **Configure PM2 for new project**:
   ```bash
   pm2 start npm --name "new-project" -- start
   pm2 save
   ```

3. **Update Nginx configuration** (if using reverse proxy):
   ```nginx
   server {
       server_name newdomain.com;
       location / {
           proxy_pass http://localhost:3001;
       }
   }
   ```

4. **Create separate GitHub Actions workflow** for the new project

## Troubleshooting

### Deployment Fails
1. Check GitHub Actions logs
2. SSH into VPS and check:
   ```bash
   cd /root/steel-motion
   pm2 logs steel-motion
   tail -f /var/log/steel-motion-deploy.log
   ```

### Site Not Responding
1. Check PM2 status: `pm2 list`
2. Check application logs: `pm2 logs steel-motion`
3. Restart if needed: `pm2 restart steel-motion`

### Rollback Procedure
1. **Find latest backup**:
   ```bash
   ls -la /root/backups/
   ```

2. **Restore backup**:
   ```bash
   cd /root
   rm -rf steel-motion
   cp -r backups/steel-motion-YYYYMMDD-HHMMSS steel-motion
   cd steel-motion
   pm2 restart steel-motion
   ```

## Health Checks

The deployment includes automatic health checks:
- PM2 process status verification
- HTTP response check on port 3000
- Automatic backup before deployment
- Rollback capability if deployment fails

## Security Notes

- SSH keys are stored securely in GitHub Secrets
- VPS access is limited to specific IP ranges (if configured)
- Regular backups are maintained automatically
- All deployment activities are logged

## Environment Variables

Production environment variables should be set on the VPS:

```bash
# Create .env.local on VPS
nano /root/steel-motion/.env.local

# Add your production variables
RESEND_API_KEY=your_production_api_key
NODE_ENV=production
```

## Monitoring

- **Logs**: `/var/log/steel-motion-deploy.log`
- **PM2 Monitoring**: `pm2 monit`
- **System Resources**: `htop` or `pm2 monit`

## Support

For deployment issues:
1. Check this documentation
2. Review GitHub Actions logs
3. Check VPS logs and PM2 status
4. Contact system administrator if needed