'use client'

import { motion } from "framer-motion"
import { Bot, Code, Workflow, FileSearch, BrainCircuit, Globe, Cloud, Link as LinkIcon, Network, Eye, LineChart } from "lucide-react"
import Link from "next/link"
import { slideInUp } from "@/lib/animations"

const services = [
  {
    icon: Bot,
    title: "AI Transformation & Automation",
    href: "/services/ai-transformation",
    items: [
      { icon: BrainCircuit, label: "AI assistants that handle customer questions, sort emails, and process documents automatically" },
      { icon: Workflow, label: "Automate the repetitive tasks eating up your team's day" },
      { icon: FileSearch, label: "Intelligent document processing" },
    ],
  },
  {
    icon: Network,
    title: "Operations Intelligence",
    href: "/services/operations-intelligence",
    items: [
      { icon: Network, label: "Multi-agent AI systems that coordinate across your entire business" },
      { icon: Eye, label: "Real-time visibility into KPIs, cash flow, and operational risks" },
      { icon: LineChart, label: "Fractional AI operations manager — ongoing optimization and ROI reporting" },
    ],
  },
  {
    icon: Code,
    title: "Custom Application Development",
    href: "/services/custom-development",
    items: [
      { icon: Globe, label: "Custom web apps your team and customers actually use" },
      { icon: Cloud, label: "Turn your business idea into a subscription software product" },
      { icon: LinkIcon, label: "Connect your tools so data flows automatically between them" },
      { icon: Cloud, label: "Hosted and managed — fast, secure, and always online" },
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
            Three Things We Do. <span className="text-sm-accent-primary">Done Right.</span>
          </h2>
          <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto leading-relaxed">
            AI automation, operations intelligence, and custom application development. We do not spread thin across a dozen service lines. Deep expertise in three areas beats shallow knowledge in ten.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

        <motion.p
          {...slideInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm-text-secondary mt-12 max-w-3xl mx-auto leading-relaxed"
        >
          We work with small and mid-sized businesses across Dallas-Fort Worth — restaurants, dental offices, law firms, contractors, and e-commerce stores.
        </motion.p>
      </div>
    </section>
  )
}
