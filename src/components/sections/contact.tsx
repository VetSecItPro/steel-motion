'use client'

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Send, Loader2 } from "lucide-react"
import { FormField } from "@/components/ui/form-field"
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact"
import { slideInUp, slideInLeft, slideInRight, fadeIn } from "@/lib/animations"

type FormErrors = Partial<Record<keyof ContactFormData, string>>

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    fax: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateField = useCallback((name: keyof ContactFormData, value: string) => {
    const fieldSchema = contactFormSchema.shape[name]
    const result = fieldSchema.safeParse(value)

    if (!result.success) {
      return result.error.issues[0]?.message || 'Invalid value'
    }
    return undefined
  }, [])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))

    const error = validateField(name as keyof ContactFormData, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [validateField])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (touched[name] && errors[name as keyof ContactFormData]) {
      const error = validateField(name as keyof ContactFormData, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')

    const result = contactFormSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: FormErrors = {}
      result.error.issues.forEach(err => {
        const field = err.path[0] as keyof ContactFormData
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message
        }
      })
      setErrors(fieldErrors)
      setTouched({ name: true, email: true, company: true, message: true })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', message: '' })
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
    <section id="contact" className="py-24 bg-sm-surface-inverse text-sm-text-inverse">
      <div className="container mx-auto px-4">
        <motion.div
          {...slideInUp}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-sm-accent-inverse/10 text-sm-accent-inverse border-0 hover:bg-sm-accent-inverse/20">
            Get Started
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sm-text-inverse">
            Let&apos;s Talk About Your Project
          </h2>
          <p className="text-xl text-sm-text-inverse-muted max-w-3xl mx-auto">
            Book a free 30-minute strategy call. No pitch deck, no pressure. We&apos;ll discuss your goals and tell you honestly if we&apos;re the right fit.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            {...slideInLeft}
          >
            <Card className="bg-sm-surface-elevated border-sm-border-default">
              <CardHeader>
                <CardTitle className="text-2xl text-sm-text-primary">Send us a message</CardTitle>
                <CardDescription className="text-sm-text-secondary">
                  Tell us about your project and we&apos;ll get back to you within 24 hours.
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
                      inputClassName="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
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
                      inputClassName="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                    />
                  </div>

                  {/* Honeypot field - hidden from users */}
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
                    label="Company/Organization"
                    name="company"
                    type="text"
                    value={formData.company || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.company ? errors.company : undefined}
                    placeholder="Your company name"
                    inputClassName="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                  />

                  <FormField
                    label="Tell us about your project"
                    name="message"
                    type="textarea"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.message ? errors.message : undefined}
                    required
                    rows={5}
                    placeholder="What are you trying to build or automate? What's your timeline?"
                    inputClassName="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sm-accent-primary hover:bg-sm-accent-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white py-6 text-lg rounded-lg group transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <div aria-live="polite" aria-atomic="true">
                    {submitStatus === 'success' && (
                      <motion.div
                        {...fadeIn}
                        className="bg-sm-status-success-light border border-sm-status-success/20 text-sm-status-success px-4 py-3 rounded-lg"
                        role="alert"
                      >
                        <p className="font-medium">Message sent successfully!</p>
                        <p className="text-sm opacity-90">We&apos;ll get back to you within 24 hours.</p>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        {...fadeIn}
                        className="bg-sm-status-error-light border border-sm-status-error/20 text-sm-status-error px-4 py-3 rounded-lg"
                        role="alert"
                      >
                        <p className="font-medium">Failed to send message</p>
                        <p className="text-sm opacity-90">Please try again or contact us directly at contact@steelmotionllc.com</p>
                      </motion.div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            {...slideInRight}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-sm-text-inverse">Get in Touch</h3>
              <p className="text-sm-text-inverse-muted mb-8 leading-relaxed">
                Reach out by form or email. We respond to all messages within one business day.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-sm-accent-inverse/10 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-sm-accent-inverse" />
                </div>
                <div>
                  <p className="font-semibold text-sm-text-inverse">Email</p>
                  <a href="mailto:contact@steelmotionllc.com" className="text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors">
                    contact@steelmotionllc.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-sm-accent-inverse/10 w-12 h-12 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-sm-accent-inverse" />
                </div>
                <div>
                  <p className="font-semibold text-sm-text-inverse">Service Area</p>
                  <p className="text-sm-text-inverse-muted">Nationwide Remote (Responsive on Zoom as needed)</p>
                </div>
              </div>
            </div>

            <div className="bg-sm-surface-inverse-alt border border-sm-border-inverse rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-sm-text-inverse mb-3">Response Time</h4>
              <p className="text-sm-text-inverse-muted text-sm">
                We respond to all inquiries within 24 hours on business days.
                For urgent matters, mention &ldquo;URGENT&rdquo; in your message subject.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
