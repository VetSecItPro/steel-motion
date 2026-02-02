import { Metadata } from 'next'
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import AboutContent from "@/components/sections/about"
import PersonSchema from '@/components/structured-data/person'

export const metadata: Metadata = {
  title: 'About | Steel Motion LLC',
  description: 'Steel Motion LLC is a veteran-owned software company in Dallas-Fort Worth. We build software products, AI automation systems, and custom web applications for small businesses.',
  keywords: 'about steel motion, veteran-owned software company, anouar bencheqroun, AI automation, custom software development, Dallas Fort Worth',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PersonSchema />
      <Navbar />
      <AboutContent />
      <Footer />
    </main>
  )
}