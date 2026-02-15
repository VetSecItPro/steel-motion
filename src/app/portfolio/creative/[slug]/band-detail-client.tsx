'use client'

import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Music } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlbumCard } from "@/components/ui/album-card"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import { slideInUp } from "@/lib/animations"
import type { Band } from "@/lib/data/bands"
import { bands } from "@/lib/data/bands"

interface BandDetailClientProps {
  band: Band
}

export default function BandDetailClient({ band }: BandDetailClientProps) {
  const otherBand = bands.find((b) => b.slug !== band.slug)

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
      <section className="bg-sm-surface-inverse pt-20 pb-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/portfolio"
              className="text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors"
            >
              Portfolio
            </Link>
            <span className="text-sm-text-inverse-muted">/</span>
            <Link
              href="/portfolio/creative"
              className="text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors"
            >
              Creative
            </Link>
            <span className="text-sm-text-inverse-muted">/</span>
            <span className="text-sm-accent-inverse font-medium">{band.name}</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section
        className="pb-16 pt-8 bg-sm-surface-inverse"
        style={{ background: 'linear-gradient(135deg, #0B1A2B 0%, #112240 50%, #0B1A2B 100%)' }}
      >
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-sm-accent-inverse/10 text-sm-accent-inverse border border-sm-accent-inverse/30 hover:bg-sm-accent-inverse/20"
            >
              {band.genre}
            </Badge>

            {/* Band Icon */}
            <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${band.gradient} flex items-center justify-center`}>
              <Music className="w-12 h-12 text-white/60" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-sm-text-inverse">
              {band.name}
            </h1>

            <p className="text-xl text-sm-text-inverse-muted max-w-3xl mx-auto leading-relaxed">
              {band.description}
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${band.statusBg} ${band.statusText}`}>
                {band.status}
              </span>
              <span className="text-sm text-sm-text-inverse-muted">
                {band.albums.length} {band.albums.length === 1 ? 'Album' : 'Albums'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="py-24 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              {...slideInUp}
              className="text-2xl font-bold text-sm-text-primary mb-10"
            >
              Albums
            </motion.h2>

            {band.albums.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {band.albums.map((album, i) => (
                  <AlbumCard key={album.slug} album={album} index={i} />
                ))}
              </div>
            ) : (
              <motion.p {...slideInUp} className="text-sm-text-secondary text-center py-12">
                Albums coming soon. Check back for updates.
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-8 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            {otherBand && (
              <Link
                href={`/portfolio/creative/${otherBand.slug}`}
                className="text-sm-accent-secondary hover:underline font-medium"
              >
                Listen to {otherBand.name} →
              </Link>
            )}
            <span className="hidden sm:inline text-sm-text-muted">|</span>
            <Link
              href="/portfolio/creative"
              className="flex items-center gap-1 text-sm-text-secondary hover:text-sm-accent-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All bands
            </Link>
            <span className="hidden sm:inline text-sm-text-muted">|</span>
            <Link
              href="/portfolio/software"
              className="text-sm-accent-secondary hover:underline font-medium"
            >
              See software portfolio →
            </Link>
          </div>
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

      <Footer />
    </main>
  )
}
