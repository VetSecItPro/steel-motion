import type { Metadata } from "next"
import VeteranPartnerships from "@/components/sections/veteran-partnerships"

export const metadata: Metadata = {
  title: "Partnerships | Steel Motion LLC",
  description: "Partner with Steel Motion LLC on referrals, shared projects, and overflow work. Veteran-owned software company in Texas looking for complementary service providers and fellow veteran businesses.",
  keywords: ["partnerships", "veteran-owned business", "referral partners", "software development partnerships", "veteran collaboration"],
  openGraph: {
    title: "Partnerships | Steel Motion LLC",
    description: "Partner with Steel Motion LLC on referrals, shared projects, and overflow work.",
    url: "https://steelmotionllc.com/partnerships",
    siteName: "Steel Motion LLC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partnerships | Steel Motion LLC",
    description: "Partner with Steel Motion LLC on referrals, shared projects, and overflow work.",
  }
}

export default function PartnershipsPage() {
  return (
    <main className="min-h-screen">
      <VeteranPartnerships />
    </main>
  )
}
