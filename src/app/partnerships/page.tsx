import type { Metadata } from "next"
import VeteranPartnerships from "@/components/sections/veteran-partnerships"

export const metadata: Metadata = {
  title: "Veteran Partnerships | Steel Motion LLC - Veteran-Led Technology Solutions",
  description: "Partner with Steel Motion LLC for veteran-focused technology initiatives. Connect with our veteran-led team to explore collaboration opportunities in AI, cybersecurity, and digital transformation.",
  keywords: ["veteran partnerships", "veteran-owned business", "military contractors", "defense technology", "veteran collaboration"],
  openGraph: {
    title: "Veteran Partnerships | Steel Motion LLC",
    description: "Partner with Steel Motion LLC for veteran-focused technology initiatives.",
    url: "https://steelmotionllc.com/partnerships",
    siteName: "Steel Motion LLC",
    images: [
      {
        url: "/images/steel-motion-og-partnerships.jpg",
        width: 1200,
        height: 630,
        alt: "Steel Motion LLC - Veteran Partnerships"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veteran Partnerships | Steel Motion LLC",
    description: "Partner with Steel Motion LLC for veteran-focused technology initiatives.",
    images: ["/images/steel-motion-og-partnerships.jpg"],
  }
}

export default function PartnershipsPage() {
  return (
    <main className="min-h-screen">
      <VeteranPartnerships />
    </main>
  )
}