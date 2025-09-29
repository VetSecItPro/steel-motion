# Steel Motion LLC - Landing Page

![Steel Motion Logo](./public/images/steel-motion-hero-logo.png)

## 🚀 Overview

Steel Motion LLC is a veteran-led technology consulting company specializing in AI transformation, cloud infrastructure, cybersecurity, and custom application development. This modern, responsive landing page showcases our comprehensive technology solutions with an interactive and engaging user experience.

## 🎯 Purpose

This comprehensive website serves as the primary digital presence for Steel Motion LLC, designed to:

- **Showcase Services**: Interactive accordion and dedicated service pages for each technology solution
- **Generate Leads**: Streamlined contact form with clear call-to-action flow across all pages
- **Build Trust**: Veteran-owned business credentials and mission-focused messaging
- **Convert Visitors**: Optimized user journey from home page to detailed service pages to contact form
- **Professional Presentation**: Dedicated subpages for each service offering with detailed capabilities

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
- **Navigation System**: Dropdown menus linking to service pages and smooth scrolling for home page sections
- **Contact Form**: Professional contact interface with form validation accessible from all pages

### 🎯 **User Experience**
- **Clear Navigation**: Intuitive menu with smooth scroll-to-section functionality
- **Conversion Optimized**: Strategic placement of CTAs and free consultation messaging
- **Accessibility**: Screen reader friendly with proper semantic HTML
- **SEO Optimized**: Meta tags, proper heading structure, and semantic markup

## 🛠️ Tech Stack

### **Frontend Framework**
- **[Next.js 15.5.3](https://nextjs.org/)** - React framework for production
- **[React 19.1.0](https://reactjs.org/)** - Component-based UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### **Styling & UI**
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit

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
│   │   ├── services/                     # Service pages directory
│   │   │   ├── ai-transformation/
│   │   │   │   └── page.tsx              # AI Transformation service page
│   │   │   ├── cloud-infrastructure/
│   │   │   │   └── page.tsx              # Cloud Infrastructure service page
│   │   │   ├── cybersecurity/
│   │   │   │   └── page.tsx              # Cybersecurity service page
│   │   │   ├── custom-development/
│   │   │   │   └── page.tsx              # Custom Development service page
│   │   │   └── data-analytics/
│   │   │       └── page.tsx              # Data Analytics service page
│   │   ├── about/
│   │   │   └── page.tsx                  # About page (future expansion)
│   │   ├── globals.css                   # Global styles and Tailwind config
│   │   ├── layout.tsx                    # Root layout component
│   │   ├── page.tsx                      # Home page component
│   │   └── favicon.ico
│   ├── components/
│   │   ├── navigation/
│   │   │   └── navbar.tsx                # Main navigation with service links
│   │   ├── sections/
│   │   │   ├── hero.tsx                  # Hero section with integrated mission
│   │   │   ├── services.tsx              # Interactive technology solutions
│   │   │   ├── service-page.tsx          # Reusable service page template
│   │   │   ├── why-steel-motion.tsx      # Value proposition section
│   │   │   ├── contact.tsx               # Contact form and information
│   │   │   └── footer.tsx                # Footer with company info
│   │   └── ui/
│   │       ├── interactive-image-accordion.tsx  # Clickable service accordion
│   │       ├── button.tsx                # Reusable button component
│   │       ├── card.tsx                  # Card component variants
│   │       ├── input.tsx                 # Form input components
│   │       ├── textarea.tsx              # Textarea component
│   │       └── badge.tsx                 # Badge component
│   └── lib/
│       └── utils.ts                      # Utility functions
├── components.json                       # shadcn/ui configuration
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

### **Vercel (Recommended)**
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
📧 Email: contact@steelmotion.com
📱 Phone: Available upon request
🌐 Service Area: Nationwide Remote (Responsive on Zoom as needed)

---

## 🎖️ Veteran-Owned Business

Steel Motion LLC is proudly veteran-owned and operated, bringing military precision and commitment to excellence to every project.

**Ready to Transform Your Business?**
[Get Started Today](https://steel-motion-landing.vercel.app/#contact)

---

*Built with ❤️ by the Steel Motion team*