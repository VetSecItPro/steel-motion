'use client'

import { motion } from "framer-motion"
import { Shield, Award, Globe, Lightbulb, Cloud, GraduationCap } from "lucide-react"
import Image from "next/image"
import { slideInUp, scaleIn, slideInLeft, slideInRight } from "@/lib/animations"

const expertise = [
  {
    icon: Award,
    title: "Battle-Tested Leader",
    description: "U.S. Army veteran managing multimillion-dollar global IT missions."
  },
  {
    icon: Shield,
    title: "Cybersecurity Strategist",
    description: "10+ years securing cloud, SaaS, and enterprise systems."
  },
  {
    icon: GraduationCap,
    title: "Educator & Mentor",
    description: "Training hundreds of students and veterans to earn top cyber certs."
  },
  {
    icon: Cloud,
    title: "Cloud Risk Expert",
    description: "Former AWS engineer, cutting security incidents and compliance gaps."
  },
  {
    icon: Lightbulb,
    title: "Innovation Driver",
    description: "Built frameworks and content powering growth, audits, and product launches."
  },
  {
    icon: Globe,
    title: "Global Communicator",
    description: "Fluent in Arabic, French, and English, bridging cultures and teams."
  }
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-sm-surface-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          {...slideInUp}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 max-w-4xl mx-auto">
            {/* Profile Picture */}
            <motion.div
              {...scaleIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-sm-accent-primary/30 relative" style={{ boxShadow: 'var(--sm-shadow-lg)' }}>
                <Image
                  src="/images/profile-picture.jpg"
                  alt="Anouar K. Bencheqroun MBA CISSP"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-sm-accent-primary-light text-sm-accent-primary border border-sm-accent-primary/30 rounded-full px-4 py-2 text-sm font-medium mb-6">
                About Our Founder
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-sm-text-primary mb-6">
                Meet Anouar K. Bencheqroun MBA CISSP
              </h2>
              <p className="text-xl text-sm-text-secondary leading-relaxed max-w-prose">
                Veteran technology leader combining military precision with cutting-edge innovation
                to deliver transformational cybersecurity and AI solutions.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Professional Story */}
          <motion.div
            {...slideInLeft}
            className="space-y-8"
          >
            <div className="bg-sm-surface-elevated rounded-2xl p-8 border border-sm-border-default" style={{ boxShadow: 'var(--sm-shadow-md)' }}>
              <blockquote className="text-2xl text-sm-text-primary italic mb-6 text-center font-medium max-w-prose">
                &ldquo;Focus beats frenzy every time.&rdquo;
              </blockquote>
              <div className="text-sm-text-secondary leading-relaxed text-lg max-w-prose">
                <p>
                  U.S. Army veteran. Cybersecurity strategist. I&apos;ve led IT operations across four continents and now help businesses secure their infrastructure and harness AI. Dual master&apos;s degrees, CISSP certified, and I teach at Purdue University because giving back matters. I build things that work and solve real problems.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Expertise & Credentials */}
          <motion.div
            {...slideInRight}
            className="space-y-8"
          >
            {/* Expertise Areas */}
            <div>
              <h3 className="text-2xl font-bold text-sm-text-primary mb-6">Core Expertise</h3>
              <div className="grid gap-4">
                {expertise.map((item, index) => (
                  <motion.div
                    key={index}
                    {...slideInUp}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-sm-surface-elevated rounded-xl border border-sm-border-default hover:border-sm-accent-primary/30 transition-colors"
                    style={{ boxShadow: 'var(--sm-shadow-sm)' }}
                  >
                    <div className="w-12 h-12 bg-sm-accent-primary-light rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-sm-accent-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm-text-primary mb-1">{item.title}</h4>
                      <p className="text-sm text-sm-text-secondary leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
