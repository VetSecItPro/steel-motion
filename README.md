# Steel Motion

Veteran-owned technology consulting. Software development, cloud architecture, and AI transformation.

**Live site:** [steelmotionllc.com](https://steelmotionllc.com)

## What We Build

Steel Motion builds software products and provides consulting for businesses that need AI automation, operations intelligence, and custom development. We also maintain a collection of 26 open-source Claude Code skills that cover the full software development lifecycle.

## Tech Stack

- Next.js 15 with React 19 and TypeScript
- Tailwind CSS v4
- Supabase (database, auth, storage)
- Vercel (hosting, edge functions)
- Velite (content management)
- Stripe (payments)
- Playwright MCP (browser automation)

## Claude Code Skills Collection

26 production-tested slash commands for Claude Code. Each skill handles one job in the development pipeline, from planning through shipping. They share four common standards (status updates, context management, agent orchestration, cleanup protocol, SITREP format) so they work the same way and clean up after themselves.

### Plan

| Skill | What it does |
|-------|-------------|
| `/mdmp` | Military Decision-Making Process for software planning. Six specialist lenses, premise validation, 15 engineering cognitive patterns, TDD enforcement, and two-stage review gates. Auto-scales depth based on mission complexity. |

### Build

| Skill | What it does |
|-------|-------------|
| `/dev` | Starts a dev server with graduated crash recovery, smart cache detection, and memory-aware pre-flight checks. |
| `/db` | Database-agnostic schema management. Drift detection between code queries and actual schema, auto-push migrations. Works with Supabase, Prisma, Drizzle, and others. |
| `/deps` | Dependency health audit. Outdated packages, supply chain security, breaking change alerts. |
| `/docs` | Documentation generation focused on explaining WHY decisions were made, not just what the code does. |
| `/blog` | Interactive content pipeline from draft to published article with SEO optimization. |
| `/migrate` | Major version upgrade automation. Analyzes breaking changes, migrates code patterns, verifies everything, plans rollback. |
| `/browse` | Unified browser control via Playwright MCP. Navigate, inspect CSS, capture responsive screenshots, extract design systems from live pages. Other skills use the browser automatically. |

### Design

| Skill | What it does |
|-------|-------------|
| `/design` | Design system audit with 80-item checklist, dual scoring (Design Score plus AI Slop Score), 7 binary litmus tests, live CSS extraction from the running app, cross-page consistency checks, and fix risk regulation. |

### Quality

| Skill | What it does |
|-------|-------------|
| `/smoketest` | Quick build verification. Lint, typecheck, build, and basic runtime checks in one pass. |
| `/cleancode` | Technical debt reduction with dependency-graph-aware dead code removal, React/Next.js optimization, and semantic duplicate detection that finds functions with matching intent but different implementations. |
| `/perf` | Performance audit with live Core Web Vitals measurement from a real browser, per-page timing, performance budgets with pass/fail gates, third-party JS impact analysis, and 11 code efficiency categories. |
| `/a11y` | WCAG 2.1 AA compliance audit with automated fixes, keyboard navigation testing, and screen reader simulation. |
| `/qatest` | Autonomous QA engine. Crawls every page, tests every interaction, validates every API endpoint. Generates regression tests for each fix. Three depth tiers, auto-diff detection on feature branches, health score dashboard with trends. |
| `/test-ship` | Test coverage audit. Finds gaps, writes missing tests, verifies coverage, ships. |
| `/investigate` | Root-cause debugging. Evidence-first investigation, hypothesis testing against evidence, 3-strike escalation, git bisect automation, rubber duck protocol, and cross-session pattern memory. |

### Security

| Skill | What it does |
|-------|-------------|
| `/sec-ship` | Full security pipeline with 17 scanner agents, confidence scoring per finding, independent verification agents, adversarial chaos subagent, and fingerprint-based trend tracking. Covers OWASP Web, API, LLM, and Mobile. Two modes: daily (high-signal, 8/10 confidence gate) and comprehensive (deep scan, 2/10 gate). |
| `/sec-weekly-scan` | Scheduled cross-repo security audit. Runs every Saturday, scans all repos in parallel, creates PRs with fixes, auto-merges on green CI. |
| `/redteam` | Active penetration testing against localhost. 48 attack campaigns covering auth bypass, injection, IDOR, SSRF, business logic, AI exploitation, timing side-channels, session management, and browser-verified XSS. |
| `/compliance` | GDPR and CCPA privacy audit with data flow mapping and gap analysis. |
| `/compliance-docs` | Generates enterprise compliance documentation grounded in the actual codebase security posture. |

### Ship and Operate

| Skill | What it does |
|-------|-------------|
| `/monitor` | Post-deploy health check. Verifies all routes, serverless functions, infrastructure, and error rates. |
| `/incident` | Structured incident response. Triage, root cause analysis, fix, verify, and postmortem. Every action timestamped. |
| `/launch` | Master orchestrator that runs all skills, auto-fixes what it can, re-sweeps domains below 90%, and delivers a scored GO/NO-GO verdict. |
| `/gh-ship` | Full git pipeline in one command. Commit, push, PR, CI watch, auto-fix failures, squash-merge, deploy verification, branch cleanup. |

### Shared Standards

Every skill follows four shared protocols:

- **Status Updates** for real-time progress reporting
- **Context Management** for efficient agent orchestration and crash recovery
- **Cleanup Protocol** with mandatory test data deletion, screenshot purging, and process cleanup
- **SITREP Format** for unified conclusion reports across all skills

## Project Structure

```
src/
  app/           Pages and API routes
  components/    React components
  lib/           Utilities, data, services
content/         Blog articles (MDX via Velite)
supabase/        Database migrations
skills/          Project-level design skills
```

## Development

```bash
pnpm install
pnpm dev
```

## License

MIT

---

Built by [VetSecItPro](https://github.com/VetSecItPro)
