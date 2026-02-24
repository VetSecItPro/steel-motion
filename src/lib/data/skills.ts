export type SkillCategory = 'development' | 'quality' | 'security' | 'design' | 'planning'
export type SkillPhase = 'plan' | 'build' | 'design' | 'quality' | 'security' | 'ship'

export interface Skill {
  name: string
  slug: string
  title: string
  description: string
  category: SkillCategory
  phase: SkillPhase
  icon: string
  highlights: string[]
  whenToUse: string
}

export const skills: Skill[] = [
  // ── Plan ────────────────────────────────────────────
  {
    name: '/mdmp',
    slug: 'mdmp',
    title: 'Decision Framework',
    description: 'Military Decision-Making Process adapted for software. Structured analysis for complex decisions.',
    category: 'planning',
    phase: 'plan',
    icon: 'Target',
    highlights: ['COA analysis', 'Risk assessment', 'Decision matrix', 'Execution plan'],
    whenToUse: 'Planning complex decisions with structured analysis',
  },
  // ── Build ───────────────────────────────────────────
  {
    name: '/dev',
    slug: 'dev',
    title: 'Development Server',
    description: 'Start a clean, self-healing development server with automatic port recovery and process cleanup.',
    category: 'development',
    phase: 'build',
    icon: 'Terminal',
    highlights: ['Auto port recovery', 'Process cleanup', 'Self-healing restarts'],
    whenToUse: 'Starting a dev server with auto-healing and port management',
  },
  {
    name: '/db',
    slug: 'db',
    title: 'Database Management',
    description: 'Schema design, migrations, seed data, and database operations with rollback safety.',
    category: 'development',
    phase: 'build',
    icon: 'Database',
    highlights: ['Migration generation', 'Rollback safety', 'Seed data management', 'Schema validation'],
    whenToUse: 'Managing schemas, migrations, and seed data',
  },
  {
    name: '/deps',
    slug: 'deps',
    title: 'Dependency Health',
    description: 'Audit dependency health, check for outdated packages, and validate supply chain security.',
    category: 'development',
    phase: 'build',
    icon: 'Package',
    highlights: ['Outdated detection', 'Supply chain audit', 'Breaking change alerts'],
    whenToUse: 'Auditing packages for outdated or vulnerable dependencies',
  },
  {
    name: '/docs',
    slug: 'docs',
    title: 'Documentation Generator',
    description: 'Generate and maintain WHY-focused documentation that explains decisions, not just code.',
    category: 'development',
    phase: 'build',
    icon: 'FileText',
    highlights: ['WHY documentation', 'Auto-maintenance', 'Decision records'],
    whenToUse: 'Generating decision-focused documentation',
  },
  {
    name: '/blog',
    slug: 'blog',
    title: 'Blog Publisher',
    description: 'Interactive content pipeline from draft to deploy with SEO optimization and auto-publishing.',
    category: 'development',
    phase: 'build',
    icon: 'PenTool',
    highlights: ['Draft to deploy', 'SEO optimization', 'Auto-publishing'],
    whenToUse: 'Publishing blog posts with SEO and auto-deploy',
  },
  {
    name: '/migrate',
    slug: 'migrate',
    title: 'Major Version Upgrade',
    description: 'Automate major version upgrades with rollback safety: analyze breaking changes, migrate code, verify everything.',
    category: 'development',
    phase: 'build',
    icon: 'ArrowUpCircle',
    highlights: ['Breaking change analysis', 'Automated code migration', 'Build-fix loop', 'Rollback plan'],
    whenToUse: 'Upgrading major versions of frameworks and libraries',
  },
  // ── Design ──────────────────────────────────────────
  {
    name: '/design',
    slug: 'design',
    title: 'UI/UX Audit',
    description: 'Comprehensive design audit across all viewports with optional 2025/26 trend research.',
    category: 'design',
    phase: 'design',
    icon: 'Palette',
    highlights: ['All viewport testing', 'Trend research', 'Component audit'],
    whenToUse: 'Running a full UI/UX audit across all viewports',
  },
  {
    name: '/landing-page',
    slug: 'landing-page',
    title: 'Landing Page Builder',
    description: 'Generate, optimize, and audit conversion-optimized landing pages with current design trends.',
    category: 'design',
    phase: 'design',
    icon: 'Layout',
    highlights: ['Conversion scoring', 'A/B test suggestions', 'Trend-aware', '4 modes'],
    whenToUse: 'Building or optimizing landing pages for conversion',
  },
  // ── Quality ─────────────────────────────────────────
  {
    name: '/smoketest',
    slug: 'smoketest',
    title: 'Smoke Test',
    description: 'Quick build verification: lint, typecheck, build, and basic runtime checks in one pass.',
    category: 'quality',
    phase: 'quality',
    icon: 'FlaskConical',
    highlights: ['Lint + typecheck', 'Build verification', 'Runtime checks'],
    whenToUse: 'Quick verification that the build is healthy',
  },
  {
    name: '/cleancode',
    slug: 'cleancode',
    title: 'Technical Debt Reduction',
    description: 'Find and eliminate dead code, unused exports, redundant dependencies, and code smells.',
    category: 'quality',
    phase: 'quality',
    icon: 'Sparkles',
    highlights: ['Dead code removal', 'Unused export detection', 'Dependency cleanup'],
    whenToUse: 'Cleaning up dead code and unused exports',
  },
  {
    name: '/perf',
    slug: 'perf',
    title: 'Performance Audit',
    description: 'Lighthouse-powered performance analysis with actionable optimization recommendations.',
    category: 'quality',
    phase: 'quality',
    icon: 'Gauge',
    highlights: ['Core Web Vitals', 'Bundle analysis', 'Optimization roadmap'],
    whenToUse: 'Profiling performance and Core Web Vitals',
  },
  {
    name: '/a11y',
    slug: 'a11y',
    title: 'Accessibility Audit',
    description: 'WCAG compliance audit with automated fixes for common accessibility issues.',
    category: 'quality',
    phase: 'quality',
    icon: 'Accessibility',
    highlights: ['WCAG 2.1 AA', 'Automated fixes', 'Screen reader testing'],
    whenToUse: 'Auditing and fixing WCAG accessibility issues',
  },
  {
    name: '/qatest',
    slug: 'qatest',
    title: 'Autonomous QA/UAT',
    description: 'Crawl all pages, test all interactions, validate all APIs, autofix safe issues, and ship with confidence.',
    category: 'quality',
    phase: 'quality',
    icon: 'TestTubes',
    highlights: ['Full site crawl', '13 execution phases', 'Autofix 23 patterns', '0-100 scoring'],
    whenToUse: 'Pre-ship quality gate across all pages and APIs',
  },
  {
    name: '/test-ship',
    slug: 'test-ship',
    title: 'Test Audit & Ship',
    description: 'Comprehensive test audit: find gaps, write missing tests, verify coverage, and ship.',
    category: 'quality',
    phase: 'quality',
    icon: 'ShieldCheck',
    highlights: ['Coverage analysis', 'Gap detection', 'Auto-test generation', 'Ship gate'],
    whenToUse: 'Auditing test coverage and writing missing tests',
  },
  // ── Security ────────────────────────────────────────
  {
    name: '/sec-ship',
    slug: 'sec-ship',
    title: 'Security Pipeline',
    description: 'Full security audit, fix, validate, report pipeline. OWASP-aligned vulnerability scanning.',
    category: 'security',
    phase: 'security',
    icon: 'Shield',
    highlights: ['OWASP top 10', 'Auto-remediation', 'Validation pass', 'Security report'],
    whenToUse: 'Running a full OWASP-aligned security audit',
  },
  {
    name: '/sec-weekly-scan',
    slug: 'sec-weekly-scan',
    title: 'Weekly Security Scan',
    description: 'Scheduled cross-repo security audit covering dependencies, secrets, and configuration drift.',
    category: 'security',
    phase: 'security',
    icon: 'Radar',
    highlights: ['Cross-repo scanning', 'Secret detection', 'Config drift alerts'],
    whenToUse: 'Scheduled weekly security sweeps across repos',
  },
  {
    name: '/redteam',
    slug: 'redteam',
    title: 'Red Team Testing',
    description: 'Active exploitation testing against localhost. Find vulnerabilities before attackers do.',
    category: 'security',
    phase: 'security',
    icon: 'Swords',
    highlights: ['Active exploitation', 'Localhost targeting', 'Vulnerability validation'],
    whenToUse: 'Simulating attacks against your local environment',
  },
  {
    name: '/compliance',
    slug: 'compliance',
    title: 'Privacy Compliance',
    description: 'GDPR, CCPA, and privacy regulation audit with data flow mapping and gap analysis.',
    category: 'security',
    phase: 'security',
    icon: 'Scale',
    highlights: ['GDPR/CCPA audit', 'Data flow mapping', 'Gap analysis'],
    whenToUse: 'Auditing GDPR/CCPA compliance and data flows',
  },
  {
    name: '/compliance-docs',
    slug: 'compliance-docs',
    title: 'Compliance Documentation',
    description: 'Generate enterprise compliance and security documentation: policies, procedures, and controls.',
    category: 'security',
    phase: 'security',
    icon: 'FileCheck',
    highlights: ['Policy generation', 'Control mapping', 'Enterprise-ready'],
    whenToUse: 'Generating compliance policies and control docs',
  },
  // ── Operate ─────────────────────────────────────────
  {
    name: '/monitor',
    slug: 'monitor',
    title: 'Post-Deploy Health Check',
    description: 'Verify deployment health: check all routes, serverless functions, infrastructure, env vars, and error rates.',
    category: 'quality',
    phase: 'ship',
    icon: 'Activity',
    highlights: ['Route health checks', 'Function verification', 'Infrastructure audit', 'Baseline comparison'],
    whenToUse: 'Verifying a deployment is healthy after ship',
  },
  {
    name: '/incident',
    slug: 'incident',
    title: 'Incident Response',
    description: 'Structured production incident response: triage, root cause analysis, fix, verify, and postmortem.',
    category: 'quality',
    phase: 'ship',
    icon: 'Siren',
    highlights: ['Severity classification', 'Root cause analysis', 'Fix-verify loop', 'Auto-postmortem'],
    whenToUse: 'Responding to production incidents with structured triage',
  },
  // ── Ship ────────────────────────────────────────────
  {
    name: '/launch',
    slug: 'launch',
    title: 'Launch Checklist',
    description: 'Pre-launch validation pipeline: DNS, SSL, performance, SEO, security, and monitoring.',
    category: 'planning',
    phase: 'ship',
    icon: 'Rocket',
    highlights: ['DNS/SSL checks', 'SEO validation', 'Monitoring setup', 'Go/no-go gate'],
    whenToUse: 'Running pre-launch checks before going live',
  },
  {
    name: '/gh-ship',
    slug: 'gh-ship',
    title: 'Full Git Pipeline',
    description: 'Commit, push, PR, CI watch, auto-fix, squash-merge, deploy, and cleanup. One command.',
    category: 'development',
    phase: 'ship',
    icon: 'GitBranch',
    highlights: ['Branch to PR to Merge', 'CI failure auto-fix', 'Post-merge cleanup', 'Squash merge by default'],
    whenToUse: 'Shipping code from commit to merged PR in one command',
  },
]

export const skillCategories: { label: string; value: SkillCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Development', value: 'development' },
  { label: 'Quality', value: 'quality' },
  { label: 'Security', value: 'security' },
  { label: 'Design', value: 'design' },
  { label: 'Planning', value: 'planning' },
]

export const skillPhases: { label: string; value: SkillPhase }[] = [
  { label: 'Plan', value: 'plan' },
  { label: 'Build', value: 'build' },
  { label: 'Design', value: 'design' },
  { label: 'Quality', value: 'quality' },
  { label: 'Security', value: 'security' },
  { label: 'Ship', value: 'ship' },
]

export function getSkillsByCategory(category: SkillCategory | 'all'): Skill[] {
  if (category === 'all') return skills
  return skills.filter((s) => s.category === category)
}

export function getSkillsByPhase(phase: SkillPhase): Skill[] {
  return skills.filter((s) => s.phase === phase)
}

export const skillCount = skills.length
export const categoryCount = new Set(skills.map((s) => s.category)).size
