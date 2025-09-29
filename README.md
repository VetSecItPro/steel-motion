# Steel Motion LLC - Complete Digital Platform

![Steel Motion Logo](./public/images/steel-motion-hero-logo.png)

## 🚀 Overview

Steel Motion LLC is a veteran-led technology consulting company specializing in AI transformation, cloud infrastructure, cybersecurity, and custom application development. This comprehensive digital platform features a modern landing page, interactive blog with content management system, and partnership portal, all designed to showcase our technology expertise and thought leadership.

## 🎯 Purpose

This comprehensive website serves as the primary digital presence for Steel Motion LLC, designed to:

- **Showcase Services**: Interactive accordion and dedicated service pages for each technology solution
- **Share Expertise**: Professional blog with CMS integration showcasing thought leadership
- **Generate Leads**: Streamlined contact form and partnership inquiry system
- **Build Trust**: Veteran-owned business credentials, case studies, and technical insights
- **Convert Visitors**: Optimized user journey from landing to services to blog to contact
- **Content Management**: Full-featured blog with categories, author profiles, and content optimization

## ✨ Key Features

### 🎨 **Modern Design**
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Hover effects, smooth animations, and engaging transitions
- **Professional Branding**: Consistent color scheme with Steel Motion's signature blue-to-cyan gradient
- **Optimized Performance**: Fast loading times with optimized images and code

### 🔧 **Interactive Components**
- **Hero Section**: Integrated mission statement with prominent logo display
- **Technology Accordion**: Interactive showcase of 5 core service areas with clickable navigation
- **Service Pages**: Dedicated pages for each service with comprehensive details and back navigation
- **Blog Platform**: Full-featured blog with content management, categories, and author profiles
- **Partnership Portal**: Dedicated partnership inquiry system with custom form handling
- **Navigation System**: Comprehensive menu with smooth scrolling and intuitive navigation
- **Contact Forms**: Professional contact and partnership interfaces with form validation

### 🎯 **User Experience**
- **Clear Navigation**: Intuitive menu with smooth scroll-to-section functionality
- **Conversion Optimized**: Strategic placement of CTAs and free consultation messaging
- **Accessibility**: Screen reader friendly with proper semantic HTML
- **SEO Optimized**: Meta tags, proper heading structure, and semantic markup

## 🛠️ Tech Stack

### **Frontend Framework**
- **[Next.js 15.5.3](https://nextjs.org/)** - React framework with App Router and Server Components
- **[React 19.1.0](https://reactjs.org/)** - Component-based UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript development

### **Content Management**
- **[Sanity CMS](https://www.sanity.io/)** - Headless CMS for blog content management
- **[Portable Text](https://www.portabletext.org/)** - Rich text rendering with custom components
- **[GROQ](https://www.sanity.io/docs/groq)** - Content queries and data fetching

### **Styling & UI**
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit

### **Backend & API**
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless API endpoints
- **[Resend](https://resend.com/)** - Email delivery service for contact forms
- **[React Email](https://react.email/)** - Email template system

### **Development Tools**
- **[ESLint](https://eslint.org/)** - Code linting and quality assurance
- **[PostCSS](https://postcss.org/)** - CSS processing and optimization
- **[Turbopack](https://turbo.build/pack)** - Fast development build tool

## 🏗️ Project Structure

```
steel-motion-landing/
├── public/
│   ├── images/
│   │   └── steel-motion-hero-logo.png    # Main company logo
│   └── ...                               # Static assets
├── src/
│   ├── app/
│   │   ├── api/                          # API endpoints
│   │   │   ├── contact/                  # Contact form handler
│   │   │   ├── partnerships/             # Partnership form handler
│   │   │   └── revalidation-status/      # Content monitoring endpoint
│   │   ├── blog/                         # Blog section
│   │   │   ├── [slug]/                   # Dynamic blog post pages
│   │   │   └── page.tsx                  # Blog listing page
│   │   ├── services/                     # Service pages directory
│   │   │   ├── ai-transformation/
│   │   │   ├── cloud-infrastructure/
│   │   │   ├── cybersecurity/
│   │   │   ├── custom-development/
│   │   │   └── data-analytics/
│   │   ├── partnerships/
│   │   │   └── page.tsx                  # Partnership portal
│   │   ├── about/
│   │   │   └── page.tsx                  # About page
│   │   ├── studio/                       # Sanity Studio integration
│   │   ├── globals.css                   # Global styles and Tailwind config
│   │   ├── layout.tsx                    # Root layout component
│   │   ├── page.tsx                      # Home page component
│   │   └── favicon.ico
│   ├── components/
│   │   ├── blog/                         # Blog-specific components
│   │   │   ├── blog-hero.tsx             # Blog section hero
│   │   │   ├── blog-post-content.tsx     # Individual post display
│   │   │   ├── blog-post-grid.tsx        # Post listing grid
│   │   │   ├── featured-posts.tsx        # Featured content showcase
│   │   │   └── blog-sidebar.tsx          # Blog navigation sidebar
│   │   ├── navigation/
│   │   │   └── navbar.tsx                # Main navigation system
│   │   ├── sections/
│   │   │   ├── hero.tsx                  # Hero section with mission
│   │   │   ├── services.tsx              # Interactive service showcase
│   │   │   ├── service-page.tsx          # Reusable service template
│   │   │   ├── why-steel-motion.tsx      # Value proposition section
│   │   │   ├── contact.tsx               # Contact forms
│   │   │   └── footer.tsx                # Footer with company info
│   │   └── ui/                           # Reusable UI components
│   │       ├── interactive-image-accordion.tsx
│   │       ├── button.tsx, card.tsx, input.tsx, etc.
│   └── lib/
│       ├── sanity.ts                     # Sanity CMS configuration
│       ├── sanity-queries.ts             # Content queries
│       ├── content-monitor.ts            # Smart content monitoring
│       ├── revalidation-manager.ts       # Adaptive revalidation system
│       └── utils.ts                      # Utility functions
├── components.json                       # shadcn/ui configuration
├── next.config.ts                        # Next.js configuration
├── tailwind.config.js                   # Tailwind CSS configuration
├── tsconfig.json                         # TypeScript configuration
└── package.json                         # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** (LTS recommended)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VetSecItPro/steel-motion.git
   cd steel-motion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎨 Design System

### **Color Palette**
- **Primary**: Deep navy blues (`#0a1728`, `#0f2640`, `#1a3a5c`)
- **Accent**: Cyan gradient (`#00F2FF` to `#33CCFF`)
- **Text**: White, light gray (`#B3B3B3`), and dark variants
- **Background**: Gradient overlays and transparent elements

### **Typography**
- **Primary Font**: Geist Sans (from Next.js)
- **Monospace**: Geist Mono
- **Headings**: Bold weights with gradient text effects
- **Body**: Regular weight with optimized line heights

### **Components**
- **Consistent Spacing**: Tailwind's spacing scale
- **Rounded Corners**: Various border radius values
- **Shadows**: Layered shadow effects with cyan accents
- **Animations**: Smooth transitions and hover effects

## 🌟 Service Areas

### **AI Transformation & Automation**
- Process Automation & Workflow Optimization
- Intelligent Document Processing
- Predictive Analytics & Decision Support

### **Cloud Infrastructure Solutions**
- Scalable Cloud Architecture Design
- Infrastructure as Code (IaC)
- DevOps & CI/CD Pipeline Implementation

### **Cybersecurity & Protection**
- Security Assessments & Penetration Testing
- Compliance & Risk Management
- Incident Response & Recovery Planning

### **Custom Application Development**
- Full-Stack Web & Mobile Applications
- API Development & Integration
- Legacy System Modernization

### **Data Analytics & Intelligence**
- Business Intelligence Dashboards
- Machine Learning Model Development
- Real-time Data Processing & Visualization

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile (320px+)**: Single column layout, stacked navigation
- **Tablet (768px+)**: Two-column layouts, expanded navigation
- **Desktop (1024px+)**: Full layout with sidebar navigation
- **Large Desktop (1536px+)**: Optimized spacing and typography

## 🔧 Development

### **Component Architecture**
- **Atomic Design**: Reusable UI components
- **Server Components**: Optimized for performance
- **Client Components**: Interactive elements with state
- **TypeScript**: Full type safety throughout

### **Performance Optimizations**
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **CSS Optimization**: Tailwind CSS purging and optimization
- **Bundle Analysis**: Turbopack for fast development builds

## 🚀 Deployment

### **Production VPS (Current)**
- Deployed on custom VPS with PM2 process management
- Automated CI/CD via GitHub Actions
- SSL certificates and domain configuration
- Production URL: [https://steelmotionllc.com](https://steelmotionllc.com)

### **Development/Staging**
```bash
npm install -g vercel
vercel
```

### **Manual Build**
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary to Steel Motion LLC. All rights reserved.

## 📞 Contact

**Steel Motion LLC**
📧 Email: contact@steelmotionllc.com
🌐 Website: [https://steelmotionllc.com](https://steelmotionllc.com)
📱 Service Area: Nationwide Remote (Responsive on Zoom as needed)

---

## 🔒 Security & Performance

- **Environment Variables**: All API keys secured using GitHub Secrets
- **Content Delivery**: Optimized image delivery via Sanity CDN
- **Smart Caching**: Adaptive content revalidation for optimal performance
- **SSL Security**: Production deployment with SSL certificates

## 🎖️ Veteran-Owned Business

Steel Motion LLC is proudly veteran-owned and operated, bringing military precision and commitment to excellence to every project.

**Ready to Transform Your Business?**
[Get Started Today](https://steelmotionllc.com/#contact)

---

*Built with ❤️ by the Steel Motion team*