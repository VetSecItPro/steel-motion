'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Package, UserCheck, FileText, Handshake } from "lucide-react"
import Link from "next/link"
import { slideInUp } from "@/lib/animations"

const differentiators = [
  {
    icon: Package,
    title: "We Build Our Own Products",
    description: "We run three SaaS products on the same tech stack we recommend to clients. Our advice comes from daily operational experience, not textbooks."
  },
  {
    icon: UserCheck,
    title: "One Person, Full Ownership",
    description: "No account managers, no junior handoffs. The person who scopes your project is the person who builds it and deploys it."
  },
  {
    icon: FileText,
    title: "Fixed Scope, No Surprises",
    description: "Every project starts with a written scope, fixed timeline, and agreed budget. If scope changes, we discuss it before the meter runs."
  },
]

export default function WhySteelMotion() {
  return (
    <section className="py-24 bg-sm-surface-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            {...slideInUp}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4 bg-sm-accent-primary-light text-sm-accent-primary border-0 hover:bg-sm-accent-primary-light">
              Why Steel Motion
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-sm-text-primary">
              What Makes Us <span className="text-sm-accent-primary">Different</span>
            </h2>
          </motion.div>

          {/* Differentiators Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                {...slideInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl p-8 hover:shadow-[var(--sm-shadow-md)] transition-all duration-300 h-full" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
                  <div className="bg-sm-accent-primary-light border border-sm-accent-primary/20 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-7 h-7 text-sm-accent-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-sm-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Veteran Partnerships Box */}
          <motion.div
            {...slideInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <Link href="/partnerships" className="block group">
              <div className="bg-sm-surface-elevated rounded-2xl p-8 border border-sm-border-default hover:shadow-[var(--sm-shadow-md)] transition-all duration-300" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-sm-accent-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-sm-text-primary group-hover:text-sm-accent-primary transition-colors">Veteran Partnerships</h3>
                    <p className="text-sm-text-muted text-sm">Supporting veteran-owned businesses and communities</p>
                  </div>
                </div>
                <p className="text-sm-text-secondary leading-relaxed">
                  We partner with veteran organizations on technology initiatives. If you&apos;re a veteran-owned business looking for a technology partner, or a veteran org that needs development support, reach out.
                </p>
                <div className="mt-4 text-sm-accent-secondary font-medium group-hover:underline transition-colors">
                  Learn more about partnerships →
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
