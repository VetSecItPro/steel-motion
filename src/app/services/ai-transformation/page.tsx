import type { Metadata } from "next"
import Navbar from "@/components/navigation/navbar"
import ServiceSchema from "@/components/structured-data/service"
import AITransformationContent from "./content"

export const metadata: Metadata = {
  title: "AI Automation Services | Steel Motion LLC",
  description: "We build AI automation systems that reduce manual work, cut processing time, and produce measurable ROI. Veteran-owned. Fixed-price engagements.",
  keywords: ["AI automation", "process automation", "workflow automation", "document processing", "predictive analytics", "veteran-owned business"],
  openGraph: {
    title: "AI Automation Services | Steel Motion LLC",
    description: "We build AI automation systems that reduce manual work, cut processing time, and produce measurable ROI.",
    url: "https://steelmotionllc.com/services/ai-transformation",
    siteName: "Steel Motion LLC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Services | Steel Motion LLC",
    description: "We build AI automation systems that reduce manual work, cut processing time, and produce measurable ROI.",
  }
}

export default function AITransformationPage() {
  const serviceSchema = {
    name: "AI Automation Services",
    description: "We build AI automation systems that reduce manual work, cut processing time, and produce measurable ROI for small and mid-size businesses.",
    url: "https://www.steelmotionllc.com/services/ai-transformation"
  }

  return (
    <main className="min-h-screen" id="main-content">
      <ServiceSchema service={serviceSchema} />
      <Navbar />
      <AITransformationContent />
    </main>
  )
}
