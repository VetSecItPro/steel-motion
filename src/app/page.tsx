import Navbar from "@/components/navigation/navbar"
import Hero from "@/components/sections/hero"
import Services from "@/components/sections/services"
import WhySteelMotion from "@/components/sections/why-steel-motion"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* GitHub Actions deployment test - 2025-09-28 */}
      <Navbar />
      <Hero />
      <Services />
      <WhySteelMotion />
      <Contact />
      <Footer />
    </main>
  );
}
