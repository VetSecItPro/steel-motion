'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Shield, Target, Users } from "lucide-react"
import { slideInUp } from "@/lib/animations"

export default function Mission() {
  return (
    <section id="about" className="py-20 bg-sm-surface-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          {...slideInUp}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-sm-accent-primary-light text-sm-accent-primary hover:bg-sm-accent-primary-light/80 border border-sm-accent-primary/30">
            Our Mission
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sm-text-primary">
            Precision, Innovation, and Service
          </h2>
          <p className="text-xl text-sm-text-secondary leading-relaxed">
            At Steel Motion LLC, we combine military precision with cutting-edge technology to deliver
            AI solutions that transform how businesses operate. Our veteran leadership brings proven
            experience in mission-critical environments to your digital transformation journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            {...slideInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center group"
          >
            <div className="bg-sm-surface-elevated border border-sm-border-default w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sm-accent-primary-light transition-colors duration-300" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
              <Shield className="w-8 h-8 text-sm-accent-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-sm-text-primary">Veteran Leadership</h3>
            <p className="text-sm-text-secondary">
              Led by experienced veterans who understand the importance of reliability,
              precision, and getting the mission done right the first time.
            </p>
          </motion.div>

          <motion.div
            {...slideInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center group"
          >
            <div className="bg-sm-surface-elevated border border-sm-border-default w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sm-accent-primary-light transition-colors duration-300" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
              <Target className="w-8 h-8 text-sm-accent-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-sm-text-primary">Mission-Focused</h3>
            <p className="text-sm-text-secondary">
              Every project is approached with military precision and a clear objective:
              delivering measurable results that drive your business forward.
            </p>
          </motion.div>

          <motion.div
            {...slideInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center group"
          >
            <div className="bg-sm-surface-elevated border border-sm-border-default w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sm-accent-primary-light transition-colors duration-300" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
              <Users className="w-8 h-8 text-sm-accent-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-sm-text-primary">Collaborative Approach</h3>
            <p className="text-sm-text-secondary">
              We partner with fellow veterans and innovative minds to create solutions
              that combine diverse expertise and proven methodologies.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
