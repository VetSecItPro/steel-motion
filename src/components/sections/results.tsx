'use client'

import { motion } from "framer-motion"
import { Package, Shield, MapPin } from "lucide-react"
import { slideInUp } from "@/lib/animations"

{/* TODO: Replace with real client testimonials when available */}

const results = [
  {
    stat: "4",
    label: "SaaS Products Shipped",
    description:
      "We've taken 4 products from idea to live, paying customers. We know how to ship.",
    icon: Package,
  },
  {
    stat: "100%",
    label: "Zero Security Incidents",
    description:
      "Your customer data stays safe. Every project includes encryption, access controls, and security testing from day one.",
    icon: Shield,
  },
  {
    stat: "DFW",
    label: "Based, Veteran-Owned",
    description:
      "Right here in DFW. We answer the phone, we hit deadlines, and we stand behind every line of code.",
    icon: MapPin,
  },
]

export default function Results() {
  return (
    <section className="py-20 bg-sm-surface-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div {...slideInUp} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-sm-text-primary">
            Our Track Record
          </h2>
        </motion.div>

        {/* Asymmetric zig-zag layout: first card spans left 7 cols, second right 5 cols offset, third left 8 cols */}
        <div className="max-w-5xl mx-auto space-y-6">
          {results.map((item, i) => {
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={item.label}
                {...slideInUp}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`flex ${isEven ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`
                    relative bg-sm-surface-elevated border border-sm-border-default rounded-2xl p-8
                    hover:border-sm-accent-primary/30 transition-all duration-300
                    w-full ${isEven ? "md:w-[65%]" : "md:w-[55%]"}
                  `}
                  style={{ boxShadow: "var(--sm-shadow-sm)" }}
                >
                  {/* Subtle gradient accent line at top */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-sm-accent-primary/30 to-transparent" />

                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-sm-accent-primary-light rounded-xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-sm-accent-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-sm-accent-primary leading-none">
                          {item.stat}
                        </span>
                        <span className="text-lg font-semibold text-sm-text-primary">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-sm-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
