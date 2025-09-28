'use client'

import { motion } from "framer-motion"
import { Shield, Award, Globe, Lightbulb, Cloud, GraduationCap } from "lucide-react"
import Image from "next/image"

const expertise = [
  {
    icon: Award,
    title: "Battle-Tested Leader",
    description: "U.S. Army veteran managing multimillion-dollar global IT missions."
  },
  {
    icon: Shield,
    title: "Cybersecurity Strategist",
    description: "10+ years securing cloud, SaaS, and enterprise systems."
  },
  {
    icon: GraduationCap,
    title: "Educator & Mentor",
    description: "Training hundreds of students and veterans to earn top cyber certs."
  },
  {
    icon: Cloud,
    title: "Cloud Risk Expert",
    description: "Former AWS engineer, cutting security incidents and compliance gaps."
  },
  {
    icon: Lightbulb,
    title: "Innovation Driver",
    description: "Built frameworks and content powering growth, audits, and product launches."
  },
  {
    icon: Globe,
    title: "Global Communicator",
    description: "Fluent in Arabic, French, and English, bridging cultures and teams."
  }
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 max-w-4xl mx-auto">
            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#00F2FF]/30 shadow-xl shadow-[#00F2FF]/25 relative">
                <Image
                  src="/images/profile-picture.jpg"
                  alt="Anouar K. Bencheqroun MBA CISSP"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/30 rounded-full px-4 py-2 text-sm font-medium mb-6">
                About Our Founder
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Meet Anouar K. Bencheqroun MBA CISSP
              </h2>
              <p className="text-xl text-[#B3B3B3] leading-relaxed">
                Veteran technology leader combining military precision with cutting-edge innovation
                to deliver transformational cybersecurity and AI solutions.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Professional Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-[#1a3a5c]/50 rounded-2xl p-8 border border-[#00F2FF]/20">
              <h3 className="text-2xl font-bold text-[#00F2FF] mb-4">Leadership & Impact</h3>
              <blockquote className="text-lg text-white italic mb-4 text-center">
                &ldquo;Focus beats frenzy every time&rdquo;
              </blockquote>
              <div className="text-[#B3B3B3] leading-relaxed space-y-4">
                <p>
                  A U.S. Army veteran turned cybersecurity strategist, I&apos;ve led multimillion-dollar IT and communications operations across South Korea, Iraq, Qatar, and the U.S. — directing secure network strategies, driving compliance with NIST and RMF standards, and ensuring 100% success in external audits. In uniform, I managed portfolios worth over $50M, orchestrated cybersecurity awareness programs for hundreds of personnel, and oversaw large-scale IT infrastructure upgrades that improved mission readiness and operational efficiency.
                </p>
                <p>
                  Today, I bring that same discipline and leadership into the cyber and cloud domain. As an adjunct professor at Purdue University and an instructor with Vets in Tech, I&apos;ve taught and mentored hundreds of students and veterans, helping them achieve industry certifications such as Security+ and AWS Cloud Practitioner. My work has empowered over 150 veterans to launch new careers in cybersecurity while strengthening the next generation of cyber professionals.
                </p>
                <p>
                  Holding dual master&apos;s degrees — an MBA from The George Washington University and an M.S. in Information Security and Assurance — I combine strategic business acumen with deep technical expertise. Alongside an extensive portfolio of certifications (CISSP, CCSP, AWS Solutions Architect, and more), I&apos;ve built a career at the intersection of cybersecurity leadership, cloud security, and mentorship — committed to enabling secure innovation and shaping tomorrow&apos;s workforce.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Expertise & Credentials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Expertise Areas */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Core Expertise</h3>
              <div className="grid gap-4">
                {expertise.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-[#1a3a5c]/30 rounded-xl border border-[#00F2FF]/10 hover:border-[#00F2FF]/30 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00F2FF]/20 to-[#33CCFF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#00F2FF]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-[#B3B3B3] leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}