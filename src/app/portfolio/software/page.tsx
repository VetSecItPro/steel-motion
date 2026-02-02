'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, ExternalLink, ShieldCheck, Plug, CheckCircle, Key } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import { slideInUp } from "@/lib/animations"

const products = [
  {
    name: "Kaulby",
    tagline: "Community Intelligence Platform",
    description:
      "AI-powered community monitoring tool that tracks discussions across Reddit, Hacker News, and forums. Categorizes conversations into actionable buckets using LLM classification. Includes natural language query for collected data.",
    techStack:
      "Next.js, TypeScript, Neon Postgres, Drizzle ORM, Clerk Auth, Stripe, Inngest, OpenRouter, Redis/Upstash, PostHog, Vercel",
    status: "Product Launch",
    statusBg: "bg-sm-status-info-light",
    statusText: "text-sm-status-info",
    gradient: "from-indigo-500 via-blue-500 to-blue-600",
    logo: "/images/kaulby-logo.png",
    href: "https://kaulbyapp.com",
    linkLabel: "Coming Soon",
  },
  {
    name: "Clarus",
    tagline: "Content Analysis Tool",
    description:
      "Web-based content analysis platform. Extracts structured data from unstructured content. Document processing, AI-powered summarization, and automated categorization at scale.",
    techStack: "Next.js, TypeScript, Supabase, OpenRouter, Vercel AI SDK, FireCrawl, Polar, Resend, Playwright, Vercel",
    status: "Product Launch",
    statusBg: "bg-sm-status-info-light",
    statusText: "text-sm-status-info",
    gradient: "from-blue-500 via-teal-500 to-teal-600",
    logo: "/images/clarus-logo.webp",
    href: "https://www.clarusapp.io",
    linkLabel: "Visit",
  },
  {
    name: "Rowan",
    tagline: "Household Organization App",
    description:
      "Coordination app for couples, roommates, and families. Real-time task management, shopping lists, meal planning, and household scheduling with live sync across devices.",
    techStack: "Next.js, TypeScript, Supabase, Capacitor, Polar, Google Gemini, Upstash Redis, Resend, Sentry, TanStack Query, Playwright, Vercel",
    status: "Product Launch",
    statusBg: "bg-sm-status-info-light",
    statusText: "text-sm-status-info",
    gradient: "from-teal-500 via-emerald-500 to-green-500",
    logo: "/images/rowan-logo.png",
    href: "https://rowanapp.com",
    linkLabel: "Visit",
  },
]

export default function SoftwarePortfolioPage() {
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

      {/* Breadcrumb */}
      <section className="bg-[#0B1A2B] bg-sm-surface-inverse pt-20 pb-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/portfolio"
              className="flex items-center gap-1 text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Portfolio
            </Link>
            <span className="text-sm-text-inverse-muted">/</span>
            <span className="text-sm-accent-inverse font-medium">Software</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="pb-16 pt-8 bg-[#0B1A2B] bg-sm-surface-inverse" style={{ background: 'linear-gradient(135deg, #0B1A2B 0%, #112240 50%, #0B1A2B 100%)' }}>
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-sm-accent-inverse/10 text-sm-accent-inverse border border-sm-accent-inverse/30 hover:bg-sm-accent-inverse/20">
              Portfolio / Software
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-sm-text-inverse">
              Software We Build <span className="text-sm-accent-inverse">and Operate</span>
            </h1>

            <p className="text-xl text-sm-text-inverse-muted max-w-3xl mx-auto leading-relaxed">
              Three SaaS products in production. Same stack, same process, same standards we bring to client projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Expanded Product Cards */}
      <section className="py-24 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                {...slideInUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl overflow-hidden hover:shadow-[var(--sm-shadow-md)] transition-all duration-300"
                  style={{ boxShadow: "var(--sm-shadow-sm)" }}
                >
                  <div className="grid md:grid-cols-[240px_1fr]">
                    {/* Gradient Side */}
                    <div className={`bg-gradient-to-br ${product.gradient} flex items-center justify-center p-8 min-h-[200px]`}>
                      <Image
                        src={product.logo}
                        alt={`${product.name} logo`}
                        width={120}
                        height={120}
                        sizes="120px"
                        className="object-contain drop-shadow-lg rounded-xl"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-bold text-sm-text-primary">
                            {product.name}
                          </h3>
                          <p className="text-sm-accent-primary text-sm font-medium">
                            {product.tagline}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${product.statusBg} ${product.statusText}`}>
                          {product.status}
                        </span>
                      </div>

                      <p className="text-sm-text-secondary leading-relaxed mt-4 mb-5">
                        {product.description}
                      </p>

                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-sm-text-muted uppercase tracking-wider mb-2">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.techStack.split(", ").map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-sm-surface-secondary text-sm-text-primary border border-sm-border-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {product.linkLabel === "Visit" ? (
                        <a
                          href={product.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm-accent-secondary hover:underline text-sm font-medium"
                        >
                          Visit <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-sm text-sm-text-muted">{product.linkLabel}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Build */}
      <section className="py-24 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-sm-text-primary mb-4">
              How We Build
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                title: "Security First",
                body: "Authentication, authorization, and data protection are built in from day one. Not bolted on after launch. Every application ships with encrypted data at rest and in transit, role-based access controls, and audit logging.",
              },
              {
                icon: Plug,
                title: "Built to Integrate",
                body: "Every product connects to the tools around it through clean APIs and webhooks. We build for interoperability. Your data moves where it needs to go without manual exports or middleware hacks.",
              },
              {
                icon: CheckCircle,
                title: "Tested in Production",
                body: "We run what we build. These products serve real users. Bugs get caught and fixed on our own systems before our approach ever reaches a client project. Our process is validated by daily production traffic.",
              },
              {
                icon: Key,
                title: "Owned by You",
                body: "Every line of code belongs to the client. Full repository access, complete documentation, zero vendor lock-in. When we hand off a project, you own everything and depend on nothing.",
              },
            ].map((principle, i) => (
              <motion.div
                key={principle.title}
                {...slideInUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl p-8 hover:shadow-[var(--sm-shadow-md)] hover:border-sm-accent-primary/30 transition-all duration-300 cursor-default"
                style={{ boxShadow: "var(--sm-shadow-sm)" }}
              >
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <principle.icon className="w-8 h-8 text-sm-accent-primary mb-4" />
                </motion.div>
                <h4 className="text-xl font-bold text-sm-text-primary mb-3">
                  {principle.title}
                </h4>
                <p className="text-sm-text-secondary leading-relaxed">
                  {principle.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link */}
      <section className="py-8 bg-sm-surface-secondary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm-text-secondary text-sm">
            Need custom software built for your business?{" "}
            <Link
              href="/services/custom-development"
              className="text-sm-accent-secondary hover:underline font-medium"
            >
              See our Custom Development services →
            </Link>
          </p>
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

      <Footer />
    </main>
  )
}
