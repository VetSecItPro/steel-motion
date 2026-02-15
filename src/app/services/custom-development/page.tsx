import type { Metadata } from "next"
import Navbar from "@/components/navigation/navbar"
import ServiceSchema from "@/components/structured-data/service"
import CustomDevelopmentContent from "./content"

export const metadata: Metadata = {
  title: "Custom Software Development | Steel Motion LLC",
  description: "We build web applications, APIs, and internal tools from scratch. You own the code. Fixed-price engagements. Veteran-owned.",
  keywords: ["custom software development", "web applications", "API development", "database design", "legacy modernization", "veteran-owned business"],
  openGraph: {
    title: "Custom Software Development | Steel Motion LLC",
    description: "We build web applications, APIs, and internal tools from scratch. You own the code. Fixed-price engagements.",
    url: "https://steelmotionllc.com/services/custom-development",
    siteName: "Steel Motion LLC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development | Steel Motion LLC",
    description: "We build web applications, APIs, and internal tools from scratch. You own the code. Fixed-price engagements.",
  }
}

export default function CustomDevelopmentPage() {
  const serviceSchema = {
    name: "Custom Software Development",
    description: "We build web applications, APIs, and internal tools from scratch. You own the code. Fixed-price engagements. Veteran-owned.",
    url: "https://www.steelmotionllc.com/services/custom-development"
  }

  return (
    <main className="min-h-screen" id="main-content">
      <ServiceSchema service={serviceSchema} />
      <Navbar />
      <CustomDevelopmentContent />
    </main>
  )
}
