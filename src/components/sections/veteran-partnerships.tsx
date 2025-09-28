'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Target, Handshake, Send, Mail, Star } from "lucide-react"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"

export default function VeteranPartnerships() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    veteranStatus: '',
    partnershipType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/partnerships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          organization: '',
          veteranStatus: '',
          partnershipType: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] text-white pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001122]/80 via-[#003366]/60 to-[#004488]/40 pointer-events-none"></div>

        <div className="container mx-auto px-4 py-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-[#1a3a5c]/50 border border-[#00F2FF]/40 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
                <Shield className="w-4 h-4 text-[#00F2FF]" />
                <span className="text-[#B3B3B3]">Veteran Partnership Program</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">Partner with</span>
              <span className="block text-[#00F2FF] drop-shadow-lg">Veteran Leaders</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-[#B3B3B3] mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Join forces with Steel Motion LLC to deliver mission-critical technology solutions.
              Together, we can serve veteran communities and drive innovation with military precision.
            </motion.p>

            {/* Partnership Types */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              <div className="bg-[#1a3a5c]/40 border border-[#00F2FF]/30 rounded-2xl p-6 backdrop-blur-sm">
                <Users className="w-8 h-8 text-[#00F2FF] mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 text-white">Veteran Organizations</h3>
                <p className="text-[#B3B3B3] text-sm">VSOs, veteran nonprofits, and community groups</p>
              </div>

              <div className="bg-[#1a3a5c]/40 border border-[#00F2FF]/30 rounded-2xl p-6 backdrop-blur-sm">
                <Target className="w-8 h-8 text-[#00F2FF] mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 text-white">Defense Contractors</h3>
                <p className="text-[#B3B3B3] text-sm">Prime contractors and specialized defense firms</p>
              </div>

              <div className="bg-[#1a3a5c]/40 border border-[#00F2FF]/30 rounded-2xl p-6 backdrop-blur-sm">
                <Handshake className="w-8 h-8 text-[#00F2FF] mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 text-white">Strategic Alliances</h3>
                <p className="text-[#B3B3B3] text-sm">Technology partnerships and joint ventures</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Form Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Partnership Inquiry</CardTitle>
                  <CardDescription className="text-slate-400">
                    Tell us about your organization and partnership goals. We&apos;ll connect you with our team within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-slate-300 mb-2">
                        Organization/Company *
                      </label>
                      <Input
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        placeholder="Your organization name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="veteranStatus" className="block text-sm font-medium text-slate-300 mb-2">
                          Veteran Status
                        </label>
                        <select
                          id="veteranStatus"
                          name="veteranStatus"
                          value={formData.veteranStatus}
                          onChange={handleChange}
                          className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00F2FF]"
                        >
                          <option value="">Select status</option>
                          <option value="veteran">Veteran</option>
                          <option value="active-duty">Active Duty</option>
                          <option value="military-spouse">Military Spouse</option>
                          <option value="civilian">Civilian</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="partnershipType" className="block text-sm font-medium text-slate-300 mb-2">
                          Partnership Type *
                        </label>
                        <select
                          id="partnershipType"
                          name="partnershipType"
                          value={formData.partnershipType}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00F2FF]"
                        >
                          <option value="">Select type</option>
                          <option value="veteran-organization">Veteran Organization</option>
                          <option value="defense-contractor">Defense Contractor</option>
                          <option value="technology-partnership">Technology Partnership</option>
                          <option value="joint-venture">Joint Venture</option>
                          <option value="subcontracting">Subcontracting</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                        Partnership Details *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        placeholder="Describe your partnership goals, project scope, timeline, and how we can work together..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-6 text-lg rounded-lg group transition-all duration-300"
                    >
                      {isSubmitting ? 'Sending Partnership Inquiry...' : 'Submit Partnership Inquiry'}
                      <Send className={`ml-2 w-5 h-5 transition-transform ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
                    </Button>

                    {submitStatus === 'success' && (
                      <div className="bg-green-600 border border-green-500 text-white px-4 py-3 rounded-lg">
                        <p className="font-medium">✅ Partnership inquiry sent successfully!</p>
                        <p className="text-sm opacity-90">We&apos;ll review your submission and get back to you within 24 hours.</p>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="bg-red-600 border border-red-500 text-white px-4 py-3 rounded-lg">
                        <p className="font-medium">❌ Failed to send partnership inquiry</p>
                        <p className="text-sm opacity-90">Please try again or contact us directly at contact@steelmotionllc.com</p>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Partnership Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Partnership Opportunities</h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Steel Motion LLC is committed to building strong partnerships within the veteran
                  community and defense sector. We believe in the power of collaboration to deliver
                  exceptional results and support our fellow veterans.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Veteran-First Approach</h4>
                    <p className="text-slate-400">
                      We prioritize partnerships with veteran-owned businesses and organizations
                      that share our commitment to excellence and service.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Mission-Critical Solutions</h4>
                    <p className="text-slate-400">
                      Partner with us on defense contracts, government projects, and enterprise
                      solutions that make a real impact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Community Impact</h4>
                    <p className="text-slate-400">
                      Join us in supporting veteran communities through technology, training,
                      and employment opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Direct Contact</h4>
                    <p className="text-slate-400 mb-2">
                      Ready to discuss partnership opportunities? Contact us directly:
                    </p>
                    <p className="text-[#00F2FF] font-medium">contact@steelmotionllc.com</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mt-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#00F2FF]" />
                  Certifications & Credentials
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <Badge variant="secondary" className="bg-blue-900 text-blue-200 hover:bg-blue-800">
                    Veteran-Owned Small Business
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-900 text-blue-200 hover:bg-blue-800">
                    Service-Disabled Veteran
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-900 text-blue-200 hover:bg-blue-800">
                    CISSP Certified
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-900 text-blue-200 hover:bg-blue-800">
                    MBA Leadership
                  </Badge>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-3">Response Time</h4>
                <p className="text-slate-300 text-sm">
                  We typically respond to partnership inquiries within 24 hours during business days.
                  For urgent partnership opportunities, please mention &ldquo;URGENT&rdquo; in your message subject.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}