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
    title: "AI Transformation",
    subtitle: "Put AI to work for your business",
    description: "We help you automate the tedious stuff so your team can focus on what matters.",
    heroGradient: "from-blue-600 via-blue-500 to-cyan-400",
    features: [
      {
        title: "Workflow Automation",
        description: "Stop doing repetitive tasks manually. We build systems that handle the boring stuff automatically and accurately.",
        icon: "🔄"
      },
      {
        title: "Document Processing",
        description: "Invoices, forms, contracts. We set up AI to read, extract, and organize your documents without human intervention.",
        icon: "📄"
      },
      {
        title: "Predictive Analytics",
        description: "See what's coming before it happens. We build dashboards and alerts that help you make smarter decisions faster.",
        icon: "📊"
      },
      {
        title: "Custom AI Models",
        description: "Off-the-shelf AI doesn't always fit. We build models trained specifically on your data and your problems.",
        icon: "🤖"
      },
      {
        title: "Process Automation (RPA)",
        description: "Software bots that work across your existing systems. No ripping and replacing, just automation layered on top.",
        icon: "⚙️"
      },
      {
        title: "AI Integration",
        description: "Already have systems you love? We plug AI into what you're using now without breaking anything.",
        icon: "🔗"
      }
    ],
    benefits: [
      "Cut operational costs significantly",
      "Eliminate manual data entry errors",
      "Handle more volume without hiring more people",
      "Get answers from your data in minutes, not days",
      "Respond to customers faster",
      "Stay compliant without the paperwork headaches"
    ],
    industries: [
      "Businesses ready to scale without adding headcount",
      "Teams buried in repetitive manual tasks",
      "Companies managing high volumes of documents",
      "Organizations looking to respond to customers faster",
      "Anyone tired of copy-pasting between systems",
      "Businesses that want to work smarter, not harder"
    ],
    ctaText: "Let's Talk AI",
    ctaDescription: "Not sure where to start? We'll help you figure out where AI makes sense for your business."
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <ServicePage {...serviceData} />
      <Footer />
    </main>
  )
}