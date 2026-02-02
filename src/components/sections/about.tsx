'use client'

import { motion } from "framer-motion"
import { Shield, Lock, GraduationCap, Globe, Bot, Code, Layers, Linkedin, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { slideInUp, scaleIn } from "@/lib/animations"

/* ─── Data ─── */

const services = [
  {
    icon: Bot,
    title: "AI Automation",
    subtitle: "Workflow automation, LLM integration, process optimization",
    href: "/services/ai-transformation",
  },
  {
    icon: Code,
    title: "Custom Development",
    subtitle: "Web applications, APIs, internal tools built to spec",
    href: "/services/custom-development",
  },
  {
    icon: Layers,
    title: "Our Products",
    subtitle: "Kaulby, Clarus, and Rowan. SaaS tools we build and run.",
    href: "/portfolio/software",
  },
]

const expertise = [
  {
    icon: Shield,
    title: "Army IT Operations",
    description: "20 years managing communications infrastructure, network security, and IT systems across four continents.",
  },
  {
    icon: Lock,
    title: "Cybersecurity",
    description: "CISSP certified. 10+ years securing cloud, SaaS, and enterprise systems. Former AWS engineer.",
  },
  {
    icon: GraduationCap,
    title: "Educator",
    description: "AWS and Security+ instructor at Purdue Global. MBA from George Washington University.",
  },
  {
    icon: Globe,
    title: "Trilingual",
    description: "Fluent in Arabic, French, and English. Operates across cultures and time zones.",
  },
]

/* ─── Component ─── */

export default function About() {
  return (
    <>
      {/* ── Section 1: Company Hero ── */}
      <section
        className="bg-[#0B1A2B] text-sm-text-inverse pt-32 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B1A2B 0%, #112240 50%, #0B1A2B 100%)' }}
      >
        <div className="absolute inset-0 bg-sm-surface-inverse-alt/40 pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...slideInUp} className="max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="bg-sm-accent-inverse/10 text-sm-accent-inverse border-sm-accent-inverse/30 hover:bg-sm-accent-inverse/20 mb-6"
            >
              About Steel Motion
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-sm-text-inverse">
              Veteran-Owned. Texas-Based. Software and AI.
            </h1>

            <p className="text-xl md:text-2xl text-sm-text-inverse-muted max-w-3xl mx-auto leading-relaxed">
              Steel Motion LLC builds software products, AI automation systems, and custom web
              applications for small businesses. Founded in 2025 by a U.S. Army veteran with
              20 years of IT and cybersecurity experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Company Story ── */}
      <section className="py-20 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-sm-text-primary mb-8">
              Why Steel Motion Exists
            </h2>
            <div className="space-y-6 text-lg text-sm-text-secondary leading-relaxed">
              <p>
                Steel Motion started because small businesses deserve the same quality software
                that enterprise companies get, without the enterprise price tag or the six-month
                timeline.
              </p>
              <p>
                The company was founded in late 2025 in the Dallas-Fort Worth area. We build
                three types of things: SaaS products we own and operate (Kaulby, Clarus, Rowan),
                AI automation systems for clients who want to reduce manual work, and custom web
                applications for businesses that need something built from scratch.
              </p>
              <p>
                We&apos;re a small operation by design. No layers of project managers between you
                and the person writing the code. Every project gets direct access to the founder.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: What We Work On ── */}
      <section className="py-20 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sm-text-primary">
              What We Work On
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                {...slideInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="group block h-full bg-sm-surface-elevated rounded-2xl p-8 border border-sm-border-default hover:border-sm-accent-primary/30 transition-all duration-300"
                  style={{ boxShadow: 'var(--sm-shadow-md)' }}
                >
                  <div className="w-12 h-12 bg-sm-accent-primary-light rounded-xl flex items-center justify-center mb-5">
                    <service.icon className="w-6 h-6 text-sm-accent-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-sm-text-primary mb-2 group-hover:text-sm-accent-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-sm-text-secondary leading-relaxed">
                    {service.subtitle}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-sm-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Founder ── */}
      <section className="py-20 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div {...slideInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sm-text-primary">
              Meet the Founder
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Founder Info */}
            <motion.div
              {...slideInUp}
              className="flex flex-col lg:flex-row items-center lg:items-start gap-10 mb-16"
            >
              {/* Headshot */}
              <motion.div
                {...scaleIn}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-shrink-0"
              >
                <div
                  className="w-48 h-48 rounded-full overflow-hidden border-4 border-sm-accent-primary/30 relative"
                  style={{ boxShadow: 'var(--sm-shadow-lg)' }}
                >
                  <Image
                    src="/images/profile-picture.jpg"
                    alt="Anouar K. Bencheqroun, Founder of Steel Motion LLC"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Name, Credentials, Bio */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl font-bold text-sm-text-primary mb-1">
                  Anouar K. Bencheqroun
                </h3>
                <p className="text-lg text-sm-accent-primary font-medium mb-4">
                  MBA, CISSP
                </p>
                <p className="text-sm-text-secondary italic text-lg mb-6">
                  U.S. Army veteran, cybersecurity strategist, and software developer. 20 years
                  of IT operations across four continents. Now building software products and AI
                  systems for small businesses.
                </p>

                <blockquote className="text-2xl text-sm-text-primary italic font-medium mb-8">
                  &ldquo;Focus beats frenzy every time.&rdquo;
                </blockquote>

                <div className="space-y-4 text-sm-text-secondary leading-relaxed text-lg">
                  <p>
                    U.S. Army veteran. Cybersecurity strategist. I spent 20 years leading IT
                    operations on four continents, managing communications infrastructure,
                    network security, and end-user support for the military.
                  </p>
                  <p>
                    After retiring, I built a career in cloud security and earned my CISSP. I
                    hold an MBA from George Washington University and an MS in Information
                    Security from Western Governors University. I teach AWS and Security+ courses
                    at Purdue Global part-time.
                  </p>
                  <p>
                    I started Steel Motion to build software that solves real problems for small
                    businesses. The same discipline and rigor from military IT operations goes
                    into every product and client project.
                  </p>
                </div>

                {/* LinkedIn */}
                <div className="mt-6">
                  <a
                    href="https://www.linkedin.com/in/vetsecitpro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm-accent-primary hover:text-sm-accent-primary/80 transition-colors font-medium"
                  >
                    <Linkedin className="w-5 h-5" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Expertise Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {expertise.map((item, index) => (
                <motion.div
                  key={item.title}
                  {...slideInUp}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-sm-surface-elevated rounded-xl border border-sm-border-default hover:border-sm-accent-primary/30 transition-colors"
                  style={{ boxShadow: 'var(--sm-shadow-sm)' }}
                >
                  <div className="w-12 h-12 bg-sm-accent-primary-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-sm-accent-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm-text-primary mb-1">{item.title}</h4>
                    <p className="text-sm text-sm-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: CTA ── */}
      <section className="py-20 bg-sm-surface-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...slideInUp} className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-sm-text-primary mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-sm-text-secondary mb-8 leading-relaxed">
              Whether you need custom software, AI automation, or a technical partner,
              we&apos;re ready to talk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild className="bg-sm-accent-primary hover:bg-sm-accent-primary/90 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105">
                <Link href="/#contact">
                  Schedule a Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-sm-border-default text-sm-text-primary hover:border-sm-accent-primary/30 hover:text-sm-accent-primary font-semibold px-8 py-4 text-lg transition-all duration-300">
                <Link href="/portfolio">
                  See Our Work
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
