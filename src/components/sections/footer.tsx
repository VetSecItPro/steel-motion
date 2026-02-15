'use client'

import { Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Software", href: "/portfolio/software" },
  { label: "Creative", href: "/portfolio/creative" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/#contact" },
]

export default function Footer() {
  return (
    <footer className="bg-sm-surface-inverse text-sm-text-inverse py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo + Nav Links */}
        <div className="flex items-center gap-4">
          <Image
            src="/images/steel-motion-hero-logo.png"
            alt="Steel Motion Logo"
            width={28}
            height={28}
            sizes="28px"
            className="object-contain"
          />
          <nav className="flex flex-wrap items-center gap-x-1 gap-y-2">
            {footerLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-1">
                <Link href={link.href} className="text-sm-text-inverse-muted hover:text-sm-text-inverse text-sm transition-colors">
                  {link.label}
                </Link>
                {i < footerLinks.length - 1 && (
                  <span className="text-sm-text-inverse-muted/40 text-sm select-none">&middot;</span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Right: Veteran Badge + Copyright + Social */}
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-1.5 bg-sm-surface-inverse-alt border border-sm-border-inverse rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-sm-accent-inverse rounded-full animate-pulse"></div>
            <span className="text-sm-text-inverse-muted text-xs font-medium">VETERAN OWNED</span>
          </div>
          <span className="text-sm-text-inverse-muted text-sm">&copy; {new Date().getFullYear()} Steel Motion LLC</span>
          <div className="flex space-x-2">
            <a
              href="https://www.linkedin.com/in/vetsecitpro"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-sm-surface-inverse-alt rounded-lg flex items-center justify-center text-sm-text-inverse-muted hover:text-sm-accent-inverse hover:bg-sm-accent-inverse/10 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:contact@steelmotionllc.com"
              className="w-8 h-8 bg-sm-surface-inverse-alt rounded-lg flex items-center justify-center text-sm-text-inverse-muted hover:text-sm-accent-inverse hover:bg-sm-accent-inverse/10 transition-colors duration-300"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
