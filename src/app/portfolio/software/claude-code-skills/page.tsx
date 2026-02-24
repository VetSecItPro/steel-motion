import type { Metadata } from 'next'
import Script from 'next/script'
import SkillsPageClient from './skills-page-client'
import { skills, skillCount } from '@/lib/data/skills'

const title = `${skillCount} Production-Tested Claude Code Skills | Steel Motion LLC`
const description =
  `Open-source Claude Code skill library: ${skillCount} skills across development, quality, security, design, and planning. All free on GitHub.`
const url = 'https://steelmotionllc.com/portfolio/software/claude-code-skills'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function ClaudeCodeSkillsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: 'Claude Code Skills Library',
    description,
    url,
    programmingLanguage: 'Markdown',
    codeRepository: 'https://github.com/VetSecItPro/claude-code-skills',
    author: {
      '@type': 'Organization',
      name: 'Steel Motion LLC',
      url: 'https://steelmotionllc.com',
    },
    offers: {
      '@type': 'Offer',
      name: 'Open Source',
      price: '0',
      priceCurrency: 'USD',
      description: `${skillCount} production-tested skills + 3 standards protocols`,
    },
  }

  return (
    <>
      <Script
        id="claude-code-skills-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SkillsPageClient skills={skills} />
    </>
  )
}
