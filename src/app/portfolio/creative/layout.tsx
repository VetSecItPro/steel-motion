import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI-Assisted Music Production | Steel Motion LLC",
  description:
    "Original hard rock albums produced using AI tools. Two active band projects — Iron Pulse and Other Life — with music on Spotify and Apple Music.",
  alternates: {
    canonical: "https://steelmotionllc.com/portfolio/creative",
  },
  openGraph: {
    title: "AI-Assisted Music Production | Steel Motion LLC",
    description:
      "Original hard rock albums produced using AI tools. Iron Pulse (American Hard Rock) and Other Life (French Hard Rock) — streaming on all major platforms.",
    url: "https://steelmotionllc.com/portfolio/creative",
    type: "website",
  },
}

export default function CreativeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
