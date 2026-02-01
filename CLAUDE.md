# Steel Motion LLC - Development & Deployment Guide

![Steel Motion Logo](./public/images/steel-motion-hero-logo.svg)

## 🚀 Deployment Overview

This document provides comprehensive guidance for developing and deploying the Steel Motion LLC website.

## 🎯 Current Deployment Status

### **Production Environment**
- **Platform**: Vercel
- **Domain**: steelmotionllc.com
- **URL**: https://steelmotionllc.com
- **SSL**: Automatic via Vercel
- **Status**: ✅ **LIVE** - Auto-deploys from `main` branch

### **Preview/Staging**
- **URL**: steel-motion-landing.vercel.app
- **Auto-deployment**: Every PR gets a preview URL

### **Content Management System**
- **Platform**: Sanity CMS (Headless)
- **Studio**: Integrated at `/studio` route
- **Blog**: Fully functional with smart content monitoring
- **Images**: Optimized delivery via Sanity CDN
- **Revalidation**: Adaptive system (60s-4h intervals based on activity)

## 🔄 Git Workflow (IMPORTANT)

### **NEVER push directly to main. Always use feature branches.**

### **Step-by-Step Process**
```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Make changes and commit
git add -A
git commit -m "Your commit message"

# 3. Push branch to GitHub
git push origin feature/your-feature-name

# 4. CI runs automatically - wait for all checks to pass

# 5. Create PR (or let auto-PR create it)
gh pr create --title "Your PR title" --body "Description"

# 6. After review, merge PR
gh pr merge --squash

# 7. Return to main and pull latest
git checkout main
git pull origin main
```

### **Branch Naming Convention**
- `feature/` - New features (e.g., `feature/add-portfolio-page`)
- `fix/` - Bug fixes (e.g., `fix/navbar-link`)
- `chore/` - Maintenance (e.g., `chore/update-dependencies`)
- `docs/` - Documentation (e.g., `docs/update-readme`)

## 🔄 CI/CD Pipeline

### **Workflow Overview**
```
Feature Branch → CI Validation → Auto PR → Review → Merge → Vercel Deploy
```

### **CI Checks (`.github/workflows/ci.yml`)**
All checks run on EVERY push to ANY branch:
1. **Code Quality**: ESLint, TypeScript type checking
2. **Security**: pnpm audit, secrets scanning
3. **Unit Tests**: Vitest
4. **E2E Tests**: Playwright
5. **Build Verification**: Next.js production build

### **Automated PR Creation**
When you push to any feature branch, the CI will:
1. Run all validation checks
2. If all pass, automatically create a PR to `main`
3. Add CI status labels

### **Deployment Flow**
1. **Push to feature branch** → CI runs all checks
2. **CI passes** → Auto-creates PR (or you create manually)
3. **Review PR** → Check Vercel preview deployment
4. **Merge to main** → Vercel auto-deploys to production

## 📦 Available Scripts

```bash
# Development
pnpm dev             # Start dev server with Turbopack

# Testing
pnpm test            # Run Vitest in watch mode
pnpm test:run        # Run tests once
pnpm test:coverage   # Run with coverage report
pnpm test:e2e        # Run Playwright E2E tests
pnpm test:e2e:ui     # Run E2E with UI
pnpm test:e2e:headed # Run E2E with browser visible

# Quality
pnpm lint            # Run ESLint
pnpm typecheck       # TypeScript type check
pnpm validate        # Run all validation (lint, typecheck, test, build)

# Build
pnpm build           # Production build
pnpm start           # Start production server

# Security
pnpm audit           # Security audit
pnpm lighthouse      # Run Lighthouse audits
```

## ✨ Features

### **Core Features**
- ✅ Landing Page with interactive service accordion
- ✅ Blog Platform with Sanity CMS
- ✅ Partnership Portal
- ✅ Contact Forms with Zod validation
- ✅ Service Pages (AI, Custom Dev, Cloud, Cyber, Data)
- ✅ GDPR-compliant Privacy Policy

### **Technical Stack**
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Forms**: Zod validation + react-hook-form
- **CMS**: Sanity (headless)
- **Email**: Resend
- **Testing**: Vitest + Playwright + Lighthouse CI

### **Security Features**
- ✅ Input validation (client + server)
- ✅ XSS prevention
- ✅ CSRF protection
- ✅ Security headers
- ✅ Dependency vulnerability scanning
- ✅ E2E security tests

## 🔒 Environment Variables

Required environment variables (set in Vercel dashboard):

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Email Service
RESEND_API_KEY=re_your_key
```

## 🧪 Testing

### **Unit Tests** (`src/**/*.test.ts`)
- Validation schemas
- Utility functions
- Component logic

### **E2E Tests** (`e2e/*.spec.ts`)
- Navigation flows
- Contact form validation
- Security (XSS, CSRF, injection)
- Accessibility compliance

### **Lighthouse CI**
- Performance (target: 80+)
- Accessibility (target: 90+)
- Best Practices (target: 85+)
- SEO (target: 90+)

## 🚨 Troubleshooting

### **Build Failures**
```bash
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### **E2E Test Failures**
```bash
pnpm exec playwright install --with-deps
pnpm test:e2e:headed  # Run with browser visible
```

### **Type Errors**
```bash
pnpm typecheck
```

## 📞 Support

For deployment assistance or issues, contact the Steel Motion team.

---

*Built with precision by the Steel Motion team*
