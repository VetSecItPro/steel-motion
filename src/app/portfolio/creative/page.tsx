'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Music } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navigation/navbar"
import { slideInUp } from "@/lib/animations"
import { bands } from "@/lib/data/bands"

export default function CreativePortfolioPage() {
  const scrollToContact = () => {
    const el = document.getElementById("contact")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.assign("/#contact")
    }
  }

  return (
    <main className="min-h-screen bg-sm-surface-primary">
      <Navbar />

      {/* Breadcrumb */}
      <section className="bg-[#0B1A2B] bg-sm-surface-inverse pt-20 pb-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/portfolio"
              className="flex items-center gap-1 text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Portfolio
            </Link>
            <span className="text-sm-text-inverse-muted">/</span>
            <span className="text-sm-accent-inverse font-medium">Creative</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="pb-16 pt-8 bg-[#0B1A2B] bg-sm-surface-inverse" style={{ background: 'linear-gradient(135deg, #0B1A2B 0%, #112240 50%, #0B1A2B 100%)' }}>
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-sm-accent-inverse/10 text-sm-accent-inverse border border-sm-accent-inverse/30 hover:bg-sm-accent-inverse/20">
              Portfolio / Creative
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-sm-text-inverse">
              AI-Assisted <span className="text-sm-accent-inverse">Music Production</span>
            </h1>

            <p className="text-xl text-sm-text-inverse-muted max-w-3xl mx-auto leading-relaxed">
              Original hard rock albums produced using AI tools. Two active band projects with music on all major streaming platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why This Is Here */}
      <section className="py-12 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="max-w-3xl mx-auto">
            <p className="text-sm-text-secondary leading-relaxed text-center">
              We use AI tools to produce real creative output, not demos. These projects use Suno and other AI-assisted production tools to compose, arrange, and produce full-length albums. The same approach we take with AI in business — pick the right tool, iterate fast, ship real output — applies to everything we build.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Expanded Band Cards */}
      <section className="py-24 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {bands.map((band, i) => (
              <motion.div
                key={band.name}
                {...slideInUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/portfolio/creative/${band.slug}`} className="block">
                  <div
                    className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl overflow-hidden hover:shadow-[var(--sm-shadow-md)] transition-all duration-300 cursor-pointer"
                    style={{ boxShadow: "var(--sm-shadow-sm)" }}
                  >
                    <div className="grid md:grid-cols-[240px_1fr]">
                      {/* Band Image / Gradient Side */}
                      {band.image ? (
                        <div className="relative min-h-[200px] md:min-h-0">
                          <Image
                            src={band.image}
                            alt={band.name}
                            width={480}
                            height={720}
                            sizes="(max-width: 768px) 100vw, 240px"
                            className="w-full h-full object-cover object-top"
                            priority
                          />
                        </div>
                      ) : (
                        <div className={`bg-gradient-to-br ${band.gradient} flex items-center justify-center p-8 min-h-[200px]`}>
                          <Music className="w-20 h-20 text-white/30" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-2xl font-bold text-sm-text-primary">
                              {band.name}
                            </h3>
                            <p className="text-sm-accent-primary text-sm font-medium">
                              {band.genre}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm-text-secondary leading-relaxed mt-4 mb-5 whitespace-pre-line">
                          {band.description}
                        </p>

                        {band.aiTools && (
                        <div className="mb-5">
                          <h4 className="text-sm font-semibold text-sm-text-muted uppercase tracking-wider mb-2">
                            AI Tools
                          </h4>
                          <p className="text-sm text-sm-text-secondary">{band.aiTools}</p>
                        </div>
                        )}

                        {band.features && band.features.length > 0 && (
                        <div className="mb-5">
                          <h4 className="text-sm font-semibold text-sm-text-muted uppercase tracking-wider mb-2">
                            Details
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {band.features.map((feature) => (
                              <div key={feature} className="flex items-center gap-2 text-sm text-sm-text-secondary">
                                <div className="w-1.5 h-1.5 bg-sm-accent-primary rounded-full flex-shrink-0" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                        )}

                        {/* View Albums CTA */}
                        <div className="pt-4 border-t border-sm-border-default">
                          <span className="inline-flex items-center gap-1.5 text-sm-accent-secondary text-sm font-medium group-hover:gap-2 transition-all">
                            View Albums
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link */}
      <section className="py-8 bg-sm-surface-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm-text-secondary text-sm">
            <Link
              href="/portfolio/software"
              className="text-sm-accent-secondary hover:underline font-medium"
            >
              See our software portfolio →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sm-surface-inverse text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...slideInUp} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-inverse">
              Building Something New
            </h2>
            <p className="text-lg text-sm-text-inverse-muted mb-8 leading-relaxed">
              We&apos;re always shipping. Follow along or get in touch.
            </p>
            <Button
              onClick={scrollToContact}
              className="bg-sm-accent-inverse hover:bg-[#2CC4B0] text-sm-surface-inverse font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105"
            >
              Schedule a Strategy Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
