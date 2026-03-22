import Navbar from "@/components/navigation/navbar"
import Hero from "@/components/sections/hero"
import HowWeWork from "@/components/sections/how-we-work"
import Services from "@/components/sections/services"
import Products from "@/components/sections/products"
import Results from "@/components/sections/results"
import WhySteelMotion from "@/components/sections/why-steel-motion"
import FAQ from "@/components/sections/faq"
import Contact from "@/components/sections/contact"

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />
      <Hero />
      <HowWeWork />
      <Services />
      <Products />
      <Results />
      <WhySteelMotion />
      <FAQ />
      <Contact />
    </main>
  );
}
