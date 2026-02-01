'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { slideInUp, slideInLeft, slideInRight, scaleIn } from "@/lib/animations"

interface ServiceFeature {
  title: string
  description: string
  icon: string
}

interface ServicePageProps {
  title: string
  subtitle: string
  description: string
  heroGradient: string
  features: ServiceFeature[]
  benefits: string[]
  industries: string[]
  ctaText: string
  ctaDescription: string
}

export default function ServicePage({
  title,
  subtitle,
  description,
  heroGradient,
  features,
  benefits,
  industries,
  ctaText,
  ctaDescription
}: ServicePageProps) {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      // If we're on a service page, navigate to home page contact section
      window.location.assign('/#contact')
    }
  }

  return (
    <>
      {/* Back Navigation */}
      <section className="bg-sm-surface-inverse pt-20 pb-4">
        <div className="container mx-auto px-4">
          <motion.div
            {...slideInLeft}
            className="flex items-center gap-4"
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <span className="text-sm-text-inverse-muted">•</span>
            <Link
              href="/#services"
              className="flex items-center gap-2 text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors duration-300 group"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">All Services</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="flex items-center justify-center bg-sm-surface-inverse text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-sm-surface-inverse-alt/40 pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            {...slideInUp}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              {...scaleIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 mb-6">
                Steel Motion Services
              </Badge>
            </motion.div>

            <motion.h1
              {...slideInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-sm-text-inverse"
            >
              {title}
            </motion.h1>

            <motion.p
              {...slideInUp}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-sm-text-inverse/90 mb-4 max-w-3xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>

            <motion.p
              {...slideInUp}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg text-sm-text-inverse/80 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              {...slideInUp}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Button
                onClick={scrollToContact}
                className="bg-sm-accent-inverse hover:bg-[#5AE8D5] text-sm-surface-inverse font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            {...slideInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-primary">
              What We Do
            </h2>
            <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto leading-relaxed">
              Practical solutions that solve real problems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                {...slideInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-sm-surface-elevated border-sm-border-default hover:border-sm-accent-primary/30 transition-all duration-300 hover:shadow-[var(--sm-shadow-md)]" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
                  <CardHeader>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl text-sm-text-primary">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm-text-secondary leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Industries Section */}
      <section className="py-16 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Benefits */}
            <motion.div
              {...slideInLeft}
            >
              <h3 className="text-2xl font-bold mb-6 text-sm-text-primary">Why It Matters</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    {...slideInLeft}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-sm-accent-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm-text-secondary leading-relaxed">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Industries */}
            <motion.div
              {...slideInRight}
            >
              <h3 className="text-2xl font-bold mb-6 text-sm-text-primary">Good Fit If You&apos;re...</h3>
              <div className="space-y-3">
                {industries.map((industry, index) => (
                  <motion.div
                    key={index}
                    {...slideInRight}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-sm-accent-primary flex-shrink-0" />
                    <p className="text-sm-text-secondary">{industry}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sm-surface-inverse text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            {...slideInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-inverse">{ctaText}</h2>
            <p className="text-lg text-sm-text-inverse-muted mb-6 leading-relaxed">
              {ctaDescription}
            </p>
            <Button
              onClick={scrollToContact}
              className="bg-sm-accent-inverse hover:bg-[#5AE8D5] text-sm-surface-inverse font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
