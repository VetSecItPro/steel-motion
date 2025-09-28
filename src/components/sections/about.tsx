'use client'

import { motion } from "framer-motion"
import { Shield, Award, Globe, Users, BookOpen, Lightbulb } from "lucide-react"

const certifications = [
  "Microsoft Security, Compliance and Identity Fundamentals",
  "CompTIA Security+, A+, and Linux+",
  "AWS Cloud Practitioner",
  "EC-Council Certified Ethical Hacker",
  "Computer Hacking Forensic Investigator"
]

const languages = ["Arabic", "French", "English"]

const expertise = [
  {
    icon: Shield,
    title: "Cybersecurity Leadership",
    description: "Expert-level security assessments, ethical hacking, and forensic investigation capabilities"
  },
  {
    icon: Award,
    title: "Military Veteran",
    description: "Extensive international service experience with proven leadership and strategic thinking"
  },
  {
    icon: Globe,
    title: "Multilingual Professional",
    description: "Fluent communication in Arabic, French, and English for global technology solutions"
  },
  {
    icon: Users,
    title: "Mentor & Educator",
    description: "Career readiness coach supporting veteran transitions and professional development"
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description: "Advanced education from The George Washington University and ongoing professional development"
  },
  {
    icon: Lightbulb,
    title: "Innovation Focus",
    description: "Strategic AI integration and digital transformation expertise for modern enterprises"
  }
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/30 rounded-full px-4 py-2 text-sm font-medium mb-6">
            About Our Founder
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Anouar K. Bencheqroun MBA CISSP
          </h2>
          <p className="text-xl text-[#B3B3B3] max-w-3xl mx-auto leading-relaxed">
            Veteran technology leader combining military precision with cutting-edge innovation
            to deliver transformational cybersecurity and AI solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Professional Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-[#1a3a5c]/50 rounded-2xl p-8 border border-[#00F2FF]/20">
              <h3 className="text-2xl font-bold text-[#00F2FF] mb-4">Professional Philosophy</h3>
              <blockquote className="text-lg text-white italic mb-4">
                &ldquo;Focus beats frenzy every time&rdquo;
              </blockquote>
              <p className="text-[#B3B3B3] leading-relaxed">
                This guiding principle drives our strategic, intentional approach to technology adoption.
                We believe in purposeful innovation that delivers measurable results, not just trendy solutions.
              </p>
            </div>

            <div className="bg-[#1a3a5c]/50 rounded-2xl p-8 border border-[#00F2FF]/20">
              <h3 className="text-2xl font-bold text-[#00F2FF] mb-4">Mission-Driven Impact</h3>
              <p className="text-[#B3B3B3] leading-relaxed mb-4">
                Beyond client work, Anouar is deeply committed to supporting fellow veterans and the next
                generation of technology professionals. As a Career Readiness Coach with FourBlock and
                mentor with ACT NOW EDUCATION, he helps veterans successfully transition into technology careers.
              </p>
              <p className="text-[#B3B3B3] leading-relaxed">
                His thought leadership includes insights on &ldquo;The First Artificial Generation&rdquo; - exploring
                how the Class of 2026 learned to think alongside machines, shaping the future of AI-human collaboration.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Expertise & Credentials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Expertise Areas */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Core Expertise</h3>
              <div className="grid gap-4">
                {expertise.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-[#1a3a5c]/30 rounded-xl border border-[#00F2FF]/10 hover:border-[#00F2FF]/30 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00F2FF]/20 to-[#33CCFF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#00F2FF]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-[#B3B3B3] leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Credentials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          {/* Certifications */}
          <div className="bg-[#1a3a5c]/50 rounded-2xl p-8 border border-[#00F2FF]/20">
            <h3 className="text-2xl font-bold text-[#00F2FF] mb-6">Professional Certifications</h3>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-[#00F2FF] rounded-full flex-shrink-0"></div>
                  <span className="text-[#B3B3B3]">{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Languages */}
          <div className="space-y-8">
            <div className="bg-[#1a3a5c]/50 rounded-2xl p-8 border border-[#00F2FF]/20">
              <h3 className="text-2xl font-bold text-[#00F2FF] mb-6">Education</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#00F2FF] rounded-full"></div>
                  <span className="text-[#B3B3B3]">The George Washington University (2022-2025)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#00F2FF] rounded-full"></div>
                  <span className="text-[#B3B3B3]">Purdue Global - Current Association</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1a3a5c]/50 rounded-2xl p-8 border border-[#00F2FF]/20">
              <h3 className="text-2xl font-bold text-[#00F2FF] mb-6">Languages</h3>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-gradient-to-r from-[#00F2FF]/20 to-[#33CCFF]/20 rounded-full text-[#00F2FF] border border-[#00F2FF]/30"
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}