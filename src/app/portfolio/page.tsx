'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Sparkles, Music, Code, Rocket } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  category: string
  categoryIcon: React.ElementType
  status: 'live' | 'coming-soon' | 'in-development'
  imageUrl?: string
  gradient: string
  features: string[]
  externalUrl?: string
  internalUrl?: string
}

const projects: Project[] = [
  {
    id: 'rowan',
    title: 'Rowan',
    subtitle: 'AI-Powered Productivity Assistant',
    description: 'A smart productivity application designed to help users manage tasks, automate workflows, and leverage AI to work more efficiently. Built with modern technologies and a focus on user experience.',
    category: 'Software Product',
    categoryIcon: Code,
    status: 'in-development',
    gradient: 'from-purple-600 via-violet-500 to-indigo-600',
    features: [
      'AI-powered task management',
      'Workflow automation',
      'Smart scheduling',
      'Cross-platform support'
    ]
  },
  {
    id: 'iron-pulse',
    title: 'Iron Pulse',
    subtitle: 'AI-Generated Music Project',
    description: 'An experimental music project exploring the intersection of artificial intelligence and creative expression. Iron Pulse creates original compositions using AI, pushing the boundaries of what machine-assisted creativity can achieve.',
    category: 'Creative Project',
    categoryIcon: Music,
    status: 'live',
    gradient: 'from-red-600 via-orange-500 to-yellow-500',
    features: [
      'AI-composed original tracks',
      'Multiple genres and styles',
      'Experimental soundscapes',
      'Human-AI collaboration'
    ]
  }
]

const getStatusBadge = (status: Project['status']) => {
  switch (status) {
    case 'live':
      return (
        <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          Live
        </Badge>
      )
    case 'coming-soon':
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
          Coming Soon
        </Badge>
      )
    case 'in-development':
      return (
        <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
          <Rocket className="w-3 h-3 mr-1" />
          In Development
        </Badge>
      )
  }
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-6 bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/30 hover:bg-[#00F2FF]/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Work
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Projects & <span className="text-[#00F2FF]">Creations</span>
            </h1>

            <p className="text-xl text-[#B3B3B3] max-w-2xl mx-auto leading-relaxed">
              A showcase of software products, creative experiments, and innovative solutions
              built with passion and precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-[#1a3a5c]/50 border-[#00F2FF]/20 hover:border-[#00F2FF]/50 transition-all duration-300 overflow-hidden group">
                  {/* Gradient Header */}
                  <div className={`h-32 bg-gradient-to-r ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <project.categoryIcon className="w-16 h-16 text-white/30" />
                    </div>
                    <div className="absolute top-4 right-4">
                      {getStatusBadge(project.status)}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <project.categoryIcon className="w-4 h-4 text-[#00F2FF]" />
                      <span className="text-sm text-[#00F2FF] font-medium">{project.category}</span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00F2FF] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#B3B3B3] font-medium mb-4">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-[#B3B3B3]/80 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {project.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-[#B3B3B3]">
                            <div className="w-1.5 h-1.5 bg-[#00F2FF] rounded-full flex-shrink-0"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {project.externalUrl && (
                        <a href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-gradient-to-r from-[#00F2FF] to-[#33CCFF] hover:from-[#33CCFF] hover:to-[#00F2FF] text-slate-900 font-semibold">
                            Visit Project
                            <ExternalLink className="ml-2 w-4 h-4" />
                          </Button>
                        </a>
                      )}
                      {project.internalUrl && (
                        <Link href={project.internalUrl}>
                          <Button className="bg-gradient-to-r from-[#00F2FF] to-[#33CCFF] hover:from-[#33CCFF] hover:to-[#00F2FF] text-slate-900 font-semibold">
                            Learn More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                      {!project.externalUrl && !project.internalUrl && (
                        <Button variant="outline" className="border-[#00F2FF]/50 text-[#00F2FF] hover:bg-[#00F2FF]/10" disabled>
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* More Projects Coming Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-[#1a3a5c]/30 border border-[#00F2FF]/20 rounded-2xl p-8">
              <Sparkles className="w-12 h-12 text-[#00F2FF] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">More Projects on the Way</h3>
              <p className="text-[#B3B3B3] mb-6">
                We&apos;re constantly building, experimenting, and creating. Stay tuned for
                more innovative projects and creative endeavors.
              </p>
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-[#00F2FF] to-[#33CCFF] hover:from-[#33CCFF] hover:to-[#00F2FF] text-slate-900 font-semibold">
                  Get in Touch
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
