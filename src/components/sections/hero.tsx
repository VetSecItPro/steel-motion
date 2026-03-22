'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Phone, Award, Flag, Shield, Rocket, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex items-start justify-center bg-[var(--sm-surface-inverse)] text-sm-text-inverse pt-20 pb-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--sm-surface-inverse) 0%, var(--sm-surface-inverse-alt) 50%, var(--sm-surface-inverse) 100%)' }}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(45, 212, 191, 0.08) 0%, transparent 60%)' }}></div>

      <div className="container mx-auto px-4 pt-4 pb-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero Logo - loads independently with fade-in */}
          <div className="mb-4 flex justify-center hero-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="relative">
              <Image
                src="/images/steel-motion-hero-logo.png"
                alt="Steel Motion Logo"
                width={280}
                height={280}
                sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 280px"
                className="object-contain drop-shadow-2xl w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]"
                priority
              />
              {/* Subtle glow behind logo */}
              <div className="absolute inset-0 bg-sm-accent-inverse/10 blur-3xl scale-125 -z-10"></div>
            </div>
          </div>

          {/* Badge - renders immediately via CSS animation */}
          <div className="mb-3 hero-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-2 bg-sm-surface-inverse-alt/50 border border-sm-border-inverse rounded-full px-4 py-2 text-sm backdrop-blur-sm">
              <Award className="w-4 h-4 text-sm-accent-inverse" aria-hidden={true} />
              <span className="text-sm-text-inverse-muted">Veteran-Owned Technology Company</span>
            </div>
          </div>

          {/* Headline - renders immediately */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 hero-fade-in" style={{ animationDelay: '0.05s' }}>
            <span className="text-sm-text-inverse">Your Business Runs on Manual Work.</span>
            <span className="block text-sm-accent-inverse">We Automate It.</span>
          </h1>

          {/* Subtext - renders immediately */}
          <p className="text-xl md:text-2xl text-sm-text-inverse-muted mb-6 max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{ animationDelay: '0.1s' }}>
            Stop losing hours to spreadsheets, manual data entry, and disconnected systems. We build AI automation and custom software that gives you those hours back. Veteran-owned. Fixed-price. No fluff.
          </p>

          {/* CTAs - render immediately */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 hero-fade-in" style={{ animationDelay: '0.15s' }}>
            <Button
              asChild
              size="lg"
              className="bg-sm-accent-inverse hover:bg-[#2CC4B0] text-sm-surface-inverse px-8 py-6 text-lg group transition-all duration-300 hover:scale-105 active:scale-95 font-semibold"
            >
              <a href="https://cal.com/steelmotionllc" target="_blank" rel="noopener noreferrer">
                Book a Free 30-Minute Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-transparent border border-sm-border-inverse text-sm-text-inverse hover:bg-sm-surface-inverse-alt hover:border-sm-text-inverse-muted px-8 py-6 text-lg group transition-all duration-300 hover:scale-105 active:scale-95 font-semibold"
            >
              <a href="/portfolio">
                See Our Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Risk Reducer Bar */}
          <div className="mt-6 mb-2 hero-fade-in" style={{ animationDelay: '0.18s' }}>
            <div className="flex flex-wrap justify-center items-center gap-3">
              {["Fixed-Price Quotes", "You Own the Code", "30-Day Post-Launch Support", "Free Strategy Call"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 text-xs text-sm-text-inverse-muted/80 bg-sm-surface-inverse-alt/20 border border-sm-border-inverse/30 rounded-full px-3 py-1">
                  <CheckCircle className="w-3 h-3 text-sm-accent-inverse/70" aria-hidden={true} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Social Proof Bar */}
          <div className="mt-8 mb-4 hero-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-xs uppercase tracking-widest text-sm-text-inverse-muted/60 mb-3">Trusted by DFW businesses</p>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              <div className="inline-flex items-center gap-1.5 bg-sm-surface-inverse-alt/30 border border-sm-border-inverse/50 rounded-full px-3 py-1.5 text-xs text-sm-text-inverse-muted backdrop-blur-sm">
                <Rocket className="w-3.5 h-3.5 text-sm-accent-inverse" aria-hidden={true} />
                <span>4 Live Products We Built Ourselves</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-sm-surface-inverse-alt/30 border border-sm-border-inverse/50 rounded-full px-3 py-1.5 text-xs text-sm-text-inverse-muted backdrop-blur-sm">
                <Shield className="w-3.5 h-3.5 text-sm-accent-inverse" aria-hidden={true} />
                <span>100% Veteran Owned</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-sm-surface-inverse-alt/30 border border-sm-border-inverse/50 rounded-full px-3 py-1.5 text-xs text-sm-text-inverse-muted backdrop-blur-sm">
                <CheckCircle className="w-3.5 h-3.5 text-sm-accent-inverse" aria-hidden={true} />
                <span>Fixed-Price Projects — No Surprise Bills</span>
              </div>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="mt-4 mb-6 hero-fade-in" style={{ animationDelay: '0.25s' }}>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs sm:text-sm uppercase tracking-wider text-sm-text-inverse-muted">
              <div className="flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5" aria-hidden={true} />
                <span>Free 30-Min Strategy Call</span>
              </div>
              <span className="hidden sm:inline text-sm-border-inverse">|</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" aria-hidden={true} />
                <span>Based in Dallas-Fort Worth, Texas</span>
              </div>
              <span className="hidden sm:inline text-sm-border-inverse">|</span>
              <span>Serving Clients Nationwide</span>
              <span className="hidden sm:inline text-sm-border-inverse">|</span>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" aria-hidden={true} />
                <span>Free Strategy Call</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-fade-in {
          animation: heroFadeIn 0.5s ease-out forwards;
          opacity: 0;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-fade-in {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  )
}
