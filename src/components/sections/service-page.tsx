'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, ArrowRight, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

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
      // If we're on a service page, go to home page contact section
      window.location.href = '/#contact'
    }
  }

  return (
    <>
      {/* Back Navigation */}
      <section className="bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] pt-20 pb-4">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-[#B3B3B3] hover:text-[#00F2FF] transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <span className="text-[#666666]">•</span>
            <Link
              href="/#services"
              className="flex items-center gap-2 text-[#B3B3B3] hover:text-[#00F2FF] transition-colors duration-300 group"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">All Services</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section className={`min-h-[80vh] flex items-center justify-center bg-gradient-to-br ${heroGradient} text-white pt-8 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#001122]/80 via-[#003366]/60 to-[#004488]/40 pointer-events-none"></div>

        <div className="container mx-auto px-4 py-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 mb-6">
                Steel Motion Services
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-[#00F2FF] to-[#33CCFF] hover:from-[#33CCFF] hover:to-[#00F2FF] text-slate-900 font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Service Capabilities
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions designed to meet your specific business needs with military precision and proven methodologies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-slate-200 hover:border-[#00F2FF]/50 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 leading-relaxed">
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
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8 text-slate-900">Key Benefits</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700 leading-relaxed">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Industries */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8 text-slate-900">Industries We Serve</h3>
              <div className="grid gap-4">
                {industries.map((industry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-4 rounded-lg border border-slate-200 hover:border-[#00F2FF]/50 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-[#00F2FF]" />
                      <p className="font-medium text-slate-800">{industry}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{ctaText}</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {ctaDescription}
            </p>
            <Button
              onClick={scrollToContact}
              className="bg-gradient-to-r from-[#00F2FF] to-[#33CCFF] hover:from-[#33CCFF] hover:to-[#00F2FF] text-slate-900 font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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