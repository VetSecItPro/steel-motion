'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Award, Clock, Lightbulb, Handshake } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { slideInLeft, slideInRight, slideInUp } from "@/lib/animations"

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
    <section className="py-10 bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            {...slideInLeft}
          >
            <Badge variant="secondary" className="mb-4 bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/30 hover:bg-[#00F2FF]/20">
              Why Choose Steel Motion
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              The Steel Motion Difference
            </h2>
            <p className="text-xl text-[#B3B3B3] mb-8 leading-relaxed">
              When you choose Steel Motion LLC, you&apos;re not just hiring a technology consultant.
              You&apos;re partnering with a team that understands the importance of mission success,
              operational excellence, and unwavering commitment to results.
            </p>

            <div className="space-y-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  {...slideInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="bg-[#1a3a5c] border border-[#00F2FF]/30 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <advantage.icon className="w-6 h-6 text-[#00F2FF]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-[#B3B3B3]">
                      {advantage.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...slideInRight}
            className="space-y-6"
          >
            {/* Our Commitment Box */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-2xl p-8 text-white">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
                  <p className="text-slate-300 leading-relaxed">
                    &ldquo;In the military, mission failure is not an option. That same dedication
                    drives everything we do at Steel Motion. Your success is our mission.&rdquo;
                  </p>
                </div>

                <div className="border-t border-slate-600 pt-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/steel-motion-hero-logo.svg"
                      alt="Steel Motion Logo"
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                    <div>
                      <p className="font-semibold">Steel Motion LLC</p>
                      <p className="text-slate-400 text-sm">Veteran-Led Technology Solutions</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-full opacity-10"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-slate-400 rounded-full opacity-10"></div>
            </div>

            {/* Veteran Partnerships Box */}
            <motion.div
              {...slideInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/partnerships" className="block group">
                <div className="bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] rounded-2xl p-6 text-white border border-[#00F2FF]/30 hover:border-[#00F2FF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00F2FF]/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00F2FF] to-[#33CCFF] rounded-full flex items-center justify-center">
                      <Handshake className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-[#00F2FF] transition-colors">Veteran Partnerships</h3>
                      <p className="text-slate-400 text-sm">Building stronger veteran communities</p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Partner with Steel Motion for veteran-focused initiatives. Together, we can support veteran communities and drive innovation with military precision.
                  </p>
                  <div className="mt-4 text-[#00F2FF] font-medium group-hover:text-[#33CCFF] transition-colors">
                    Learn more about partnerships →
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}