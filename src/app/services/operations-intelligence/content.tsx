'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle, ArrowRight, ArrowLeft, Home,
  Search, Cpu, LineChart, Shield, Network, Eye,
  ClipboardCheck, Hammer, Rocket, Users,
} from "lucide-react"
import Link from "next/link"
import { slideInUp, slideInLeft, slideInRight } from "@/lib/animations"

/* --- Data --- */

const capabilities = [
  {
    icon: Network,
    title: "Multi-Agent Orchestration",
    description:
      "Multiple AI agents working in parallel across your business — one monitors leads, another processes invoices, a third flags operational risks. They coordinate automatically.",
    example:
      "A 3-agent system that qualifies inbound leads, syncs them to CRM, and schedules follow-ups — replacing 12 hours/week of manual work.",
  },
  {
    icon: Eye,
    title: "Real-Time Operations Visibility",
    description:
      "AI agents that continuously monitor your KPIs, cash flow, pipeline, and team utilization. You get alerts before problems become crises.",
    example:
      "Cash flow forecasting that flagged a $40K receivables gap three weeks before it would have caused payroll issues.",
  },
  {
    icon: Search,
    title: "Operations Discovery & Audit",
    description:
      "We map every tool, data flow, and decision point in your business. Then we identify exactly where AI agents will produce the highest ROI.",
    example:
      "A 2-week discovery that found 6 automation opportunities worth $180K/year in labor savings for a 30-person services firm.",
  },
  {
    icon: Cpu,
    title: "Intelligent Decision Support",
    description:
      "AI agents that don't just execute tasks — they reason about your business data and surface recommendations you'd otherwise miss.",
    example:
      "An agent that analyzed 18 months of project data and identified that Tuesday-started projects completed 23% faster.",
  },
  {
    icon: LineChart,
    title: "EBITDA Impact Documentation",
    description:
      "Every automation we deploy comes with measured ROI. We document the cost savings, time recovered, and revenue impact for your books.",
    example:
      "Documented $950K in annual EBITDA improvement across three workflows for a PE-backed portfolio company.",
  },
  {
    icon: Shield,
    title: "Security-First Architecture",
    description:
      "Every agent system is built with access controls, audit logging, and data isolation. Your business data stays protected. CISSP-certified team.",
    example:
      "Healthcare client deployment with HIPAA-compliant data handling, encrypted agent communications, and full audit trail.",
  },
]

const phases = [
  {
    icon: ClipboardCheck,
    number: "1",
    title: "Operations Discovery",
    timeline: "Week 1-3",
    price: "$5,000 - $7,500",
    description:
      "On-site or virtual deep-dive into your operations. We interview stakeholders, map your tools and data flows, identify bottlenecks, and build your AI Operations Roadmap with prioritized opportunities and ROI projections.",
    deliverable: "AI Operations Roadmap with automation opportunity matrix, estimated savings, and implementation timeline. You own it regardless of future engagement.",
  },
  {
    icon: Hammer,
    number: "2",
    title: "Agent Deployment",
    timeline: "Week 4-10 (varies by complexity)",
    price: "$3,000 - $8,000 per agent system",
    description:
      "We build and deploy the top 2-3 AI agent systems identified in discovery. Each agent connects to your existing tools — CRM, accounting, email, project management. We train your team to work alongside them.",
    deliverable: "Production-deployed AI agents, staff training, integration documentation, and baseline KPI measurements.",
  },
  {
    icon: Rocket,
    number: "3",
    title: "Fractional AI Operations",
    timeline: "Ongoing (monthly retainer)",
    price: "$2,500 - $5,000/month",
    description:
      "10-15 hours per month of continuous agent optimization, prompt refinement, and performance monitoring. We develop new automations as needs evolve and deliver monthly ROI reports.",
    deliverable: "Monthly operations intelligence report, continuous optimization, new agent development, and EBITDA impact documentation.",
  },
]

const comparisons = [
  {
    basic: "Single-task chatbot on your website",
    intelligence: "Multi-agent system across your entire operations",
  },
  {
    basic: "Rule-based triggers (if X then Y)",
    intelligence: "AI that reasons about which workflows to optimize",
  },
  {
    basic: "Pre-built templates and connectors",
    intelligence: "Custom discovery and audit of your specific business",
  },
  {
    basic: "Reactive — responds when triggered",
    intelligence: "Proactive — identifies opportunities and flags risks",
  },
  {
    basic: "One-time project delivery",
    intelligence: "Ongoing retainer with continuous optimization",
  },
  {
    basic: "You manage the automation",
    intelligence: "We manage it — fractional AI operations team",
  },
]

const benefits = [
  "Make decisions with real-time data instead of gut feeling",
  "Scale operations without proportional headcount growth",
  "Catch revenue leaks and operational risks before they hurt",
  "Document ROI and EBITDA impact for investors, partners, or exit planning",
  "Free up leadership time from operational firefighting",
  "Build institutional knowledge that doesn't walk out the door",
]

const goodFit = [
  "Companies doing $1M-$50M revenue that feel operationally maxed out",
  "Owner-operators who are the bottleneck in their own business",
  "PE-backed companies needing documented EBITDA improvements",
  "Businesses with 10+ employees and disconnected tools",
  "Service businesses managing complex multi-step workflows",
  "Companies growing revenue but drowning in operational complexity",
]

/* --- Component --- */

export default function OperationsIntelligenceContent() {
  return (
    <>
      {/* Back Navigation */}
      <section className="bg-[var(--sm-surface-inverse)] bg-sm-surface-inverse pt-20 pb-4">
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

      {/* Hero */}
      <section className="bg-[var(--sm-surface-inverse)] text-sm-text-inverse py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--sm-surface-inverse) 0%, var(--sm-surface-inverse-alt) 50%, var(--sm-surface-inverse) 100%)' }}>
        <div className="absolute inset-0 bg-sm-surface-inverse-alt/40 pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="bg-sm-accent-inverse/10 text-sm-accent-inverse border-sm-accent-inverse/30 hover:bg-sm-accent-inverse/20 mb-6">
              Operations Intelligence
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-sm-text-inverse">
              AI Agents That <span className="text-sm-accent-inverse">Run Your Operations</span>
            </h1>

            <p className="text-xl md:text-2xl text-sm-text-inverse-muted mb-4 max-w-3xl mx-auto leading-relaxed">
              Not a chatbot. Not a Zapier trigger. A team of AI agents that analyze, coordinate, and optimize your entire business — with a fractional AI operations manager keeping it all running.
            </p>

            <p className="text-base text-sm-text-inverse-muted/70 mb-8 max-w-2xl mx-auto">
              Built on Claude Opus. Secured by a CISSP-certified, veteran-owned team.
            </p>

            <Button
              asChild
              className="bg-sm-accent-inverse hover:bg-[#2CC4B0] text-sm-surface-inverse font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            >
              <a href="https://cal.com/steelmotionllc" target="_blank" rel="noopener noreferrer">
                Book a Free Discovery Call
              <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="py-24 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-sm-accent-primary-light text-sm-accent-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
              Beyond Automation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-primary">
              Automation vs. Operations Intelligence
            </h2>
            <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto leading-relaxed">
              Most AI agencies sell you a chatbot and call it automation. Operations Intelligence is a fundamentally different approach.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-0 mb-4">
              <div className="bg-sm-surface-elevated border border-sm-border-default rounded-tl-xl px-6 py-3">
                <p className="text-sm font-semibold text-sm-text-muted uppercase tracking-wider">Basic AI Automation</p>
              </div>
              <div className="bg-sm-accent-primary/5 border border-sm-accent-primary/20 rounded-tr-xl px-6 py-3">
                <p className="text-sm font-semibold text-sm-accent-primary uppercase tracking-wider">Operations Intelligence</p>
              </div>
            </div>
            {comparisons.map((row, i) => (
              <motion.div
                key={i}
                {...slideInUp}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="grid grid-cols-2 gap-0"
              >
                <div className={`bg-sm-surface-elevated border-x border-b border-sm-border-default px-6 py-4 ${i === comparisons.length - 1 ? 'rounded-bl-xl' : ''}`}>
                  <p className="text-sm text-sm-text-secondary">{row.basic}</p>
                </div>
                <div className={`bg-sm-accent-primary/5 border-x border-b border-sm-accent-primary/20 px-6 py-4 ${i === comparisons.length - 1 ? 'rounded-br-xl' : ''}`}>
                  <p className="text-sm text-sm-text-primary font-medium">{row.intelligence}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities — 6 Service Cards */}
      <section className="py-24 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-primary">
              What We Deploy
            </h2>
            <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto leading-relaxed">
              Six capabilities that transform how your business operates.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                {...slideInUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div
                  className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl p-8 hover:shadow-[var(--sm-shadow-md)] transition-all duration-300 h-full"
                  style={{ boxShadow: "var(--sm-shadow-sm)" }}
                >
                  <div className="bg-sm-accent-primary-light border border-sm-accent-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-5">
                    <c.icon className="w-6 h-6 text-sm-accent-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-sm-text-primary mb-3">
                    {c.title}
                  </h3>
                  <p className="text-sm-text-secondary leading-relaxed">
                    {c.description}
                  </p>
                  <p className="text-sm-text-secondary leading-relaxed mt-4 pt-4 border-t border-sm-border-default">
                    <span className="underline font-medium text-sm-text-primary">Example</span>: {c.example}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cross-link */}
          <motion.div
            {...slideInUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <p className="text-sm-text-secondary text-sm">
              Need simpler task-level automation instead?{" "}
              <Link
                href="/services/ai-transformation"
                className="text-sm-accent-secondary hover:underline font-medium"
              >
                See our AI Automation service →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works — 3 Phases */}
      <section className="py-24 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-sm-accent-primary-light text-sm-accent-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-primary">
              How an Operations Intelligence Engagement Works
            </h2>
            <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto leading-relaxed">
              Three phases. Clear deliverables at each step. You own everything we build.
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
                  {/* Phase header */}
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

                  {/* Price anchor */}
                  <div className="bg-sm-accent-primary/5 border border-sm-accent-primary/20 rounded-lg px-4 py-2 mb-4 inline-block">
                    <p className="text-sm font-semibold text-sm-accent-primary">{phase.price}</p>
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

      {/* Why It Matters + Good Fit */}
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

      {/* Trust Section */}
      <section className="py-24 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "CISSP Certified",
                  desc: "Your business data is handled by a team with real cybersecurity credentials, not just marketing claims.",
                },
                {
                  icon: Users,
                  title: "20-Year Army IT Veteran",
                  desc: "Operational discipline, mission planning, and systems thinking — applied to your business operations.",
                },
                {
                  icon: Cpu,
                  title: "Built on Claude Opus",
                  desc: "The most capable reasoning model available. 1M token context, multi-agent coordination, and instruction-following precision.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  {...slideInUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-sm-accent-primary-light border border-sm-accent-primary/20 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-sm-accent-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-sm-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-sm-text-secondary leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sm-surface-inverse text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...slideInUp} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-inverse">
              Ready to See What AI Agents Can Do for Your Business?
            </h2>
            <p className="text-lg text-sm-text-inverse-muted mb-4 leading-relaxed">
              Book a free discovery call. We&apos;ll walk through your operations and show you exactly where AI agents will produce the highest ROI.
            </p>
            <p className="text-sm text-sm-text-inverse-muted mb-8">
              Operations Discovery engagements start at $5,000. Monthly retainers from $2,500.
            </p>
            <Button
              asChild
              className="bg-sm-accent-inverse hover:bg-[#2CC4B0] text-sm-surface-inverse font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            >
              <a href="https://cal.com/steelmotionllc" target="_blank" rel="noopener noreferrer">
                Book a Free Discovery Call
              <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
