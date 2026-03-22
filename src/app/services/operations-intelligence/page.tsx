import type { Metadata } from "next"
import Navbar from "@/components/navigation/navbar"
import ServiceSchema from "@/components/structured-data/service"
import OperationsIntelligenceContent from "./content"

export const metadata: Metadata = {
  title: "Operations Intelligence | Steel Motion LLC",
  description: "AI agents that analyze, coordinate, and optimize your entire business operations. Discovery, deployment, and ongoing fractional AI management. Veteran-owned.",
  keywords: ["operations intelligence", "AI agents", "business operations", "multi-agent systems", "fractional AI", "AI operations manager", "veteran-owned business"],
  openGraph: {
    title: "Operations Intelligence | Steel Motion LLC",
    description: "AI agents that analyze, coordinate, and optimize your entire business operations. Ongoing fractional AI management.",
    url: "https://steelmotionllc.com/services/operations-intelligence",
    siteName: "Steel Motion LLC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Operations Intelligence | Steel Motion LLC",
    description: "AI agents that analyze, coordinate, and optimize your entire business operations. Ongoing fractional AI management.",
  },
  alternates: {
    canonical: "https://steelmotionllc.com/services/operations-intelligence",
  },
}

export default function OperationsIntelligencePage() {
  const serviceSchema = {
    name: "Operations Intelligence",
    description: "AI agents that analyze, coordinate, and optimize your entire business operations. Discovery, deployment, and ongoing fractional AI management. Veteran-owned.",
    url: "https://www.steelmotionllc.com/services/operations-intelligence"
  }

  return (
    <main className="min-h-screen" id="main-content">
      <ServiceSchema service={serviceSchema} />
      <Navbar />
      <OperationsIntelligenceContent />
    </main>
  )
}
