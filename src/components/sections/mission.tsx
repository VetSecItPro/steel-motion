'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Shield, Target, Users } from "lucide-react"
import { slideInUp } from "@/lib/animations"

export default function Mission() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-[#0f2640] via-[#1a3a5c] to-[#0f2640]">
      <div className="container mx-auto px-4">
        <motion.div
          {...slideInUp}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-[#00F2FF]/10 text-[#00F2FF] hover:bg-[#00F2FF]/20 border border-[#00F2FF]/30">
            Our Mission
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Precision, Innovation, and Service
          </h2>
          <p className="text-xl text-[#B3B3B3] leading-relaxed">
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
            <div className="bg-[#1a3a5c] border border-[#00F2FF]/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00F2FF]/10 transition-colors duration-300">
              <Shield className="w-8 h-8 text-[#00F2FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Veteran Leadership</h3>
            <p className="text-[#B3B3B3]">
              Led by experienced veterans who understand the importance of reliability,
              precision, and getting the mission done right the first time.
            </p>
          </motion.div>

          <motion.div
            {...slideInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center group"
          >
            <div className="bg-[#1a3a5c] border border-[#00F2FF]/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00F2FF]/10 transition-colors duration-300">
              <Target className="w-8 h-8 text-[#00F2FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Mission-Focused</h3>
            <p className="text-[#B3B3B3]">
              Every project is approached with military precision and a clear objective:
              delivering measurable results that drive your business forward.
            </p>
          </motion.div>

          <motion.div
            {...slideInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center group"
          >
            <div className="bg-[#1a3a5c] border border-[#00F2FF]/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00F2FF]/10 transition-colors duration-300">
              <Users className="w-8 h-8 text-[#00F2FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Collaborative Approach</h3>
            <p className="text-[#B3B3B3]">
              We partner with fellow veterans and innovative minds to create solutions
              that combine diverse expertise and proven methodologies.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}