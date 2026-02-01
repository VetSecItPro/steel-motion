'use client'

import { motion } from "framer-motion"
import { Bot, Code, Workflow, FileSearch, BarChart3, BrainCircuit, Globe, Cloud, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { slideInUp } from "@/lib/animations"

const services = [
  {
    icon: Bot,
    title: "AI Transformation & Automation",
    href: "/services/ai-transformation",
    items: [
      { icon: Workflow, label: "Process automation and workflow optimization" },
      { icon: FileSearch, label: "Intelligent document processing" },
      { icon: BarChart3, label: "Predictive analytics and decision support" },
      { icon: BrainCircuit, label: "LLM integration and AI agent development" },
    ],
  },
  {
    icon: Code,
    title: "Custom Application Development",
    href: "/services/custom-development",
    items: [
      { icon: Globe, label: "Full-stack web application development" },
      { icon: Cloud, label: "SaaS product architecture and build" },
      { icon: LinkIcon, label: "API design and third-party integrations" },
      { icon: Cloud, label: "Cloud-native deployment on AWS/Vercel" },
    ],
  },
]

export default function Services() {
  return (
    <section id="solutions" className="py-24 bg-sm-surface-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          {...slideInUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-sm-accent-primary-light text-sm-accent-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            What We Do
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-sm-text-primary">
            Two Core Capabilities. <span className="text-sm-accent-primary">Done Well.</span>
          </h2>
          <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto leading-relaxed">
            We focus on AI automation and custom application development. We do not spread thin across a dozen service lines. Deep expertise in two areas beats shallow knowledge in ten.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              {...slideInUp}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link href={service.href} className="block group">
                <div className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl p-8 hover:shadow-[var(--sm-shadow-md)] transition-all duration-300 h-full" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-sm-accent-primary-light border border-sm-accent-primary/20 rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-sm-accent-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-sm-text-primary group-hover:text-sm-accent-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {service.items.map((item) => (
                      <li key={item.label} className="flex items-start gap-3">
                        <item.icon className="w-4 h-4 text-sm-accent-primary/60 mt-1 flex-shrink-0" />
                        <span className="text-sm-text-secondary leading-relaxed">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...slideInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-sm-text-secondary text-sm">
            We also support{' '}
            <Link href="/services/cloud-infrastructure" className="text-sm-accent-secondary hover:underline">cloud infrastructure</Link>,{' '}
            <Link href="/services/cybersecurity" className="text-sm-accent-secondary hover:underline">cybersecurity</Link>, and{' '}
            <Link href="/services/data-analytics" className="text-sm-accent-secondary hover:underline">data analytics</Link> engagements.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
