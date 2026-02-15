import { Metadata } from 'next'
import Navbar from "@/components/navigation/navbar"
import AboutContent from "@/components/sections/about"
import PersonSchema from '@/components/structured-data/person'

export const metadata: Metadata = {
  title: 'About | Steel Motion LLC',
  description: 'Steel Motion LLC is a veteran-owned software company in Dallas-Fort Worth. We build software products, AI automation systems, and custom web applications for small businesses.',
  keywords: [
    'about steel motion',
    'veteran-owned software company',
    'anouar bencheqroun',
    'AI automation',
    'custom software development',
    'Dallas Fort Worth'
  ],
  openGraph: {
    title: 'About | Steel Motion LLC',
    description: 'Steel Motion LLC is a veteran-owned software company in Dallas-Fort Worth. We build software products, AI automation systems, and custom web applications for small businesses.',
    url: 'https://steelmotionllc.com/about',
    siteName: 'Steel Motion LLC',
  },
  alternates: {
    canonical: 'https://steelmotionllc.com/about',
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen" id="main-content">
      <PersonSchema />
      <Navbar />
      <AboutContent />
    </main>
  )
}
