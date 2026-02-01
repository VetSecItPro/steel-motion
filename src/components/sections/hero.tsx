'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Shield, Target, BookOpen, MapPin, Phone, Award, Flag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { slideInUp, scaleIn, fadeIn } from "@/lib/animations"

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-start justify-center bg-sm-surface-inverse text-sm-text-inverse pt-20 pb-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1A2B 0%, #112240 50%, #0B1A2B 100%)' }}>
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(45, 212, 191, 0.08) 0%, transparent 60%)' }}></div>

      <div className="container mx-auto px-4 pt-4 pb-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="max-w-5xl mx-auto"
        >
          {/* Hero Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 flex justify-center"
          >
            <div className="relative">
              <Image
                src="/images/steel-motion-hero-logo.png"
                alt="Steel Motion Logo"
                width={350}
                height={350}
                sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, 350px"
                className="object-contain drop-shadow-2xl"
                priority
              />
              {/* Subtle glow behind logo */}
              <div className="absolute inset-0 bg-sm-accent-inverse/10 blur-3xl scale-125 -z-10"></div>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-3"
          >
            <div className="inline-flex items-center gap-2 bg-sm-surface-inverse-alt/50 border border-sm-border-inverse rounded-full px-4 py-2 text-sm backdrop-blur-sm">
              <Award className="w-4 h-4 text-sm-accent-inverse" />
              <span className="text-sm-text-inverse-muted">Veteran-Owned Technology Company</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="text-sm-text-inverse">AI Solutions That Deliver</span>
            <span className="block text-sm-accent-inverse">Measurable Results</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xl md:text-2xl text-sm-text-inverse-muted mb-6 max-w-3xl mx-auto leading-relaxed"
          >
            We build AI automation systems and custom applications for businesses ready to move faster. Veteran-owned. Outcome-focused. No fluff.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-sm-accent-inverse hover:bg-[#5AE8D5] text-sm-surface-inverse px-8 py-6 text-lg rounded-lg group transition-all duration-300 hover:scale-105 font-semibold"
            >
              Schedule a Strategy Call
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link href="/portfolio">
              <Button
                size="lg"
                className="bg-transparent border border-sm-border-inverse text-sm-text-inverse hover:bg-sm-surface-inverse-alt hover:border-sm-text-inverse-muted px-8 py-6 text-lg rounded-lg group transition-all duration-300 hover:scale-105 font-semibold"
              >
                See What We Build
              </Button>
            </Link>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 mb-6"
          >
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs sm:text-sm uppercase tracking-wider text-sm-text-inverse-muted">
              <div className="flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5" />
                <span>Veteran-Owned</span>
              </div>
              <span className="hidden sm:inline text-sm-border-inverse">|</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Based in Texas</span>
              </div>
              <span className="hidden sm:inline text-sm-border-inverse">|</span>
              <span>Serving Clients Nationwide</span>
              <span className="hidden sm:inline text-sm-border-inverse">|</span>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>Free Strategy Call</span>
              </div>
            </div>
          </motion.div>

          {/* Mission / How We Work Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-4"
          >
            <div className="bg-sm-surface-inverse-alt/40 border border-sm-border-inverse rounded-2xl px-8 py-8 backdrop-blur-sm max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-sm-accent-inverse/10 text-sm-accent-inverse border border-sm-accent-inverse/30 rounded-full px-4 py-2 text-sm font-medium mb-4">
                  How We Work
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-inverse">
                  Results You Measure, Not Promises You Hope For
                </h2>
                <p className="text-lg text-sm-text-inverse-muted leading-relaxed max-w-4xl mx-auto">
                  Every engagement starts with defined success metrics and ends with verified outcomes. One point of contact. Full accountability. No handoffs, no finger-pointing.
                </p>
              </div>

              {/* Three pillars */}
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="text-center group"
                >
                  <div className="bg-sm-surface-inverse-alt/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sm-accent-inverse/20 transition-colors duration-300 border border-sm-accent-inverse/20">
                    <Shield className="w-8 h-8 text-sm-accent-inverse group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-sm-text-inverse">Accountability First</h3>
                  <p className="text-sm-text-inverse-muted leading-relaxed">
                    One point of contact owns your project from kickoff to delivery. You get clear deliverables, weekly updates, and direct access to the person doing the work.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  className="text-center group"
                >
                  <div className="bg-sm-surface-inverse-alt/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sm-accent-inverse/20 transition-colors duration-300 border border-sm-accent-inverse/20">
                    <Target className="w-8 h-8 text-sm-accent-inverse group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-sm-text-inverse">Outcome-Driven</h3>
                  <p className="text-sm-text-inverse-muted leading-relaxed">
                    We define success metrics before writing a line of code. Every project includes an ROI framework with milestones you track in real time.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="text-center group"
                >
                  <div className="bg-sm-surface-inverse-alt/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sm-accent-inverse/20 transition-colors duration-300 border border-sm-accent-inverse/20">
                    <BookOpen className="w-8 h-8 text-sm-accent-inverse group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-sm-text-inverse">Knowledge Transfer</h3>
                  <p className="text-sm-text-inverse-muted leading-relaxed">
                    We build solutions your team maintains after we leave. Documentation, training, and architecture reviews are included in every engagement. No vendor lock-in.
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
