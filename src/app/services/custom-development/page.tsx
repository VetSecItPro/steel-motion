import type { Metadata } from "next"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import ServicePage from "@/components/sections/service-page"
import ServiceSchema from "@/components/structured-data/service"

export const metadata: Metadata = {
  title: "Custom Application Development | Steel Motion LLC - Veteran-Led Technology Solutions",
  description: "Build tailored software solutions that fit your exact business needs. Steel Motion delivers custom web applications, mobile apps, and system integrations with veteran precision.",
  keywords: ["custom development", "web applications", "mobile apps", "software development", "system integration", "veteran-owned business"],
  openGraph: {
    title: "Custom Application Development | Steel Motion LLC",
    description: "Build tailored software solutions that fit your exact business needs.",
    url: "https://steelmotionllc.com/services/custom-development",
    siteName: "Steel Motion LLC",
    images: [
      {
        url: "/images/steel-motion-og-development.jpg",
        width: 1200,
        height: 630,
        alt: "Steel Motion LLC - Custom Application Development"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Application Development | Steel Motion LLC",
    description: "Build tailored software solutions that fit your exact business needs.",
    images: ["/images/steel-motion-og-development.jpg"],
  }
}

export default function CustomDevelopmentPage() {
  const serviceData = {
    title: "Custom Application Development",
    subtitle: "Tailored software solutions for your unique requirements",
    description: "Transform your business processes with custom-built applications designed specifically for your workflows, requirements, and operational needs.",
    heroGradient: "from-blue-600 via-blue-500 to-cyan-400",
    features: [
      {
        title: "Web Application Development",
        description: "Responsive, scalable web applications built with modern frameworks and optimized for performance across all devices.",
        icon: "💻"
      },
      {
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
        icon: "📱"
      },
      {
        title: "API Development & Integration",
        description: "Robust APIs and seamless integrations that connect your systems and enable data flow across platforms.",
        icon: "🔗"
      },
      {
        title: "Database Design & Optimization",
        description: "Efficient database architectures that ensure fast query performance and reliable data management.",
        icon: "🗄️"
      },
      {
        title: "Legacy System Modernization",
        description: "Modernize outdated systems while preserving critical business logic and ensuring smooth transitions.",
        icon: "🔄"
      },
      {
        title: "Quality Assurance & Testing",
        description: "Comprehensive testing protocols to ensure your applications are reliable, secure, and perform flawlessly.",
        icon: "✅"
      }
    ],
    benefits: [
      "Streamline operations with applications built for your workflows",
      "Improve productivity through intuitive, user-friendly interfaces",
      "Scale effortlessly with applications designed for growth",
      "Integrate seamlessly with existing systems and tools",
      "Reduce operational costs through automation and efficiency",
      "Gain competitive advantage with unique software capabilities"
    ],
    industries: [
      "Healthcare & Medical Practice Management",
      "Financial Services & Fintech",
      "Manufacturing & Supply Chain",
      "Government & Public Sector",
      "Education & Training Platforms",
      "Professional Services & Consulting"
    ],
    ctaText: "Build Your Custom Solution",
    ctaDescription: "Ready to create software that works exactly how your business operates? Let's discuss your requirements and design a custom solution that drives results."
  }

  const serviceSchema = {
    name: "Custom Application Development",
    description: "Build tailored software solutions that fit your exact business needs. Steel Motion delivers custom web applications, mobile apps, and system integrations with veteran precision.",
    url: "https://www.steelmotionllc.com/services/custom-development"
  }

  return (
    <main className="min-h-screen">
      <ServiceSchema service={serviceSchema} />
      <Navbar />
      <ServicePage {...serviceData} />
      <Footer />
    </main>
  )
}