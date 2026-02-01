'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle, ArrowRight, ArrowLeft, Home, ExternalLink,
  Globe, Plug, Database, RefreshCw,
  Search, Hammer, Rocket, FileCheck,
} from "lucide-react"
import Link from "next/link"
import { slideInUp, slideInLeft, slideInRight } from "@/lib/animations"

/* ─── Data ─── */

const features = [
  {
    icon: Globe,
    title: "Web Application Development",
    description:
      "Full-stack web applications built with Next.js, React, and TypeScript. Deployed on Vercel or AWS.",
    example:
      "A multi-tenant SaaS dashboard processing 10K+ daily API calls with sub-200ms response times.",
  },
  {
    icon: Plug,
    title: "API Development & Integration",
    description:
      "REST and webhook APIs that connect your systems and move data between platforms.",
    example:
      "A middleware API syncing inventory data between Shopify and a warehouse management system in real time.",
  },
  {
    icon: Database,
    title: "Database Design & Optimization",
    description:
      "Postgres and relational database design optimized for your query patterns.",
    example:
      "Restructuring a 50M-row database from 8-second queries to under 100ms with proper indexing and schema redesign.",
  },
  {
    icon: RefreshCw,
    title: "Legacy System Modernization",
    description:
      "We rebuild aging internal tools into modern web applications without losing your business logic.",
    example:
      "Replacing a 15-year-old Access database with a web app that runs on any device and supports multiple concurrent users.",
  },
]

const techStack = [
  {
    category: "Frontend",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    tools: ["Node.js", "Next.js API Routes", "REST APIs", "Webhooks"],
  },
  {
    category: "Database",
    tools: ["PostgreSQL (Neon)", "Drizzle ORM", "Redis/Upstash"],
  },
  {
    category: "Infrastructure",
    tools: ["Vercel", "AWS", "GitHub Actions", "Inngest"],
  },
]

const products = [
  {
    name: "Kaulby",
    tagline: "Community Intelligence Platform",
    description:
      "Full-stack Next.js application with Postgres, background job queues, multi-source API ingestion, and LLM-powered classification.",
    status: "In Development",
    statusBg: "bg-sm-status-warning-light",
    statusText: "text-sm-status-warning",
    href: "https://kaulbyapp.com",
  },
  {
    name: "Clarus",
    tagline: "Content Analysis Tool",
    description:
      "Web application with structured data extraction, document processing pipelines, and AI-powered summarization.",
    status: "Early Access",
    statusBg: "bg-sm-status-info-light",
    statusText: "text-sm-status-info",
    href: "https://www.clarusapp.io",
  },
  {
    name: "Rowan",
    tagline: "Household Organization App",
    description:
      "Real-time multi-user application with live sync, task management, notification workflows, and cross-device support.",
    status: "Beta",
    statusBg: "bg-sm-status-success-light",
    statusText: "text-sm-status-success",
    href: "https://rowanapp.com",
  },
]

const phases = [
  {
    icon: Search,
    number: "1",
    title: "Discovery",
    timeline: "Week 1",
    description:
      "We map your requirements, define the scope, and agree on deliverables.",
    deliverable: "Written scope document with architecture plan, timeline, and fixed-price quote.",
  },
  {
    icon: Hammer,
    number: "2",
    title: "Build",
    timeline: "Week 2–8 (varies by complexity)",
    description:
      "We build in weekly sprints. You see working code every Friday. Testing is continuous, not a phase bolted on at the end.",
    deliverable: "Working application deployed to staging. You test each sprint.",
  },
  {
    icon: Rocket,
    number: "3",
    title: "Launch",
    timeline: "1 week after build complete",
    description:
      "Production deployment, DNS, SSL, monitoring, and performance verification.",
    deliverable: "Live application with monitoring dashboards.",
  },
  {
    icon: FileCheck,
    number: "4",
    title: "Handoff",
    timeline: "30 days post-launch",
    description:
      "Documentation, codebase walkthrough, and 30 days of post-launch support. You own the code. Full GitHub repository transfer.",
    deliverable: "Complete documentation, repository access, support period.",
  },
]

const benefits = [
  "Own your code. No vendor lock-in, no recurring license fees.",
  "Get software that matches how your team works, not the other way around.",
  "Deploy on infrastructure that scales with your business.",
  "Connect to the tools you already use through clean APIs.",
  "Replace manual processes with software that runs 24/7.",
  "Ship in weeks, not months. Weekly demos, fixed-price scope.",
]

const goodFit = [
  "Running a business process on spreadsheets that should be software",
  "Paying for SaaS tools that don\u2019t fit how your team works",
  "Needing an internal tool your team will use daily",
  "Managing data across 3+ disconnected systems",
  "Outgrowing a no-code tool and need a real application",
  "Replacing a legacy internal system that only one person knows how to maintain",
]

/* ─── Component ─── */

export default function CustomDevelopmentContent() {
  const scrollToContact = () => {
    const el = document.getElementById("contact")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.assign("/#contact")
    }
  }

  return (
    <>
      {/* ── Back Navigation ── */}
      <section className="bg-[#0B1A2B] bg-sm-surface-inverse pt-20 pb-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <span className="text-sm-text-inverse-muted">&bull;</span>
            <Link
              href="/#solutions"
              className="flex items-center gap-2 text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors duration-300 group"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Hero ── */}
      <section className="bg-[#0B1A2B] text-sm-text-inverse py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1A2B 0%, #112240 50%, #0B1A2B 100%)' }}>
        <div className="absolute inset-0 bg-sm-surface-inverse-alt/40 pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="bg-sm-accent-inverse/10 text-sm-accent-inverse border-sm-accent-inverse/30 hover:bg-sm-accent-inverse/20 mb-6">
              Custom Development Services
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-sm-text-inverse">
              Software Built Around <span className="text-sm-accent-inverse">How You Work</span>
            </h1>

            <p className="text-xl md:text-2xl text-sm-text-inverse-muted mb-8 max-w-3xl mx-auto leading-relaxed">
              We build web applications, APIs, and internal tools from scratch. You own the code. We build to spec. No templates, no shortcuts.
            </p>

            <Button
              onClick={scrollToContact}
              className="bg-sm-accent-inverse hover:bg-[#2CC4B0] text-sm-surface-inverse font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105"
            >
              Schedule a Strategy Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── What We Do — 4 Service Cards ── */}
      <section className="py-24 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-primary">
              What We Do
            </h2>
            <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto leading-relaxed">
              Four areas where we build custom software for small and mid-size businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...slideInUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div
                  className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl p-8 hover:shadow-[var(--sm-shadow-md)] transition-all duration-300 h-full"
                  style={{ boxShadow: "var(--sm-shadow-sm)" }}
                >
                  <div className="bg-sm-accent-primary-light border border-sm-accent-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-5">
                    <f.icon className="w-6 h-6 text-sm-accent-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-sm-text-primary mb-3">
                    {f.title}
                  </h3>
                  <p className="text-sm-text-secondary leading-relaxed">
                    {f.description}
                  </p>
                  <p className="text-sm-text-secondary leading-relaxed mt-4 pt-4 border-t border-sm-border-default">
                    <span className="underline font-medium text-sm-text-primary">Typical engagement</span>: {f.example}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cross-link to AI Automation */}
          <motion.div
            {...slideInUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <p className="text-sm-text-secondary text-sm">
              Need AI automation built into your application?{" "}
              <Link
                href="/services/ai-transformation"
                className="text-sm-accent-secondary hover:underline font-medium"
              >
                See our AI Automation services →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── What We Build With — Tech Stack ── */}
      <section className="py-24 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-primary">
              What We Build With
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {techStack.map((group, i) => (
              <motion.div
                key={group.category}
                {...slideInUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <h3 className="text-sm font-semibold text-sm-text-muted uppercase tracking-wider mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {group.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-sm-surface-secondary text-sm-text-primary border border-sm-border-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── We Build What We Sell ── */}
      <section className="py-24 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-sm-accent-primary-light text-sm-accent-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
              Our Products
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-primary">
              We Build What We Sell
            </h2>
            <p className="text-lg text-sm-text-secondary max-w-3xl mx-auto leading-relaxed">
              We run three SaaS products in production: Kaulby, Clarus, and Rowan. They use the same stack, deployment pipeline, and development process we bring to client projects. Our recommendations come from shipping real software, not reading about it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                {...slideInUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <div
                    className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl p-8 hover:shadow-[var(--sm-shadow-md)] transition-all duration-300 h-full relative"
                    style={{ boxShadow: "var(--sm-shadow-sm)" }}
                  >
                    <div className="absolute top-4 right-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${p.statusBg} ${p.statusText}`}
                      >
                        {p.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-sm-text-primary mb-1 group-hover:text-sm-accent-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm-accent-primary text-sm font-medium mb-4">
                      {p.tagline}
                    </p>
                    <p className="text-sm-text-secondary leading-relaxed mb-4">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm-accent-secondary group-hover:underline text-sm">
                      <span>Visit</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How a Custom Dev Engagement Works ── */}
      <section className="py-24 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-sm-accent-primary-light text-sm-accent-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-primary">
              How a Custom Dev Engagement Works
            </h2>
            <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto leading-relaxed">
              Every project follows the same four phases.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.title}
                {...slideInUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl p-8 hover:shadow-[var(--sm-shadow-md)] transition-all duration-300 h-full flex flex-col"
                  style={{ boxShadow: "var(--sm-shadow-sm)" }}
                >
                  {/* Phase number */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="bg-sm-accent-primary w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{phase.number}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-sm-text-primary">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-sm-text-muted">{phase.timeline}</p>
                    </div>
                  </div>

                  <p className="text-sm-text-secondary leading-relaxed mb-4 flex-1">
                    {phase.description}
                  </p>

                  <div className="bg-sm-surface-secondary rounded-lg px-4 py-3 mt-auto">
                    <p className="text-sm text-sm-text-muted font-medium">Deliverable</p>
                    <p className="text-sm text-sm-text-secondary">{phase.deliverable}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why It Matters + Good Fit ── */}
      <section className="py-24 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Benefits */}
            <motion.div {...slideInLeft}>
              <h3 className="text-2xl font-bold mb-6 text-sm-text-primary">
                Why It Matters
              </h3>
              <div className="space-y-4">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    {...slideInLeft}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-sm-accent-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm-text-secondary leading-relaxed">{b}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Good Fit */}
            <motion.div {...slideInRight}>
              <h3 className="text-2xl font-bold mb-6 text-sm-text-primary">
                Good Fit If You&apos;re...
              </h3>
              <div className="space-y-3">
                {goodFit.map((item, i) => (
                  <motion.div
                    key={i}
                    {...slideInRight}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-sm-accent-primary flex-shrink-0" />
                    <p className="text-sm-text-secondary">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-sm-surface-inverse text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...slideInUp} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-inverse">
              Let&apos;s Scope Your Project
            </h2>
            <p className="text-lg text-sm-text-inverse-muted mb-4 leading-relaxed">
              Tell us what you need built. We&apos;ll define the scope, timeline, and a fixed-price quote on a free 30-minute call.
            </p>
            <p className="text-sm text-sm-text-inverse-muted mb-8">
              Most custom development projects run between $10,000 and $50,000 depending on scope.
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
    </>
  )
}
