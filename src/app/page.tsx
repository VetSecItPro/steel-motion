import Navbar from "@/components/navigation/navbar"
import Hero from "@/components/sections/hero"
import Services from "@/components/sections/services"
import About from "@/components/sections/about"
import WhySteelMotion from "@/components/sections/why-steel-motion"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <WhySteelMotion />
      <Contact />
      <Footer />
    </main>
  );
}
