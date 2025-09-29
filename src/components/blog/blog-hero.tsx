'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Target } from "lucide-react"

export default function BlogHero() {
  return (
    <section className="bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] text-white pt-20 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#001122]/80 via-[#003366]/60 to-[#004488]/40 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 mb-6">
              Steel Motion Insights
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Technology Insights from
            <span className="block text-[#00F2FF]">Veteran Leaders</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Discover practical insights on AI transformation, cybersecurity, cloud infrastructure,
            and technology leadership from our experienced veteran team.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <FileText className="w-8 h-8 text-[#00F2FF] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-white/80">Technical Articles</div>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-[#00F2FF] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">10+</div>
              <div className="text-sm text-white/80">Veteran Authors</div>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 text-[#00F2FF] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-sm text-white/80">Core Topics</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}