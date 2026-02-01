'use client'

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Target, Handshake, Send, Loader2 } from "lucide-react"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import { FormField } from "@/components/ui/form-field"
import { partnershipFormSchema, type PartnershipFormData } from "@/lib/validations/partnership"
import { slideInUp, scaleIn, fadeIn, slideInLeft, slideInRight } from "@/lib/animations"

type FormErrors = Partial<Record<keyof PartnershipFormData, string>>

export default function VeteranPartnerships() {
  const [formData, setFormData] = useState<PartnershipFormData>({
    name: '',
    email: '',
    organization: '',
    veteranStatus: '',
    partnershipType: '' as PartnershipFormData['partnershipType'],
    message: '',
    fax: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateField = useCallback((name: keyof PartnershipFormData, value: string) => {
    // Create a partial object for validation
    const testData = { ...formData, [name]: value }
    const result = partnershipFormSchema.safeParse(testData)

    if (!result.success) {
      const fieldError = result.error.issues.find(issue => issue.path[0] === name)
      return fieldError?.message
    }
    return undefined
  }, [formData])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))

    const error = validateField(name as keyof PartnershipFormData, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [validateField])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error when user starts typing (if field was touched)
    if (touched[name] && errors[name as keyof PartnershipFormData]) {
      const error = validateField(name as keyof PartnershipFormData, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')

    // Validate all fields
    const result = partnershipFormSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: FormErrors = {}
      result.error.issues.forEach(err => {
        const field = err.path[0] as keyof PartnershipFormData
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message
        }
      })
      setErrors(fieldErrors)
      setTouched({ name: true, email: true, organization: true, veteranStatus: true, partnershipType: true, message: true })
      return
    }

    setIsSubmitting(true)

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
          partnershipType: '' as PartnershipFormData['partnershipType'],
          message: ''
        })
        setErrors({})
        setTouched({})
      } else {
        const data = await response.json()
        if (data.errors) {
          setErrors(data.errors)
        }
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-sm-surface-inverse text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-sm-surface-inverse-alt/40 pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            {...slideInUp}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              {...scaleIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-sm-surface-inverse-alt/50 border border-sm-accent-inverse/40 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
                <Shield className="w-4 h-4 text-sm-accent-inverse" />
                <span className="text-sm-text-inverse-muted">Veteran Partnership Program</span>
              </div>
            </motion.div>

            <motion.h1
              {...slideInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-sm-text-inverse">Partner with</span>
              <span className="block text-sm-accent-inverse drop-shadow-lg">Veteran Leaders</span>
            </motion.h1>

            <motion.p
              {...slideInUp}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-sm-text-inverse-muted mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Join forces with Steel Motion LLC to deliver mission-critical technology solutions.
              Together, we can serve veteran communities and drive innovation with military precision.
            </motion.p>

            {/* Partnership Types */}
            <motion.div
              {...fadeIn}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              <div className="bg-sm-surface-inverse-alt/40 border border-sm-border-inverse rounded-2xl p-6 backdrop-blur-sm">
                <Users className="w-8 h-8 text-sm-accent-inverse mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 text-sm-text-inverse">Veteran Organizations</h3>
                <p className="text-sm-text-inverse-muted text-sm">VSOs, veteran nonprofits, and community groups</p>
              </div>

              <div className="bg-sm-surface-inverse-alt/40 border border-sm-border-inverse rounded-2xl p-6 backdrop-blur-sm">
                <Target className="w-8 h-8 text-sm-accent-inverse mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 text-sm-text-inverse">Defense Contractors</h3>
                <p className="text-sm-text-inverse-muted text-sm">Prime contractors and specialized defense firms</p>
              </div>

              <div className="bg-sm-surface-inverse-alt/40 border border-sm-border-inverse rounded-2xl p-6 backdrop-blur-sm">
                <Handshake className="w-8 h-8 text-sm-accent-inverse mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 text-sm-text-inverse">Strategic Alliances</h3>
                <p className="text-sm-text-inverse-muted text-sm">Technology partnerships and joint ventures</p>
              </div>
            </motion.div>

            {/* Call to Action Button */}
            <motion.div
              {...slideInUp}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-12 text-center"
            >
              <Button
                onClick={() => {
                  document.getElementById('partnership-form')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  })
                }}
                className="bg-sm-accent-inverse hover:bg-[#2CC4B0] text-sm-surface-inverse font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Partner with Us
                <Handshake className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Form Section */}
      <section id="partnership-form" className="py-20 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              {...slideInLeft}
            >
              <Card className="bg-sm-surface-elevated border-sm-border-default" style={{ boxShadow: 'var(--sm-shadow-md)' }}>
                <CardHeader>
                  <CardTitle className="text-2xl text-sm-text-primary">Partnership Inquiry</CardTitle>
                  <CardDescription className="text-sm-text-secondary">
                    Tell us about your organization and partnership goals. We&apos;ll connect you with our team within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        label="Full Name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name ? errors.name : undefined}
                        required
                        placeholder="Your full name"
                      />
                      <FormField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email ? errors.email : undefined}
                        required
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Honeypot field */}
                    <div className="hidden" aria-hidden="true">
                      <FormField
                        label="Fax"
                        name="fax"
                        type="text"
                        value={formData.fax || ''}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <FormField
                      label="Organization/Company"
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.organization ? errors.organization : undefined}
                      required
                      placeholder="Your organization name"
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        label="Veteran Status"
                        name="veteranStatus"
                        type="select"
                        value={formData.veteranStatus || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.veteranStatus ? errors.veteranStatus : undefined}
                      >
                        <option value="">Select status</option>
                        <option value="veteran">Veteran</option>
                        <option value="active-duty">Active Duty</option>
                        <option value="military-spouse">Military Spouse</option>
                        <option value="civilian">Civilian</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </FormField>

                      <FormField
                        label="Partnership Type"
                        name="partnershipType"
                        type="select"
                        value={formData.partnershipType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.partnershipType ? errors.partnershipType : undefined}
                        required
                      >
                        <option value="">Select type</option>
                        <option value="veteran-organization">Veteran Organization</option>
                        <option value="defense-contractor">Defense Contractor</option>
                        <option value="technology-partnership">Technology Partnership</option>
                        <option value="joint-venture">Joint Venture</option>
                        <option value="subcontracting">Subcontracting</option>
                        <option value="other">Other</option>
                      </FormField>
                    </div>

                    <FormField
                      label="Partnership Details"
                      name="message"
                      type="textarea"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.message ? errors.message : undefined}
                      required
                      rows={5}
                      placeholder="Describe your partnership goals, project scope, timeline, and how we can work together..."
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-sm-accent-primary hover:bg-sm-accent-primary-hover disabled:bg-sm-accent-primary/50 disabled:cursor-not-allowed text-white py-6 text-lg rounded-lg group transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                          Sending Partnership Inquiry...
                        </>
                      ) : (
                        <>
                          Submit Partnership Inquiry
                          <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>

                    {/* Status messages with aria-live for accessibility */}
                    <div aria-live="polite" aria-atomic="true">
                      {submitStatus === 'success' && (
                        <motion.div
                          {...fadeIn}
                          className="bg-green-600 border border-green-500 text-white px-4 py-3 rounded-lg"
                          role="alert"
                        >
                          <p className="font-medium">Partnership inquiry sent successfully!</p>
                          <p className="text-sm opacity-90">We&apos;ll review your submission and get back to you within 24 hours.</p>
                        </motion.div>
                      )}

                      {submitStatus === 'error' && (
                        <motion.div
                          {...fadeIn}
                          className="bg-red-600 border border-red-500 text-white px-4 py-3 rounded-lg"
                          role="alert"
                        >
                          <p className="font-medium">Failed to send partnership inquiry</p>
                          <p className="text-sm opacity-90">Please try again or contact us directly at contact@steelmotionllc.com</p>
                        </motion.div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Partnership Information */}
            <motion.div
              {...slideInRight}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-sm-text-primary">Partnership Opportunities</h3>
                <p className="text-sm-text-secondary mb-8 leading-relaxed">
                  Steel Motion LLC is committed to building strong partnerships within the veteran
                  community and defense sector. We believe in the power of collaboration to deliver
                  exceptional results and support our fellow veterans.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-sm-accent-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm-text-primary mb-2">Veteran-First Approach</h4>
                    <p className="text-sm-text-secondary">
                      We prioritize partnerships with veteran-owned businesses and organizations
                      that share our commitment to excellence and service.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-sm-accent-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm-text-primary mb-2">Mission-Critical Solutions</h4>
                    <p className="text-sm-text-secondary">
                      Partner with us on defense contracts, government projects, and enterprise
                      solutions that make a real impact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-sm-accent-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm-text-primary mb-2">Community Impact</h4>
                    <p className="text-sm-text-secondary">
                      Join us in supporting veteran communities through technology, training,
                      and employment opportunities.
                    </p>
                  </div>
                </div>

              </div>

              <div className="bg-sm-surface-elevated border border-sm-border-default rounded-lg p-6 mt-8" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
                <h4 className="text-lg font-semibold text-sm-text-primary mb-3">Response Time</h4>
                <p className="text-sm-text-secondary text-sm">
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
