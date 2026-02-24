'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft, ArrowRight, Github,
  Layers, BookOpen, Cpu,
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/navigation/navbar'
import { slideInUp } from '@/lib/animations'
import { SkillCard } from '@/components/ui/skill-card'
import type { Skill, SkillCategory } from '@/lib/data/skills'
import { skillCategories, skillPhases, skillCount, categoryCount } from '@/lib/data/skills'

interface SkillsPageClientProps {
  skills: Skill[]
}

const GITHUB_REPO = 'https://github.com/VetSecItPro/claude-code-skills'

const phaseLabels: Record<string, string> = {
  plan: 'Plan',
  build: 'Build',
  design: 'Design',
  quality: 'Quality',
  security: 'Security',
  ship: 'Ship',
}

export default function SkillsPageClient({ skills }: SkillsPageClientProps) {
  const [filter, setFilter] = useState<SkillCategory | 'all'>('all')

  const filtered = filter === 'all' ? skills : skills.filter((s) => s.category === filter)

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.assign('/#contact')
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
            <Link
              href="/portfolio/software"
              className="text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors"
            >
              Software
            </Link>
            <span className="text-sm-text-inverse-muted">/</span>
            <span className="text-sm-accent-inverse font-medium">Claude Code Skills</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section
        className="pb-16 pt-8 bg-[#0B1A2B] bg-sm-surface-inverse"
        style={{ background: 'linear-gradient(135deg, #0B1A2B 0%, #112240 50%, #0B1A2B 100%)' }}
      >
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-sm-accent-inverse/10 text-sm-accent-inverse border border-sm-accent-inverse/30 hover:bg-sm-accent-inverse/20"
            >
              Open Source
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-sm-text-inverse">
              {skillCount} Production-Tested{' '}
              <span className="text-sm-accent-inverse">Claude Code Skills</span>
            </h1>

            <p className="text-xl text-sm-text-inverse-muted max-w-3xl mx-auto leading-relaxed">
              A mature DevOps framework built from shipping real products. Skills for development,
              testing, security, design, and planning, with 3 shared standards protocols.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 bg-sm-surface-secondary border-b border-sm-border-default">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { value: String(skillCount), label: 'Skills' },
              { value: String(categoryCount), label: 'Categories' },
              { value: '100%', label: 'Free' },
              { value: '3', label: 'Shared Standards' },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="text-2xl font-bold text-sm-accent-primary">{stat.value}</span>
                <p className="text-sm text-sm-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Reference Table */}
      <section className="py-12 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-sm-text-primary">
                Quick Reference
              </h2>
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sm-surface-inverse text-sm-text-inverse hover:bg-neutral-800 font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 text-sm"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border border-sm-border-default rounded-xl overflow-hidden text-sm">
                <thead>
                  <tr className="bg-sm-surface-secondary">
                    <th className="text-left px-4 py-3 font-semibold text-sm-text-primary border-b border-sm-border-default w-16">Phase</th>
                    <th className="text-left px-4 py-3 font-semibold text-sm-text-primary border-b border-sm-border-default w-36">Skill</th>
                    <th className="text-left px-4 py-3 font-semibold text-sm-text-primary border-b border-sm-border-default">When to Use</th>
                  </tr>
                </thead>
                <tbody>
                  {skillPhases.map((phase) => {
                    const phaseSkills = skills.filter((s) => s.phase === phase.value)
                    return phaseSkills.map((skill, i) => (
                      <tr
                        key={skill.slug}
                        className="border-b border-sm-border-default last:border-b-0 hover:bg-sm-surface-secondary/50 transition-colors"
                      >
                        {i === 0 ? (
                          <td
                            className="px-4 py-2.5 text-xs font-semibold text-sm-accent-primary uppercase tracking-wide align-top"
                            rowSpan={phaseSkills.length}
                          >
                            {phase.label}
                          </td>
                        ) : null}
                        <td className="px-4 py-2.5 font-mono text-sm-accent-primary font-medium">
                          {skill.name}
                        </td>
                        <td className="px-4 py-2.5 text-sm-text-secondary">
                          {skill.whenToUse}
                        </td>
                      </tr>
                    ))
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs + Skills Grid */}
      <section className="py-16 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Filter skills by category">
            {skillCategories.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                role="tab"
                aria-selected={filter === tab.value}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === tab.value
                    ? 'bg-sm-accent-primary text-white'
                    : 'bg-sm-surface-elevated text-sm-text-secondary hover:bg-sm-surface-primary hover:text-sm-text-primary border border-sm-border-default'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.slug} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-24 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-sm-text-primary mb-4">
              3 Standards Protocols
            </h2>
            <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto mb-3">
              Every skill follows the same shared protocols. Consistent behavior across all {skillCount} skills.
            </p>
            <p className="text-sm text-sm-text-muted max-w-2xl mx-auto">
              These protocols are required for skills to work as designed. The install script includes them automatically in <code className="text-sm-accent-primary font-mono">~/.claude/standards/</code>.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Layers,
                title: 'Status Updates',
                file: 'STATUS_UPDATES.md',
                body: 'Standardized progress reporting. Every skill emits status in the same format: phase tracking, completion percentage, and structured output.',
              },
              {
                icon: BookOpen,
                title: 'Context Management',
                file: 'CONTEXT_MANAGEMENT.md',
                body: 'Shared rules for how skills read and preserve context. Memory management, file discovery, and state preservation across skill invocations.',
              },
              {
                icon: Cpu,
                title: 'Agent Orchestration',
                file: 'AGENT_ORCHESTRATION.md',
                body: 'Multi-agent coordination protocol. How skills delegate to sub-agents, manage parallel execution, and aggregate results.',
              },
            ].map((protocol, i) => (
              <motion.div
                key={protocol.title}
                {...slideInUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl p-8 hover:shadow-[var(--sm-shadow-md)] hover:border-sm-accent-primary/30 transition-all duration-300"
                style={{ boxShadow: 'var(--sm-shadow-sm)' }}
              >
                <protocol.icon className="w-8 h-8 text-sm-accent-primary mb-4" />
                <h3 className="text-xl font-bold text-sm-text-primary mb-1">{protocol.title}</h3>
                <p className="text-sm text-sm-accent-primary font-mono mb-3">{protocol.file}</p>
                <p className="text-sm text-sm-text-secondary leading-relaxed">{protocol.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started CTA */}
      <section className="py-24 bg-sm-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...slideInUp} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-sm-text-primary mb-4">
              Get Started in One Command
            </h2>
            <p className="text-lg text-sm-text-secondary mb-8 leading-relaxed">
              Clone the repo, copy the skills into your project, and start using them immediately. All {skillCount} skills, 3 standards protocols, and an install script included.
            </p>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sm-surface-inverse text-sm-text-inverse hover:bg-neutral-800 font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-200"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-8 bg-sm-surface-primary">
        <div className="container mx-auto px-4 text-center space-y-2">
          <p className="text-sm-text-secondary text-sm">
            See more of our work:{' '}
            <Link
              href="/portfolio/software"
              className="text-sm-accent-secondary hover:underline font-medium"
            >
              Software Portfolio
            </Link>
            {' · '}
            <Link
              href="/portfolio"
              className="text-sm-accent-secondary hover:underline font-medium"
            >
              All Projects
            </Link>
          </p>
        </div>
      </section>

      {/* Consulting CTA */}
      <section className="py-16 bg-sm-surface-inverse text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...slideInUp} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sm-text-inverse">
              Want Custom Skills Built for Your Team?
            </h2>
            <p className="text-lg text-sm-text-inverse-muted mb-8 leading-relaxed">
              We build production-grade Claude Code skills tailored to your workflow, stack, and standards.
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
