'use client'

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"
import { FormField } from "@/components/ui/form-field"
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact"

type FormErrors = Partial<Record<keyof ContactFormData, string>>

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: ''
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

    // Clear error when user starts typing (if field was touched)
    if (touched[name] && errors[name as keyof ContactFormData]) {
      const error = validateField(name as keyof ContactFormData, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')

    // Validate all fields
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
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-blue-900 text-blue-200 hover:bg-blue-800">
            Get Started
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Let&apos;s discuss how Steel Motion can help you leverage AI to streamline operations
            and drive growth. Your first consultation session is completely free.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Send us a message</CardTitle>
                <CardDescription className="text-slate-400">
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
                      inputClassName="bg-slate-700 border-slate-600"
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
                      inputClassName="bg-slate-700 border-slate-600"
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
                    inputClassName="bg-slate-700 border-slate-600"
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
                    placeholder="Describe your project, goals, and how we can help..."
                    inputClassName="bg-slate-700 border-slate-600"
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-6 text-lg rounded-lg group transition-all duration-300"
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

                  {/* Status messages with aria-live for accessibility */}
                  <div aria-live="polite" aria-atomic="true">
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-600 border border-green-500 text-white px-4 py-3 rounded-lg"
                        role="alert"
                      >
                        <p className="font-medium">Message sent successfully!</p>
                        <p className="text-sm opacity-90">We&apos;ll get back to you within 24 hours.</p>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-600 border border-red-500 text-white px-4 py-3 rounded-lg"
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
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Ready to start your digital transformation journey? We&apos;re here to help.
                Whether you need AI consulting, custom development, or cybersecurity services,
                our veteran-led team is ready to deliver results.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a href="mailto:contact@steelmotionllc.com" className="text-slate-400 hover:text-[#00F2FF] transition-colors">
                    contact@steelmotionllc.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <p className="text-slate-400">Available upon request</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Service Area</p>
                  <p className="text-slate-400">Nationwide Remote (Responsive on Zoom as needed)</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-white mb-3">Response Time</h4>
              <p className="text-slate-300 text-sm">
                We typically respond to all inquiries within 24 hours during business days.
                For urgent matters, please mention &ldquo;URGENT&rdquo; in your message subject.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
