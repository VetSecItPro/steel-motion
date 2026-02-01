'use client'

import { motion } from "framer-motion"
import { Shield, Target, BookOpen } from "lucide-react"
import { slideInUp } from "@/lib/animations"

const pillars = [
  {
    icon: Shield,
    title: "Accountability First",
    description: "One point of contact owns your project from kickoff to delivery. You get clear deliverables, weekly updates, and direct access to the person doing the work.",
  },
  {
    icon: Target,
    title: "Outcome-Driven",
    description: "We define success metrics before writing a line of code. Every project includes an ROI framework with milestones you track in real time.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Transfer",
    description: "We build solutions your team maintains after we leave. Documentation, training, and architecture reviews are included in every engagement. No vendor lock-in.",
  },
]

export default function HowWeWork() {
  return (
    <section className="py-24 bg-sm-surface-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            {...slideInUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-sm-accent-primary-light text-sm-accent-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
              How We Work
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-primary">
              Results You Measure, Not Promises You Hope For
            </h2>
            <p className="text-lg text-sm-text-secondary leading-relaxed max-w-4xl mx-auto">
              Every engagement starts with defined success metrics and ends with verified outcomes. One point of contact. Full accountability. No handoffs, no finger-pointing.
            </p>
          </motion.div>

          {/* Three pillars */}
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                {...slideInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl p-8 hover:shadow-[var(--sm-shadow-md)] transition-all duration-300 h-full" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
                  <div className="bg-sm-accent-primary-light border border-sm-accent-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sm-accent-primary/10 transition-colors duration-300">
                    <pillar.icon className="w-8 h-8 text-sm-accent-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-sm-text-primary">{pillar.title}</h3>
                  <p className="text-sm-text-secondary leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
