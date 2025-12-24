'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Shield, Target, Users } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-start justify-center bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] text-white pt-20 relative overflow-hidden">
      {/* Background overlay for better logo integration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001122]/80 via-[#003366]/60 to-[#004488]/40 pointer-events-none"></div>

      <div className="container mx-auto px-4 pt-4 pb-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Hero Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.1, type: "spring", stiffness: 100 }}
            className="mb-4 flex justify-center"
          >
            <div className="relative">
              {/* Logo with blurred edges and seamless blending */}
              <div className="relative">
                <Image
                  src="/images/steel-motion-hero-logo.png"
                  alt="Steel Motion Logo"
                  width={400}
                  height={400}
                  className="object-contain drop-shadow-2xl filter brightness-110 contrast-110"
                  style={{
                    maskImage: 'radial-gradient(circle at center, black 60%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 95%)',
                  }}
                  priority
                />
                {/* Additional soft edge blending overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent rounded-full opacity-50 blur-sm"></div>
              </div>
              {/* Multiple glow layers for better integration */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00F2FF]/20 to-[#33CCFF]/20 blur-3xl scale-150 -z-10 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a1728]/30 via-transparent to-[#1a3a5c]/30 blur-2xl scale-125 -z-5"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-3"
          >
            <div className="inline-flex items-center gap-2 bg-[#1a3a5c]/50 border border-[#00F2FF]/40 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
              <Zap className="w-4 h-4 text-[#00F2FF]" />
              <span className="text-[#B3B3B3]">Veteran-Led Technology Solutions</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="text-white">Mission-Critical AI for</span>
            <span className="block text-[#00F2FF] drop-shadow-lg">Enterprise Operations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-[#B3B3B3] mb-6 max-w-3xl mx-auto leading-relaxed"
          >
            Where military precision meets cutting-edge technology. We deploy AI solutions that deliver results, built by veterans who understand that failure is not an option.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-[#00F2FF] to-[#33CCFF] hover:from-[#00F2FF]/90 hover:to-[#33CCFF]/90 text-[#0F1E2C] px-8 py-6 text-lg rounded-full group transition-all duration-300 hover:scale-105 font-semibold shadow-lg shadow-[#00F2FF]/25"
            >
              Schedule a Strategy Call
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              onClick={() => scrollToSection('services')}
              className="bg-[#0a1728] border border-[#00F2FF]/30 text-[#00F2FF] hover:bg-[#1a3a5c] px-8 py-6 text-lg rounded-full group transition-all duration-300 hover:scale-105 font-semibold"
            >
              Explore Our Services
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-4"
          >
            {/* Mission Section integrated into Hero */}
            <div className="bg-[#1a3a5c]/40 border border-[#00F2FF]/30 rounded-2xl px-8 py-8 backdrop-blur-sm max-w-6xl mx-auto">
              {/* Our Mission Badge */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-[#00F2FF]/10 text-[#00F2FF] hover:bg-[#00F2FF]/20 border border-[#00F2FF]/30 rounded-full px-4 py-2 text-sm font-medium mb-4">
                  Our Mission
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Results You Can Measure
                </h2>
                <p className="text-lg text-[#B3B3B3] leading-relaxed max-w-4xl mx-auto">
                  We bring military discipline to enterprise technology. Every engagement is scoped for measurable outcomes, executed with precision, and backed by veterans who have led mission-critical operations at scale.
                </p>
              </div>

              {/* Three pillars */}
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="text-center group"
                >
                  <div className="bg-[#1a3a5c]/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00F2FF]/20 transition-colors duration-300 border border-[#00F2FF]/20">
                    <Shield className="w-8 h-8 text-[#00F2FF] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Accountability First</h3>
                  <p className="text-[#B3B3B3] leading-relaxed">
                    One point of contact. Clear deliverables. No finger-pointing. We own your project from discovery to deployment and beyond.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  className="text-center group"
                >
                  <div className="bg-[#1a3a5c]/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00F2FF]/20 transition-colors duration-300 border border-[#00F2FF]/20">
                    <Target className="w-8 h-8 text-[#00F2FF] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Outcome-Driven</h3>
                  <p className="text-[#B3B3B3] leading-relaxed">
                    We define success metrics before we write code. Every project is scoped for ROI, with milestones you can track and results you can verify.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.0 }}
                  className="text-center group"
                >
                  <div className="bg-[#1a3a5c]/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00F2FF]/20 transition-colors duration-300 border border-[#00F2FF]/20">
                    <Users className="w-8 h-8 text-[#00F2FF] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Strategic Partnership</h3>
                  <p className="text-[#B3B3B3] leading-relaxed">
                    Not just vendors, but advisors. We embed with your team, transfer knowledge, and build solutions you can maintain long after we leave.
                  </p>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}