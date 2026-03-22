import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio | Steel Motion LLC",
  description: "4 SaaS products built and shipped by one Army veteran. See what we've built — and what we can build for you.",
  openGraph: {
    title: "Portfolio | Steel Motion LLC",
    description: "4 SaaS products built and shipped by one Army veteran. See what we've built — and what we can build for you.",
    url: "https://steelmotionllc.com/portfolio",
  },
  alternates: {
    canonical: "https://steelmotionllc.com/portfolio",
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
