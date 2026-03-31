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
    description: 'Military Decision-Making Process adapted for software. Six specialist lenses, premise validation, scope challenge, 15 engineering cognitive patterns, outside voice cross-check, and TDD-enforced execution. Auto-scales depth based on mission complexity.',
    category: 'planning',
    phase: 'plan',
    icon: 'Target',
    highlights: ['6 specialist lenses', 'Tiered complexity (TACTICAL/OPERATIONAL/STRATEGIC)', 'TDD enforcement + two-stage review gate', 'Worktree isolation for large missions'],
    whenToUse: 'Planning anything from a small feature to an architecture overhaul',
  },
  // ── Build ───────────────────────────────────────────
  {
    name: '/dev',
    slug: 'dev',
    title: 'Development Server',
    description: 'Start a resilient development server with graduated crash recovery, smart cache detection, and memory-aware pre-flight checks.',
    category: 'development',
    phase: 'build',
    icon: 'Terminal',
    highlights: ['4-level crash recovery', 'Smart cache detection', 'Memory pressure checks', 'Project-scoped cleanup'],
    whenToUse: 'Starting a dev server with auto-recovery and crash resilience',
  },
  {
    name: '/db',
    slug: 'db',
    title: 'Database Management',
    description: 'Database-agnostic schema management with drift detection. Detects your provider (Supabase, Neon, Vercel Postgres, PlanetScale, Turso, Railway) and ORM (Prisma, Drizzle, Supabase-JS), scans code queries against actual schema, auto-fixes mismatches, and pushes migrations.',
    category: 'development',
    phase: 'build',
    icon: 'Database',
    highlights: ['Schema drift detection', 'Database-agnostic', 'Auto-push migrations', 'Code-vs-schema sync'],
    whenToUse: 'Managing schemas, detecting drift between code and database, pushing migrations',
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
    title: 'Design System Audit',
    description: 'Full design audit with 80-item checklist, dual scoring (Design Score + AI Slop Score), 7 litmus tests, live CSS extraction from the running app, cross-page consistency checks, and fix risk regulation. Generates or audits pages with anti-generic design standards.',
    category: 'design',
    phase: 'design',
    icon: 'Palette',
    highlights: ['80-item checklist across 10 categories', 'AI Slop detection (10 named patterns)', 'Live CSS extraction from browser', 'Fix risk budget with auto-stop'],
    whenToUse: 'Auditing design quality, detecting AI-generated patterns, or generating pages from scratch',
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
    description: 'Dependency-graph-aware dead code removal, React and Next.js optimization, bundle reduction, pattern enforcement, and semantic duplicate detection. Finds functions that do the same thing differently, not just textual copies.',
    category: 'quality',
    phase: 'quality',
    icon: 'Sparkles',
    highlights: ['Semantic duplicate detection (LLM-powered)', 'Dependency graph analysis', 'React/Next.js optimization', 'Bundle-aware cleanup'],
    whenToUse: 'Cleaning up dead code, finding hidden duplicates, and reducing bundle size',
  },
  {
    name: '/perf',
    slug: 'perf',
    title: 'Performance Audit',
    description: 'Live Core Web Vitals measurement from a real browser, per-page timing tables, performance budgets with pass/fail gates, third-party script impact analysis, and 11 code efficiency audit categories. Includes baseline, diff, trend, and canary modes.',
    category: 'quality',
    phase: 'quality',
    icon: 'Gauge',
    highlights: ['Live CWV from browser (not estimates)', 'Performance budgets with pass/fail', 'Third-party JS impact analysis', 'Regression thresholds (20% WARNING, 50% FAIL)'],
    whenToUse: 'Measuring real performance, tracking regressions, or optimizing before launch',
  },
  {
    name: '/a11y',
    slug: 'a11y',
    title: 'Accessibility Audit',
    description: 'WCAG compliance audit with automated fixes. With computer use enabled, automates 4 of 5 manual checks (keyboard nav, zoom, focus visibility, contrast).',
    category: 'quality',
    phase: 'quality',
    icon: 'Accessibility',
    highlights: ['WCAG 2.1 AA', 'Automated fixes', 'Computer use visual checks', 'Keyboard nav automation'],
    whenToUse: 'Auditing and fixing WCAG accessibility issues',
  },
  {
    name: '/qatest',
    slug: 'qatest',
    title: 'Autonomous QA/UAT',
    description: 'Crawl every page, test every interaction, validate every API endpoint, and autofix safe issues. Generates regression tests for each fix. Three depth tiers (quick, full, exhaustive), auto-diff detection on feature branches, and per-dimension health scoring with trend tracking.',
    category: 'quality',
    phase: 'quality',
    icon: 'TestTubes',
    highlights: ['Regression test generation per fix', 'Auto-diff on feature branches', 'Health score dashboard with trends', 'Quick/Full/Exhaustive depth tiers'],
    whenToUse: 'Pre-ship quality gate, dev iteration checks, or exhaustive pre-launch audit',
  },
  {
    name: '/test-ship',
    slug: 'test-ship',
    title: 'Test Audit & Ship',
    description: 'Comprehensive test audit: find gaps, write missing tests, verify coverage, and ship. With computer use, adds visual verification of critical pages after E2E tests.',
    category: 'quality',
    phase: 'quality',
    icon: 'ShieldCheck',
    highlights: ['Coverage analysis', 'Gap detection', 'Auto-test generation', 'Visual verification'],
    whenToUse: 'Auditing test coverage and writing missing tests',
  },
  // ── Security ────────────────────────────────────────
  {
    name: '/sec-ship',
    slug: 'sec-ship',
    title: 'Security Pipeline',
    description: 'Full security pipeline with 17 scanner agents, confidence scoring (1-10 per finding), independent verification agents, and an adversarial chaos subagent. Covers OWASP Web, API, LLM, and Mobile top 10. Two modes: daily (zero-noise, 8/10 gate) and comprehensive (deep scan, 2/10 gate). Fingerprint-based trend tracking across runs.',
    category: 'security',
    phase: 'security',
    icon: 'Shield',
    highlights: ['Confidence-gated findings (8/10 daily, 2/10 deep)', '23 false-positive exclusion rules', 'Independent verification + adversarial review', 'Fingerprint trend tracking (NEW/PERSISTENT/RESOLVED/REGRESSED)'],
    whenToUse: 'Daily security checks, deep monthly audits, or pre-launch security review',
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
    description: 'Active penetration testing against localhost with 48 attack campaigns. Sends real payloads, proves exploitability, auto-fixes confirmed vulnerabilities, and verifies fixes hold. Covers auth bypass, injection, IDOR, SSRF, business logic, AI/LLM exploitation, timing side-channels, middleware bypass, session management, and browser-verified XSS.',
    category: 'security',
    phase: 'security',
    icon: 'Swords',
    highlights: ['48 attack campaigns', 'Browser-verified XSS via Playwright', 'Timing side-channel analysis', 'Next.js-specific attacks (Server Actions, middleware bypass)'],
    whenToUse: 'Proving your app is secure against real attack patterns before shipping',
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
  {
    name: '/investigate',
    slug: 'investigate',
    title: 'Root-Cause Debugging',
    description: 'Systematic evidence-first debugging with the Iron Law: no fixes without confirmed root cause. Auto-parses stack traces, traces code paths, tests hypotheses against evidence, and escalates after 3 failed attempts. Includes git bisect automation, rubber duck protocol for deep bugs, and cross-session pattern memory.',
    category: 'quality',
    phase: 'quality',
    icon: 'Search',
    highlights: ['Evidence chain enforcement', '3-strike escalation rule', 'Git bisect automation', '15 known bug pattern library'],
    whenToUse: 'Debugging a bug you cannot figure out, especially intermittent or multi-file issues',
  },
  {
    name: '/browse',
    slug: 'browse',
    title: 'Browser Control',
    description: 'Unified browser interface powered by Playwright MCP. Navigate, inspect CSS, capture responsive screenshots, run visual audits, extract design systems from live pages, and capture before/after evidence. Other skills use the browser automatically when needed.',
    category: 'development',
    phase: 'build',
    icon: 'Globe',
    highlights: ['10 composite operations', 'CSS inspection with full cascade', 'Responsive screenshot batch (5 viewports)', 'Design system extraction from live CSS'],
    whenToUse: 'Interactively exploring your app in a browser, inspecting CSS, or capturing visual evidence',
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
    title: 'Full Launch Pipeline',
    description: 'Master orchestrator that runs all 8 skills + 5 unique domain checks, auto-fixes everything possible, re-sweeps domains below 90%, and delivers a scored GO/NO-GO verdict with before/after deltas.',
    category: 'planning',
    phase: 'ship',
    icon: 'Rocket',
    highlights: ['Orchestrates all skills', 'Before/after scoring', 'Auto-fix + re-sweep', 'GO/NO-GO verdict'],
    whenToUse: 'One command to audit, fix, and score your entire app for launch readiness',
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
