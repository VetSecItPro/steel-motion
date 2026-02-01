'use client'

import { Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "Contact", href: "/#contact" },
  ],
  solutions: [
    { label: "AI Automation", href: "/services/ai-transformation" },
    { label: "Custom Development", href: "/services/custom-development" },
  ],
  portfolio: [
    { label: "Software", href: "/portfolio/software" },
    { label: "Creative", href: "/portfolio/creative" },
  ],
  resources: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-sm-surface-inverse text-sm-text-inverse pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sm-text-inverse mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm-text-inverse-muted hover:text-sm-text-inverse text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sm-text-inverse mb-4">Solutions</h4>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm-text-inverse-muted hover:text-sm-text-inverse text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sm-text-inverse mb-4">Portfolio</h4>
            <ul className="space-y-2">
              {footerLinks.portfolio.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm-text-inverse-muted hover:text-sm-text-inverse text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sm-text-inverse mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm-text-inverse-muted hover:text-sm-text-inverse text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-sm-border-inverse pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left side - Brand & Social */}
            <div className="flex items-center gap-4">
              <Image
                src="/images/steel-motion-hero-logo.png"
                alt="Steel Motion Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-lg font-bold text-sm-text-inverse">Steel Motion LLC</span>
              <div className="flex space-x-2">
                <a
                  href="https://www.linkedin.com/in/vetsecitpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-sm-surface-inverse-alt rounded-lg flex items-center justify-center text-sm-text-inverse-muted hover:text-sm-accent-inverse hover:bg-sm-accent-inverse/10 transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:contact@steelmotionllc.com"
                  className="w-9 h-9 bg-sm-surface-inverse-alt rounded-lg flex items-center justify-center text-sm-text-inverse-muted hover:text-sm-accent-inverse hover:bg-sm-accent-inverse/10 transition-colors duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Center - Veteran Badge & Copyright */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 bg-sm-surface-inverse-alt border border-sm-border-inverse rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-sm-accent-inverse rounded-full animate-pulse"></div>
                <span className="text-sm-text-inverse-muted text-xs font-medium">VETERAN OWNED</span>
              </div>
              <span className="text-sm-text-inverse-muted text-sm">&copy; {new Date().getFullYear()} Steel Motion LLC</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
