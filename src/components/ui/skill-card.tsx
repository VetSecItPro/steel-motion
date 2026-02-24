'use client'

import { motion } from 'framer-motion'
import {
  Terminal, GitBranch, Package, Database, FileText, Workflow, PenTool,
  FlaskConical, Sparkles, TestTubes, ShieldCheck, Gauge, Accessibility,
  Shield, Radar, Swords, Scale, FileCheck,
  Palette, Layout, Rocket, Target, ExternalLink,
} from 'lucide-react'
import { slideInUp } from '@/lib/animations'
import type { Skill } from '@/lib/data/skills'

const GITHUB_SKILL_BASE = 'https://github.com/VetSecItPro/claude-code-skills/blob/main/.claude/commands'

const iconMap: Record<string, React.ElementType> = {
  Terminal, GitBranch, Package, Database, FileText, Workflow, PenTool,
  FlaskConical, Sparkles, TestTubes, ShieldCheck, Gauge, Accessibility,
  Shield, Radar, Swords, Scale, FileCheck,
  Palette, Layout, Rocket, Target,
}

const categoryColors: Record<string, string> = {
  development: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  quality: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  security: 'text-red-400 bg-red-500/10 border-red-500/20',
  design: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  planning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
}

interface SkillCardProps {
  skill: Skill
  index: number
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const Icon = iconMap[skill.icon] || Terminal
  const colorClass = categoryColors[skill.category] || categoryColors.development

  return (
    <motion.div
      {...slideInUp}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <a
        href={`${GITHUB_SKILL_BASE}/${skill.slug}.md`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div
          className="h-full bg-sm-surface-elevated border border-sm-border-default rounded-2xl p-6 hover:shadow-[var(--sm-shadow-md)] hover:border-sm-accent-primary/30 transition-all duration-300 group relative"
          style={{ boxShadow: 'var(--sm-shadow-sm)' }}
        >
          {/* External Link Indicator */}
          <span className="absolute top-4 right-4 text-sm-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-4 h-4" />
          </span>

          {/* Icon + Name */}
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border ${colorClass} mb-4`}>
            <Icon className="w-5 h-5" />
          </div>

          <h3 className="text-lg font-bold text-sm-text-primary mb-1 group-hover:text-sm-accent-primary transition-colors">
            {skill.title}
          </h3>
          <p className="text-sm text-sm-accent-primary font-mono mb-3">{skill.name}</p>
          <p className="text-sm text-sm-text-secondary leading-relaxed mb-4">
            {skill.description}
          </p>

          {/* Highlights */}
          <ul className="space-y-1.5">
            {skill.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-xs text-sm-text-muted">
                <span className="w-1 h-1 rounded-full bg-sm-accent-primary shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </a>
    </motion.div>
  )
}
