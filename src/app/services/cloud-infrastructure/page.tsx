import type { Metadata } from "next"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import ServicePage from "@/components/sections/service-page"
import ServiceSchema from "@/components/structured-data/service"

export const metadata: Metadata = {
  title: "Cloud Infrastructure Solutions | Steel Motion LLC - Veteran-Led Technology Solutions",
  description: "Modernize your IT infrastructure with scalable cloud solutions. Steel Motion delivers cloud migration, architecture design, and infrastructure management with veteran expertise.",
  keywords: ["cloud infrastructure", "cloud migration", "cloud architecture", "AWS", "Azure", "infrastructure management", "veteran-owned business"],
  openGraph: {
    title: "Cloud Infrastructure Solutions | Steel Motion LLC",
    description: "Modernize your IT infrastructure with scalable cloud solutions.",
    url: "https://steelmotionllc.com/services/cloud-infrastructure",
    siteName: "Steel Motion LLC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Infrastructure Solutions | Steel Motion LLC",
    description: "Modernize your IT infrastructure with scalable cloud solutions.",
  }
}

export default function CloudInfrastructurePage() {
  const serviceData = {
    title: "Cloud Infrastructure Solutions",
    subtitle: "Scalable, secure, and cost-effective cloud architecture",
    description: "Transform your IT infrastructure with enterprise-grade cloud solutions that scale with your business while reducing costs and improving reliability.",
    heroGradient: "from-slate-800 via-slate-700 to-slate-600",
    features: [
      {
        title: "Cloud Migration & Modernization",
        description: "Seamlessly migrate your applications and data to the cloud with minimal downtime and maximum efficiency.",
        icon: "☁️"
      },
      {
        title: "Infrastructure Architecture Design",
        description: "Design robust, scalable cloud architectures optimized for performance, security, and cost-effectiveness.",
        icon: "🏗️"
      },
      {
        title: "Multi-Cloud & Hybrid Solutions",
        description: "Implement flexible multi-cloud strategies that avoid vendor lock-in and optimize for specific workload requirements.",
        icon: "🌐"
      },
      {
        title: "DevOps & CI/CD Implementation",
        description: "Streamline development workflows with automated deployment pipelines and infrastructure as code practices.",
        icon: "🔄"
      },
      {
        title: "Cloud Security & Compliance",
        description: "Implement comprehensive security controls and compliance frameworks for your cloud infrastructure.",
        icon: "🔒"
      },
      {
        title: "Monitoring & Performance Optimization",
        description: "Continuous monitoring, alerting, and optimization to ensure peak performance and cost efficiency.",
        icon: "📊"
      }
    ],
    benefits: [
      "Reduce infrastructure costs by 30-60% through cloud optimization",
      "Scale resources automatically based on demand",
      "Improve system reliability and uptime to 99.9%+",
      "Accelerate deployment cycles with automated infrastructure",
      "Enhance security with enterprise-grade cloud controls",
      "Enable remote work with secure, accessible cloud systems"
    ],
    industries: [
      "Government & Defense Contracting",
      "Financial Services & Fintech",
      "Healthcare & Life Sciences",
      "Manufacturing & Logistics",
      "Technology & Software Companies",
      "Retail & E-commerce Platforms"
    ],
    ctaText: "Modernize Your Infrastructure",
    ctaDescription: "Ready to unlock the power of cloud computing? Let's design a cloud strategy that drives efficiency, scalability, and innovation for your organization."
  }

  const serviceSchema = {
    name: "Cloud Infrastructure Solutions",
    description: "Modernize your IT infrastructure with scalable cloud solutions. Steel Motion delivers cloud migration, architecture design, and infrastructure management with veteran expertise.",
    url: "https://www.steelmotionllc.com/services/cloud-infrastructure"
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