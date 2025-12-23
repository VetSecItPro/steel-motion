# Steel Motion LLC - Development & Deployment Guide

![Steel Motion Logo](./public/images/steel-motion-hero-logo.png)

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

## 🔄 CI/CD Pipeline

### **Workflow Overview**
```
Feature Branch → CI Validation → Auto PR → Review → Merge → Vercel Deploy
```

### **CI Checks (`.github/workflows/ci.yml`)**
1. **Code Quality**: ESLint, TypeScript type checking
2. **Security**: npm audit, secrets scanning
3. **Unit Tests**: Vitest
4. **E2E Tests**: Playwright (Chrome, Firefox, Mobile)
5. **Performance**: Lighthouse CI audits
6. **Build Verification**: Next.js production build

### **Automated PR Creation**
When you push to any branch (except `main`), the CI will:
1. Run all validation checks
2. If all pass, automatically create a PR to `main`
3. Add CI status labels

### **Deployment Flow**
1. **Push to feature branch** → CI runs
2. **CI passes** → Auto-creates PR
3. **PR merged to main** → Vercel auto-deploys to production

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Testing
npm run test         # Run Vitest in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run with coverage report
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Run E2E with UI
npm run test:e2e:headed # Run E2E with browser visible

# Quality
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type check
npm run validate     # Run all validation (lint, typecheck, test, build)

# Build
npm run build        # Production build
npm run start        # Start production server

# Security
npm run audit        # Security audit
npm run lighthouse   # Run Lighthouse audits
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
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### **E2E Test Failures**
```bash
npx playwright install --with-deps
npm run test:e2e:headed  # Run with browser visible
```

### **Type Errors**
```bash
npm run typecheck
```

## 📞 Support

For deployment assistance or issues, contact the Steel Motion team.

---

*Built with precision by the Steel Motion team*
