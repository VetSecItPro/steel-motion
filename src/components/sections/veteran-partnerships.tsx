'use client'

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ArrowRightLeft, Handshake, Send, Loader2, DollarSign, FolderGit2, Shield, Code, Cpu, Award, Calendar, Paintbrush, TrendingUp, Wrench, UserCheck } from "lucide-react"
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
    partnershipType: '' as PartnershipFormData['partnershipType'],
    message: '',
    fax: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateField = useCallback((name: keyof PartnershipFormData, value: string) => {
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

    if (touched[name] && errors[name as keyof PartnershipFormData]) {
      const error = validateField(name as keyof PartnershipFormData, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')

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
      setTouched({ name: true, email: true, organization: true, partnershipType: true, message: true })
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
          partnershipType: '' as PartnershipFormData['partnershipType'],
          message: '',
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
      // SECURITY: Console logging — FIX-012
      if (process.env.NODE_ENV === 'development') {
        console.error('Error submitting form:', error)
      }
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-sm-surface-inverse text-white pt-24 pb-16 relative overflow-hidden" style={{ backgroundColor: '#0B1A2B', background: 'linear-gradient(135deg, #0B1A2B 0%, #112240 50%, #0B1A2B 100%)' }}>
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
              <div className="inline-flex items-center gap-2 bg-sm-accent-inverse/10 border border-sm-accent-inverse/30 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
                <Handshake className="w-4 h-4 text-sm-accent-inverse" />
                <span className="text-sm-accent-inverse">Partnerships</span>
              </div>
            </motion.div>

            <motion.h1
              {...slideInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-sm-text-inverse">Work </span>
              <span className="text-sm-accent-inverse">With Us</span>
            </motion.h1>

            <motion.p
              {...slideInUp}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-sm-text-inverse-muted mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              We partner with other veteran-owned businesses, freelancers, and agencies
              on referrals, overflow work, and complementary projects. If you build
              something we don&apos;t, or we build something you don&apos;t, let&apos;s talk.
            </motion.p>

            {/* Partnership Types */}
            <motion.div
              {...fadeIn}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              <div className="bg-sm-surface-inverse-alt/40 border border-sm-border-inverse rounded-2xl p-6 backdrop-blur-sm">
                <Users className="w-8 h-8 text-sm-accent-inverse mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 text-sm-text-inverse">Veteran-Owned Businesses</h3>
                <p className="text-sm-text-inverse-muted text-sm">Fellow veteran founders and service-disabled veteran-owned businesses</p>
              </div>

              <div className="bg-sm-surface-inverse-alt/40 border border-sm-border-inverse rounded-2xl p-6 backdrop-blur-sm">
                <ArrowRightLeft className="w-8 h-8 text-sm-accent-inverse mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 text-sm-text-inverse">Referral Partners</h3>
                <p className="text-sm-text-inverse-muted text-sm">Designers, marketers, agencies who refer dev work and receive referrals</p>
              </div>

              <div className="bg-sm-surface-inverse-alt/40 border border-sm-border-inverse rounded-2xl p-6 backdrop-blur-sm">
                <Handshake className="w-8 h-8 text-sm-accent-inverse mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 text-sm-text-inverse">Complementary Services</h3>
                <p className="text-sm-text-inverse-muted text-sm">Freelancers and firms with skills we don&apos;t offer in-house</p>
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
                className="bg-sm-accent-inverse hover:bg-[#2CC4B0] text-sm-surface-inverse font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Send a Partnership Inquiry
                <Handshake className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Bring + What We Look For */}
      <section className="py-20 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div {...slideInLeft}>
              <h3 className="text-2xl font-bold text-sm-text-primary mb-6">What We Bring</h3>
              <div className="space-y-4">
                {[
                  { icon: Code, text: "Full-stack web development (Next.js, React, TypeScript)" },
                  { icon: Cpu, text: "AI automation and LLM integration" },
                  { icon: Award, text: "Veteran-owned business credentials (for joint bidding if applicable)" },
                  { icon: Calendar, text: "Flexible scheduling for overflow and project-based work" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-sm-accent-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm-text-secondary leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...slideInRight}>
              <h3 className="text-2xl font-bold text-sm-text-primary mb-6">What We Look For</h3>
              <div className="space-y-4">
                {[
                  { icon: Paintbrush, text: "Designers, copywriters, and marketers (we build, you brand)" },
                  { icon: TrendingUp, text: "Sales consultants who work with SMBs (you close, we deliver)" },
                  { icon: Wrench, text: "Other developers with complementary skills (mobile, DevOps, data)" },
                  { icon: UserCheck, text: "Veteran-owned businesses in any industry (mutual referrals)" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-sm-accent-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm-text-secondary leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
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
                    Tell us about your business and how you&apos;d like to work together. We respond within 24 hours.
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
                      placeholder="Your business or company name"
                    />

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
                      <option value="referral">Referral Partnership (we send each other leads)</option>
                      <option value="overflow-subcontracting">Overflow / Subcontracting (you need extra dev capacity)</option>
                      <option value="complementary-services">Complementary Services (your skills + our skills)</option>
                      <option value="product-integration">Product Integration (your tool + our tool)</option>
                      <option value="veteran-network">Veteran Business Network</option>
                      <option value="other">Other</option>
                    </FormField>

                    <FormField
                      label="Message"
                      name="message"
                      type="textarea"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.message ? errors.message : undefined}
                      required
                      rows={5}
                      placeholder="Tell us about your business, what you're looking for, and how we might work together..."
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-sm-accent-primary hover:bg-sm-accent-primary-hover disabled:bg-sm-accent-primary/50 disabled:cursor-not-allowed text-white px-6 py-3 group transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Partnership Inquiry
                          <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>

                    {/* Status messages */}
                    <div aria-live="polite" aria-atomic="true">
                      {submitStatus === 'success' && (
                        <motion.div
                          {...fadeIn}
                          className="bg-sm-status-success-light border border-sm-status-success/20 text-sm-status-success px-4 py-3 rounded-lg"
                          role="alert"
                        >
                          <p className="font-medium">Partnership inquiry sent!</p>
                          <p className="text-sm opacity-90">We&apos;ll get back to you within 24 hours.</p>
                        </motion.div>
                      )}

                      {submitStatus === 'error' && (
                        <motion.div
                          {...fadeIn}
                          className="bg-sm-status-error-light border border-sm-status-error/20 text-sm-status-error px-4 py-3 rounded-lg"
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
                  We&apos;re a veteran-owned software company in Texas. We partner with other small
                  businesses on referrals, shared projects, and overflow work. Here&apos;s how a
                  partnership works.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-sm-accent-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm-text-primary mb-2">Referral Revenue</h4>
                    <p className="text-sm-text-secondary">
                      You send us a client who needs dev or automation work. We send you
                      clients who need your services. No formal agreements needed to start.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-sm-accent-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FolderGit2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm-text-primary mb-2">Shared Projects</h4>
                    <p className="text-sm-text-secondary">
                      You bring the design, we bring the code. Or you bring the strategy,
                      we bring the implementation. We scope together, deliver together,
                      split the work based on skills.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-sm-accent-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm-text-primary mb-2">Veteran Network</h4>
                    <p className="text-sm-text-secondary">
                      We prioritize working with other veteran-owned businesses. Same values,
                      same work ethic, shared understanding of accountability and delivery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-sm-surface-elevated border border-sm-border-default rounded-lg p-6 mt-8" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
                <h4 className="text-lg font-semibold text-sm-text-primary mb-3">Response Time</h4>
                <p className="text-sm-text-secondary text-sm">
                  We respond to every inquiry within 24 hours on business days.
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
