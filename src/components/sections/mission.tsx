'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Shield, Target, Users } from "lucide-react"

export default function Mission() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-[#00F2FF]/10 text-[#00F2FF] hover:bg-[#00F2FF]/20 border border-[#00F2FF]/30">
            Our Mission
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Precision, Innovation, and Service
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            At Steel Motion LLC, we combine military precision with cutting-edge technology to deliver
            AI solutions that transform how businesses operate. Our veteran leadership brings proven
            experience in mission-critical environments to your digital transformation journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center group"
          >
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00F2FF]/10 transition-colors duration-300">
              <Shield className="w-8 h-8 text-slate-700 group-hover:text-[#00F2FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Veteran Leadership</h3>
            <p className="text-slate-600">
              Led by experienced veterans who understand the importance of reliability,
              precision, and getting the mission done right the first time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center group"
          >
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00F2FF]/10 transition-colors duration-300">
              <Target className="w-8 h-8 text-slate-700 group-hover:text-[#00F2FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Mission-Focused</h3>
            <p className="text-slate-600">
              Every project is approached with military precision and a clear objective:
              delivering measurable results that drive your business forward.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center group"
          >
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00F2FF]/10 transition-colors duration-300">
              <Users className="w-8 h-8 text-slate-700 group-hover:text-[#00F2FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Collaborative Approach</h3>
            <p className="text-slate-600">
              We partner with fellow veterans and innovative minds to create solutions
              that combine diverse expertise and proven methodologies.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}