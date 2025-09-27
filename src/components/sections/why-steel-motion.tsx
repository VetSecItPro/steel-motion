'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Award, Clock, Lightbulb } from "lucide-react"

export default function WhySteelMotion() {
  const advantages = [
    {
      icon: Award,
      title: "Veteran-Owned Excellence",
      description: "Bringing military precision, discipline, and commitment to every project we undertake."
    },
    {
      icon: Lightbulb,
      title: "Cutting-Edge Innovation",
      description: "Stay ahead of the curve with the latest AI technologies and development methodologies."
    },
    {
      icon: Clock,
      title: "Mission-Critical Reliability",
      description: "Trained to deliver under pressure with zero tolerance for failure or missed deadlines."
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "Track record of successful transformations across diverse industries and business sizes."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Why Choose Steel Motion
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              The Steel Motion Difference
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              When you choose Steel Motion LLC, you're not just hiring a technology consultant —
              you're partnering with a team that understands the importance of mission success,
              operational excellence, and unwavering commitment to results.
            </p>

            <div className="space-y-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <advantage.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-slate-600">
                      {advantage.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-2xl p-8 text-white">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
                <p className="text-slate-300 leading-relaxed">
                  "In the military, mission failure is not an option. That same dedication
                  drives everything we do at Steel Motion. Your success is our mission."
                </p>
              </div>

              <div className="border-t border-slate-600 pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Steel Motion LLC</p>
                    <p className="text-slate-400 text-sm">Veteran-Led Technology Solutions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-full opacity-10"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-slate-400 rounded-full opacity-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}