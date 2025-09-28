import { Metadata } from 'next'
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import AboutContent from "@/components/sections/about"

export const metadata: Metadata = {
  title: 'About | Steel Motion LLC - Veteran-Led AI & Technology Solutions',
  description: 'Meet Anouar K. Bencheqroun MBA CISSP, the founder of Steel Motion LLC. Learn about our veteran-led approach to AI consulting, cybersecurity, and technology solutions.',
  keywords: 'about steel motion, anouar bencheqroun, veteran technology leader, AI consulting, cybersecurity expert, MBA CISSP',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <AboutContent />
      <Footer />
    </main>
  )
}