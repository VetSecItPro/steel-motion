'use client'

import { motion } from "framer-motion"
import { Search, ClipboardCheck, Rocket, TrendingUp } from "lucide-react"
import { useDevice } from "@/lib/contexts/DeviceContext"

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
    <section id="process" className="py-24 bg-gradient-to-b from-[#0a1728] to-[#0f2640] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F2FF] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#33CCFF] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/30 rounded-full px-4 py-2 text-sm font-medium mb-4">
            How We Work
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our Engagement <span className="text-[#00F2FF]">Methodology</span>
          </h2>
          <p className="text-lg text-[#B3B3B3] max-w-2xl mx-auto">
            A battle-tested process refined through years of delivering mission-critical solutions.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        {isDesktop && (
          <div className="grid grid-cols-4 gap-8 items-stretch">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col"
              >
                {/* Step number and icon */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-[#1a3a5c] border-2 border-[#00F2FF] flex items-center justify-center z-10 relative">
                      <step.icon className="w-8 h-8 text-[#00F2FF]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#00F2FF] flex items-center justify-center">
                      <span className="text-xs font-bold text-[#0a1728]">{index + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-[#B3B3B3] text-sm mb-4 leading-relaxed flex-1">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="bg-[#1a3a5c]/40 border border-[#00F2FF]/20 rounded-lg p-4 mt-auto">
                    <p className="text-xs text-[#00F2FF] font-medium mb-2 text-left">Deliverables:</p>
                    <ul className="space-y-1">
                      {step.deliverables.map((item) => (
                        <li key={item} className="text-xs text-[#B3B3B3] flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#00F2FF] flex-shrink-0"></span>
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
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-6"
            >
              {/* Left side - icon */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-[#1a3a5c] border-2 border-[#00F2FF] flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-[#00F2FF]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#00F2FF] flex items-center justify-center">
                    <span className="text-xs font-bold text-[#0a1728]">{index + 1}</span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-full bg-gradient-to-b from-[#00F2FF]/60 to-[#00F2FF]/20 mt-4"></div>
                )}
              </div>

              {/* Right side - content */}
              <div className="flex-1 pb-8">
                <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-[#B3B3B3] text-sm mb-4 leading-relaxed">
                  {step.description}
                </p>

                <div className="bg-[#1a3a5c]/40 border border-[#00F2FF]/20 rounded-lg p-4">
                  <p className="text-xs text-[#00F2FF] font-medium mb-2">Deliverables:</p>
                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.map((item) => (
                      <span key={item} className="text-xs text-[#B3B3B3] bg-[#0a1728]/50 px-2 py-1 rounded">
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
