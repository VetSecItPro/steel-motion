'use client'

import { motion } from "framer-motion"
import { Search, ClipboardCheck, Rocket, TrendingUp } from "lucide-react"
import { useDevice } from "@/lib/contexts/DeviceContext"
import { slideInUp, slideInLeft } from "@/lib/animations"

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "We start by understanding your challenges, goals, and current systems. No assumptions, just deep listening and strategic questions.",
    deliverables: ["Stakeholder interviews", "Systems audit", "Requirements document"]
  },
  {
    icon: ClipboardCheck,
    title: "Assessment",
    description: "Our team analyzes your data, identifies opportunities, and designs a solution architecture tailored to your specific needs.",
    deliverables: ["Gap analysis", "Solution blueprint", "ROI projections"]
  },
  {
    icon: Rocket,
    title: "Implementation",
    description: "We deploy with military precision: iterative releases, continuous testing, and transparent communication at every milestone.",
    deliverables: ["Agile sprints", "Quality assurance", "User training"]
  },
  {
    icon: TrendingUp,
    title: "Optimization",
    description: "Post-launch, we monitor performance, gather feedback, and continuously improve. Your success is our ongoing mission.",
    deliverables: ["Performance monitoring", "Iterative improvements", "Knowledge transfer"]
  }
]

export default function EngagementProcess() {
  const { isDesktop } = useDevice();

  return (
    <section id="process" className="py-24 bg-sm-surface-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          {...slideInUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-sm-accent-primary-light text-sm-accent-primary border border-sm-accent-primary/30 rounded-full px-4 py-2 text-sm font-medium mb-4">
            How We Work
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-sm-text-primary">
            Our Engagement <span className="text-sm-accent-primary">Methodology</span>
          </h2>
          <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto">
            A battle-tested process refined through years of delivering mission-critical solutions.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        {isDesktop && (
          <div className="grid grid-cols-4 gap-8 items-stretch">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                {...slideInUp}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col"
              >
                {/* Step number and icon */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-sm-accent-primary-light border-2 border-sm-accent-primary flex items-center justify-center z-10 relative">
                      <step.icon className="w-8 h-8 text-sm-accent-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-sm-accent-primary flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-3 text-sm-text-primary">{step.title}</h3>
                  <p className="text-sm-text-secondary text-sm mb-4 leading-relaxed flex-1">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="bg-sm-surface-elevated border border-sm-border-default rounded-lg p-4 mt-auto" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
                    <p className="text-xs text-sm-accent-primary font-medium mb-2 text-left">Deliverables:</p>
                    <ul className="space-y-1">
                      {step.deliverables.map((item) => (
                        <li key={item} className="text-xs text-sm-text-secondary flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-sm-accent-primary flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile/Tablet vertical timeline */}
        {!isDesktop && (
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              {...slideInLeft}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-6"
            >
              {/* Left side - icon */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-sm-accent-primary-light border-2 border-sm-accent-primary flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-sm-accent-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-sm-accent-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-full bg-gradient-to-b from-sm-accent-primary/60 to-sm-accent-primary/20 mt-4"></div>
                )}
              </div>

              {/* Right side - content */}
              <div className="flex-1 pb-8">
                <h3 className="text-lg font-bold mb-2 text-sm-text-primary">{step.title}</h3>
                <p className="text-sm-text-secondary text-sm mb-4 leading-relaxed">
                  {step.description}
                </p>

                <div className="bg-sm-surface-elevated border border-sm-border-default rounded-lg p-4" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
                  <p className="text-xs text-sm-accent-primary font-medium mb-2">Deliverables:</p>
                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.map((item) => (
                      <span key={item} className="text-xs text-sm-text-secondary bg-sm-surface-secondary px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}
