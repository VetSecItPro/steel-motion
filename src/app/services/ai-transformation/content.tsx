'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle, ArrowRight, ArrowLeft, Home, ExternalLink,
  RefreshCw, FileText, BarChart3, Brain, Cog, Plug,
  ClipboardCheck, Hammer, Rocket,
} from "lucide-react"
import Link from "next/link"
import { slideInUp, slideInLeft, slideInRight } from "@/lib/animations"

/* ─── Data ─── */

const features = [
  {
    icon: RefreshCw,
    title: "Workflow Automation",
    description:
      "We build systems that handle repetitive tasks automatically and accurately.",
    example:
      "Automated invoice routing that reduced a 4-person manual process to zero touch.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    description:
      "Invoices, forms, contracts. We set up AI to read, extract, and organize your documents without human intervention.",
    example:
      "Extracting line items from 500+ supplier invoices per month into an ERP with 99%+ accuracy.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description:
      "We build dashboards and alert systems that surface patterns before they become problems.",
    example:
      "Demand forecasting that reduced inventory carrying costs by 18%.",
  },
  {
    icon: Brain,
    title: "Custom AI Models",
    description:
      "Off-the-shelf AI doesn't always fit. We build models trained on your data for your specific problems.",
    example:
      "A classification model trained on 50K support tickets to auto-route and prioritize incoming requests.",
  },
  {
    icon: Cog,
    title: "Process Automation (RPA)",
    description:
      "Software bots that work across your existing systems. No ripping and replacing, automation layered on top.",
    example:
      "Syncing data between a legacy CRM and accounting system every 15 minutes, eliminating daily manual exports.",
  },
  {
    icon: Plug,
    title: "AI Integration",
    description:
      "We plug AI into what you're using now without breaking anything.",
    example:
      "Adding LLM-powered summarization to an existing support dashboard with zero downtime.",
  },
]

const products = [
  {
    name: "Kaulby",
    tagline: "Community Intelligence Platform",
    description:
      "AI-powered monitoring across Reddit, Hacker News, and forums. Uses LLM classification, automated data pipelines, and multi-source ingestion.",
    status: "In Development",
    statusBg: "bg-sm-status-warning-light",
    statusText: "text-sm-status-warning",
    href: "https://kaulbyapp.com",
  },
  {
    name: "Clarus",
    tagline: "Content Analysis Tool",
    description:
      "Structured data extraction from unstructured content at scale. Uses document processing, AI summarization, and automated categorization.",
    status: "Early Access",
    statusBg: "bg-sm-status-info-light",
    statusText: "text-sm-status-info",
    href: "https://www.clarusapp.io",
  },
  {
    name: "Rowan",
    tagline: "Household Organization App",
    description:
      "Real-time task coordination for couples, roommates, and families. Uses real-time sync, task automation, and notification workflows.",
    status: "Beta",
    statusBg: "bg-sm-status-success-light",
    statusText: "text-sm-status-success",
    href: "https://rowanapp.com",
  },
]

const phases = [
  {
    icon: ClipboardCheck,
    number: "1",
    title: "Assessment",
    timeline: "Week 1–2",
    description:
      "We audit your current workflows and identify the highest-ROI automation targets.",
    deliverable: "Written scope document with estimated time and cost savings.",
  },
  {
    icon: Hammer,
    number: "2",
    title: "Build",
    timeline: "Week 3–8 (varies by complexity)",
    description:
      "We build, test, and iterate on your automation system. Weekly demos so you see progress and give feedback in real time.",
    deliverable: "Working system deployed to staging environment.",
  },
  {
    icon: Rocket,
    number: "3",
    title: "Handoff",
    timeline: "1 week after launch",
    description:
      "We deploy to production, train your team, and hand over documentation. 30 days of post-launch support included.",
    deliverable: "Production deployment, training session, full documentation.",
  },
]

const benefits = [
  "Cut operational costs on every automated workflow",
  "Eliminate manual data entry errors",
  "Handle more volume without hiring more people",
  "Get answers from your data in minutes, not days",
  "Respond to customers faster",
  "Stay compliant with automated audit trails and documentation",
]

const goodFit = [
  "Businesses ready to scale without adding headcount",
  "Teams buried in repetitive manual tasks",
  "Companies managing high volumes of documents",
  "Organizations looking to respond to customers faster",
  "Operations teams spending 10+ hours per week on manual data entry",
  "Companies growing revenue but unable to hire fast enough to keep up",
]

/* ─── Component ─── */

export default function AITransformationContent() {
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
              AI Automation Services
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-sm-text-inverse">
              AI Automation That <span className="text-sm-accent-inverse">Pays for Itself</span>
            </h1>

            <p className="text-xl md:text-2xl text-sm-text-inverse-muted mb-8 max-w-3xl mx-auto leading-relaxed">
              We build automation systems that reduce manual work, cut processing time, and produce ROI you measure in weeks, not quarters.
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

      {/* ── What We Do — 6 Service Cards ── */}
      <section className="py-24 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-primary">
              What We Do
            </h2>
            <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto leading-relaxed">
              Six areas where we build AI systems for small and mid-size businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

          {/* Cross-link to Custom Development */}
          <motion.div
            {...slideInUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <p className="text-sm-text-secondary text-sm">
              Need a full custom application built alongside your automation?{" "}
              <Link
                href="/services/custom-development"
                className="text-sm-accent-secondary hover:underline font-medium"
              >
                See our Custom Application Development service →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── We Build What We Sell ── */}
      <section className="py-24 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-sm-accent-primary-light text-sm-accent-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
              Our Products
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-primary">
              We Build What We Sell
            </h2>
            <p className="text-lg text-sm-text-secondary max-w-3xl mx-auto leading-relaxed">
              We run three SaaS products in production: Kaulby, Clarus, and Rowan. They use the same AI pipelines, automation patterns, and infrastructure we build for clients. Our recommendations come from operating real systems, not reading about them.
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

      {/* ── How an AI Automation Engagement Works ── */}
      <section className="py-24 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-sm-accent-primary-light text-sm-accent-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-primary">
              How an AI Automation Engagement Works
            </h2>
            <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto leading-relaxed">
              Every project follows the same three phases.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
      <section className="py-24 bg-sm-surface-primary">
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
              Let&apos;s Talk AI
            </h2>
            <p className="text-lg text-sm-text-inverse-muted mb-4 leading-relaxed">
              Tell us what you want to automate. We&apos;ll scope the work and give you a fixed-price quote on a free 30-minute call.
            </p>
            <p className="text-sm text-sm-text-inverse-muted mb-8">
              Most AI automation engagements run between $5,000 and $25,000 depending on complexity.
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
