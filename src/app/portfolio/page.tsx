'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ExternalLink, Code, Music } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navigation/navbar"
import { slideInUp } from "@/lib/animations"

type ProjectCategory = "all" | "software" | "creative"

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  category: "software" | "creative"
  categoryLabel: string
  categoryIcon: React.ElementType
  status: string
  statusBg: string
  statusText: string
  gradient: string
  logo?: string
  image?: string
  href?: string
}

const projects: Project[] = [
  {
    id: "kaulby",
    title: "Kaulby",
    subtitle: "Community Intelligence Platform",
    description:
      "AI-powered monitoring across Reddit, Hacker News, and forums. LLM classification, automated data pipelines, and multi-source ingestion.",
    category: "software",
    categoryLabel: "Software Product",
    categoryIcon: Code,
    status: "Product Launch",
    statusBg: "bg-sm-status-info-light",
    statusText: "text-sm-status-info",
    gradient: "from-indigo-500 via-blue-500 to-blue-600",
    logo: "/images/kaulby-logo.png",
    href: "https://kaulbyapp.com",
  },
  {
    id: "clarus",
    title: "Clarus",
    subtitle: "Content Analysis Tool",
    description:
      "Structured data extraction from unstructured content at scale. Document processing, AI summarization, and automated categorization.",
    category: "software",
    categoryLabel: "Software Product",
    categoryIcon: Code,
    status: "Product Launch",
    statusBg: "bg-sm-status-info-light",
    statusText: "text-sm-status-info",
    gradient: "from-blue-500 via-teal-500 to-teal-600",
    logo: "/images/clarus-logo.webp",
    href: "https://www.clarusapp.io",
  },
  {
    id: "rowan",
    title: "Rowan",
    subtitle: "Household Organization App",
    description:
      "Real-time task coordination for couples, roommates, and families. Live sync, task automation, and notification workflows.",
    category: "software",
    categoryLabel: "Software Product",
    categoryIcon: Code,
    status: "Product Launch",
    statusBg: "bg-sm-status-info-light",
    statusText: "text-sm-status-info",
    gradient: "from-teal-500 via-emerald-500 to-green-500",
    logo: "/images/rowan-logo.png",
    href: "https://rowanapp.com",
  },
  {
    id: "iron-pulse",
    title: "Iron Pulse",
    subtitle: "American Hard Rock",
    description:
      "Iron Pulse is a cinematic American rock project built on tension, release, and emotional truth. Fronted by dual lead vocalists, Elias Vale and Ari Solenne, the band blends modern hard rock weight with melodic depth and atmospheric texture.\n\nEach album is crafted as a full narrative arc — deliberate, structured, emotionally charged music designed to feel lived in, not manufactured.",
    category: "creative",
    categoryLabel: "Creative Project",
    categoryIcon: Music,
    status: "Live",
    statusBg: "bg-sm-status-success-light",
    statusText: "text-sm-status-success",
    gradient: "from-orange-500 via-red-500 to-red-600",
    image: "/images/bands/iron-pulse-card.webp",
    href: "/portfolio/creative/iron-pulse",
  },
  {
    id: "other-life",
    title: "Other Life",
    subtitle: "French Hard Rock",
    description:
      "Other Life is a French hard rock project driven by intensity, atmosphere, and emotional weight. Fronted by Adrien Corren and Anaïs Ardent, the band blends cinematic textures with heavy, riff-forward energy and dual-vocal dynamics that move between restraint and eruption. Each album explores identity, fracture, and survival through long-form compositions built for impact rather than trends.\n\nOther Life stands at the intersection of modern production and raw performance, delivering full-length records that feel deliberate, immersive, and unapologetically alive.",
    category: "creative",
    categoryLabel: "Creative Project",
    categoryIcon: Music,
    status: "Live",
    statusBg: "bg-sm-status-success-light",
    statusText: "text-sm-status-success",
    gradient: "from-red-500 via-purple-500 to-violet-600",
    image: "/images/bands/other-life.webp",
    href: "/portfolio/creative/other-life",
  },
]

const filterTabs: { label: string; value: ProjectCategory }[] = [
  { label: "All", value: "all" },
  { label: "Software", value: "software" },
  { label: "Creative", value: "creative" },
]

export default function PortfolioPage() {
  const [filter, setFilter] = useState<ProjectCategory>("all")

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter)

  const scrollToContact = () => {
    const el = document.getElementById("contact")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.assign("/#contact")
    }
  }

  return (
    <main className="min-h-screen bg-sm-surface-primary">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-[#0B1A2B] bg-sm-surface-inverse" style={{ background: 'linear-gradient(135deg, #0B1A2B 0%, #112240 50%, #0B1A2B 100%)' }}>
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-sm-accent-inverse/10 text-sm-accent-inverse border border-sm-accent-inverse/30 hover:bg-sm-accent-inverse/20">
              Our Work
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-sm-text-inverse">
              What We <span className="text-sm-accent-inverse">Build</span>
            </h1>

            <p className="text-xl text-sm-text-inverse-muted max-w-2xl mx-auto leading-relaxed">
              Software products, AI-assisted music, and the systems behind them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs + Project Cards */}
      <section className="py-16 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <div className="flex justify-center gap-2 mb-12" role="tablist" aria-label="Filter projects">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                role="tab"
                aria-selected={filter === tab.value}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === tab.value
                    ? "bg-sm-accent-primary text-white"
                    : "bg-sm-surface-secondary text-sm-text-secondary hover:bg-sm-surface-elevated hover:text-sm-text-primary border border-sm-border-default"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                {...slideInUp}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full flex flex-col bg-sm-surface-elevated border-sm-border-default hover:border-sm-accent-primary/30 transition-all duration-300 overflow-hidden group hover:shadow-[var(--sm-shadow-md)]" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
                  {/* Header */}
                  <div className={`${project.image ? 'h-64' : 'h-32'} bg-gradient-to-r ${project.gradient} relative overflow-hidden`}>
                    {project.image ? (
                      <>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </>
                    ) : (
                      <>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {project.logo ? (
                        <Image
                          src={project.logo}
                          alt={`${project.title} logo`}
                          width={80}
                          height={80}
                          sizes="80px"
                          className="object-contain drop-shadow-lg rounded-xl"
                        />
                      ) : (
                        <project.categoryIcon className="w-16 h-16 text-white/30" />
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${project.statusBg} ${project.statusText}`}>
                        {project.status}
                      </span>
                    </div>
                      </>
                    )}
                  </div>

                  <CardContent className="p-6 flex flex-col flex-1">
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <project.categoryIcon className="w-4 h-4 text-sm-accent-primary" />
                      <span className="text-sm text-sm-accent-primary font-medium">{project.categoryLabel}</span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-2xl font-bold text-sm-text-primary mb-1 group-hover:text-sm-accent-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm-text-secondary text-sm font-medium mb-3">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm-text-secondary/80 mb-5 leading-relaxed text-sm whitespace-pre-line flex-1">
                      {project.description}
                    </p>

                    {/* Action */}
                    {project.href?.startsWith("/") ? (
                      <Link
                        href={project.href}
                        className="inline-flex items-center gap-1 text-sm-accent-secondary hover:underline text-sm font-medium"
                      >
                        View Albums <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm-accent-secondary hover:underline text-sm font-medium"
                      >
                        Visit <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-sm text-sm-text-muted">Coming Soon</span>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Category Links */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
            <Link
              href="/portfolio/software"
              className="text-sm-accent-secondary hover:underline font-medium text-sm flex items-center gap-1"
            >
              See all software projects <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio/creative"
              className="text-sm-accent-secondary hover:underline font-medium text-sm flex items-center gap-1"
            >
              See all creative projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sm-surface-inverse text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...slideInUp} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-inverse">
              Building Something New
            </h2>
            <p className="text-lg text-sm-text-inverse-muted mb-8 leading-relaxed">
              We&apos;re always shipping. Follow along or get in touch.
            </p>
            <Button
              onClick={scrollToContact}
              className="bg-sm-accent-inverse hover:bg-[#2CC4B0] text-sm-surface-inverse font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105"
            >
              Schedule a Strategy Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
