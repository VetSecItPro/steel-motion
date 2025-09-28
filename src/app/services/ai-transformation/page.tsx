import type { Metadata } from "next"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import ServicePage from "@/components/sections/service-page"

export const metadata: Metadata = {
  title: "AI Transformation & Automation | Steel Motion LLC - Veteran-Led Technology Solutions",
  description: "Transform your business with intelligent automation and AI solutions. Steel Motion delivers process optimization, workflow automation, and intelligent document processing with military precision.",
  keywords: ["AI transformation", "process automation", "workflow optimization", "intelligent automation", "document processing", "veteran-owned business"],
  openGraph: {
    title: "AI Transformation & Automation | Steel Motion LLC",
    description: "Transform your business with intelligent automation and AI solutions.",
    url: "https://steelmotionllc.com/services/ai-transformation",
    siteName: "Steel Motion LLC",
    images: [
      {
        url: "/images/steel-motion-og-ai.jpg",
        width: 1200,
        height: 630,
        alt: "Steel Motion LLC - AI Transformation & Automation"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Transformation & Automation | Steel Motion LLC",
    description: "Transform your business with intelligent automation and AI solutions.",
    images: ["/images/steel-motion-og-ai.jpg"],
  }
}

export default function AITransformationPage() {
  const serviceData = {
    title: "AI Transformation & Automation",
    subtitle: "Intelligent solutions that transform operations",
    description: "Leverage cutting-edge artificial intelligence to automate processes, optimize workflows, and unlock new levels of efficiency in your organization.",
    heroGradient: "from-blue-600 via-blue-500 to-cyan-400",
    features: [
      {
        title: "Process Automation & Workflow Optimization",
        description: "Streamline repetitive tasks and complex workflows with intelligent automation solutions that reduce manual effort and eliminate human error.",
        icon: "🔄"
      },
      {
        title: "Intelligent Document Processing",
        description: "Extract, analyze, and process documents automatically using advanced OCR and natural language processing technologies.",
        icon: "📄"
      },
      {
        title: "Predictive Analytics & Decision Support",
        description: "Make data-driven decisions with AI-powered analytics that identify patterns, predict outcomes, and recommend optimal actions.",
        icon: "📊"
      },
      {
        title: "Machine Learning Model Development",
        description: "Custom ML models tailored to your specific business needs, from customer behavior prediction to operational optimization.",
        icon: "🤖"
      },
      {
        title: "Robotic Process Automation (RPA)",
        description: "Deploy software robots to handle routine tasks across multiple systems, improving accuracy and freeing up your team for strategic work.",
        icon: "⚙️"
      },
      {
        title: "AI Integration & Implementation",
        description: "Seamlessly integrate AI capabilities into your existing systems and workflows with minimal disruption to operations.",
        icon: "🔗"
      }
    ],
    benefits: [
      "Reduce operational costs by up to 40% through intelligent automation",
      "Eliminate manual errors and improve data accuracy",
      "Scale operations without proportional increase in staffing",
      "Make faster, more informed decisions with AI-powered insights",
      "Improve customer experience through automated service delivery",
      "Ensure compliance with automated monitoring and reporting"
    ],
    industries: [
      "Financial Services & Banking",
      "Healthcare & Medical Records",
      "Manufacturing & Supply Chain",
      "Government & Defense Contracting",
      "Insurance & Risk Management",
      "Legal & Professional Services"
    ],
    ctaText: "Transform Your Operations with AI",
    ctaDescription: "Ready to harness the power of artificial intelligence? Let's discuss how AI transformation can drive efficiency and growth in your organization."
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <ServicePage {...serviceData} />
      <Footer />
    </main>
  )
}